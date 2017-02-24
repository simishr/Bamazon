
var mysql = require("mysql");
var inquirer = require("inquirer");
var fs = require("fs");

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'Bamazon'
});

connection.connect(function(err) {
    if (err) throw err;
    startManagerView();
});

function startManagerView(){
	inquirer.prompt([{
		name: "managerName",
		type: "input",
		message: "Please enter your username:"
	},
	{
		name:"managerPassword",
		type: "input",
		message: "Please enter your password:"
	}
	]).then(function(response) {
		var manager = response.managerName;
		var password = response.managerPassword;
		fs.readFile("mPassword.txt", "utf8", function(err, data) {
			if(err) throw err;

			if(data === password) {
				console.log("Welcome " + manager);
				displayOptions();
			} else {
				console.log("Log in error. Please try again!");
			}
		})
	})
}

function displayOptions() {
	inquirer.prompt([{
		name: "options",
		type: "rawlist",
		message: "What would you like to do?",
		choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"]
	}]).then(function (optionChosen) {

		var option = optionChosen.options;

		switch (option) {
			case "View products for sale" :
			{
				displayProducts();
				break;
			}
			case "View low inventory": 
			{
				viewLowInventory();
				break;
			}
			case "Add to inventory":
			{
				addToInventory();
				break;
			}
			case "Add new product":
			{
				addNewProduct();
				break;
			}
		}
	})
}

function displayProducts() {
	var query = "SELECT * FROM products";
				console.log("\nProducts Available: " + "\n-----------------------------------------------------------");
				connection.query(query, function(err, results, fields){
				if(err) throw err;
				if(results) {
					for (var i = 0; i < results.length; i++){
						console.log("#" + results[i].item_id + "\tProduct: " + results[i].product_name + "\tDepartment: " + results[i].department_name + 
							"\tPrice: $" + results[i].price + "\t Stock: " + results[i].stock_quantity);
					}
					console.log("-------------------------------------------------------------------------------------");
				}
				//nextAction();
			});
}

function viewLowInventory() {
	var query = "SELECT * FROM products WHERE stock_quantity <= 200";
				console.log("\nLow Inventory List: " + "\n-------------------------------------------------------------");
				connection.query(query, function(err, results, fields){
				if(err) throw err;
				if(results) {
					for (var i = 0; i < results.length; i++){
						console.log("#" + results[i].item_id + "\tProduct: " + results[i].product_name + "\tDepartment: " + results[i].department_name + 
							"\tPrice: $" + results[i].price + "\t Stock: " + results[i].stock_quantity);
					}
					console.log("---------------------------------------------------------------------------------------");
				}
				//nextAction();
			});
}

function addToInventory() {
	inquirer.prompt([{
		name: "itemID",
		type: "input",
		message: "Enter product ID to add Inventory quantity"
	},
	{
		name: "quantity",
		type: "input",
		message: "Enter the quantity to be added."
	}
	]).then(function(response) {

		var query = "UPDATE products SET stock_quantity =" + "stock_quantity + ? WHERE item_id =?",
			[response.quantity, response.itemID];
	})

	
				console.log("\nInventory added: " + "\n-------------------------------------------------------------");
				connection.query(query, function(err, results){
				if(err) throw err;
				if(results) {
					console.log("Inventory Updated!");
					console.log("---------------------------------------------------------------------------------------");
				}
				//nextAction();
			});
}
function addNewProduct() {
	// Add New Product -- add new row "insert into"
}



