//todo: recieve and handle customer input, allow exit by 0, handle main exit conditions

// requires
const mysql = require("mysql");
const inq = require("inquirer");
const table = require("table");
console.log(table);

// setup db
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
})

function start() {
  db.connect((err) => {
    if (err) throw err;
    console.log("connected");
    displayAll();

  })
}

// make initial display function

function displayAll() {
  db.query("SELECT * FROM products", (err, res) => {
    const data = [
      ["Item ID", "Product Name", "Department", "Price", "Quantity"]
    ];
    for (let i = 0; i < res.length; i++) {
      data.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].quantity]);
    }
    const out = table.table(data);
    console.log(out);
    customerPurchasePrompt();

  });
}


// make inquirer interface
function customerPurchasePrompt() {
  inq.prompt([{
    name: "itemId",
    type: "input",
    message: "ID of the item you wish to buy: ",
    validate: (val) => !isNaN(parseInt(val))
  }, {
    name: "quantity",
    type: "input",
    message: "Quantity?:",
    validate: (val) => !isNaN(parseInt(val))
  }]).then((ans) => {
    // check if there is enough quantity
    db.query(
      "SELECT * FROM products WHERE item_id = ?",
      [ans.itemId],
      (err, res) => {
        if (err) throw err;
        if (res[0].quantity < ans.quantity) {
          // not enough to fulfill order
          console.log("Sorry, we don't have enough supply to fulfill your order");
          restartPrompt();
        } else {
          // update quantity in database
          updateQuantity(ans.itemId, res[0].quantity - ans.quantity);
          
          console.log(`
          ---------------------------------
          Thank you. Your toal is: $${(res[0].price * ans.quantity).toFixed(2)}
          ---------------------------------
          `);
          restartPrompt();
        }
      });
  })
}

function updateQuantity(id, newVal) {
  db.query(
    "UPDATE products SET quantity = ? WHERE item_id = ?",
    [newVal, id],
    (err) => {
      if (err) throw err;
    }
  );
}

function restartPrompt() {
  inq.prompt({
    type: "input",
    name: "response",
    message: "Would you like to begin again? (y/n)",
    validate: ans => ans === 'y' || ans === 'n'
  }).then((ans) => {
    ans.response == 'y' ? displayAll() : db.end();
  })
}

start();