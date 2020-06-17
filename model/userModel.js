const db = require("../config/db");
const crypto = require("crypto");
module.exports = {
  //********setcookies*************************** */
  setCookieHash: async function (email, chash) {
    let conn = await db.getConnection();
    const row = await conn.query(
      "UPDATE `users` SET `cookieHash`=? WHERE `email`=?",
      [chash, email]
    );
    conn.end();
    return true;
  },
  //********** */ authenticate user with a cookie hash**************/
  getAuthorizedWithHash: async function (email, hash) {
    let conn = await db.getConnection();
    // run prepared query finding matching user
    const row = await conn.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    conn.end();

    // check if there are matching users
    if (row[0] !== undefined) {
      // check if hash matches
      console.log(row[0]);
      if (row[0].cookieHash === hash) {
        return { auth: true, user: row[0] };
      }
    }
    return { auth: false };
  },
  //**************************Authorized with passwod******************* */
  getAuthorizedWithPassword: async function (email, pwd) {
    let conn = await db.getConnection();
    const row = await conn.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    conn.end();
    const hash = crypto.createHash("sha1").update(pwd).digest("base64");

    if (row[0] !== undefined) {
      if (hash === row[0].passHash) {
        // if the user is authenticated
        const chash = crypto.createHash("sha1").update(hash).digest("base64");
        this.setCookieHash(email, chash);
        return { auth: true, user: row[0], cookieHash: chash };
      }
    }
    return { auth: false };
  },
  //*************************user exists****************************** */
  // returns true if $email exists in the user table
  isUser: async function (email) {
    // get a reference to the database connection
    let conn = await db.getConnection();
    // prepare SQL to get a username
    const row = await conn.query(
      "SELECT `userId` FROM `users` WHERE email = ?",
      [email]
    );
    if (row[0] !== undefined) {
      // check if there are any results/error
      console.log(row[0]);
      return true;
    }
    return false;
  },
  //*************************username exists****************************** */
  // returns true if $username exists in the user table
  isUserId: async function (id) {
    // get a reference to the database connection
    let conn = await db.getConnection();

    const row = await conn.query(
      "SELECT `userId` FROM `users` WHERE userId = ?",
      [id]
    );
    conn.end();
    if (row[0] !== undefined) {
      // check if there are any results/error
      console.log(row[0]);

      return true;
    }

    return false;
  },
  //*************************get all users****************************** */
  // returns true if $username exists in the user table
  getUser: async function (id) {
    // get a reference to the database connection
    let conn = await db.getConnection();
    // prepare SQL to get a username
    const row = await conn.query("SELECT * FROM `users` where userId =? ", [
      id,
    ]);
    if (row[0] !== undefined) {
      // check if there are any results/error
      //console.log(row[0]);
      return row[0];
    }
    return {};
  },
  //**************************register user******************* */
  createUser: async function (password, name, email, phone, role) {
    let conn = await db.getConnection();

    username = username.toLowerCase().trim();
    // const row = await conn.query("SELECT * FROM users WHERE username = ?", [
    //   username,
    // ]); // check to see if user exists
    if (this.isUser(email) === "true") {
      return {
        msg: "User " + email + " already exists",
        status: false,
      };
    }
    // generate a password hash (non-reversible
    // transform from password)

    const hash = crypto.createHash("sha1").update(password).digest("base64");

    const row1 = await conn.query(
      "INSERT INTO `users` ( `passHash`,`name`,`email`,`phone`,`role`) VALUES (?, ?, ?, ?,?,?);",
      [hash, name, email, phone, role]
    );

    await conn.end();
    return {
      msg: "User " + email + " created",
      status: true,
      username: email,
    };
  },

  //**************************register user******************* */
  createUser1: async function (name, email, password, role, phone) {
    let conn = await db.getConnection();

    // email = email.toLowerCase().trim();
    // const row = await conn.query("SELECT * FROM users WHERE username = ?", [
    //   username,
    // ]); // check to see if user exists
    if (await this.isUser(email)) {
      return {
        msg: "User " + email + " already exists",
        status: false,
      };
    }
    // generate a password hash (non-reversible
    // transform from password)

    const hash = crypto.createHash("sha1").update(password).digest("base64");

    const row1 = await conn.query(
      "INSERT INTO `users` ( `passHash`,`name`,`email`,`role`,`phone`) VALUES (?, ?, ?, ?,?);",
      [hash, name, email, role, phone]
    );

    await conn.end();
    return {
      msg: "User " + email + " created",
      status: true,
      user: { email: email, name: name, role: role },
      auth: false,
      cookieHash: hash,
    };
  },
  //**************************update user******************* */
  editUser: async function (userId, name, email, password, phone) {
    let conn = await db.getConnection();

    if (await this.isUserId(userId)) {
      // console.log();
      const hash = crypto.createHash("sha1").update(password).digest("base64");

      const row1 = await conn.query(
        "UPDATE `mozaic`.`users` SET   `name`=?, `email`=?, `passHash`=?,`phone`=? WHERE  `userId`=?;",
        [name, email, password, phone, userId]
      );
      await conn.end();
      return {
        msg: "User " + email + " updated",
        status: true,
        user: {
          email: email,
          name: name,
          role: "client",
          phone: phone,
          userId: userId,
        },
        auth: true,
        cookieHash: hash,
      };
    } else {
      return { msg: "User " + email + " is not exist" };
    }
  },
  //***********************add to cart********************** */
  AddToCart: async function ($id, $userId) {
    let conn = await db.getConnection();

    const row = await conn.query("SELECT * FROM `cart` where userId=?", [
      $userId,
    ]);
    $quantity = 0;
    row.forEach((element) => {
      if (element["productId"] == $id) {
        // echo $row2['productId'];
        $quantity = element["quantity"] + 1;
      }
    });

    if ($quantity !== 0) {
      const row1 = await conn.query(
        "UPDATE cart  SET quantity =  ?  where userId=? and productId=? ",
        [$quantity, $userId, $id]
      );
    } else {
      const row2 = await conn.query(
        "INSERT INTO `cart` (`userId`,`productId`, `quantity`)  VALUES (?, ?, ?); ",
        [$userId, $id, 1]
      );
    }
  },
  //***********************get cart********************** */
  getCart: async function ($userId) {
    let conn = await db.getConnection();

    const row = await conn.query("SELECT * FROM `cart` where userId=?", [
      $userId,
    ]);
    conn.end();
    return row;
  },
  //*****************add address*********************** */
  addAdress: async function (
    city,
    country,
    postalcode,
    streetName,
    streetNum,
    unitNum,
    province,
    userId,
    type
  ) {
    let conn = await db.getConnection();
    let isUser = await  this.isUserId(userId)
    console.log(isUser);
    if (isUser) {
      const row = await conn.query(
        "INSERT INTO `mozaic`.`address` (`city`, `country`, `postalcode`, `streetName`, `streetNum`, `unitNum`, `province`, `userId`,type) VALUES (?, ?, ?, ?, ?, ?,?, ?,?);",
        [
          city,
          country,
          postalcode,
          streetName,
          streetNum,
          unitNum,
          province,
          userId,
          type,
        ]
      );
      // if(row.insertId)
      await conn.end();
      return { msg: "adress has been added" };
    } else {
      return {
        msg: "adress has not been added, there is no user with this Id",
      };
    }
  },

  //*************************get addresses****************************** */
  
  getAddresses: async function (id) {
   
    let conn = await db.getConnection();
    
    const row = await conn.query("SELECT * FROM `address` where userId =? ", [
      id,
    ]);
    conn.end();
    if (row[0] !== undefined) {
      return row;
    }
    return {};
  },
  //**********************login seller****************** */
  logSeller: async function (email, pwd) {
    let conn = await db.getConnection();
    const row = await conn.query(
      //"SELECT users.userId,seller.sellerId,passHash,pass,cookieHash,`name`,email,phone ,FROM users JOIN seller ON seller.userId=users.userId WHERE email = ? and pass=?",
      "SELECT users.userId,seller.sellerId,passHash,pass,cookieHash,`name`,email,phone,seller.sellerimg,seller.logo,seller.rev from users JOIN seller ON seller.userId=users.userId WHERE email = ? and pass=?",
      [email, pwd]
    );

    conn.end();
    const hash = crypto.createHash("sha1").update(pwd).digest("base64");

    if (row[0] !== undefined) {
      if (hash === row[0].passHash) {
        // if the user is authenticated
        const chash = crypto.createHash("sha1").update(hash).digest("base64");
        this.setCookieHash(email, chash);
        return { auth: true, user: row[0], cookieHash: chash };
      }
    }
    return { auth: false };
  },
};
