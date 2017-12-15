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
    })
}

function viewInv() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        startProg();
    })
}

function viewLowInv() {
    console.log("function under construction");
    startProg()
}

function addInv() {
    console.log("function under construction");
    startProg()
}

function addProd() {
    console.log("function under construction");
    startProg()
}

startProg()