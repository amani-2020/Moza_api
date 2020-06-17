const db = require("../config/db");

module.exports = {
  //*******************get mainmenu*********************** */
  getMainMenu: async function () {
    var items = [];
    var EN = [];
    var FR = [];
    var AR = [];
    // var item=[];
    let conn = await db.getConnection();
    const row = await conn.query(
      "SELECT * FROM main_menu join culture ON main_menu.titleCid=culture.ID WHERE main_menu.shownInMenu",
      []
    );
    row.map(async (element) => {
      EN.push({
        name: element["EN"],
        link: element["pageKey"],
        subItem: element["submenu"],
        id: element["pageId"],
        // 'sitems': item
      });
      FR.push({
        name: element["FR"],
        link: element["pageKey"],
        subItem: element["submenu"],
        id: element["pageId"],
        // 'sitems': item
      });
      AR.push({
        name: element["AR"],
        link: element["pageKey"],
        subItem: element["submenu"],
        id: element["pageId"],
        // 'sitems': item
      });
    });
    items.push({
      en: { mMenu: EN },
      fr: { mMenu: FR },
      ar: { mMenu: AR },
    });
    conn.end();
    // return items;
    return Object.assign({}, items);
  },
  //*******************get submenu*********************** */
  getSubMenu: async function () {
    var items = [];
    var item = [];
    let conn = await db.getConnection();
    const row = await conn.query(
      "SELECT * FROM sub_menu join culture ON sub_menu.titleCid=culture.ID  where shown=1 ",
      []
    );

    row.map(async (el) => {
      // console.log(el['EN']);
      item.push({
        name: el["EN"],
        link: el["sub_page_key"],
        id: el["pageId"],
      });
    });
    conn.end();
    return item;
  },
  //*******************get submenu1*********************** */
  getSubMenu1: async function (key) {
    var items = [];
    var item = [];
    let status = {};
    let conn = await db.getConnection();
    const row = await conn.query(
      "SELECT * FROM sub_menu join culture ON sub_menu.titleCid=culture.ID  where pageId=? and shown=1 ",
      [key]
    );

    row.map(async (el) => {
      // console.log(el['EN']);
      item.push({
        name: el["EN"],
        link: el["sub_page_key"],
        id: el["pageId"],
      });
    });
    status.item = item;
    status.conn = await conn.end();
    return status;
  },

  //*******************get menu test*********************** */
  getMenu: async function (key) {
    var items = [];
    var item = [];

    items = await this.getMainMenu();
    //  console.log(items[0]['en']['mMenu']);
    items[0]["en"]["mMenu"].forEach(async (e) => {
      item.push(await this.getSubMenu1(e["id"]));
    });

    console.log(item);

    return item;
  },
  // *******************Get Menu************************//
  getMenus: async function () {
    var items = [];
    var item = [];
    var EN = [];
    var FR = [];
    var AR = [];

    let conn = await db.getConnection();
    const row = await conn.query(
      "SELECT * FROM main_menu join culture ON main_menu.titleCid=culture.ID WHERE main_menu.shownInMenu order by pageId ",
      []
    );
    row.map(async (element) => {
      var ENi = [];
      var FRi = [];
      var ARi = [];
      //console.log(element['submenu'] === 1, element['pageId'],element['EN']);
      /**********if there is subItem************ */
      if (element["submenu"] === 1) {
        /**********if there is subItem************ */
        const row1 = await conn.query(
          "SELECT * FROM sub_menu join culture ON sub_menu.titleCid=culture.ID  where pageId=? and shown=1 ",
          [element["pageId"]]
        );
        row1.map((el) => {
          ENi.push({
            name: el["EN"],
            link: el["sub_page_key"],
          });
          FRi.push({
            name: el["FR"],
            link: el["sub_page_key"],
          });
          ARi.push({
            name: el["AR"],
            link: el["sub_page_key"],
          });
        });
        EN.push({
          id: element["pageId"],
          name: element["EN"],
          link: element["pageKey"],
          subItem: element["submenu"],
          sItems: ENi,
        });
        FR.push({
          id: element["pageId"],
          name: element["FR"],
          link: element["pageKey"],
          subItem: element["submenu"],
          sItems: FRi,
        });
        AR.push({
          id: element["pageId"],
          name: element["AR"],
          link: element["pageKey"],
          subItem: element["submenu"],
          sItems: ARi,
        });
        console.log(items);
      } else {
        EN.push({
          id: element["pageId"],
          name: element["EN"],
          link: element["pageKey"],
          subItem: element["submenu"],
          sItems: [],
        });
        FR.push({
          id: element["pageId"],
          name: element["FR"],
          link: element["pageKey"],
          subItem: element["submenu"],
          sItems: [],
        });
        AR.push({
          id: element["pageId"],
          name: element["AR"],
          link: element["pageKey"],
          subItem: element["submenu"],
          sItems: [],
        });
      }
    });
    const row2 = await conn.query("SELECT * FROM culture;", []);
    var culEN = [];
    var culFR = [];
    var culAR = [];
    row2.map(async (cul) => {
      culEN.push({
        ID: cul["ID"],
        Label: cul["EN"],
      });
      culFR.push({
        ID: cul["ID"],
        Label: cul["FR"],
      });
      culAR.push({
        ID: cul["ID"],
        Label: cul["AR"],
      });
    });

    const row3 = await conn.query(
      "SELECT * FROM `mozaic`.`shipmentmethods`JOIN culture ON culture.ID=shipmentmethods.cId;",
      []
    );
    var shipEN = [];
    var shipFR = [];
    var shipAR = [];
    row3.map(async (ship) => {
      shipEN.push({
        ID: ship["Id"],
        RegularCost: ship["RegCost"],
        DiscountLimit: ship["DiscountLimit"],
        DiscountedCost: ship["DiscountedCost"],
        Descreption: ship["EN"],
      });

      shipFR.push({
        ID: ship["Id"],
        RegularCost: ship["RegCost"],
        DiscountLimit: ship["DiscountLimit"],
        DiscountedCost: ship["DiscountedCost"],
        Descreption: ship["FR"],
      });

      shipAR.push({
        ID: ship["Id"],
        RegularCost: ship["RegCost"],
        DiscountLimit: ship["DiscountLimit"],
        DiscountedCost: ship["DiscountedCost"],
        Descreption: ship["AR"],
      });
    });

    await conn.end();

    items.push({
      en: {
        mMenu: EN.sort(compareValues("id")),
        culture: Object.assign({},culEN),
        shipment: shipEN,
      },
      fr: {
        mMenu: FR.sort(compareValues("id")),
        culture:  Object.assign({},culFR),
        shipment: shipFR,
      },
      ar: {
        mMenu: AR.sort(compareValues("id")),
        culture: Object.assign({}, culAR),
        shipment: shipAR,
      },
    });
    //items.dynamicsort('id','asc')
    return items;
  },

  // *******************Get Menu************************//
  getMenus1: async function () {
    var items = [];
    var item = [];
    var EN = [];
    var FR = [];
    var AR = [];
    let conn = await db.getConnection();
    const row = await conn.query(
      "SELECT * FROM main_menu join culture ON main_menu.titleCid=culture.ID WHERE main_menu.shownInMenu",
      []
    );
    row.map(async (element) => {
      //console.log(element['submenu'] === 1, element['pageId'],element['EN']);
      if (element["submenu"] === 1) {
        const row1 = await conn.query(
          "SELECT * FROM sub_menu join culture ON sub_menu.titleCid=culture.ID  where pageId=? and shown=1 ",
          [element["pageId"]]
        );
        row1.map((el) => {
          item.push({
            name: el["EN"],
            link: el["sub_page_key"],
          });
        });
        items.push({
          name: element["EN"],
          link: element["pageKey"],
          sitems: item,
        });
        console.log(items);
      } else {
        items.push({
          name: element["EN"],
          link: element["pageKey"],
        });
      }
    });
    await conn.end();
    return items;
  },
};

//**********************************Sort************************************************************ */

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
