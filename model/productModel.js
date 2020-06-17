const db = require("../config/db");

module.exports = {
  // *******************Get All Products************************//
  getProducts: async function (key) {
    let conn = await db.getConnection();
    const row = await conn.query(
      "SELECT * FROM product JOIN productsculture ON product.pcId=productsculture.Id",
      []
    );
    conn.end();
    return row;
  },
  // *******************Get All Products************************//
  getProductsbyAll: async function (id, cat, cat2, sale, seller, search) {
    let conn = await db.getConnection();
    let row;
    // ..................product by id....................................................
    if (
      id !== "0" &&
      cat === "0" &&
      cat2 === "0" &&
      sale === "0" &&
      seller === "0" &&
      search === "0"
    ) {
      row = await conn.query(
        // "SELECT * FROM `product` JOIN productsculture ON product.pcId=productsculture.Id WHERE  `productId`=? ;"
        "SELECT product.productId,product.pcId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, c2.cat2EN AS category2EN,c2.cat2FR AS category2FR, c2.cat2AR AS category2AR, product.price,product.onSale,product.salePrice,product.reviews,product.img, product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN,productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,        productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,        productsculture.featuresAR FROM product        JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId         JOIN (SELECT categoryId,EN AS cat2EN,FR AS cat2FR,AR AS cat2AR FROM category JOIN culture on culture.ID = category.ccid) c2 ON c2.categoryId = product.categoryId_L2 JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId where productId=? UNION SELECT product.productId,product.pcId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, product.categoryId_L2 AS category2EN,product.categoryId_L2 AS category2FR, product.categoryId_L2 AS category2AR,product.price,product.onSale,product.salePrice,product.reviews,product.img,product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN, productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,productsculture.featuresAR FROM `product` JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId WHERE product.categoryId_L2=0 and productId=?",

        [id, id]
      );
    }
    // ..................products by category level1....................................................
    else if (
      id === "0" &&
      cat !== "0" &&
      cat2 === "0" &&
      sale === "0" &&
      seller === "0" &&
      search === "0"
    ) {
      row = await conn.query(
        // "SELECT * FROM `product` JOIN productsculture ON product.pcId=productsculture.Id WHERE `categoryId`=? ;",
        "SELECT product.productId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, c2.cat2EN AS category2EN,c2.cat2FR AS category2FR, c2.cat2AR AS category2AR, product.price,product.onSale,product.salePrice,product.reviews,product.img, product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN,productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,        productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,        productsculture.featuresAR FROM product        JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId         JOIN (SELECT categoryId,EN AS cat2EN,FR AS cat2FR,AR AS cat2AR FROM category JOIN culture on culture.ID = category.ccid) c2 ON c2.categoryId = product.categoryId_L2 JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId where product.categoryId=? UNION SELECT product.productId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, product.categoryId_L2 AS category2EN,product.categoryId_L2 AS category2FR, product.categoryId_L2 AS category2AR,product.price,product.onSale,product.salePrice,product.reviews,product.img,product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN, productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,productsculture.featuresAR FROM `product` JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId WHERE product.categoryId_L2=0 and product.categoryId=?",

        [cat, cat]
      );
    }
    // ..................products by category level2....................................................
    else if (
      id === "0" &&
      cat !== "0" &&
      cat2 !== "0" &&
      sale === "0" &&
      seller === "0" &&
      search === "0"
    ) {
      row = await conn.query(
        // "SELECT * FROM `product` JOIN productsculture ON product.pcId=productsculture.Id WHERE `categoryId`=? and categoryId_L2=? ;",
        "SELECT product.productId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, c2.cat2EN AS category2EN,c2.cat2FR AS category2FR, c2.cat2AR AS category2AR, product.price,product.onSale,product.salePrice,product.reviews,product.img, product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN,productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,        productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,        productsculture.featuresAR FROM product        JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId         JOIN (SELECT categoryId,EN AS cat2EN,FR AS cat2FR,AR AS cat2AR FROM category JOIN culture on culture.ID = category.ccid) c2 ON c2.categoryId = product.categoryId_L2 JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId where product.categoryId=? and product.categoryId_L2=? ",
        [cat, cat2]
      );
    } // ..................products by seller....................................................
    else if (
      id === "0" &&
      cat === "0" &&
      cat2 === "0" &&
      sale === "0" &&
      seller !== "0" &&
      search === "0"
    ) {
      row = await conn.query(
        // "SELECT * FROM `product` JOIN productsculture ON product.pcId=productsculture.Id WHERE `sellerId`=? ;",
        "SELECT product.productId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, c2.cat2EN AS category2EN,c2.cat2FR AS category2FR, c2.cat2AR AS category2AR, product.price,product.onSale,product.salePrice,product.reviews,product.img, product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN,productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,        productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,        productsculture.featuresAR FROM product        JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId         JOIN (SELECT categoryId,EN AS cat2EN,FR AS cat2FR,AR AS cat2AR FROM category JOIN culture on culture.ID = category.ccid) c2 ON c2.categoryId = product.categoryId_L2 JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId  where product.sellerId=? UNION SELECT product.productId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, product.categoryId_L2 AS category2EN,product.categoryId_L2 AS category2FR, product.categoryId_L2 AS category2AR,product.price,product.onSale,product.salePrice,product.reviews,product.img,product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN, productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,productsculture.featuresAR FROM `product` JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId WHERE product.categoryId_L2=0 and product.sellerId=?",

        [seller, seller]
      );
    }
    // ..................products on sale....................................................
    else if (
      id === "0" &&
      cat === "0" &&
      cat2 === "0" &&
      sale !== "0" &&
      seller === "0" &&
      search === "0"
    ) {
      row = await conn.query(
        // "SELECT * FROM `product` JOIN productsculture ON product.pcId=productsculture.Id WHERE  onsale = true ;",
        "SELECT product.productId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, c2.cat2EN AS category2EN,c2.cat2FR AS category2FR, c2.cat2AR AS category2AR, product.price,product.onSale,product.salePrice,product.reviews,product.img, product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN,productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,        productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,        productsculture.featuresAR FROM product        JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId         JOIN (SELECT categoryId,EN AS cat2EN,FR AS cat2FR,AR AS cat2AR FROM category JOIN culture on culture.ID = category.ccid) c2 ON c2.categoryId = product.categoryId_L2 JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId  WHERE  onsale = true UNION SELECT product.productId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, product.categoryId_L2 AS category2EN,product.categoryId_L2 AS category2FR, product.categoryId_L2 AS category2AR,product.price,product.onSale,product.salePrice,product.reviews,product.img,product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN, productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,productsculture.featuresAR FROM `product` JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId WHERE product.categoryId_L2=0 and onsale = true",

        []
      );
    }
    // ..................products by category and onsale....................................................
    else if (
      id === "0" &&
      cat !== "0" &&
      cat2 === "0" &&
      sale !== "0" &&
      seller === "0" &&
      search === "0"
    ) {
      row = await conn.query(
        //  "SELECT * FROM `product` JOIN productsculture ON product.pcId=productsculture.Id WHERE `categoryId`=? AND onsale = true;",
        "SELECT product.productId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, c2.cat2EN AS category2EN,c2.cat2FR AS category2FR, c2.cat2AR AS category2AR, product.price,product.onSale,product.salePrice,product.reviews,product.img, product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN,productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,        productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,        productsculture.featuresAR FROM product        JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId         JOIN (SELECT categoryId,EN AS cat2EN,FR AS cat2FR,AR AS cat2AR FROM category JOIN culture on culture.ID = category.ccid) c2 ON c2.categoryId = product.categoryId_L2 JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId  WHERE product.categoryId=? AND onsale = true UNION SELECT product.productId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, product.categoryId_L2 AS category2EN,product.categoryId_L2 AS category2FR, product.categoryId_L2 AS category2AR,product.price,product.onSale,product.salePrice,product.reviews,product.img,product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN, productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,productsculture.featuresAR FROM `product` JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId WHERE product.categoryId_L2=0 and product.categoryId=? AND onsale = true",

        [cat, cat]
      );
    }
    // ..................products by category and onsale and for specific seller....................................................
    else if (
      id === "0" &&
      cat !== "0" &&
      cat2 === "0" &&
      sale !== "0" &&
      seller !== "0" &&
      search === "0"
    ) {
      row = await conn.query(
        // "SELECT * FROM `product` JOIN productsculture ON product.pcId=productsculture.Id WHERE `categoryId`=? AND onsale = true and sellerId=?;",
        "SELECT product.productId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, c2.cat2EN AS category2EN,c2.cat2FR AS category2FR, c2.cat2AR AS category2AR, product.price,product.onSale,product.salePrice,product.reviews,product.img, product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN,productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,        productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,        productsculture.featuresAR FROM product        JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId         JOIN (SELECT categoryId,EN AS cat2EN,FR AS cat2FR,AR AS cat2AR FROM category JOIN culture on culture.ID = category.ccid) c2 ON c2.categoryId = product.categoryId_L2 JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId  WHERE product.categoryId=? AND onsale = true and product.sellerId=? UNION SELECT product.productId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, product.categoryId_L2 AS category2EN,product.categoryId_L2 AS category2FR, product.categoryId_L2 AS category2AR,product.price,product.onSale,product.salePrice,product.reviews,product.img,product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN, productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,productsculture.featuresAR FROM `product` JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId WHERE product.categoryId_L2=0 and product.categoryId=? AND onsale = true and product.sellerId=?",

        [cat, seller, cat, seller]
      );
    }
    // ..................products by category  for specific seller....................................................
    else if (
      id === "0" &&
      cat !== "0" &&
      cat2 === "0" &&
      sale === "0" &&
      seller !== "0" &&
      search === "0"
    ) {
      row = await conn.query(
        // "SELECT * FROM `product` JOIN productsculture ON product.pcId=productsculture.Id WHERE `categoryId`=? AND  sellerId=?;",
        "SELECT product.productId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, c2.cat2EN AS category2EN,c2.cat2FR AS category2FR, c2.cat2AR AS category2AR, product.price,product.onSale,product.salePrice,product.reviews,product.img, product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN,productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,        productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,        productsculture.featuresAR FROM product        JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId         JOIN (SELECT categoryId,EN AS cat2EN,FR AS cat2FR,AR AS cat2AR FROM category JOIN culture on culture.ID = category.ccid) c2 ON c2.categoryId = product.categoryId_L2 JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId  WHERE product.categoryId=?  and product.sellerId=? UNION SELECT product.productId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, product.categoryId_L2 AS category2EN,product.categoryId_L2 AS category2FR, product.categoryId_L2 AS category2AR,product.price,product.onSale,product.salePrice,product.reviews,product.img,product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN, productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,productsculture.featuresAR FROM `product` JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId WHERE product.categoryId_L2=0 and product.categoryId=? AND  product.sellerId=?",

        [cat, seller, cat, seller]
      );
    }
    // ..................product  onsale and for specific seller....................................................
    else if (
      id === "0" &&
      cat === "0" &&
      cat2 === "0" &&
      sale !== "0" &&
      seller !== "0" &&
      search === "0"
    ) {
      row = await conn.query(
        // "SELECT * FROM `product` JOIN productsculture ON product.pcId=productsculture.Id WHERE onsale = true AND  sellerId=?;",
        "SELECT product.productId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, c2.cat2EN AS category2EN,c2.cat2FR AS category2FR, c2.cat2AR AS category2AR, product.price,product.onSale,product.salePrice,product.reviews,product.img, product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN,productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,        productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,        productsculture.featuresAR FROM product        JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId         JOIN (SELECT categoryId,EN AS cat2EN,FR AS cat2FR,AR AS cat2AR FROM category JOIN culture on culture.ID = category.ccid) c2 ON c2.categoryId = product.categoryId_L2 JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId  WHERE  onsale = true and product.sellerId=? UNION SELECT product.productId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, product.categoryId_L2 AS category2EN,product.categoryId_L2 AS category2FR, product.categoryId_L2 AS category2AR,product.price,product.onSale,product.salePrice,product.reviews,product.img,product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN, productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,productsculture.featuresAR FROM `product` JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId WHERE product.categoryId_L2=0  AND onsale = true and product.sellerId=?",

        [seller, seller]
      );
    }
    // ..................products  onsale and for specific seller....................................................
    // else if (
    //   id === "0" &&
    //   cat === "0" &&
    //   cat2 === "0" &&
    //   sale !== "0" &&
    //   seller !== "0" &&
    //   search === "0"
    // ) {
    //   row = await conn.query(
    //     "SELECT * FROM `product` JOIN productsculture ON product.pcId=productsculture.Id WHERE  onsale = true and sellerId=?;",
    //     [cat, seller]
    //   );
    // } // ..................products  search....................................................
    else if (
      id === "0" &&
      cat === "0" &&
      cat2 === "0" &&
      sale === "0" &&
      seller === "0" &&
      search !== "0"
    ) {
      row = await conn.query(
        // "SELECT * FROM `product` JOIN productsculture ON product.pcId=productsculture.Id where nameEN LIKE ? OR nameFR LIKE ? OR nameAR LIKE ? OR loDesEN LIKE ? OR loDesFR LIKE ? OR loDesAR LIKE ? ",
        "SELECT product.productId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, c2.cat2EN AS category2EN,c2.cat2FR AS category2FR, c2.cat2AR AS category2AR, product.price,product.onSale,product.salePrice,product.reviews,product.img, product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN,productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,        productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,        productsculture.featuresAR FROM product        JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId         JOIN (SELECT categoryId,EN AS cat2EN,FR AS cat2FR,AR AS cat2AR FROM category JOIN culture on culture.ID = category.ccid) c2 ON c2.categoryId = product.categoryId_L2 JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId where nameEN LIKE ? OR nameFR LIKE ? OR nameAR LIKE ? OR loDesEN LIKE ? OR loDesFR LIKE ? OR loDesAR LIKE ?  UNION SELECT product.productId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, product.categoryId_L2 AS category2EN,product.categoryId_L2 AS category2FR, product.categoryId_L2 AS category2AR,product.price,product.onSale,product.salePrice,product.reviews,product.img,product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN, productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,productsculture.featuresAR FROM `product` JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId WHERE product.categoryId_L2=0 AND (nameEN LIKE ? OR nameFR LIKE ? OR nameAR LIKE ? OR loDesEN LIKE ? OR loDesFR LIKE ? OR loDesAR LIKE ?) ",

        [
          "%" + search + "%",
          "%" + search + "%",
          "%" + search + "%",
          "%" + search + "%",
          "%" + search + "%",
          "%" + search + "%",
          "%" + search + "%",
          "%" + search + "%",
          "%" + search + "%",
          "%" + search + "%",
          "%" + search + "%",
          "%" + search + "%",
        ]
      );
    }
    // ..................products  search by cat....................................................
    else if (
      id === "0" &&
      cat !== "0" &&
      cat2 === "0" &&
      sale === "0" &&
      seller === "0" &&
      search !== "0"
    ) {
      row = await conn.query(
        // "SELECT * FROM `product` JOIN productsculture ON product.pcId=productsculture.Id where `categoryId`=? AND (nameEN LIKE ? OR nameFR LIKE ? OR nameAR LIKE ? OR loDesEN LIKE ? OR loDesFR LIKE ? OR loDesAR LIKE ? )",
        "SELECT product.productId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, c2.cat2EN AS category2EN,c2.cat2FR AS category2FR, c2.cat2AR AS category2AR, product.price,product.onSale,product.salePrice,product.reviews,product.img, product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN,productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,        productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,        productsculture.featuresAR FROM product        JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId         JOIN (SELECT categoryId,EN AS cat2EN,FR AS cat2FR,AR AS cat2AR FROM category JOIN culture on culture.ID = category.ccid) c2 ON c2.categoryId = product.categoryId_L2 JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId where product.categoryId=? and (nameEN LIKE ? OR nameFR LIKE ? OR nameAR LIKE ? OR loDesEN LIKE ? OR loDesFR LIKE ? OR loDesAR LIKE ?)  UNION SELECT product.productId,c3.name as seller,product.sellerId,c1.catEN AS category1EN,c1.catFR AS category1FR, c1.catAR AS category1AR, product.categoryId_L2 AS category2EN,product.categoryId_L2 AS category2FR, product.categoryId_L2 AS category2AR,product.price,product.onSale,product.salePrice,product.reviews,product.img,product.img1,product.img2,product.img3,product.img4,product.qty,product.productcode,productsculture.nameEN, productsculture.nameFR,productsculture.nameAR,productsculture.appealEN,productsculture.appealFR,productsculture.appealAR,productsculture.loDesEN,productsculture.loDesFR,productsculture.loDesAR,productsculture.ingredientsEN, productsculture.ingredientsFR,productsculture.ingredientsAR,productsculture.featuresEN,productsculture.featuresFR,productsculture.featuresAR FROM `product` JOIN productsculture ON product.pcId=productsculture.Id  JOIN (SELECT categoryId,EN AS catEN,FR AS catFR,AR AS catAR FROM category JOIN culture on culture.ID = category.ccid) c1 ON c1.categoryId = product.categoryId JOIN (SELECT seller.sellerId,users.name from users join seller ON seller.userId = users.userId) c3 ON c3.sellerId =product.sellerId WHERE product.categoryId=? And product.categoryId_L2=0 AND (nameEN LIKE ? OR nameFR LIKE ? OR nameAR LIKE ? OR loDesEN LIKE ? OR loDesFR LIKE ? OR loDesAR LIKE ? )",

        [
          cat,
          "%" + search + "%",
          "%" + search + "%",
          "%" + search + "%",
          "%" + search + "%",
          "%" + search + "%",
          "%" + search + "%",
          cat,
          "%" + search + "%",
          "%" + search + "%",
          "%" + search + "%",
          "%" + search + "%",
          "%" + search + "%",
          "%" + search + "%",
        ]
      );
    }

    conn.end();
    return row;
  },

  // *******************Get a specific Product with id************************//
  getProductbyId: async function (key) {
    //key = tolowercase(trim(key));
    let conn = await db.getConnection();
    const row = await conn.query(
      "SELECT * FROM product JOIN productsculture ON product.pcId=productsculture.Id WHERE productId = ?",
      [key]
    );
    conn.end();
    return row;
  },
  // *******************Get a specific Product with category************************//
  getProductbycategory: async function (key) {
    //key = tolowercase(trim(key));
    let conn = await db.getConnection();
    const row = await conn.query(
      "SELECT * FROM `product` JOIN productsculture ON product.pcId=productsculture.Id where categoryId = ?",
      [key]
    );
    // const row = await conn.query("SELECT * FROM `product` JOIN productsculture ON product.pcId=productsculture.Id JOIN seller ON seller.sellerId=product.sellerId where categoryId = ?", [
    //   key,
    // ]);

    conn.end();
    return row;
  },
  // ****************Delete a specific Product************************//
  deleteProduct: async function (key) {
    //key = tolowercase(trim(key));
    let conn = await db.getConnection();
    const row = await conn.query(
      "DELETE FROM `mozaic`.`product` WHERE  `productId` = ?",
      [key]
    );
    conn.end();
    return row;
  },
  // *******************Add a new Product************************//
  addProduct: async function (
    price,
    onSale,
    salePrice,
    categoryId,
    sellerId,
    reviews,
    img,
    img1,
    img2,
    img3,
    img4,
    qty,
    productcode,
    pcId
  ) {
    let conn = await db.getConnection();

    try {
      const result = await conn.query(
        "INSERT INTO `mozaic`.`product` (`price`, `onSale`, `salePrice`, `categoryId`, `sellerId`,'reviews','img','img1','img2','img3','img4','qty','productcode','pcId') VALUES (?,?, ?, ?,?,?,?,?,?,?,?,?,?,?,?);",
        [
          price,
          onSale,
          salePrice,
          categoryId,
          sellerId,
          reviews,
          img,
          img1,
          img2,
          img3,
          img4,
          qty,
          productcode,
          pcId,
        ]
      );
      conn.end();
      return result;
    } catch (e) {
      return { error: e.message };
    }
  },
  //*************add culture product************************** */
  addCultureProduct: async function (
    nameEN,
    nameFR,
    nameAR,
    appealEN,
    appealFR,
    appealAR,
    loDesEN,
    loDesFR,
    loDesAR,
    ingredientsEN,
    ingredientsFR,
    ingredientsAR,
    featuresEN,
    featuresFR,
    featuresAR,
    price,
    onSale,
    salePrice,
    categoryId,
    categoryId2,
    categoryId3,
    sellerId,
    img,
    img1,
    img2,
    img3,
    img4,
    qty
  ) {
    let conn = await db.getConnection();
    console.log("Welcom");
    try {
      const result = await conn.query(
        "INSERT INTO `mozaic`.`productsculture` (`nameEN`, `nameFR`, `nameAR`, `appealEN`, `appealFR`, `appealAR`, `loDesEN`, `loDesFR`, `loDesAR`, `ingredientsEN`, `ingredientsFR`, `ingredientsAR`, `featuresEN`, `featuresFR`, `featuresAR`) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;",
        [
          nameEN,
          nameFR,
          nameAR,
          appealEN,
          appealFR,
          appealAR,
          loDesEN,
          loDesFR,
          loDesAR,
          ingredientsEN,
          ingredientsFR,
          ingredientsAR,
          featuresEN,
          featuresFR,
          featuresAR,
        ]
      );
      console.log("by");

      let pcId = result.insertId;
      console.log(pcId);
      const result1 = await conn.query(
        // "INSERT INTO `mozaic`.`product` (`price`, `onSale`, `salePrice`, `categoryId`, categoryId_L2,categoryId_L3,`sellerId`,'img','img1','img2','img3','img4','qty','pcId') VALUES (?,?, ?, ?,?,?,?,?,?,?,?,?,?,?);",
        "INSERT INTO `mozaic`.`product` ( `price`,onSale, `salePrice`, `categoryId`, `categoryId_L2`, `categoryId_L3`, `sellerId`, `img`, `img1`, `img2`, `img3`, `img4`, `qty`, `pcId`) VALUES (?,?, ?, ?,?,?,?,?,?,?,?,?,?,?);",
        [
          price,
          onSale,
          salePrice,
          categoryId,
          categoryId2,
          categoryId3,
          sellerId,
          img,
          img1,
          img2,
          img3,
          img4,
          qty,
          pcId,
        ]
      );
      console.log(result1);
      return result1;
      await conn.end();

      return { InsertedId: result.insertId };
    } catch (e) {
      return { error: e.message };
    }
  },
  //*************add culture product************************** */
  editCultureProduct: async function (
    productId,
    pcId,
    nameEN,
    nameFR,
    nameAR,
    appealEN,
    appealFR,
    appealAR,
    loDesEN,
    loDesFR,
    loDesAR,
    ingredientsEN,
    ingredientsFR,
    ingredientsAR,
    featuresEN,
    featuresFR,
    featuresAR,
    price,
    onSale,
    salePrice,
    categoryId,
    categoryId2,
    categoryId3,
    sellerId,
    img,
    img1,
    img2,
    img3,
    img4,
    qty
  ) {
    let conn = await db.getConnection();
    console.log("Welcom");
    try {
      const result = await conn.query(
        "UPDATE `mozaic`.`productsculture` SET `nameEN`=?, `nameFR`=?, `nameAR`=?, `appealEN`=?, `appealFR`=?, `appealAR`=?, `loDesEN`=?, `loDesFR`=?, `loDesAR`=?, `ingredientsEN`=?, `ingredientsFR`=?, `ingredientsAR`=?, `featuresEN`=?, `featuresFR`=?, `featuresAR`=? WHere Id =? ;",
        [
          nameEN,
          nameFR,
          nameAR,
          appealEN,
          appealFR,
          appealAR,
          loDesEN,
          loDesFR,
          loDesAR,
          ingredientsEN,
          ingredientsFR,
          ingredientsAR,
          featuresEN,
          featuresFR,
          featuresAR,
          pcId
        ]
      );

      const result1 = await conn.query(
        // "INSERT INTO `mozaic`.`product` (`price`, `onSale`, `salePrice`, `categoryId`, categoryId_L2,categoryId_L3,`sellerId`,'img','img1','img2','img3','img4','qty','pcId') VALUES (?,?, ?, ?,?,?,?,?,?,?,?,?,?,?);",
        "UPDATE `mozaic`.`product` SET `price`=?,onSale=?, `salePrice`=?, `categoryId`=?, `categoryId_L2`=?, `categoryId_L3`=?, `sellerId`=?, `img`=?, `img1`=?, `img2`=?, `img3`=?, `img4`=?, `qty`=? where`pcId`=? and productId=?",
        [
          price,
          onSale,
          salePrice,
          categoryId,
          categoryId2,
          categoryId3,
          sellerId,
          img,
          img1,
          img2,
          img3,
          img4,
          qty,
          pcId,
          productId
        ]
      );
      console.log(result1);
      return result1;
      await conn.end();
    } catch (e) {
      return { error: e.message };
    }
  },
  // *******************Edit a specific Product************************//
  editProduct: async function (
    productId,
    price,
    onSale,
    salePrice,
    categoryId,
    sellerId,
    reviews,
    img,
    img1,
    img2,
    img3,
    img4,
    qty,
    productcode,
    pcId
  ) {
    let conn = await db.getConnection();

    try {
      const result = await conn.query(
        "UPDATE `mozaic`.`product` SET `price`=?, `onSale`=?, `salePrice`=?, `categoryId`=?, `sellerId`=?,'reviews'=?,'img'=?,'img1'=?,'img2'=?,'img3'=?,'img4'=?,'qty'=?,'productcode'=?,'pcId'=? WHERE  `productId` = ? ;",
        [
          price,
          onSale,
          salePrice,
          categoryId,
          sellerId,
          reviews,
          img,
          img1,
          img2,
          img3,
          img4,
          qty,
          productcode,
          pcId,
          productId,
        ]
      );
      conn.end();
      return result;
    } catch (e) {
      return { error: e.message };
    }
  },
  // *******************Get All users************************//
  getUsers: async function (key) {
    let conn = await db.getConnection();
    const row = await conn.query("SELECT * FROM users", []);
    conn.end();
    return row;
  },
  // *******************Get a specific user by id************************//
  getUserbyId: async function (key) {
    //key = tolowercase(trim(key));
    let conn = await db.getConnection();
    const row = await conn.query("SELECT * FROM users WHERE userId = ?", [key]);
    conn.end();
    return row;
  },
  //**************** */
  getUserbyUP: async function (username, password) {
    let connection = await db.getConnection();
    const rows = await connection.query(
      "SELECT userId, username FROM `user` WHERE `username` = ? AND `password` = ? LIMIT 1",
      [username, password]
    );
    if (rows.length > 0) {
      return { user: rows[0] };
    }
    return { user: null };
  },
  // ****************Delete a specific user************************//
  deleteUser: async function (key) {
    //key = tolowercase(trim(key));
    let conn = await db.getConnection();
    const row = await conn.query(
      "DELETE FROM `mozaic`.`users` WHERE  `userId` = ?",
      [key]
    );
    conn.end();
    return row;
  },
  // *******************Add a new user************************//
  addUser: async function (
    username,
    passHash,
    cookieHash,
    name,
    email,
    role,
    phone,
    addressId
  ) {
    let conn = await db.getConnection();

    try {
      const result = await conn.query(
        "INSERT INTO `mozaic`.`users` (`username`, `passHash`, `cookieHash`, `name`, `email`,`role`, `phone`, `addressId`) VALUES (?,?, ?, ?,?,?,?,?);",
        [username, passHash, cookieHash, name, email, role, phone, addressId]
      );
      conn.end();
      return result;
    } catch (e) {
      return { error: e.message };
    }
  },
  // *******************Edit a specific user************************//
  editUser: async function (
    username,
    passHash,
    cookieHash,
    name,
    email,
    role,
    phone,
    addressId
  ) {
    let conn = await db.getConnection();

    try {
      const result = await conn.query(
        "UPDATE `mozaic`.`users` SET `username`=?, `passHash`=?, `cookieHash`=?, `name`=?, `email`=?, `role`=?, `phone`=?, `addressId`=? WHERE  `userId` = ? ;",
        [username, passHash, cookieHash, name, email, role, phone, addressId]
      );
      conn.end();
      return result;
    } catch (e) {
      return { error: e.message };
    }
  },
  // *******************Get All sellers************************//
  getSellers: async function (key) {
    let conn = await db.getConnection();
    const row = await conn.query("SELECT * FROM seller", []);
    conn.end();
    return row;
  },
  // *******************Get a specific seller************************//
  getSeller: async function (key) {
    //key = tolowercase(trim(key));
    let conn = await db.getConnection();
    const row = await conn.query("SELECT * FROM seller WHERE sellerId = ?", [
      key,
    ]);
    conn.end();
    return row;
  },
  // ****************Delete a specific seller************************//
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
  // *******************Add a new seller************************//
  addSeller: async function (name, addressId, img, logo, rev) {
    let conn = await db.getConnection();

    try {
      const result = await conn.query(
        "INSERT INTO `mozaic`.`seller` (`name`, `addressId`, `img`, `logo`, `rev`) VALUES (?,?, ?, ?,?);",
        [name, addressId, img, logo, rev]
      );
      conn.end();
      return result;
    } catch (e) {
      return { error: e.message };
    }
  },
  // *******************Edit a specific seller************************//
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

  //*******************************get gategory**************************************** */
  getCategorys: async function (key) {
    let conn = await db.getConnection();
    let CatL1 = [];

    const row = await conn.query(
      "SELECT * FROM category JOIN culture ON culture.ID=category.ccid JOIN main_menu ON main_menu.titleCid=category.ccid",
      []
    );
    row.map(async (element) => {
      let CatL2 = [];

      const row1 = await conn.query(
        "SELECT EN,categoryId FROM category JOIN culture ON culture.ID=category.ccid JOIN sub_menu ON sub_menu.titleCid=category.ccid WHERE pageId=?  ",
        [element["pageId"]]
      );
      row1.map(async (ele) => {
        CatL2.push({
          Lev1: ele["EN"],
          CategoryId: ele["categoryId"],
          Lev2: [],
        });
      });

      CatL1.push({
        Lev1: element["EN"],
        CategoryId: element["categoryId"],
        Lev2: CatL2,
        // Lev2: Object.assign({}, CatL2),
      });
    });
    await conn.end();
    return CatL1;
  },
};

//***********Sort*********** */
function dynamicsort(property, order) {
  var sort_order = 1;
  if (order === "desc") {
    sort_order = -1;
  }
  return function (a, b) {
    // a should come before b in the sorted order
    if (a[property] < b[property]) {
      return -1 * sort_order;
      // a should come after b in the sorted order
    } else if (a[property] > b[property]) {
      return 1 * sort_order;
      // a and b are the same
    } else {
      return 0 * sort_order;
    }
  };
}

// Comparing based on the property id
function compare_id(a, b) {
  // a should come before b in the sorted order
  if (a.id < b.id) {
    return -1;
    // a should come after b in the sorted order
  } else if (a.id > b.id) {
    return 1;
    // and and b are the same
  } else {
    return 0;
  }
}
//*************Creating a Dynamic Sorting Function*********** */
function compareValues(key, order = "asc") {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
}
