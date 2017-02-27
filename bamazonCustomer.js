var mysql = require("mysql");
var inquirer = require("inquirer");

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
    startBamazon();
});

function startBamazon() {
	inquirer.prompt([{
		name: "name",
		type: "input",
		message: "Enter your name"
	}]).then(function(response){
		console.log("Hello " + response.name + "!");
		listProducts();
	})
}

function listProducts() {
	inquirer.prompt([{
		name: "commands",
		type: "list",
		message: "What would you like?",
		choices: ["View Available Products", "Exit"]
	}]).then(function(select){
		if(select.commands === "View Available Products") {
			
			var query = "SELECT item_id, product_name, price FROM products";
			console.log("\nProducts Available: " + "\n---------------------------");
			connection.query(query, function(err, results, fields){
				if(err) throw err;
				if(results) {
					for (var i = 0; i < results.length; i++){
						console.log("#" + results[i].item_id + "\tProduct: " + results[i].product_name + "\tPrice: $" + results[i].price);
					}
					console.log("--------------------------");
				}
				nextAction();
			});
		} else if(select.commands === "Exit") {
			process.exit();
		}
	});
}

function nextAction() {
	inquirer.prompt([{
		name: "action",
		type: "list",
		message: "Start Shopping?",
		choices: ["Purchase", "Exit"]
	}]).then(function(agree){
		if(agree.action === "Purchase"){
			purchaseProduct();
		}else if(agree.action === "Exit") {
			process.exit();
		}
	});
}

function purchaseProduct() {
	inquirer.prompt([{
		name: "item",
		type: "input",
		message: "Please provide the product ID"
	},
	{
		name: "quantity",
		type: "input",
		message: "Please select quantity"
	}
	]).then(function(response){
		connection.query("SELECT * FROM products WHERE item_id = ?", [response.item], function(err, result){
			var total = (result[0].price * response.quantity).toFixed(2);
			if(response.quantity > result[0].stock_quantity) {
				console.log("Sorry, insufficient quantity! Try Again");
				nextAction();
			} else {
				connection.query("UPDATE products SET stock_quantity= stock_quantity - ? WHERE item_id = ?", [response.quantity, response.item], function(err, result){
					console.log("Total cost is: $" + total);
					console.log("---------------");
					nextAction();
				});
			}
		});
	});
}



