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
    inquirer.prompt([
        {
            name: "mgrAction",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Inventory", "View Low Inventory", "Add Inventory", "Add New Product", "Exit"]
        }
    ]).then(function(ans) {
        if (ans.mgrAction === "View All Inventory") {
            viewInv();
        } else if (ans.mgrAction === "View Low Inventory") {
            viewLowInv();
        } else if (ans.mgrAction === "Add Inventory") {
            addInv();
        } else if (ans.mgrAction === "Add New Product") {
            addProd();
        } else if (ans.mgrAction === "Exit") {
            console.log("Keep up the good work, you hard worker, you!");
            connection.end();
        }
    });
}

function viewInv() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        startProg();
    });
}

function viewLowInv() {
    connection.query("SELECT * FROM products WHERE (stock_quantity < 5)", function(err, res) {
        if (err) throw err;
        console.table(res);
        startProg();
    });
}

function addInv() {
    // console.log("function under construction");
    // startProg()
    inquirer.prompt([
        {
            name: "itemID",
            type: "text",
            message: "Enter a product ID: ",
            validate: function(input) {
                if (isNaN(input)) {
                    console.log("\nSorry! That is not a valid item ID!");
                    return false;
                }
                return true;
            }
        },
        {
            name: "quantity",
            type: "text",
            message: "How many are you adding? ",
            validate: function(input) {
                if (isNaN(input)) {
                    console.log("\nSorry! That is not a valid amount!");
                    return false;
                }
                return true;
            }
        }
    ]).then(function(ans) {
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;
            var item;
            res.forEach(function(elem) {
                if (elem.product_id === parseInt(ans.itemID)) {
                    item = elem;
                }
            });
            if (typeof item === "undefined") {
                console.log("Sorry! That item does not exist");
                startProg();
            } else {
                connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE product_id = ?", [ans.quantity, ans.itemID], function(err, res) {
                    if (err) throw err;
                    startProg();
                });
            }
        });
    });
}

function addProd() {
    inquirer.prompt([
        {
            name: "itemName",
            type: "text",
            message: "What is the item description? "
        },
        {
            name: "itemPrice",
            type: "text",
            message: "How much is this item? ",
            validate: function(input) {
                if(isNaN(input)) {
                    console.log("\nThat is not a valid amount.");
                    return false;
                }
                return true;
            }
        },
        {
            name: "itemQuantity",
            type: "text",
            message: "How many are you adding? ",
            validate: function(input) {
                if(isNaN(input)) {
                    console.log("\nThat is not a valid amount.");
                    return false;
                }
                return true;
            }
        },
        {
            name: "itemDept",
            type: "text",
            message: "What department does this item belong in? "
        }
    ]).then(function(ans) {
        connection.query("INSERT INTO products(product_name, price, stock_quantity, department_name) VALUES (?, ?, ?,?)", [ans.itemName, ans.itemPrice, ans.itemQuantity, ans.itemDept], function (err, res) {
            if (err) throw err;
            startProg();
        });
    });
}

startProg()