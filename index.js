const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db.js");
const hash = require("./hashcode.js");
app.use(compression());
app.use(express.json())
app.use(
    cookieSession({
        maxAge: 1000 * 60 * 60 * 24,
        secret: "iHateCats",
    })
);

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
    console.log('welcome',req.session)
    if (req.session.userId) {
        resp.redirect("/");
    } else {
        resp.sendFile(__dirname + "/index.html");
    }
});

app.get("*", (req, resp) => {
    console.log('*****',req.session)
    if (req.session.userId) {
        resp.sendFile(__dirname + "/index.html");
    } else {
        resp.redirect("/welcome");
    }
});

app.post("/register", (request, response) => {
    const { firstname, lastname, mail, password } = request.body;
    console.log(request.body);
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

app.listen(process.env.PORT || 8080, function () {
    console.log("I'm listening.");
});
