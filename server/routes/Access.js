const express = require('express');
const bcrypt = require('bcryptjs');
const { Login, Register } = require('../validator/Access');
const Access = require('../Database/Models/Access');
const Verification = require('../Database/Models/Verification');
const { AlphanumericGen } = require('../Helpers/Generators');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const nodemailer = require('nodemailer');
const router = express.Router();

// login api which requires email verification
router.post('/v2/Login', async (req, res) => {
	try {
		const { error } = Login(req.body);
		if (error) {
			console.error(error.message);
			return res.status(400).json({
				status: error.message,
			});
		}
		// validate email exists before checking password
		Access.findOne({ Email: req.body.Email }).then((user) => {
			if (user) {
				if (bcrypt.compareSync(req.body.Password, user.Password)) {
					if (user.EmailVerified) {
						jwt.sign(
							{
								id: user.id,
								name: user.Username,
								accountType: user.AccountType,
							},
							process.env.secretOrKey,
							{
								expiresIn: 31556926, // 1 year in seconds
							},
							(err, token) => {
								res.json({
									success: true,
									token: 'Bearer ' + token,
									error: err,
								});
							},
						);
					} else {
						const deleteAllVerifications = Verification.deleteMany({ Email: req.body.Email });

						console.log(deleteAllVerifications);

						const VerificationCode = AlphanumericGen(64);

						const addVerification = new Verification({
							Email: req.body.Email,
							Code: VerificationCode,
						});
						addVerification.save();
						const contactEmail = nodemailer.createTransport({
							service: 'gmail',
							auth: {
								user: 'Barnslink@gmail.com',
								pass: 'Nyit2021',
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
						const mail = {
							from: 'Barnslink@gmail.com',
							to: req.body.Email,
							subject: 'Email Verification!',
							html: `<p>Your verfication link is http://localhost:5000/Api/Misc/Verify/${VerificationCode}</p>`,
						};
						contactEmail.sendMail(mail, (error) => {
							if (error) {
								console.log(error);
								res.status(400).json({ status: 'Please try logging in again!' });
							} else {
								res.status(400).json({
									status:
										'You must first verify your email before logging in. Please check your email!',
								});
							}
						});
					}
				} else {
					return res.status(400).json({ status: 'incorrect password!' });
				}
			} else {
				return res.status(400).json({ status: 'username does not exist' });
			}
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ status: 'Server Error' });
	}
});

// login route which doesnt require email verification
router.post('/Login', async (req, res) => {
	try {
		const { error } = Login(req.body);
		if (error) {
			console.error(error.message);
			return res.status(400).json({
				status: error.message,
			});
		}
		// validate email exists before checking password
		Access.findOne({ Email: req.body.Email }).then((user) => {
			if (user) {
				if (bcrypt.compareSync(req.body.Password, user.Password)) {
					jwt.sign(
						{
							id: user.id,
							name: user.Username,
							accountType: user.AccountType,
						},
						process.env.secretOrKey,
						{
							expiresIn: 31556926, // 1 year in seconds
						},
						(err, token) => {
							return res.status(200).json({
								success: true,
								token: 'Bearer ' + token,
								error: err,
							});
						},
					);
				} else {
					return res.status(400).json({ status: 'incorrect password!' });
				}
			} else {
				return res.status(400).json({ status: 'username does not exist' });
			}
		});
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ status: 'Server Error' });
	}
});

// /api/account/Register
router.post('/Register', async (req, res) => {
	try {
		const { error } = Register(req.body);
		if (error) {
			console.error(error.message);
			return res.status(400).json({
				status: error.message,
			});
		}

		Access.findOne({ Email: req.body.Email }).then((user) => {
			if (user) {
				return res.status(400).json({ status: 'username already exists' });
			} else {
				try {
					const RegisterUser = new Access({
						FirstName: req.body.FirstName,
						LastName: req.body.LastName,
						Username: req.body.Username,
						Email: req.body.Email,
						Password: bcrypt.hashSync(req.body.Password, 10),
						AccountType: req.body.AccountType,
					});
					RegisterUser.save();
					return res.status(200).json({ status: 'Successfully registered user!' });
				} catch {
					return res.status(400).json({ status: 'Unexpected failure when registering!' });
				}
			}
		});
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ status: 'Server Error' });
	}
});

module.exports = router;
