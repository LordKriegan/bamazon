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
            name: "superAction",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Departments", "Add Department", "Exit"]
        }
    ]).then(function(ans) {
        if (ans.superAction === "View Departments") {
            viewDepts();
        } else if (ans.superAction === "Add Department") {
            addDept();
        } else if (ans.superAction === "Exit") {
            console.log("Great! Now go boss some underlings around.");
            connection.end();
        }
    });
}

function viewDepts() {
    connection.query("SELECT departments.department_id AS deptID, products.department_name AS deptName, departments.overhead_costs AS deptOHCosts,SUM(products.product_sales) AS prodSales FROM products INNER JOIN departments ON products.department_name=departments.department_name GROUP BY deptName", function(err, res) {
        if(err) throw err;
        res.map(function(elem) {
            elem.deptOHCosts = parseInt(elem.deptOHCosts).toFixed(2);
            elem.total_sales = (elem.prodSales - elem.deptOHCosts).toFixed(2);
            return elem;  
        })
        console.table(res);
        startProg();
    })
}

function addDept() {
    inquirer.prompt([
        {
            name: "deptName",
            type: "text",
            message: "What is the department's name? "
        },
        {
            name: "deptOverheadCosts",
            type: "text",
            message: "What are the overhead costs of this department? ",
            validate: function(input) {
                if (isNaN(input)) {
                    console.log("\nSorry! That is not a valid number.");
                    return false;
                }
                return true;
            } 
        }
    ]).then(function(ans) {
        connection.query("INSERT INTO departments(department_name, overhead_costs) VALUES(?,?)", [ans.deptName, ans.deptOverheadCosts], function(err, res) {
            if (err) throw err;
            console.log("New department has been added to the store. Now go hire a construction crew.");
            startProg();
        })
    });
}

startProg();