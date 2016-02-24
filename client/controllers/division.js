Template.division.events({
	'click #divide': function(e,tpl){
		Meteor.call('divide');
	}

});