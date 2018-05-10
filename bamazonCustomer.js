//// if so, update DB and show total cost

//OPTIONAL/BONUSES
//https://unc.bootcampcontent.com/UNC-Coding-Boot-Camp/UNCHILL201802FSF3-Class-Repository-FSF/blob/master/homework/12-mysql/homework_instructions.md

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

function mkSp(element, index) {
  str = ''

  element = String(element);
  n = spaces[index] - element.length;

  for (let i = 0; i < n; i++) {
    str += '.';
  }
  return str;
}

///first, ask ID of product want to buy
///second, how many units

function transact(transaction) {
  
  let query = "UPDATE products SET stock_quantity=? where item_id=?";
  let newQuantity = parseInt(transaction.stock_quantity) - parseInt((transaction.purchase_quantity));
  let cost = parseInt(transaction.purchase_quantity) * parseFloat(transaction.unit_cost);

  connection.query(query, [newQuantity,parseInt(transaction.id)], function (err, res) {

    if (err) throw err;

    connection.end();

  });

  console.log(`
Transaction confirmed...
You purchased ${transaction.purchase_quantity} ${transaction.name}(s) for ${cost}.`)

  //start();
}

function query(inventory) {

  let index = '';

  inquirer.prompt([
    {
      name: "id",
      type: "input",
      message: "Which item do you want to purchase? (Enter item_id)",
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
      message: `How many do you want to purchase?`,
      validate: function (entry) {

        let err = ` !!! Order up to ${inventory.stock_quantity[index]}`

        //check if num
        if (!entry.match(/[0-9]/)) {
          console.log(err);
          return false;
        } else {
          //check if enough in inventory
          if (inventory.stock_quantity[index] < parseInt(entry)) {
            console.log(err);
            return false;
          } else {
            return true;
          }
        }

      }
    }
  ]).then(answers => {
    //console.log(` id ${answers.id}; quantity ${answers.quantity}`);

    let transaction = {
      id: answers.id,
      stock_quantity: inventory.stock_quantity[index],
      purchase_quantity: answers.quantity,
      unit_cost: inventory.unit_cost[index],
      name: inventory.name[index]
    }

    transact(transaction);

  });

}

function start() {

  let inventory = {
    item_id: [],
    stock_quantity: [],
    unit_cost: [],
    name:[]
  }

  connection.connect();

  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;

    console.log(`Inventory:`);

    res.forEach(row => {

      inventory.item_id.push(parseInt(row.item_id));
      inventory.stock_quantity.push(parseInt(row.stock_quantity));
      inventory.unit_cost.push(parseFloat(row.price));
      inventory.name.push(row.product_name);

      console.log(`${row.item_id} ${mkSp(row.item_id, 0)} ${row.product_name} ${mkSp(row.product_name, 1)} ${row.department_name} ${mkSp(row.department_name, 2)} ${row.price} ${mkSp(row.price, 3)} ${row.stock_quantity} ${mkSp(row.stock_quantity, 4)}`)

    });

  });

  setTimeout(function(){
    query(inventory);
  },500);

}

start();








