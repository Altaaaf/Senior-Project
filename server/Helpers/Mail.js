const nodemailer = require('nodemailer');
const contactEmail = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'Barnslink@gmail.com',
		pass: 'Nyit2021'
	},
	tls: {
		// do not fail on invalid certs
		rejectUnauthorized: false,
	},
});

const verify = () => {
	contactEmail.verify((error) => {
		if (error) {
			console.log(error);
		} else {
			console.log('Ready to Send');
		}
	});
};

module.exports = { verify };
