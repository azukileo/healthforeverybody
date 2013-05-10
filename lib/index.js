

exports.dynamicHelpers = {
	// エラーメッセージ画面表示用ヘルパー
	message: function(req, res) {
		return function() {
			var messages = req.form.errors;
			if(!messages) {
				return '';
			}
			var buf = '<ul class="error_messages">';
			messages.forEach(function(msg) {
				var li = '<li>' + msg + '</li>';
				buf += li;
			});
			buf += '</li>';
			return buf;
		};
	}
}