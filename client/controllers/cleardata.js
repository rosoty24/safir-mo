Template.cleardata.events({
	'click #clear_comment':function(e){
		e.preventDefault();
		Meteor.call('clearcomment');
		alert('clear successfully');
	},
	'click #clear_order':function(e){
		e.preventDefault();
		Meteor.call('clearorder');
		alert('clear successfully');
	},
	'click #clear_comment_content':function(e){
		e.preventDefault();
		Meteor.call('clearCommentContent');
		alert('clear successfully');
	}
});