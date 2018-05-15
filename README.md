# console inventory ("bamazon")
console inventory is a set of workflows which performs CRUD workflows over mysql database called "bamazon" which contains one table called "products" and data which represents an inventory.

you can build the bamazon database and products with attached `schema.sql` and `seed.sql` files.

console inventory consists of two different modules:
1. `bamazonCustomer.js`
2. `bamazonManager.js`

## bamazonCustomer.js
consists of one function, a purchase workflow facilitated by `inquirer`. Users are presented with an inventory, then asked which item they would like to purchase, how many, etc.

![alt text](https://github.com/tommyngre/inventory/blob/master/readme%20assets/customer.gif "Customer purchase workflow")

## bamazonManager.js
consists of four functions:
* view inventory
* view low inventory (i.e. <5 items)
* adjust inventory
* add item to inventory 

### view inventory
displays the complete inventory of the products table in the bamazon database
![alt text](https://github.com/tommyngre/inventory/blob/master/readme%20assets/manager-view.gif "Manager view inventory workflow")

### view low inventory
displays items with a stock_quantity of fewer than 5 within the products table of the bamazon database

see above gif

### adjust inventory
allows managers to update the stock_quantity column for an item in the products table in the bamazon database
![alt text](https://github.com/tommyngre/inventory/blob/master/readme%20assets/manager-adjust-inventory.gif "Manager update inventory workflow")


### add item to inventory
allows managers to add an item to the products table in the bamazon database
![alt text](https://github.com/tommyngre/inventory/blob/master/readme%20assets/manager-add-item.gif "Manager add item workflow")

### miscellaneous error handling
some examples of the error handling performed
* for name and department entry, strings of >0 && <30 characters required (columns are varchar(30))
* for quantity entry, numeric values required

![alt text](https://github.com/tommyngre/inventory/blob/master/readme%20assets/manager-err-handling.gif "Customer purchase workflow")

## Dependencies
1. https://www.npmjs.com/package/inquirer
2. https://www.npmjs.com/package/mysql