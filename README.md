# console inventory ("bamazon")
Console inventory is a set of workflows which performs CRUD workflows over mysql database called "bamazon" which contains one table called "products" and data which represents an inventory.

You can build the bamazon database and products with attached `schema.sql` and `seed.sql` files.

Console inventory consists of two different modules:
1. `bamazonCustomer.js`
2. `bamazonManager.js`

## bamazonCustomer.js
Consists of one function, a purchase workflow facilitated by `inquirer`. Users are presented with an inventory, then asked which item they would like to purchase, how many, etc.

![alt text](https://github.com/tommyngre/inventory/blob/master/readme%20assets/customer.gif "Customer purchase workflow")

## bamazonManager.js
Consists of four functions:
* view inventory
* view low inventory (i.e. <5 items)
* adjust inventory
* add item to inventory 

### view inventory
Displays the complete inventory of the products table in the bamazon database.
![alt text](https://github.com/tommyngre/inventory/blob/master/readme%20assets/manager-view.gif "Manager view inventory workflow")

### view low inventory
Displays items with a stock_quantity of fewer than 5 within the products table of the bamazon database. (See above gif.)

### adjust inventory
Allows managers to update the `stock_quantity` column for an item in the products table in the bamazon database.
![alt text](https://github.com/tommyngre/inventory/blob/master/readme%20assets/manager-adjust-inventory.gif "Manager update inventory workflow")


### add item to inventory
Allows managers to add an item to the products table in the bamazon database.
![alt text](https://github.com/tommyngre/inventory/blob/master/readme%20assets/manager-add-item.gif "Manager add item workflow")

### miscellaneous error handling
Some examples of the error handling performed
* For name and department entry, strings of >0 && <30 characters required (columns are varchar(30))
* For quantity entry, numeric values required

![alt text](https://github.com/tommyngre/inventory/blob/master/readme%20assets/manager-err-handling.gif "Customer purchase workflow")

### planned enhancements
* for Manager's "add item" workflow, populate discrete set of departments for selection from a list
* better price validation

## Dependencies
1. https://www.npmjs.com/package/inquirer
2. https://www.npmjs.com/package/mysql