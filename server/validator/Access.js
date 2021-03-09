const Joi = require('joi');

const Login = (data) => {
	const schema = Joi.object({
		Username: Joi.string().min(7).required(),
		Password: Joi.string().min(10).required(),
	});
	return schema.validate(data);
};

const Register = (data) => {
	const schema = Joi.object({
		Username: Joi.string().min(7).required(),
		Password: Joi.string().min(10).required(),
		AccountType: Joi.string().required(),
	});
	return schema.validate(data);
};

module.exports = { Login, Register };