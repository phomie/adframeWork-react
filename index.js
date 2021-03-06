const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db.js");
const hash = require("./hashcode.js");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const sendEmail = require("./ses.js");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3.js");

const profilePictureStorage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, __dirname + "/uploads/");
    },
    filename: function (request, file, callback) {
        if (!request.session.userId) {
            callback("No user session.", "");
        } else {
            uidSafe(8).then((uid) => {
                const userId = request.session.userId;

                const extension = path.extname(file.originalname);

                callback(null, `user_${userId}_${uid}${extension}`);
            });
        }
    },
});
//----------------------VideouploadMulter----------------- 
const videoStorage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, __dirname + "/uploads/");
    },
    filename: function (request, file, callback) {
        if (!request.session.userId) {
            callback("No user session.", "");
        } else {
            uidSafe(8).then((uid) => {
                const userId = request.session.userId;

                const extension = path.extname(file.originalname);

                callback(null, `user_${userId}_${uid}${extension}`);
            });
        }
    },
});

const uploader = multer({
    storage: profilePictureStorage,
    limits: {
        fileSize: 4097152,
    },
});

//----------------------------
const uploaderVideo = multer({
    storage: videoStorage,
    limits: {
        fileSize: 40971520,
    },
});

app.use(compression());
app.use(express.json());

//--------§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
const cookieSessionmiddleWare = cookieSession({
    maxAge: 1000 * 60 * 60 * 24,
    secret: "iHateCats",
});

app.use(cookieSessionmiddleWare);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

const server = require("http").Server(app);

const io = require("socket.io")(server, { origins: "localhost:8080" });

io.use((socket, next) => {
    cookieSessionmiddleWare(socket.request, socket.request.res, next);
});

//##++++++++++++++SOCKET

io.on("connection", async function (socket) {
    const userId = socket.request.session.userId;
    const lastMessages = await db.getLastMessages();
    socket.emit("chatMessages", lastMessages);

    socket.on("chatMessage", async (message_text) => {
        const result = await db.addMessage(userId, message_text);
        const user = await db.getUserById(userId);
        io.sockets.emit("chatMessage", {
            ...user.rows[0],
            message_id: result.id,
            message_text: message_text,
        });
    });
});

//------------------------------VIDEOUPLOAD________________________________________-
app.get("/videoupload", (request, response) => {
    console.log('',request.params);
  
    db.getVid().then(result => {
      response.json({
          videos:result,
          succes:true});
    });
  });
app.post("/api/uploadvid", uploaderVideo.single("file"), (request, response) => {
    s3.uploadToS3(request.file)
      .then(result => {
        const url = s3.getBucketURL(request.file.filename);
        const user_id = request.session.userId;
  
        db.storeNewVidinDb(url,user_id).then(result => {
          response.json({
            success: true,
            video: {
              url: url
            }
          });
        });
      })
      .catch(result => {});
  });


//-------------------------LocationFORBingMAps-------------------------------------
 
app.get('/user/location',(request,response)=>{
    let user_id = request.session.userId;

    db.getLocation(user_id).then(Result =>{
    console.log('Result', Result);
  
    response.json({
        location:Result.rows[0].location,
        success: true,
        
    });
       





    })
    
})


app.post("/user/location", (request, response) => {
   
    let user_id = request.session.userId;
    console.log('user_id', user_id);

    const location = request.body.location;
    console.log(' request.body',  request.body);
 

    db.intLocationinDb(user_id,location).then((result) => {
        console.log('result', result);
        response.json({
            success: true,
            
        });
    });
});




//--------------------------------

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads"));
app.get("/welcome", (req, resp) => {
    if (req.session.userId) {
        resp.redirect("/");
    } else {
        resp.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (request, response) => {
    const { firstname, lastname, mail, password } = request.body;

    if (!firstname || !lastname || !mail || !password) {
        return response.json({ error: "fillout all fields", success: false }); // json objekt true or false
    }
    hash.hash(password).then((hashpassword) => {
        db.adduser(firstname, lastname, mail, hashpassword).then((result) => {
            request.session.userId = result.rows[0].id;
            response.json({ success: true }); // json objekt true or false
            //response.cookie("signed", true);
        });
    });
});
//----------------------------------
app.post("/Login", (request, response) => {

    
    const { mail, password } = request.body;

    if (!mail || !password) {
        return response.json({ error: "fillout all fields", success: false });
    }
    hash.hash(password).then((result) => {
        db.getUser(mail).then((result) => {
            request.session.userId = result.rows[0].id;
            response.json({ success: true });
        });
    });
});
//------------------------------------

app.post("/Reset", (request, response) => {
    const { email } = request.body;
    console.log("hallo", request.body);

    if (!email) {
        return response.json({
            error: "Fill in your Mailadress",
            success: false,
        });
    }
    const code = cryptoRandomString({
        length: 4,
    });

    db.userCode(email, code)

        .then((result) => {
            //console.log("result1", result);

            sendEmail
                .sendEmail(
                    email,
                    "please find attached your codd:" + code,
                    "Your reset Code"
                )
                .then((result) => {
                    response.json({ success: true });
                });
        })
        .catch((error) => console.log(error));
});

app.post("/Reset/verify", (request, response) => {
    const { email, code, password } = request.body;

    db.getuserInMin(email)
        .then((result) => {
            if (result.rows[0].code === code) {
                hash.hash(password).then((hashpassword) => {
                    db.updatePassword(email, hashpassword).then(() => {
                        response.json({
                            success: true,
                        });
                    });
                });
            }
        })
        .catch((error) => console.log(error));
});
//--------------ProfilePic-----------------------

app.get("/user", (request, response) => {
    
    let userId = request.session.userId;
    

    if (userId) {
        db.getUserById(userId).then((user) => {
           
            response.json(user.rows[0]);

        }).catch(e=>console.log(e))
    } else {
        console.log("error accured:the user is not loggt in ");
    }
}); // ENDOFGET

app.post("/user/picture", uploader.single("file"), (request, response) => {
    const pictureUrl = `/uploads/${request.file.filename}`;
    db.updateUserProfilePicture(request.session.userId, pictureUrl).then(
        (user) => {
            response.json({
                success: true,
                user,
            });
        }
    );
});

app.post("/user/bio", (request, response) => {
    let userId = request.session.userId;
    const bio = request.body.bio;

    db.integBioinDb(userId, bio).then((result) => {
        response.json({
            success: true,
            user: result.rows[0],
        });
    });
});

app.get("/api/user/:id", (request, response) => {
    console.log("request", request.params.id);
    let userId = request.params.id;
    // console.log('userId', userId);

    if (userId) {
        db.getOtherProfiles(userId).then((result) => {
            response.json({
                success: true,
                user: result.rows[0],
            });
        });
    } else {
        console.log("error accured:the user is not loggt in ");
    }
});
app.get("/api/users", (request, response) => {
    const { search } = request.query;
    db.fundusersViaSearch(search).then((users) => {
        response.json({
            success: true,
            users,
        });
    });
});

const STATUS_NO_REQUEST = "no-request";
const STATUS_REQUEST_ACCEPTED = "request-accepted";
const STATUS_REQUEST_MADE_BY_YOU = "request-made-by-you";
const STATUS_REQUEST_MADE_TO_YOU = "request-made-to-you";

app.get("/api/friend-request/:otherUserId", async (request, response) => {
    const myUserId = request.session.userId;
    const { otherUserId } = request.params;
    const friendRequest = await db.getFriendRequest(myUserId, otherUserId);
    console.log("friendRequest", friendRequest);

    let status;

    if (!friendRequest) {
        status = STATUS_NO_REQUEST;
    } else if (friendRequest.accepted) {
        status = STATUS_REQUEST_ACCEPTED;
    } else {
        const requestMadeByUser =
            friendRequest.from_id === request.session.userId;

        if (requestMadeByUser) {
            status = STATUS_REQUEST_MADE_BY_YOU;
        } else {
            status = STATUS_REQUEST_MADE_TO_YOU;
        }
    }

    response.json({
        status: status,
    });
});

app.get(
    "/api/friend-request/make-request/:otherUserId",
    (request, response) => {
        const myUserId = request.session.userId;
        console.log("myUserId", myUserId);

        const { otherUserId } = request.params;
        console.log("otherUserId", otherUserId);

        db.makeRequest(myUserId, otherUserId).then((result) => {
            console.log("result", result);

            response.json({ status: STATUS_REQUEST_MADE_BY_YOU });
        });
    }
);
app.get("/api/friend-request/cancel/:otherUserId", (request, response) => {
    const myUserId = request.session.userId;

    const { otherUserId } = request.params;
    db.deletRequest(myUserId, otherUserId).then((result) => {
        response.json({ status: STATUS_NO_REQUEST });
    });
});

app.get("/api/friend-request/accept/:otherUserId", (request, response) => {
    const myUserId = request.session.userId;

    const { otherUserId } = request.params;
    db.acceptRequest(myUserId, otherUserId).then((result) => {
        response.json({ status: STATUS_REQUEST_ACCEPTED });
    });
});
app.get("/api/friend-request/unfriend/:otherUserId", (request, response) => {
    const myUserId = request.session.userId;

    const { otherUserId } = request.params;
    db.deletRequest(myUserId, otherUserId).then((result) => {
        response.json({ status: STATUS_NO_REQUEST });
    });
});

app.get("/api/friends", async (request, response) => {
    const friends = await db.getFriends(request.session.userId);
    response.json({ success: true, friends });
});

app.get("*", (req, resp) => {
    if (req.session.userId) {
        resp.sendFile(__dirname + "/index.html");
    } else {
        resp.redirect("/welcome");
    }
});

server.listen(process.env.PORT || 8080, function () {
    console.log("I'm listening.");
});
