Session.set('answerSelected','');
Template.sellings.helpers({
	questions: function(){

		console.log('question:'+linkselling.find().fetch().length);
		return linkselling.find();
	},
	sum: function(list){
		var sum=0;
		for(var i=0;i<list.length;i++){
			var curProduct=products.findOne({"_id":list[i]});
			sum=sum+Number(curProduct.price);
		}
		return sum;
	}
});


Template.sellings.events({
	'click #hamly': function(e,tpl){
		e.preventDefault();
	    
	    Session.set('answerSelected',this.id);
	    $('#link').modal('show');
	    console.log("newAnswer:"+Session.get('answerSelected'));
    }
});

Template.popupselling.helpers({
	answerSelected: function(){
		return Session.get('answerSelected');
	},
	getAnswer: function(answerid){
		console.log("answer: "+Session.get('answerSelected'));
		var link=linkselling.findOne({"answers.id":answerid},{fields: {"answers":1}});
		var obj={};
		for(var i=0;i<link.answers.length;i++){
			if(link.answers[i].id==answerid)
				obj=link.answers[i];
		}
		console.log("Response:"+JSON.stringify(link));
		return obj;
	},
	sum: function(list){
		var sum=0;
		for(var i=0;i<list.length;i++){
			var curProduct=products.findOne({"_id":list[i]});
			sum=sum+Number(curProduct.price);
		}
		return sum;
	},
	availableshops: function(listproducts){
		//var rq=shops.find({"products.products"});
	},
	getProduct: function(id){
		return products.findOne({"_id":id});
	}

});