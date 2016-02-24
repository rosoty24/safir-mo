Template.addanwser.events({
	'click #btnAdd': function(e){
		e.preventDefault();
		var question =$('#question').val();
		var answer =$('#answer').val();
		var image =$('#image').val();
		var obj ={
			question:question,
			answer:answer,
			image:image
		}
		Meteor.call("insertanswer",obj);
	},
	'change #image': function(event, template) {
		event.preventDefault();
		var files = event.target.files;
		for (var i = 0, ln = files.length; i < ln; i++) {
			images.insert(files[i], function (err, fileObj) {
				Session.set('banner', fileObj._id);
				alert(fileObj_id);
			});
		}
	}
});
Template.addanwser.helpers({
	getanswer:function(){
		return question.find();
	}
});