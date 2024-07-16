const express = require('express');
const app = express();
const port = 3000;

// Array of collectibles
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

// Array of shoes
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// Route to greet the user
app.get('/greetings/:username', (req, res) => {
  const username = req.params.username;
  res.send(`Hello there, ${username}!`);
});

// Route to roll a dice
app.get('/roll/:number', (req, res) => {
  const number = parseInt(req.params.number);
  if (isNaN(number)) {
    res.send("You must specify a number.");
  } else {
    const roll = Math.floor(Math.random() * (number + 1));
    res.send(`You rolled a ${roll}.`);
  }
});

// Route to get a collectible
app.get('/collectibles/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < collectibles.length) {
    const item = collectibles[index];
    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
  } else {
    res.send("This item is not yet in stock. Check back soon!");
  }
});

// Route to filter shoes by query parameters
app.get('/shoes', (req, res) => {
  const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query;
  let filteredShoes = shoes;

  if (minPrice) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
  }

  if (maxPrice) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
  }

  if (type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
  }

  res.json(filteredShoes);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
