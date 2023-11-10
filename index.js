const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const stocksRoute = require('./routes/stocks');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

app.use('/api/stocks', stocksRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const axios = require('axios');


const fetchAndStoreStockPrices = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/stocks');
    const data = response.data;

    console.log('Received data:', data); // Log received data for debugging

    for (const stockName in data) {
      await Stocks.findOneAndUpdate(
        { name: stockName },
        { price: data[stockName] },
        { upsert: true }
      );
    }
    console.log('Stock prices updated successfully.');
  } catch (error) {
    console.error('Error fetching and storing stock prices:', error.response ? error.response.data : error.message);
  }
};


setInterval(fetchAndStoreStockPrices, 60000);
