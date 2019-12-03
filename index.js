const express = require('express');
const path = require('path');
const app = express();
const logger = require('./middleware/logger');

const PORT = process.env.PORT || 5000;

// Initilize middleware
app.use(logger);

// Body Parser Middleware
app.use(express.json()); // handle raw json
app.use(express.urlencoded({extended: false})); // handle url encoded data

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// importing members
app.use('/api/members', require('./routes/api/members'));
// Static home page
app.get('/', (req, res) => {
	res.send('<h2>Homepage</h2>');
});




app.listen(PORT, () => console.log(`Server running on ${PORT}`));

