//display inventory ids, names, prices

//then, 2 prompts
///first, ask ID of product want to buy
///second, how many units

//after customer places order
///check if inventory can accommodate
//// if not, log "Insufficient Quantity!"
//// do not place the order
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
  10,
  30,
  30,
  10,
  10,
]

function mkSp(element,index) {
  str = ''

  element = String(element);
  n = spaces[index] - element.length;

  for (let i = 0; i < n; i++){
    str += '.';
  }
  return str;
}

function start() {

  connection.connect();

  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;

    console.log(`Inventory:`);  

    res.forEach(row => {
      console.log(`${row.item_id} ${mkSp(row.item_id,0)} ${row.product_name} ${mkSp(row.product_name,1)} ${row.department_name} ${mkSp(row.department_name,2)} ${row.price} ${mkSp(row.price,3)} ${row.stock_quantity} ${mkSp(row.stock_quantity,4)}`)
    });

    connection.end();

  });
}
start();








