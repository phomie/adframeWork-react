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
    return db.query("SELECT * FROM users WHERE email = $1;", [email]);
};
exports.userCode = (email, code) => {
    return db.query(
        "INSERT INTO password_reset_code (email,code) VALUES ($1,$2);",
        [email, code]
    );
};

exports.getuserInMin = (email) => {
    return db.query(
        `SELECT code FROM password_reset_code WHERE CURRENT_TIMESTAMP  - created_at < INTERVAL '10 minutes' AND email=$1 ORDER BY created_at DESC LIMIT 1 ;`,
        ["" + email + ""]
    );
};

exports.updatePassword = (email, hashpassword) => {
    return db.query("UPDATE users SET password_hash = $2 WHERE email = $1;", [
        email,
        hashpassword,
    ]);
};

exports.getUserById = (userId) => {
    return db.query("SELECT * FROM users WHERE id = $1", [userId]);
};

exports.updateUserProfilePicture = (userId, picturePath) => {
    return db
        .query(
            " UPDATE users SET profile_picture_url=$2 WHERE id=$1 RETURNING *;",
            [userId, picturePath]
        )
        .then(({ rows }) => rows[0]);
};
exports.integBioinDb = (userId, bio) => {
    return db.query(" UPDATE users SET bio=$2 WHERE id=$1 RETURNING *;", [
        userId,
        bio,
    ]);
};

exports.getOtherProfiles = (userId) => {
    return db.query(
        " SELECT firstname, lastname, profile_picture_url, bio FROM users WHERE id = $1;",
        [userId]
    );
};

exports.fundusersViaSearch = (search) => {
    return db
        .query(
            `SELECT id, firstname, lastname, profile_picture_url FROM users WHERE firstname ILIKE $1;`,
            [search + "%"]
        )
        .then(({ rows }) => rows);
};

exports.getFriendRequest = (from_id, to_id) => {
    return db
        .query(
            "SELECT * FROM friends_requests WHERE (from_id=$1 and to_id=$2) OR (from_id=$2 AND to_id=$1);",
            [from_id, to_id]
        )
        .then(({ rows }) => rows[0]);
};
exports.makeRequest = (from_id, to_id) => {
    return db
        .query(
            "INSERT INTO friends_requests (from_id,to_id)  VALUES($1,$2)  RETURNING * ;",
            [from_id, to_id]
        )
        .then(({ rows }) => rows[0]);
};

exports.acceptRequest = (from_id, to_id) => {
    return db
        .query(
            "UPDATE friends_requests SET accepted=true WHERE (from_id=$1 and to_id=$2) OR (from_id=$2 AND to_id=$1) RETURNING * ;",
            [from_id, to_id]
        )
        .then(({ rows }) => rows[0]);
};

exports.deletRequest = (user_id1, user_id2) => {
    return db
        .query(
            "DELETE FROM friends_requests WHERE (from_id=$1 and to_id=$2) OR (from_id=$2 AND to_id=$1);",
            [user_id1, user_id2]
        )
        .then(({ rows }) => rows[0]);
};


exports.getFriends = (userId) => {
 return db.query(`
 SELECT * FROM friends_requests
JOIN users
    ON (accepted=false AND from_id=users.id AND to_id=$1)
    OR (accepted=true  AND from_id=users.id AND to_id=$1)
    OR (accepted=true  AND from_id=$1        AND to_id=users.id);
  ;`,[userId])
  .then(({ rows }) => rows);
};

exports.addMessage = (userId, messageText) => {
    return db
        .query(
            "INSERT INTO chat_messages(user_id,message_text) VALUES($1,$2) RETURNING id;",
            [userId, messageText]
        )
        .then(({ rows }) => rows[0]);
};

exports.getLastMessages = (limit=10) =>{
  return db
      .query(
          "SELECT * FROM ( SELECT chat_messages.id as message_id, * FROM chat_messages JOIN users ON (chat_messages.user_id = users.id) ORDER BY message_id DESC limit $1 ) subquery ORDER BY message_id ASC;",
          [limit]
      )
      .then(({ rows }) => rows);


}

//---------------VIDEOUPLOADER---------------------

exports.getVid = () =>{

        return db.query(
            "SELECT * FROM video ORDER BY id;",
            ).then(({ rows }) => rows);
        
    }
    
    
    
    exports.storeNewVidinDb = (url,user_id) =>{
        return db.query( "INSERT INTO video (url,user_id) VALUES ($1,$2) RETURNING *;",
        [url,user_id]
        );
    }