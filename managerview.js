const mysql = require("mysql");
const inq = require("inquirer");
const table = require("table");
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

function addCommasToNum(num) {
  //converts 2139447.77 to 2,139,447.77
}

function viewProducts() {
  // should list every available item
  db.query("SELECT * FROM products", (err, res) => {
    if (err) throw err;
    const data = [
      ["Item ID", "Product Name", "Department", "Price", "Quantity"]
    ];
    for (let i = 0; i < res.length; i++) {
      data.push([
        res[i].item_id, res[i].product_name, res[i].department_name,
        res[i].price, res[i].quantity
      ]);
    }
    const out = table.table(data);
    console.log(out);
  })
}

function viewLowInventory() {
  // show every item where count is lower than 5
  db.query("SELECT * FROM products WHERE quantity < 5", (err, res) => {
    if (err) throw err;
    const data = [
      ["Item ID", "Product Name", "Department", "Price", "Quantity"]
    ];
    for (let i = 0; i < res.length; i++) {
      data.push([
        res[i].item_id, res[i].product_name, res[i].department_name,
        res[i].price, res[i].quantity
      ]);
    }
    const out = table.table(data);
    console.log(out);
  })
}

function addInventory(id, quant) {
  // increase the quantity of an item in inventory
  // **need to get CURRENT quant and add desired amount to it**
  let queryString ="SELECT quantity FROM products WHERE item_id = ?"
  db.query(queryString, [id], (err, res) => {
    if (err) throw err;
    quant += res[0].quantity;
    queryString = "UPDATE products SET quantity = ? WHERE item_id = ?";
    db.query(queryString, [quant, id], (err) => {
      if (err) throw err;
    });
  })

}

function addNewProduct(item, department, price, quant) {
  // adds a completely new product to store
  const queryString = "INSERT INTO products " +
    "(product_name, department_name, price, quantity) " +
    "VALUES (?, ?, ?, ?)";
  db.query(queryString, [item, department, price, quant], (err) => {
    if (err) throw err;
  });
}
addInventory(13, 100);
