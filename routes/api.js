var express = require("express");
var router = express.Router();
// var cors = require("cors");
var multer = require("multer");
const path = require('path');
const mydb = require("../model/productModel");
const mydb1 = require("../model/MenuModel");
const userdb = require("../model/userModel");
const mydb2 = require("../model/sellerModel");
require("dotenv/config");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });
router.get('/', (req, res) => res.render('index1'));
router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('index1', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('index1', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('index1', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});
//************************upload Image*************************************** */
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./public/img/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("myImage");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('index1', {
        msg: err
      });
      console.log(err);
    } else {
      if (req.file == undefined) {
        res.render('index1', {
          msg: 'Error: No File Selected!'
        });
        console.log("Error: No File Selected!");
      } else {
        res.render('index1', {
          msg: 'File Uploaded!',
          file: `img/${req.file.filename}`
        });
        let file = `img/${req.file.filename}`;
        console.log(req.file.filename);
      }
    }
  });
});

/*********get seller by ID********************************** */
router.get("/seller/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ Msg: "Not complete" });
  } else {
    res.send(await mydb2.getSeller(req.params.id));
  }
});
/********************get productby ID******************* */
router.get("/p/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await mydb.getProductbyId(req.params.id);
  if (product[0]) {
    res.send(product[0]);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
});
/********************get product by category******************* */
router.get("/p/:c", async (req, res) => {
  // console.log(req.params);
  res.send(await mydb.getProductbycategory(req.params.c));
});

//*************get product by all options*********************** */
//..../p?id=1&cat=2&cat1=1&sale=1&sel=1&search=11
router.get("/p", async (req, res) => {
  for (const key in req.query) {
    console.log(key, req.query[key]);
  }
  const result = await mydb.getProductsbyAll(
    req.query.id !== undefined ? req.query.id : "0",
    req.query.cat !== undefined ? req.query.cat : "0",
    req.query.cat2 !== undefined ? req.query.cat2 : "0",
    req.query.sale !== undefined ? req.query.sale : "0",
    req.query.sel !== undefined ? req.query.sel : "0",
    req.query.search !== undefined ? req.query.search : "0"
  );
  if (result === undefined || result.length == 0) {
    res.json("There is no data for this query");
  } else {
    res.json(result);
  }
});

/************get main menu ,culture table and shipmentMethods ***************** */
router.get("/sys", async (req, res, next) => {
  try {
    res.json(await mydb1.getMenus());
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// router.get("/env", async (req, res) => {
//   res.send(process.env.a);
// });

/************register new user***************** */
router.post("/reg", async (req, res) => {
  let d = req.body;
  console.log(d);
  if (
    !req.body.passHash ||
    !req.body.name ||
    !req.body.email ||
    !req.body.phone ||
    !req.body.role
  ) {
    res.status(400).json({ Msg: "Not complete" });
  } else {
    res.json(
      await userdb.createUser(
        req.body.password,
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.role
      )
    );
  }
});

//******************register new client*********************** */
router.post("/registerC", async (req, res) => {
  let d = req.body;
  console.log(d);
  if (
    !req.body.password ||
    !req.body.name ||
    !req.body.email ||
    !req.body.phone
  ) {
    res.status(400).json({ Msg: "Not complete" });
  } else {
    let result = await userdb.isUser(req.body.email);
    // res.json(result);
    if (result[0]) {
      console.log(result[0]);
      res.json({
        msg: "User " + req.body.email + " already exists",
        status: false,
      });
    } else {
      res.json(
        await userdb.createUser1(
          req.body.name,
          req.body.email,
          req.body.password,
          "client",
          req.body.phone
        )
      );
    }
  }
});

//*****************sign in********************************** */
router.get("/signinHas", async (req, res) => {
  let d = req.body;
  console.log(d);
  if (!req.body.email || !req.body.passHash) {
    res.status(400).json({ Msg: "Not complete" });
  } else {
    //  res.json(await userdb.getAuthorizedWithPassword(req.body.username,req.body.passHash));

    res.json(
      await userdb.getAuthorizedWithHash(req.body.email, req.body.passHash)
    );
  }
});

/************get user by ID********************************** */
router.get("/user/:id", async (req, res) => {
  let d = req.params;
  console.log(d);
  if (!req.params.id) {
    res.status(400).json({ Msg: "Not complete" });
  } else {
    //  res.json(await userdb.getAuthorizedWithPassword(req.body.username,req.body.passHash));

    res.json(await userdb.getUser(req.params.id));
  }
});

/**********************sign in******************************* */
router.post("/signin", async (req, res) => {
  let d = req.body;
  console.log(d);
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ Msg: "Not complete" });
  } else {
    res.json(
      await userdb.getAuthorizedWithPassword(req.body.email, req.body.password)
    );
  }
});

/*****add to cart*************************************** */
router.post("/addtoCart", async (req, res, next) => {
  // if (req.user !== undefined && req.user.auth) {
  let d = req.body;
  console.log(d);
  if (!req.body.pId || !req.body.userId) {
    res.status(400).json({ Msg: "Not complete" });
  } else {
    res.json(await userdb.AddToCart(req.body.pId, req.body.userId));
  }
  // } else {
  //   next();
  // }
});

/***********get cart for user**************************** */
router.get("/cart/:id", async (req, res, next) => {
  // if (req.user !== undefined && req.user.auth) {

  if (!req.params.id) {
    res.status(400).json({ Msg: "Not complete" });
  } else {
    res.json(await userdb.getCart(req.params.id));
  }
  // } else {
  //   next();
  // }
});

/******************is user registeref********************* */
router.get("/isUser", async (req, res, next) => {
  // if (req.user !== undefined && req.user.auth) {

  if (!req.body.email) {
    res.status(400).json({ Msg: "Not complete" });
  } else {
    res.json(await userdb.isUser(req.body.email));
  }
  // } else {
  //   next();
  // }
});
/******************is user registeref********************* */
router.get("/isUser1", async (req, res, next) => {
  // if (req.user !== undefined && req.user.auth) {

  if (!req.body.userId) {
    res.status(400).json({ Msg: "Not complete" });
  } else {
    res.json(await userdb.isUserId(req.body.userId));
  }
  // } else {
  //   next();
  // }
});

//*******************edit user**************** */
router.post("/eUser/:id", async (req, res) => {
  if (
    !req.body.email ||
    !req.body.name ||
    !req.body.password ||
    !req.body.phone ||
    !req.params.id
  ) {
    res.status(400).json({ Msg: "Not complete" });
  } else {
    res.json(
      await userdb.editUser(
        req.params.id,
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.phone
      )
    );
  }
});

//**********add address*************** */
router.post("/addAddress", async (req, res, next) => {
  // if (req.user !== undefined && req.user.auth) {
  let d = req.body;
  console.log(d);

  if (
    !req.body.city ||
    !req.body.province ||
    !req.body.country ||
    !req.body.postalcode ||
    !req.body.streetName ||
    !req.body.streetNum ||
    !req.body.unitNum ||
    !req.body.userId ||
    !req.body.type
  ) {
    res.status(400).json({ Msg: "Not complete" });
  } else {
    res.json(
      await userdb.addAdress(
        req.body.city,
        req.body.country,
        req.body.postalcode,
        req.body.streetName,
        req.body.streetNum,
        req.body.unitNum,
        req.body.province,
        req.body.userId,
        req.body.type
      )
      // await userdb.isUserId(req.body.userId)
    );
  }
});

//********************add seller*************************** */
router.post("/addSell", async (req, res, next) => {
  // if (req.user !== undefined && req.user.auth) {
  let d = req.body;
  console.log(d);

  if (
    !req.body.city ||
    !req.body.province ||
    !req.body.country ||
    !req.body.postalcode ||
    !req.body.streetName ||
    !req.body.streetNum ||
    !req.body.unitNum ||
    !req.body.userId ||
    !req.body.type ||
    !req.body.email ||
    !req.body.passwordb
  ) {
    res.status(400).json({ Msg: "Not complete" });
  } else {
    res.json(
      await userdb.addSeller(
        req.body.city,
        req.body.country,
        req.body.postalcode,
        req.body.streetName,
        req.body.streetNum,
        req.body.unitNum,
        req.body.province,
        req.body.userId,
        req.body.type
      )
      // await userdb.isUserId(req.body.userId)
    );
  }
});

//*******************get addresses for user********************** */
router.get("/getAddress/:id", async (req, res, next) => {
  // if (req.user !== undefined && req.user.auth) {
  if (!req.params.id) {
    res.status(400).json({ Msg: "Not complete" });
  } else {
    res.json(await userdb.getAddresses(req.params.id));
  }
});
//****************log in seller********************** */
router.post("/seller/log", async (req, res) => {
  let d = req.body;
  console.log(d);
  if (!req.body.Email || !req.body.Password) {
    res.status(400).json({ Msg: "Not complete" });
  } else {
    res.json(await userdb.logSeller(req.body.Email, req.body.Password));
  }
});
//****************Category for desktop********************** */
router.get("/cat", async (req, res) => {
  res.json(await mydb.getCategorys());
});

/*****************add products for desktop************************************ */
router.post("/addPro", async (req, res, next) => {
  // if (req.user !== undefined && req.user.auth) {
  let d = req.body;
  console.log(d);

  if (
    req.body.CategoryId === "undefined" ||
    req.body.CategoryId_L2 === "undefined" ||
    req.body.CategoryId_L3 === "undefined" ||
    req.body.Img === "undefined" ||
    req.body.Img1 === "undefined" ||
    req.body.Img2 === "undefined" ||
    req.body.Img3 === "undefined" ||
    req.body.Img4 === "undefined" ||
    req.body.Price === "undefined" ||
    req.body.Qty === "undefined" ||
    req.body.OnSale === "undefined" ||
    req.body.SalePrice === "undefined" ||
    req.body.NameEN === "undefined" ||
    req.body.NameFR === "undefined" ||
    req.body.NameAR === "undefined" ||
    req.body.AppealEN === "undefined" ||
    req.body.AppealFR === "undefined" ||
    req.body.AppealAR === "undefined" ||
    req.body.LoDesEN === "undefined" ||
    req.body.LoDesFR === "undefined" ||
    req.body.LoDesAR === "undefined" ||
    req.body.IngredientsEN === "undefined" ||
    req.body.IngredientsFR === "undefined" ||
    req.body.IngredientsAR === "undefined" ||
    req.body.FeaturesEN === "undefined" ||
    req.body.FeaturesFR === "undefined" ||
    req.body.FeaturesAR === "undefined" ||
    req.body.SellerId === "undefined"
  ) {
    res.status(400).json({ Msg: "Not complete" });
  } else {
    console.log("okokokok");
    res.json(
      await mydb.addCultureProduct(
        req.body.NameEN,
        req.body.NameFR,
        req.body.NameAR,
        req.body.AppealEN,
        req.body.AppealFR,
        req.body.AppealAR,
        req.body.LoDesEN,
        req.body.LoDesFR,
        req.body.LoDesAR,
        req.body.IngredientsEN,
        req.body.IngredientsFR,
        req.body.IngredientsAR,
        req.body.FeaturesEN,
        req.body.FeaturesFR,
        req.body.FeaturesAR,
        req.body.Price,
        req.body.OnSale,
        req.body.SalePrice,
        req.body.CategoryId,
        req.body.CategoryId_L2,
        req.body.CategoryId_L3,
        req.body.SellerId,
        req.body.Img,
        req.body.Img1,
        req.body.Img2,
        req.body.Img3,
        req.body.Img4,
        req.body.Qty
      )
    );
  }
});
/*****************edit products for desktop************************************ */
router.post("/editPro", async (req, res, next) => {
  // if (req.user !== undefined && req.user.auth) {
  let d = req.body;
  console.log(d);

  if (
    req.body.CategoryId === "undefined" ||
    req.body.CategoryId_L2 === "undefined" ||
    req.body.CategoryId_L3 === "undefined" ||
    req.body.Img === "undefined" ||
    req.body.Img1 === "undefined" ||
    req.body.Img2 === "undefined" ||
    req.body.Img3 === "undefined" ||
    req.body.Img4 === "undefined" ||
    req.body.Price === "undefined" ||
    req.body.Qty === "undefined" ||
    req.body.OnSale === "undefined" ||
    req.body.SalePrice === "undefined" ||
    req.body.NameEN === "undefined" ||
    req.body.NameFR === "undefined" ||
    req.body.NameAR === "undefined" ||
    req.body.AppealEN === "undefined" ||
    req.body.AppealFR === "undefined" ||
    req.body.AppealAR === "undefined" ||
    req.body.LoDesEN === "undefined" ||
    req.body.LoDesFR === "undefined" ||
    req.body.LoDesAR === "undefined" ||
    req.body.IngredientsEN === "undefined" ||
    req.body.IngredientsFR === "undefined" ||
    req.body.IngredientsAR === "undefined" ||
    req.body.FeaturesEN === "undefined" ||
    req.body.FeaturesFR === "undefined" ||
    req.body.FeaturesAR === "undefined" ||
    req.body.SellerId === "undefined" ||
    req.body.productId === "undefined" ||
    req.body.PcId === "undefined"
  ) {
    res.status(400).json({ Msg: "Not complete" });
  } else {
    console.log("okokokok");
    res.json(
      await mydb.editCultureProduct(
        req.body.ProductId,
        req.body.PcId,
        req.body.NameEN,
        req.body.NameFR,
        req.body.NameAR,
        req.body.AppealEN,
        req.body.AppealFR,
        req.body.AppealAR,
        req.body.LoDesEN,
        req.body.LoDesFR,
        req.body.LoDesAR,
        req.body.IngredientsEN,
        req.body.IngredientsFR,
        req.body.IngredientsAR,
        req.body.FeaturesEN,
        req.body.FeaturesFR,
        req.body.FeaturesAR,
        req.body.Price,
        req.body.OnSale,
        req.body.SalePrice,
        req.body.CategoryId,
        req.body.CategoryId_L2,
        req.body.CategoryId_L3,
        req.body.SellerId,
        req.body.Img,
        req.body.Img1,
        req.body.Img2,
        req.body.Img3,
        req.body.Img4,
        req.body.Qty
      )
    );
  }
});

/*****************delete products for desktop************************************ */
router.post("/deletePro", async (req, res, next) => {
  // if (req.user !== undefined && req.user.auth) {
  let d = req.body;
  console.log(d);

  if (req.body.productId === "undefined") {
    res.status(400).json({ Msg: "Not complete" });
  } else {
    // console.log("okokokok");
    res.json(await mydb.deleteProduct(req.body.ProductId));
  }
});

//**********************upload Image********************* */
// var Storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, path.join(__dirname, "./Images/1.png"));
//   },

//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//   },
// });

// var upload = multer({
//     storage: Storage,
// }).array("imgUploader", 3); //Field name and max count array(fieldname[, maxCount])

// // router.get("/", function (req, res) {
// //   res.sendFile(__dirname + "/index.html");
// // });

// router.post("/Upload", function (req, res) {
//   console.log(req.file);
//   upload(req, res, function (err) {
//     if (err) {
//       return res.end("Something went wrong!");
//     }

//     return res.end("File uploaded sucessfully!.");
//   });
// });
///.......................................................................
// const handleError = (err, res) => {
//   res
//     .status(500)
//     .contentType("text/plain")
//     .end("Oops! Something went wrong!");
// };

// const upload = multer({
//   dest: "/Images"
//   // you might also want to set some limits: https://github.com/expressjs/multer#limits
// });

// router.post(
//   "/upload",
//   upload.single("file" /* name attribute of <file> element in your form */),
//   (req, res) => {
//     const tempPath = req.file.path;
//     const targetPath =  "/Images/1.jpg";

//     if (path.extname(req.file.originalname).toLowerCase() === ".png") {
//       fs.rename(tempPath, targetPath, err => {
//         if (err) return handleError(err, res);

//         res
//           .status(200)
//           .contentType("text/plain")
//           .end("File uploaded!");
//       });
//     } else {
//       fs.unlink(tempPath, err => {
//         if (err) return handleError(err, res);

//         res
//           .status(403)
//           .contentType("text/plain")
//           .end("Only .png files are allowed!");
//       });
//     }
//   }
// );

module.exports = router;
