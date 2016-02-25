Meteor.methods({
	addReview: function(title,text,grade,userid,productId){
		var curDate=Date.now();
		var attr={
			title:title,
			comment:text,
			grade:grade,
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

	}
});