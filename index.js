const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const stocksRoute = require('./routes/stocks');
const cors = require('cors');
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

app.use('/api/stocks', stocksRoute);
mongoose.connect('mongodb+srv://dashboard:k8O0BeFR4xNCK4Z8@cluster0.pi2rh3b.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(express.static(path.join(__dirname, 'build')));
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

