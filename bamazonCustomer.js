// VARS
const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');

// setup mySQL connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

// FUNCTIONS
function loadProducts() {
    let query = "SELECT * FROM products";
    connection.query(query, function(err,res) {
        // show the products
        console.table(res);

        // prompt customer for product
        promptCustomerForItem(res);
    });
}

function promptCustomerForItem(inventory) {
    inquirer.prompt([{
        type: 'input',
        name: 'choice',
        message: 'What is the ID of the item you would like to purchase?'
    }]).then(function(val) {
        let choiceID = parseInt(val.choice);
        // query products to see how many there are
        let product = checkInventory(choiceID, inventory);
        if (product) {
            promptCustomerForQuantity(product);
        } else {
            console.log("That item isn't in our inventory!");
            loadProducts();
        }
    });
}

// checks inventory array to see if item id exists
function checkInventory(choiceID, inventoryArray) {
    for (let i = 0; i < inventoryArray.length; i++) {
        if (inventoryArray[i].item_id === choiceID) {
            return inventoryArray[i];
        }
    }
    return null;
}

// prompts customer for quantity desired and checks against database
function promptCustomerForQuantity(productObj) {
    inquirer.prompt([{
        type: 'input',
        name: 'quantity',
        message: 'How much of the item would you like to purchase? (Number please!)'
    }]).then(function(val) {
        let quantity = parseInt(val.quantity);
        if (quantity > productObj.stock_quantity) {
            console.log('Not enough in stock! Try again.');
            loadProducts();
        } else {
            makePurchase(productObj, quantity);
        }
    })
}

// make a purchase, update database
function makePurchase(productObj, quantity) {
    connection.query(
        'UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?',
        [quantity, productObj.item_id],
        function(err, res) {
            console.log("Product purchased.");
        }
    )
}

// EVENTS
connection.connect(function(err) {
    if (err) throw err;
    loadProducts();
});