Template.userOrderList.helpers({
	getUser:function(userId){
    	var result = users.findOne({_id:userId});
    	return result.profile.firstname;
    },
    getOrder:function(){
    	var user = Meteor.userId();
    	return order.find({userid:user});
    },
    getProductName:function(title){
    	var result = products.findOne({_id:title}).title;
    	return result;
    },
    getProductInfo:function(product){
    	var result = products.findOne({_id:product});
    	return result;
    },
    getProduct:function(){
    	return order.find({});
    },
    getTime:function(time){

		  var d = new Date(time * 1000), // Convert the passed timestamp to milliseconds
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
	 	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
	
		return time;
     }
});

Template.orderDetail.events({
	'click #mypro':function(){
		var id = this._id;
		alert(id);
	},
	"click i.fa-3x":function(e){
        e.preventDefault();
        var userId = Meteor.userId();
        var star= $(e.currentTarget).attr("class");
        var rank= $(e.currentTarget).attr("value");
        //alert("star: "+score);
        if(star.match("fa-star-o")){
            $(e.currentTarget).removeClass("fa-star-o");
            $(e.currentTarget).prevAll(".fa-3x").removeClass("fa-star-o");
            $(e.currentTarget).prevAll(".fa-3x").addClass("fa-star");
            $(e.currentTarget).addClass("fa-star");
        }else{
            $(e.currentTarget).nextAll(".fa-3x").addClass("fa-star-o");
            $(e.currentTarget).nextAll(".fa-3x").removeClass("fa-star");
        }
        Session.set("RANK",rank);
    },
	'click #addreview':function(e){
		e.preventDefault();
		var id = this.id_product;
		var title = $(".title_"+id).val();
		//alert(title);
		var comment = $(".review_"+id).val();
		//alert("comment is "+comment);
		var user = Meteor.userId();
		var rank = Session.get("RANK");
		//alert(rank);
		var date = Date.now();
		var orderId = $("#orderid").val();
		var proId = $(".pro_"+id).val();

		var attr={
                    'title':title,
					'comment':comment,
					'rank' : rank,
					'grade':1,
					'user':user,
					'type':'userReview',
					'orderId': orderId,
					'date':date
        }
        if(title==""){
        	Bert.alert( 'required title', 'danger', 'growl-top-right' );
        }
        else if(comment==""){
        	Bert.alert( 'required comment', 'danger', 'growl-top-right' );
        }
        else if(rank == "" || rank == null){
        	Bert.alert( 'required rank', 'danger', 'growl-top-right' );
        }
		else if(user){
            Meteor.call('updateReview',id,attr);
            Bert.alert( 'success', 'success', 'growl-top-right' );
           	 $(".toggle-wrap").hide();
        }else{
           Bert.alert( 'Please login first', 'danger', 'growl-top-right' );
        }
	},
	'click #back':function(e){
		e.preventDefault();
		Router.go("/userOrderList");
	}
});

Template.orderDetail.helpers({
	getProductOrder:function(){
		var user = Meteor.userId();
    	return order.find({userid:user});
	},
	getProductInfo:function(product){
    	var result = products.findOne({_id:product});
    	return result;
    }
});

