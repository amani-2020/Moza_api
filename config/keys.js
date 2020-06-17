// put in your db connection settings and rename to 'keys.js'
let dbconn = {};
if (process.env.PORT) {
  dbconn = {
    host: "localhost",
    user: "root",
    password: "",
    connectionLimit: 5,
    database: "Mozaic",
  };
} else {
  dbconn = {
    host: "localhost",
    user: "root",
    password: "",
    connectionLimit: 5,
    database: "Mozaic",
  };
}
module.exports = dbconn;
