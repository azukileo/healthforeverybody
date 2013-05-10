var mongoose = require('mongoose'),
	utils = require('connect').utils;

exports.init = function(host, db) {
	mongoose.connect('mongodb://' + host + '/' + db);
}

function getAuthCookie() {
	return utils.uid(32);
}
var Schema = mongoose.Schema;

var UserInfoSchema = new Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	mail_address: {type: String, required: true},
	gender: {type: String, required: true},
	birth_date: {type: Date, required: true},
	prefecture: {type: Number, required: true},
	profile: {type: String, required: true},
	authcookie: {type: String, required: true, default: getAuthCookie},
	created_at: {type: Date, default: Date.now}
});

UserInfoSchema.methods.setPassword = function(password, password2) {
	if (password === password2) {
		this.password = password;
		return true;
	}
	this.invalidate('password_mismatch', new Error('Password mismatch'));
	return false;
};

UserInfoSchema.methods.setMailAddress = function(mailAddress, mailAddress2) {
	if (mailAddress === mailAddress2) {
		this.mailAddress = mailAddress;
		return true;
	}	
	this.invalidate('mailAddress_mismatch', new Error('MailAddress mismatch'));
	return false;
};

exports.UserInfoModel = mongoose.model('UserInfo', UserInfoSchema);