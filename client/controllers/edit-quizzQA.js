Session.set('EditsesIndex',0);
Session.set('Editstrqu','');
Template.editquizzQA.rendered = function() {
    $("#quizzpop").click();
}
Template.editquizzQA.events({
	'click #goNext':function(e){
		var id = this._id;
			var arr=[];
			e.preventDefault();
			var index=Session.get('EditsesIndex');
			quizzId = Session.get("QUIZZID");
			Session.set('EditsesIndex',index+1);
			//alert('qu='+this.question[index].question);
			var question=this.question[index].question;
			var answer=$("input[name='radios_checkbox']:checked").val();
			var str=question+':'+answer+';';
			if(Session.get('Editstrqu')==''){
				var newstr=str;
			}else{
				var newstr=str+Session.get('Editstrqu');
			}
			Session.set('Editstrqu',newstr);
			//alert(newstr);
			var quAndan= Session.get('Editstrqu').split(';');
			for(var i=0;i<quAndan.length;i++){
				if(quAndan[i]){
					var arrayquan=quAndan[i].split(':');
					var obj={
						quetion:arrayquan[0],
						answer:arrayquan[1]
					}
					arr.push(obj);
				}
				
			}
			var countqu=this.question.length;
			var countses=Session.get('EditsesIndex');
			if(countqu == countses){
				Meteor.call('redoQuizzAnswer',id,{quizzId,userId:Meteor.userId(),quizz:arr},function(error){
					if(error){
						console.log("editquizzQA error"+error.reason)
					}else{
						console.log("editquizzQA success");
						Session.set('EditsesIndex',0);
						Session.set('Editstrqu','');
					}
				});
				Bert.alert('Insert success','success','growl-top-right');
				Router.go('/listQuizz');
				$('.close').click();
			}
	},
	'click #question':function(){
		alert('ok');
		var qestion = $("#q_id").val();
		console.log(question);
	},
	'click #goBack':function(){
		Router.go('/listQuizz');
	}

});
Template.editquizzQA.helpers({
	getFirstQu:function(question){
		var index=Session.get('EditsesIndex');
		if(question.length-1<index){
			Session.set('EditsesIndex',question.length-1);
			index=Session.get('EditsesIndex');
		}
		console.log(question[index]);
		return question[index];
	}
});
