Session.set('sesIndex',0);
Session.set('strqu','');
Template.quizzQA.rendered = function() {
    $("#quizzpop").click();
}
Template.listQuizz.events({
	'click #quizzName':function(){
		var id = this._id;
		Session.set("QUIZZID", id);
	}
});
Template.quizzQA.events({
	'click #goNext':function(e){
		//alert("submit here");
		var arr=[];
		e.preventDefault();
		var index=Session.get('sesIndex');
		quizzId = Session.get("QUIZZID");
		//alert(index);
		Session.set('sesIndex',index+1);
		//alert('qu='+this.question[index].question);
		var question=this.question[index].question;
		var answer=$("input[name='radios_checkbox']:checked").val();
		var str=question+':'+answer+';';
		if(Session.get('strqu')==''){
			var newstr=str;
		}else{
			var newstr=str+Session.get('strqu');
		}
		Session.set('strqu',newstr);
		//alert(newstr);
		var quAndan= Session.get('strqu').split(';');
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
		//alert(this.question.length+'ses='+Session.get('sesIndex'));
		var countqu=this.question.length;
		var countses=Session.get('sesIndex');
		//alert(countqu);
		//alert(countses);
		//alert('makara='+JSON.stringify(arr));
		if(countqu == countses){
			Meteor.call('insertQuestionAnswer',{quizzId,userId:Meteor.userId(),quizz:arr},function(error){
				if(error){
					console.log("insertQuestionAnswer error"+error.reason)
				}else{
					console.log("insertQuestionAnswer success");
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
		//alert(question);
	},
	'click #backqu':function(e){
		Session.set('sesIndex',Session.get('sesIndex')-1);
		if(Session.get('sesIndex')<0){
			Session.set('sesIndex',0);
		}
		var index=Session.get('sesIndex');
		var question=this.question[index].question;
		var answer=$("input[name='checkbox']:checked").val();
		var str=question+':'+answer+';';
		var newStr=Session.get('strqu').replace(str,'');
		Session.set('strqu',newStr);
		//alert(Session.get('strqu'));
	},
	'click #goBack':function(){
		Router.go('/listQuizz');
	}

});
Template.quizzQA.helpers({
	getFirstQu:function(question){
		//return question[0];
		var index=Session.get('sesIndex');
		//alert('question='+question.length);
		//alert('index='+index);
		if(question.length-1<index){
			Session.set('sesIndex',question.length-1);
			index=Session.get('sesIndex');
		}
		return question[index];
	}
});
