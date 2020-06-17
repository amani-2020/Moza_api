const db = require("../config/db");
const crypto = require("crypto");

module.exports = {
  // *******************Get All sellers************************//
  getSellers: async function (key) {
    let conn = await db.getConnection();
    const row = await conn.query(
      "SELECT users.userId,passHash,pass,cookieHash,`name`,email,phone FROM users   ",
      []
    );
    conn.end();
    return row;
  },
  // *******************Get a specific seller************************//
  getSeller: async function (key) {
    //key = tolowercase(trim(key));
    let conn = await db.getConnection();
    const row = await conn.query(
     // "SELECT users.userId,passHash,pass,cookieHash,`name`,email,phone FROM users JOIN seller ON seller.userId=users.userId   WHERE sellerId = ?",
    //  "SELECT users.userId,seller.sellerId,passHash,pass,cookieHash,`name`,email,phone,seller.sellerimg,seller.logo,seller.rev from seller JOIN users ON seller.userId=users.userId WHERE sellerId=?",
      " SELECT seller.sellerId,`name`,email,phone,seller.sellerimg,seller.logo,seller.rev,address.* from users  JOIN seller ON seller.userId=users.userId join address ON address.userId=users.userId WHERE  sellerId=?",
     [key]
    );
    conn.end();
    return row;
  },
  // ****************Delete a specific seller************************ //
  deleteSeller: async function (key) {
    //key = tolowercase(trim(key));
    let conn = await db.getConnection();
    const row = await conn.query(
      "DELETE FROM `mozaic`.`seller` WHERE  `sellerId` = ?",
      [key]
    );
    conn.end();
    return row;
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
  // *******************Add a new seller************************ //
  addSeller: async function (  city,
    country,
    postalcode,
    streetName,
    streetNum,
    unitNum,
    province,
    userId,
    type,
    email,name,
    addressId, img, logo, rev) {
    // let conn = await db.getConnection();

    // try {
    //   const result = await conn.query(
    //     "INSERT INTO `mozaic`.`seller` (`name`, `addressId`, `img`, `logo`, `rev`) VALUES (?,?, ?, ?,?);",
    //     [name, addressId, img, logo, rev]
    //   );
    //   conn.end();
    //   return result;
    // } catch (e) {
    //   return { error: e.message };
    // }

  
  
    let conn = await db.getConnection();
    let isUser = await  this.isUser(email)
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
  // *******************Edit a specific seller************************ //
  editSeller: async function (name, addressId, img, logo, rev, sellerId) {
    let conn = await db.getConnection();

    try {
      const result = await conn.query(
        "UPDATE `mozaic`.`seller` SET `name`=?, `addressId`=?, `img`=?, `logo`=?, `rev`=?,  WHERE  `sellerId` = ? ;",
        [name, addressId, img, logo, rev, sellerId]
      );
      conn.end();
      return result;
    } catch (e) {
      return { error: e.message };
    }
  },
  /* ************************************************************** */
};
