// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

let inquirer = require('inquirer');
let mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'tngtng',
  database: 'bamazon'
});

let spaces = [
  //id
  10,
  //name
  30,
  //department
  30,
  //price
  10,
  //quantity
  10,
]

function makeSpaces(element, index) {
  str = ''

  element = String(element);
  n = spaces[index] - element.length;

  for (let i = 0; i < n; i++) {
    str += '.';
  }
  return str;
}

function transact(transaction) {
  let query = "UPDATE products SET stock_quantity=? where item_id=?";
  console.log(parseInt(transaction.stock_quantity), parseInt(transaction.id))
  connection.query(query, [parseInt(transaction.stock_quantity), parseInt(transaction.id)], function (err, res) {

    if (err) {
      throw err;
      connection.end();
    }

  });

  console.log(`
Transaction confirmed...
You updated the stock of ${transaction.name} to ${transaction.purchase_quantity}.
  `);

  setTimeout(function () {
    console.log(`Recalculating inventory...
    `)
  }, 500)

  setTimeout(function () {

    inquirer.prompt([
      {
        name: "continue",
        type: "list",
        choices: ["Yes, continue.", "No, exit."],
        message: "Continue to main menu?",
      }]).then(function (answers) {
        if (answers.continue == "No, exit.") {
          console.log(`
Exiting inventory system...`);
          connection.end();
        } else {
          menu();
        }

      })

  }, 1000);
}

function addItem(){
  
}

function addQuantity(inventory) {
  let index = '';

  inquirer.prompt([
    {
      name: "id",
      type: "input",
      message: "Adjust inventory for which item? (Enter item_id)",
      validate: function (entry) {

        if (inventory.item_id.indexOf(parseInt(entry)) > -1) {
          index = inventory.item_id.indexOf(parseInt(entry));
          return true;
        } else {
          console.log(` !!! That item id isn't in the inventory`);
          return false;
        }

      }
    },
    {
      name: "quantity",
      type: "input",
      message: `Enter new inventory:`,
      validate: function (entry) {

        let err = ` !!! Enter a numeric value`

        //check if num
        if (!entry.match(/[0-9]/)) {
          console.log(err);
          return false;
        } else {
          if (entry < 0) {
            console.log(" !!! Negative inventory?? Try again :^)");
            return false;
          } else {
            return true;
          }
        }
      }
    }
  ]).then(answers => {

    let transaction = {
      id: answers.id,
      stock_quantity: answers.quantity,
      unit_cost: inventory.unit_cost[index],
      name: inventory.name[index]
    }

    transact(transaction);

  });

}

function showInventory(query, option) {

  let inventory = {
    item_id: [],
    stock_quantity: [],
    unit_cost: [],
    name: []
  }

  if (!connection._connectCalled) {
    connection.connect();
  }

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.log(`
ITEM_ID ${makeSpaces("item_id", 0)} PRODUCT_NAME ${makeSpaces("product_name", 1)} DEPARTMENT_NAME ${makeSpaces("department_name", 2)} PRICE ${makeSpaces("price", 3)} QUANTITY ${makeSpaces("quantity", 4)}`)

    res.forEach(row => {

      inventory.item_id.push(parseInt(row.item_id));
      inventory.stock_quantity.push(parseInt(row.stock_quantity));
      inventory.unit_cost.push(parseFloat(row.price));
      inventory.name.push(row.product_name);

      console.log(`${row.item_id} ${makeSpaces(row.item_id, 0)} ${row.product_name} ${makeSpaces(row.product_name, 1)} ${row.department_name} ${makeSpaces(row.department_name, 2)} ${row.price} ${makeSpaces(row.price, 3)} ${row.stock_quantity} ${makeSpaces(row.stock_quantity, 4)}`);

    });

  });

  if (option === "") {
    setTimeout(function () {
      menu();
    }, 500);
  } else if (option === "add quantity") {
    addQuantity(inventory);
  } else if (option === "add item") {
    addItem();
  } else {
    //nuthin
  }

}

function exit() {
  inquirer.prompt([
    {
      name: "continue",
      type: "list",
      choices: ["Yes, continue.", "No, exit."],
      message: "Make another purchase?",
    }]).then(function (answers) {
      if (answers.continue == "No, exit.") {
        console.log(`
Exiting inventory system...`);
        connection.end();
      } else {
        start();
      }

    })
}

function menu() {

  console.log('');
  inquirer.prompt([
    {
      name: "menu",
      type: "list",
      message: "Choose function:",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
  ]).then(function (answers) {

    let query = "SELECT * FROM products";
    let option = '';

    switch (answers.menu) {
      case "View Products for Sale":
        break;

      case "View Low Inventory":
        query = "SELECT * FROM products WHERE stock_quantity < 5";
        showInventory(query, "");
        break;

      case "Add to Inventory":
        option = "add quantity";
        break;

      case "Add New Product":
        option = "add item";
        break;

      default:
        break;

    }

    showInventory(query, option);

  })

}

menu();