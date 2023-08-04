const savingsForm = document.getElementById("savingsForm");
const monthlySavingsInput = document.getElementById("monthlySavings");
const ideaInput = document.getElementById("idea");
const savingsList = document.getElementById("savingsList");

// Initialize an array to store savings for each month
let monthlySavingsArray = new Array(12).fill(0);

function saveUserData() {
  const month = new Date().getMonth(); // Get the current month (0-11)
  const monthlySavings = parseFloat(monthlySavingsInput.value);

  if (!isNaN(monthlySavings)) {
    // Update the savings for the current month
    monthlySavingsArray[month] = monthlySavings;
    updateSavingsList();

    // Save the array of savings to localStorage
    localStorage.setItem("monthlySavingsArray", JSON.stringify(monthlySavingsArray));

    alert("Data saved successfully!");
  }
}

function loadUserData() {
  const savedMonthlySavingsArray = JSON.parse(localStorage.getItem("monthlySavingsArray"));
  
  if (Array.isArray(savedMonthlySavingsArray)) {
    monthlySavingsArray = savedMonthlySavingsArray;
    updateSavingsList();
  }
}

function updateSavingsList() {
  savingsList.innerHTML = ""; // Clear the list before updating

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Update the list with savings for each month
  for (let i = 0; i < 12; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = `${months[i]}: $${monthlySavingsArray[i].toFixed(2)}`;
    savingsList.appendChild(listItem);
  }
}

savingsForm.addEventListener("submit", function (event) {
  event.preventDefault();
  saveUserData();
});

window.addEventListener("load", loadUserData);
