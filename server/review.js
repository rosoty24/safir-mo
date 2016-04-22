Meteor.methods({
	addReview: function(title,text,userid,productId){
		var curDate=Date.now();
		var attr={
			title:title,
			comment:text,
			user:userid,
			date:curDate
		};
		products.update({ "_id": productId },{ $addToSet: {review: attr }});
		
	},
	addReviewwebzine: function(title,text,grade,userid,productId){
		var curDate=Date.now();
		var attr={
			title:title,
			comment:text,
			grade:grade,
			user:userid,
			date:curDate
		};

		contents.update(
   { "_id": productId },
   { $addToSet: {review: attr } });

	},
	addReviewTuto: function(text,userid,productId){
		var curDate=Date.now();
		var attr={
			comment:text,
			user:userid,
			date:curDate
		};

		contents.update({ "_id": productId },{ $addToSet: {review: attr }});

	},
	addreviewdetail: function(title,comment,userid,productid){
		var date=new Date();
		var attr={
			'title':title,
			'comment':comment,
			'userid':userid,
			'date':date
		};
		console.log('Adding this review '+JSON.stringify(attr));
		products.update({_id:productid},{ $push: { review: attr } });

	},
	commentDetail:function(){
    	var arr=[];
    	var array=[];
    	var userid = Meteor.userId();
    	var userComment = products.find({"review.user":userid});
    	if(userComment){
	    	userComment.forEach(function(value){
	    		for(var i=0;i<value.review.length;i++){
	    			if(value.review[i].user==userid){
	    				arr.push(value.review[i].user);
	    			}
	    		}
	    	});
	    	console.log('myuser==='+arr.length);
	    	return arr.length;
	    }else{
	    	return 1;
	    }
    } 
});