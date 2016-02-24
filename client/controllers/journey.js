Session.set('selectedQuestion','');
Session.set('answers','');

Template.journey.events({
	'click #addanswer': function(e,tpl){

		var answer=tpl.$("#answer").val();
		var tag=tpl.$("#tag").val();
		console.log(tag);
		var str=Session.get('answers');
		str=str+answer+':'+tag+';';
		Session.set('answers',str);
		console.log(Session.get('answers'));
	},
	'click #addquestion': function(e,tpl){
		var question=tpl.$("#question").val();
		var category=tpl.$("#category").val();
		var parentanswer=tpl.$("#answerparent").val();
		var answers=Session.get('answers');
		var obj={
			question:question,
			parent:parentanswer,
			category:category,
			answers:[]
		};
		if(answers!=''){
			answers=answers.split(";");

			for(var i=0;i<answers.length;i++){
				if(answers[i]=='')
					break;
				var txt=answers[i].split(":")[0];
				var tag=answers[i].split(":")[1];
				var id=Random.id();
				var attr={
					id:id,
					text:txt,
					tag:tag
				};
				obj.answers.push(attr)

			}
			Session.set('selectedQuestion','');
			Session.set('answers','');
			Meteor.call('addQuestion',obj);
			alert("Added!");
		}
	},
	'change #questionparent': function(event, tpl) {
		Session.set('selectedQuestion',tpl.$("#questionparent").val());
	}
});

Template.journey.helpers({
	getCat: function(){
		return categories.find({});
	},
	getQuestion: function(){
		return journey.find();
	},
	selectedQuestion :function(){
		return Session.get('selectedQuestion');
	},
	getAnswers :function(questionId){
		return journey.findOne({"_id":questionId});
	}
});
