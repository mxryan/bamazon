//todo: recieve and handle customer input, allow exit by 0?

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
  db.connect((err)=>{
    if (err) throw err;
    console.log("connected");
    displayAll();
    
  })
}

// make initial display function

function displayAll(){
  db.query("SELECT * FROM products", (err, res)=>{
    const data =[["Item ID", "Product Name", "Department", "Price", "Quantity"]];
    for (let i = 0; i < res.length; i++){
      data.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].quantity]);
    }
    const out = table.table(data);
    console.log(out);
    db.end();
  });
}


// make inquirer interface
function customerPurchasePrompt() {
  inq.prompt([
    {
      name: "itemId",
      type: "input",
      message: "ID of the item you wish to buy: ",
      validate: (val) => !isNaN(parseInt(val))
    }
  ])
}

console.log("hello");
console.log(parseInt("3.4"));
start();