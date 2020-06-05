const express = require('express'); //express module
const port = 8000; //sets the local port number

const db = require('./config/mongoose'); //database
const Contact = require('./model/contact');

const app = express();

const path = require('path'); // path module

app.set('view engine', 'ejs'); // defines EJS as template engine
app.set('views', path.join(__dirname, 'views')); //tells the location of our view

app.use(express.urlencoded()); //for reading forms data

app.use(express.static('assets')); // static fils



app.get('/', (req, res) => {
	Contact.find({}, (err, contacts) => {
		if (err) {
			console.log('error in fetching contacts from db');
			return;
		}
		res.render('home', {
			title: 'Home',
			contact_list: contacts
		});
	});
});

//Adds data from the form to contactList array
app.post('/add-contact', (req, res) => {
	// contactList.push(req.body);

	Contact.create(
		{
			name: req.body.name,
			phone: req.body.phone
		},
		(err, newContact) => {
			if (err) {
				console.log('error in creating DB');
				return;
			}
			console.log('****', newContact);
			return res.redirect('back');
		}
	);
});

//Delete a contact
app.get('/delete-contact/', (req, res) => {
	let id = req.query.id;

	Contact.findByIdAndDelete(id, (err) => {
		if (err) {
			console.log('error in deleting data from data base');
			return;
		}
		return res.redirect('back');
	});
});

app.listen(port, (err) => {
	if (err) {
		console.log('server not working');
		return;
	}
	console.log('Server running at port :', port);
});
