const express = require('express'); //express module
const port = 8000; //sets the local port number
const app = express();

const path = require('path'); // path module

app.set('view engine', 'ejs'); // defines EJS as template engine
app.set('views', path.join(__dirname, 'views')); //tells the location of our view

app.use(express.urlencoded()); //for reading forms data

app.use(express.static('assets')); // static fils

var contactList = [
	{
		name: 'Swapnil',
		phone: '123'
	},
	{
		name: 'Archis',
		phone: '456'
	},
	{
		name: 'Afro',
		phone: '789'
	}
];

app.get('/', (req, res) =>
	res.render('home', {
		title: 'Home',
		contact_list: contactList
	})
);

//Adds data from the form to contactList array
app.post('/add-contact', (req, res) => {
	contactList.push(req.body);
	return res.redirect('/');
});

//Delete a contact
app.get('/delete-contact/', (req, res) => {
	let phone = req.query.phone;
	//confermes that the data to be deleted is in the array or not
	let contactIndex = contactList.findIndex((contactList) => contactList.phone == phone);

	if (contactIndex != -1) contactList.splice(contactIndex, 1);

	return res.redirect('back');
});

app.listen(port, (err) => {
	if (err) {
		console.log('server not working');
		return;
	}
	console.log('Server running at port :', port);
});
