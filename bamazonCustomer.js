//dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');
//createconnection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect()
//program entry and exit points
function startProg() {
    inquirer.prompt([{
        name: "userAction",
        type: "list",
        message: "What do you want to do?",
        choices: ["Browse Inventory", "Exit store"]
    }]).then(function (ans) {
        if (ans.userAction === "Browse Inventory") {
            browseInv();
        }
        else {
            console.log("Thank you! Come again!")
            connection.end();
        }
    });
}
//display inventory, then ask user what item they want and how much. finally update sql database as needed
function browseInv() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res); //show data
        inquirer.prompt(//prompt user for product id and amount they want to purchase
            [{
                name: "itemID",
                type: "text",
                message: "Enter the product id of the item you want: ",
                validate: function(input) { //if input is not a number
                    if (isNaN(input)) {
                        console.log("\nSorry! That is not a valid item ID!");
                        return false;
                    }
                    return true;
                }
            }, {
                name: "quantity",
                type: "text",
                message: "How many would you like?",
                validate: function(input) {
                    if (isNaN(input)) {//if input is not a number
                        console.log("\nSorry! That is not a valid amount!");
                        return false;
                    }
                    return true;
                }
            }
            ]).then(function (ans) {
                console.log("Checking stock... please wait!");
                var item;
                res.forEach(function(elem) {
                    if (elem.product_id === parseInt(ans.itemID)) {
                        item = elem;
                    }
                });
                if (typeof item === "undefined"){
                    console.log("Sorry! That item does not exist.");
                    startProg();
                } else if (item.stock_quantity < ans.quantity) {
                    console.log("Sorry! We don't currently have that much.");
                    startProg();
                } else if (ans.quantity === "0") {
                    console.log("Just window shopping, eh? Thats fine but don't waste my time. *grumble grumble*");
                    startProg();
                } 
                else {
                    console.log("Good news! We can fulfill that order!");
                    //english translation of sql query: where product id is BLAH, change stock quantity to the current amount minus amount purchased, add amount to product_sales equal to the price of the product * amount purchased.
                    connection.query("UPDATE products SET stock_quantity = ?, product_sales = product_sales + (price * ?) WHERE product_id = ?", [item.stock_quantity - parseInt(ans.quantity), ans.quantity, ans.itemID], function (err, res) {
                        if (err) throw err;
                        startProg();
                    });
                }
            });
    });
}

startProg()