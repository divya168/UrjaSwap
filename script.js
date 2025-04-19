// Function to update wallet balance
function updateBalance(amount) {
    let balanceElement = document.getElementById("balance");
    let currentBalance = parseFloat(balanceElement.innerText);
    balanceElement.innerText = (currentBalance + amount).toFixed(2);
}

// Function to add a transaction to history
function addTransactionHistory(type, amount, price) {
    let history = document.getElementById("transaction-history");
    let newTransaction = document.createElement("li");
    newTransaction.textContent = `${type}: ${amount} kWh at ${price} IOTA/kWh`;
    history.appendChild(newTransaction);
}

// Function to handle energy purchase
function buyEnergy(seller, amount, price) {
    let balanceElement = document.getElementById("balance");
    let currentBalance = parseFloat(balanceElement.innerText);
    let totalCost = amount * price;

    if (totalCost > currentBalance) {
        alert("Insufficient balance to complete the purchase.");
        return;
    }

    // Deduct amount from wallet
    updateBalance(-totalCost);
    addTransactionHistory(`Bought from ${seller}`, amount, price);

    alert(`Successfully bought ${amount} kWh from ${seller} at ${price} IOTA/kWh.`);
}

// Function to handle selling energy
function sellEnergy() {
    let amount = parseFloat(document.getElementById("amount").value);
    let price = parseFloat(document.getElementById("price").value);

    if (isNaN(amount) || isNaN(price) || amount <= 0 || price <= 0) {
        alert("Please enter valid positive values.");
        return false;
    }

    // Add earnings to wallet balance
    let totalEarnings = amount * price;
    updateBalance(totalEarnings);
    addTransactionHistory("Sold", amount, price);

    alert(`Successfully sold ${amount} kWh at ${price} IOTA/kWh.`);
    
    // Clear input fields
    document.getElementById("amount").value = "";
    document.getElementById("price").value = "";

    return false; // Prevent form submission
}


