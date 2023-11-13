const express = require('express');
const router = express.Router();
const axios = require('axios');
const stockSchema = require('../models/stock.model')
router.get('/:ticker', async (req, res) => {

 
      const alphaVantageUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.params.ticker}&apikey=SG4U2W92WJ55XSPO`;
      try {
        const stock = await stockSchema.findOne({ symbol: req.params.ticker });
          const response = await axios.get(alphaVantageUrl);
          if(response.data['Global Quote']) {
            stock.price = response.data['Global Quote']['05. price'];
            await stock.save();
          } 
          res.status(200).json(stock);
      } 
   catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


