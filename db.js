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


  exports.userCode = (email,code) =>{
    return db.query('INSERT INTO password_reset_code (email,code) VALUES ($1,$2);',
    [email,code]
    )
  }


  exports.getuserInMin = (email) => {
    return db.query(`SELECT code FROM password_reset_code WHERE CURRENT_TIMESTAMP  - created_at < INTERVAL '10 minutes' AND email=$1 ORDER BY created_at DESC LIMIT 1 ;`,
    [''+email+'']
    )
  }

  exports.updatePassword = (email, hashpassword) => {
    return db.query('UPDATE users SET password_hash = $2 WHERE email = $1;',
        [email, hashpassword]);
};