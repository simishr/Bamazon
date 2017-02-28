
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
    console.log("Welcome to Bamazon..");
    startManagerView();
});

function startManagerView(){
	inquirer.prompt([{
		name: "managerName",
		type: "input",
		message: "Please enter your username:"
	}, {
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
				console.log("Hello " + manager + "!");
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
		type: "list",
		message: "What would you like to do?",
		choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product", "Exit"]
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
			case "Exit":
				process.exit();
		}
	})
}

function nextAction() {
	inquirer.prompt([{
		name: "action",
		type: "list",
		message: "What would you like to do next?",
		choices: ["Main menu", "Exit"]
	}]).then(function(agree){
		if(agree.action === "Main menu"){
			displayOptions();
		}else if(agree.action === "Exit") {
			process.exit();
		}
	});
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
					nextAction();
				}
				
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
					nextAction();
				}
				
			});
}

function addToInventory() {
	inquirer.prompt([{
		name: "itemID",
		type: "input",
		message: "Enter product ID to add Inventory quantity"
	}, {
		name: "quantity",
		type: "input",
		message: "Enter the quantity to be added."
	}
	]).then(function(choice) {
		var item = choice.itemID;
		var quantity = parseInt(choice.quantity);
		
		var query = "SELECT stock_quantity FROM products WHERE item_id = ?";

		connection.query(query,[item], function(err, results){
				if(err) throw err;
			var updatedQuantity = parseInt(results[0].stock_quantity) + quantity;
			connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: updatedQuantity }, { item_id: item }], function(err, result){
				console.log("\n---------------------------------------------------------------------------------------");
				console.log("Inventory successfully updated!");
				console.log("---------------------------------------------------------------------------------------");
				nextAction();
			})

		})
	});
}

function addNewProduct() {

	inquirer.prompt([{
		name: "itemID",
		type: "input",
		message: "Enter the product ID to add a new product row"
	}, {
		name: "productName",
		type: "input",
		message: "Enter the product name"
	},{
		name: "departmentName",
		type: "input",
		message: "Enter the department"
	}, {
		name: "price",
		type: "input",
		message: "Enter the price"
	}, {
		name: "stockQuantity",
		type: "input",
		message: "Enter the quantity"
	}]).then(function(addition) {

		var item_id = addition.itemID;
		var name = addition.productName;
		var department = addition.departmentName;
		var price = addition.price;
		var quantity = addition.stockQuantity;

		var query = "INSERT INTO products(item_id, product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?, ?)";
		
		connection.query(query,[item_id, name, department, price, quantity], function(err, results){
			if(err) throw err;
			if(results) {
				console.log("\n---------------------------------------------------------------------------------------");
				console.log("New product added successfully!");
				console.log("---------------------------------------------------------------------------------------");
				nextAction();
			}
		})
		
	})
}



