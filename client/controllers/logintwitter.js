Template.logintwitter.events({
		'click #twitter-login': function(event) {
		Meteor.loginWithTwitter({}, function(err) {
		if (err) {
		throw new Meteor.Error("Twitter login failed");
		}
		});
		},
		'click #logout': function(event) {
		Meteor.logout(function(err) {
		if (err) {
		throw new Meteor.Error("Logout failed");
		}
		})
		}
});

Template.logintwitter.onRendered(function(){
	$("#twitter-login").click();

});