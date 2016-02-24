Template.memberReview.helpers({
	getReview:function(){
		var userId = Meteor.userId();
		return products.find(  { review: { $elemMatch: { user: userId } } } );
	},
	getRank:function(rank){
		var userId = Meteor.userId();
		var counter=0;
		 var list=products.find({"review.user":userId,"review.rank":rank}).fetch();
		 console.log(list);
		 for(var i=0;i<list.length;i++){
		 	for(var j=0;j<list[i].review.length;j++){
		 		if(list[i].review[j].rank==rank)
		 			counter++;
		 	}
		 }
		 console.log("MYCOUNT="+counter);
	 	var resutl = list.count();
	 	console.log("RESULT_COUNT="+resutl);
	},
	getTime:function(date){

		  var d = new Date(date), // Convert the passed timestamp to milliseconds
		  yyyy = d.getFullYear(),
		  mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
		  dd = ('0' + d.getDate()).slice(-2),   // Add leading 0.
		  hh = d.getHours(),
		  h = hh,
		  min = ('0' + d.getMinutes()).slice(-2),  // Add leading 0.
		  ampm = 'AM',
		  time;
	   
		 if (hh > 12) {
		  	h = hh - 12;
		  	ampm = 'PM';
		 } else if (hh === 12) {
	  	 h = 12;
		  	 ampm = 'PM';
		 } else if (hh == 0) {
		  	h = 12;
		 }
	 // ie: 2013-02-18, 8:35 AM 
	 	time = yyyy + '-' + mm + '-' + dd ;
	
		return time;
     },
     getProductDetail:function(){
		var id = this._id;
		console.log("PRODUCT ID======="+id);
	}
});