const spicedPG = require("spiced-pg");
var dbUrl =
  process.env.DATABASE_URL ||
  "postgres:marcpassenheim:marcpassenheim@localhost:5432/socialnetwork";
const db = spicedPG(dbUrl);

exports.adduser = (firstname, lastname, email, password) => {
    return db.query(
      "INSERT INTO users (firstname, lastname, email, password_hash) VALUES ($1,$2,$3,$4) RETURNING *;",
      [firstname, lastname, email, password]
    );
  };

  exports.getUser = (email) => {
    return db.query(
      "SELECT * FROM users WHERE email = $1;", [email]);
    
  };


  exports.user
  exports.getuserInMin = (code) => {
    return db.query("SELECT * FROM my_table WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' AND EMAIL =$1 ORDER BY id DESC LIMIT 1 ;",
      [code]
    )
  }