Meteor.startup(function () {
//GoogleMaps.load();
// process.env.MAIL_URL="smtp://tinhamly%40gmail.com:0977484889@smtp.gmail.com:465/";
process.env.MAIL_URL="smtp://djibril.cisse%40noo-lab.com:senegal95@ssl0.ovh.net:465/";
//smtp://djibril.cisse7%40%noo-lab.com:senegal95@ssl0.ovh.net:465


});
Meteor.methods({
	mysendEmail: function (to, subject, html) {
		this.unblock();
		Email.send({
			to: to,
			from: 'djibril.cisse@gmail.com',
			cc:'kisphly.sup@gmail.com',
			subject: subject,
			html: html
		});
	},
	inviteFriends: function (to, subject, message) {
		this.unblock();
		var result=Email.send({
			to: to,
			from: 'djibril.cisse@gmail.com',
			cc:'kisphly.sup@gmail.com',
			subject: subject,
			html: message
			

		});
	},
	insertImedation:function(obj){
		imedation.insert(obj);
	}

});