const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db.js");
const hash = require("./hashcode.js");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const sendEmail = require("./ses.js");

app.use(compression());
app.use(express.json());
app.use(
    cookieSession({
        maxAge: 1000 * 60 * 60 * 24,
        secret: "iHateCats",
    })
);
app.use(csurf());
app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

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

app.get("/welcome", (req, resp) => {
    if (req.session.userId) {
        resp.redirect("/");
    } else {
        resp.sendFile(__dirname + "/index.html");
    }
});

app.get("*", (req, resp) => {
    if (req.session.userId) {
        resp.sendFile(__dirname + "/index.html");
    } else {
        resp.redirect("/welcome");
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
            console.log("result1", result);

            sendEmail
                .sendEmail(
                    email,
                    "please find attached your codd:" + code,
                    "Your reset Code"
                    
                )
                .then(result => {
                  
                  
                  response.json({ success: true })
                    
                    
                    //response.session.userId = result.rows[0].id;
                });
            //response.session.userId = result.rows[0].id;
        })
        .catch((error) => console.log(error));
});









//-------------------------------------

app.listen(process.env.PORT || 8080, function () {
    console.log("I'm listening.");
});
