const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();
const logger = require('./middleware/logger');
const members_dict = require('./routes/api/members_dict.js')

const PORT = process.env.PORT || 5000;

// Initilize middleware
app.use(logger);

// Initilize Handlebars middleware, as per documentation..
app.engine('handlebars', exphbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json()); // handle raw json
app.use(express.urlencoded({extended: false})); // handle url encoded data

// Homepage view
app.get('/', (req, res) => res.render('index', {
	title: 'Member App',
	members_dict // the same as .. members: members
}));

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// importing members
app.use('/api/members', require('./routes/api/members'));
// Static home page
//app.get('/', (req, res) => {
//	res.send('<h2>Homepage</h2>');
//});




app.listen(PORT, () => console.log(`Server running on ${PORT}`));

