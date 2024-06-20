const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rajbhuva569:raj123@cluster0.ozze5cb.mongodb.net/e-com')
  .then(() => console.log('Connected!'));