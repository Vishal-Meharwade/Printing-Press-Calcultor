

// Define pricing for each option
const prices = {
  size: {
    A4: 10,
    A3: 15,
    Legal: 12,
  },
  type: {
    "1+1": 5,
    "1+2": 8,
    "1+3": 10, // Added 1+3 pricing
  },
  paper: {
    GVG: 20,
    Maplitho: 25,
    SPB: 35, // Added SPB pricing
    Other: 30,
  },
  colors: {
    1: 50,
    2: 80,
    More: 100,
  },
  dtp: 150, // Fixed cost for DTP
};

// Function to convert number to words (in Indian style)
function numberToWords(number) {
  const units = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  if (number < 20) return units[number];
  if (number < 100)
    return (
      tens[Math.floor(number / 10) - 2] +
      (number % 10 ? " " + units[number % 10] : "")
    );
  if (number < 1000)
    return (
      units[Math.floor(number / 100)] +
      " Hundred" +
      (number % 100 ? " and " + numberToWords(number % 100) : "")
    );
  if (number < 100000)
    return (
      numberToWords(Math.floor(number / 1000)) +
      " Thousand" +
      (number % 1000 ? " " + numberToWords(number % 1000) : "")
    );
  return (
    numberToWords(Math.floor(number / 100000)) +
    " Lakh" +
    (number % 100000 ? " " + numberToWords(number % 100000) : "")
  );
}

// Function to calculate the total
function calculateTotal() {
  const size = document.querySelector("#size").value;
  const type = document.querySelector("#type").value;
  const paper = document.querySelector("#paper").value;
  const colors = document.querySelector("#colors").value;
  const printing = document.querySelector("#printing").checked;
  const binding = document.querySelector("#binding").checked;
  const dtp = document.querySelector("#dtp").checked;
  const quantity = parseInt(document.querySelector("#quantity").value) || 0;
  const misc = parseFloat(document.querySelector("#misc").value) || 0;

  // Clear previous error messages
  document
    .querySelectorAll(".error-message")
    .forEach((msg) => (msg.textContent = ""));

  let total = 0;

  total += prices.size[size] || 0;
  total += prices.type[type] || 0;
  total += prices.paper[paper] || 0;
  total += prices.colors[colors] || 0;
  total += printing ? 50 : 0; // Assuming a fixed cost for printing
  total += binding ? 40 : 0; // Assuming a fixed cost for binding
  total += dtp ? prices.dtp : 0;

  total *= quantity;
  total += misc; // Add miscellaneous amount

  // Display the total
  const totalAmount = `₹${total}`;
  const amountInWords = numberToWords(total);

document.querySelector(
  "#totalAmount"
).innerHTML = `Total Amount: ${totalAmount}<br>(${amountInWords} Rupees)`;

}

// Add event listeners to recalculate the total on change
document
  .querySelectorAll('select, input[type="checkbox"], input[type="text"]')
  .forEach((input) => {
    input.addEventListener("change", calculateTotal);
  });

// Function to save data to a file
function saveData() {
  const partyName = document.querySelector("#partyName").value;
  const size = document.querySelector("#size").value;
  const type = document.querySelector("#type").value;
  const paper = document.querySelector("#paper").value;
  const colors = document.querySelector("#colors").value;
  const printing = document.querySelector("#printing").checked;
  const binding = document.querySelector("#binding").checked;
  const dtp = document.querySelector("#dtp").checked;
  const quantity = parseInt(document.querySelector("#quantity").value) || 0;
  const misc = parseFloat(document.querySelector("#misc").value) || 0;

  // Validate fields
  if (!size || !type || !paper || isNaN(quantity) || quantity <= 0) {
    alert("Please fill out all fields correctly.");
    return;
  }

  // Structure the data as JSON
  const data = {
    partyName,
    size,
    type,
    paper,
    colors,
    printing,
    binding,
    dtp,
    quantity,
    misc,
  };

  // Convert JSON data to string
  const dataStr = JSON.stringify(data, null, 2);

  // Create a Blob from the data
  const blob = new Blob([dataStr], { type: "application/json" });

  // Create a link element and trigger download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Add event listener to the Save button
document.getElementById("saveButton").addEventListener("click", saveData);
