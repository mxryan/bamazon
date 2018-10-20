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
    options();
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
    options();
  })
}

function addInventory(id, quant) {
  // increase the quantity of an item in inventory
  let queryString = "SELECT * FROM products WHERE item_id = ?"
  db.query(queryString, [id], (err, res) => {
    if (err) throw err;
    quant = parseInt(quant);
    quant += parseInt(res[0].quantity);
    queryString = "UPDATE products SET quantity = ? WHERE item_id = ?";
    db.query(queryString, [quant, id], (err, res) => {
      if (err) throw err;
      console.log("Success! Inventory added.")
      options();
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
    options();
  });
}

function askAddInventory() {
  inq.prompt([{
    name: "itemId",
    type: "input",
    message: "ID of item: ",
    validate: (val) => !isNaN(parseInt(val))
  }, {
    name: "quantity",
    type: "input",
    message: "Quantity?:",
    validate: (val) => !isNaN(parseInt(val))
  }]).then((ans) => {
    addInventory(ans.itemId, ans.quantity);
  });
}

function askAddNewProduct() {
  inq.prompt([{
    type: "input",
    name: "item",
    message: "What is the name of the item?"
  }, {
    type: "input",
    name: "department",
    message: "What department?"
  }, {
    type: "input",
    name: "price",
    message: "What is the cost of the item?",
    validate: ans => !isNaN(parseFloat(ans))
  }, {
    type: "input",
    name: "quantity",
    message: "How many units?",
    validate: ans => !isNaN(parseInt(ans))
  }]).then((ans) => {
    // item, department, price, quant
    addNewProduct(ans.item, ans.department, ans.price, ans.quantity);
  });
}

function options() {
  inq.prompt({
    type: "list",
    name: "choice",
    message: "Please select an option",
    choices: [
      "View All Products",
      "View Low Inventory",
      "Add to Inventory",
      "Add a New Product",
      "Exit"
    ]
  }).then((ans) => {
    console.log(ans);
    switch (ans.choice.toLowerCase()) {
      case "view all products":
        viewProducts();
        break;
      case "view low inventory":
        viewLowInventory();
        break;
      case "add to inventory":
        askAddInventory();
        break;
      case "add a new product":
        askAddNewProduct();
        break;
      case "exit":
        db.end();
        break;
    }
  });
}
options();