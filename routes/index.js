var models = require('../models'),
	UserInfo = models.UserInfoModel,
	querystring = require('querystring'),
	S = require('string'),
	util = require('util');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.regist = function(req, res, next) {
	res.render('sign_up', {errors: ''});
}

exports.useExpressValidator = function(req, res, next) {
	req.assert('username', 'ユーザー名を入力してください').notEmpty();
	req.assert('password', 'パスワードを入力してください').notEmpty();
	req.assert('password', 'パスワードは英数字で入力してください').isAlphanumeric();
	req.assert('password2', 'パスワード（再入力）を入力してください').notEmpty();
	req.assert('password2', 'パスワード（再入力）は英数字で入力してください').isAlphanumeric();
	req.assert('mailAddress', 'メールアドレスを入力してください').notEmpty();
	req.assert('mailAddress', 'メールアドレスが正しくありません').isEmail();
	req.assert('mailAddress2', 'メールアドレス（再入力）を入力してください').notEmpty();
	req.assert('mailAddress2', 'メールアドレス（再入力）が正しくありません').isEmail();
	req.assert('gender', '性別を入力してください').notEmpty();
	req.assert('gender', '性別が正しくありません').isInt();
	req.assert('gender', '性別が正しくありません').regex(/^[0|1]+$/);
	req.assert('birthDate', '生年月日を入力してください').notEmpty();
	req.assert('birthDate', '生年月日が正しくありません').isDate();
	req.assert('prefecture', '都道府県を入力してください').notEmpty();
	req.assert('prefecture', '都道府県が正しくありません').isNumeric();
	req.assert('prefecture', '都道府県が正しくありません').regex(/^[01100-47382]+$/);

	var errors = req.validationErrors();
	console.log(errors);

	var mappedErrors = req.validationErrors(true);
	console.log(mappedErrors);
	
	var buf = '<ul>';
    errors.forEach(function(error) {
    	var li = '<li><span style="color: #ff0000;">' + error.msg + '</span></li>';
        buf += li;
    });            
    buf += '</ul>';
            
//    var escapedErrors =  S(buf).escapeHTML().s;
	
	if(errors) {
		console.log('There have been validation errors: ' + util.inspect(errors), 500);
		res.render('sign_up', {
			errors: buf
		});
	}
}

/*
exports.useExpressForm2 = function(req, res, next) {
	form(
		field("username").trim().required("%を入力してください").is(/^[a-zA-Z0-9_-]{6,20}$/, "%は半角英数とアンダーバー以外は入力できません"),
	    field("password").trim().required("%を入力してください").is(/^[a-z0-9]+$/, "%は半角英数で入力してください"),
	    field("password2").trim().required("%を入力してください").equals("password", "入力されたパスワードのどちらかが一致しません"),
	    field("mailAddress").trim().required("%を入力してください").isEmail("メールアドレスが間違っています"),
	    field("mailAddress2").trim().required("%を入力してください").equals("mailAddress", "入力されたメールアドレスのどちらかが一致しません"),
	    field("gender").trim().required("%を入力してください").isNumeric("%の値が正しくありません").is(/^[0|1]+$/, "性別の値が正しくありません"),
	    field("birthDate").trim().required("%を入力してください").isDate("入力された日付が正しくありません"),
	    field("prefecture").trim().required("%を入力してください").isNumeric("%の値が正しくありません").is(/^[01100-47382]+$/, "選択された値が不正な値です"),
	    field("profile").trim().required("%を入力してください")
	)
	  if (!req.form.isValid) {
	    // Handle errors
	    console.log(req.form.errors);
		res.redirect('registError');
	  } else {
	    // Or, use filtered form data from the form object:
	    console.log("username:", req.form.username);
	    console.log("password:", req.form.password);
	    console.log("password2:", req.form.password2);
	    console.log("mailAddress:", req.form.mailAddress);
	    console.log("mailAddress2:", req.form.mailAddress2);
	    console.log("gender:", req.form.gender);
	    console.log("birthDate:", req.form.birthDate);
	    console.log("prefecture:", req.form.prefecture);
	    console.log("profile:", req.form.profile);
	    routes.createUser
	  }
} */

exports.createUser = function(req, res, next) {
	var username = req.param('username'),
		password = req.param('password'),
		password2 = req.param('password2'),
		mailAddress = req.param('mailAddress'),
		mailAddress2 = req.param('mailAddress2'),
		gender = req.param('gender'),
		birthDate = req.param('birthDate'),
		prefecture = req.param('prefecture'),
		profile = req.param('profile');


	var userInfo = new UserInfo({
		username: username
	});
	
	userInfo.setPassword(password, password2);
	userInfo.setMailAddress(mailAddress, mailAddress2);
	
	userInfo.save(function(err, result) {
		if (err) {
			if(err.code === 11000) {
				//ユーザー名の重複
				return res.redirect('back');
			}
			if (err.name === 'ValidationError') {
				if(err.errors.password_mismatch) {
					//パスワードミスマッチ
				} else if (err.errors.mailAddress_mismatch) {
					// メールアドレスミスマッチ
				} else {
					// その他
				}
				return res.redirect('back');
			}
			return next(err);
		}
		console.log(result);
		res.redirect('/');
	});
};