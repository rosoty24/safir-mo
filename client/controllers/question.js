Template.profile.helpers({
	getquestion:function(){
		return question.find({});
	},
	getAnswer: function(question_id){
		var userId=Meteor.userId();
		//console.log("userId: "+userId);
		var answer=users.find({"_id":userId,"answerdata.qcmId":question_id},{fields:{"answerdata":1}});
		//console.log("res:"+answer.fetch()[0].answerdata.length);
		//console.log(answer.fetch()[0]);
		if(answer.fetch().length==0)
			return "";
		else{
			var ret="";
			for(var i=0;i<answer.fetch()[0].answerdata.length;i++){
				//console.log("current answer="+answer.fetch()[0].answerdata[i].answer+" / "+answer.fetch()[0].answerdata[i].qcmId);
				if(answer.fetch()[0].answerdata[i].qcmId==question_id)
					ret=answer.fetch()[0].answerdata[i].answer;
			}
				
			//console.log("ret="+ret);
			return ret;
		}
	}
});
	Template.addquestion.events({
	'click #btnAdd':function(e){
		e.preventDefault();
		var question = $('#question').val();
		var tag = $('#tag').val();
		var obj = {
			name:question,
			tag:tag
		}
		Meteor.call('insertQuestion',obj);
		Router.go("/managequestion");
	}
});
Template.managequestion.helpers({
	getquestion: function(){
		return question.find();
	}
});
Template.updatequestion.events({
	'click #btnUpdate':function(e){
		e.preventDefault();
		var id =this._id;
		var question = $('#question').val();
		var tag = $('#tag').val();
		var obj = {
			question:question,
			tag:tag
		}
		Meteor.call('updateQuestion',id,obj);
		Router.go("/managequestion");
	}
});
Template.managequestion.events({
	'click #delete': function(e){
		e.preventDefault();
		question.remove({_id:this._id});
	},
	'click #goadd': function(){
		Router.go("/addquestion");
	}
});