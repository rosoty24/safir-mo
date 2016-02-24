Template.proDiscount.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});
Template.updateProDiscount.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});
Template.manageDiscount.events({
	'click #remove':function(){
		var id = this._id;
		alert("my id here:"+id);
		Meteor.call("deletediscount",id);

	},
	'change #discountName':function(e){
		var discountName = $("#discountName option:selected").html();
		//alert(discountName);
		Session.set('DIS_PERCENTAG', undefined);
		Session.set('DIS_NAME',discountName);
	},
	'change #percentage':function(){
		var percentage = $('#percentage').val();
		//alert(percentage);
		Session.set('DIS_NAME', undefined);
		Session.set('DIS_PERCENTAG',percentage);
	},
	'click #selectAll':function(){
		Session.set('DIS_PERCENTAG', undefined);
		Session.set('DIS_NAME',undefined);
		Session.set("GETALL");
	}
});
Template.manageDiscount.helpers({
	getTime:function(dateStart){
     	if(typeof(dateStart) == "number"){
     	var d = new Date(dateStart), // Convert the passed timestamp to milliseconds
		  yyyy = d.getFullYear(),
		  mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
		  dd = ('0' + d.getDate()).slice(-2),   // Add leading 0.
		  hh = d.getHours(),
		  h = hh,
		  min = ('0' + d.getMinutes()).slice(-2),  // Add leading 0.
		  ampm = 'AM',
		  dateStart;
	   
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
 		}else{
 		    return "no date";

 		}
		  
     },
     // getName:function(){
     // 	return discount.find();
     // },
     getName:function(){
        var arr=[];
            function onlyUnique(value, index, self) { 
             return self.indexOf(value) === index;
            }
            var result = discount.find();
            result.forEach(function(value){
                arr.push(value.name);
            });
            //alert('arr='+JSON.stringify(arr));
            var unique = arr.filter(onlyUnique);
      		//alert('arr='+JSON.stringify(unique));
            return unique;
        },
        getPercentag:function(){
        var arr=[];
            function onlyUnique(value, index, self) { 
             return self.indexOf(value) === index;
            }
            var result = discount.find();
            result.forEach(function(value){
                arr.push(value.percentage);
            });
            //alert('arr='+JSON.stringify(arr));
            var unique = arr.filter(onlyUnique);
      		//alert('arr='+JSON.stringify(unique));
            return unique;
        },
	getDiscount:function(){
		var getName = Session.get('DIS_NAME');
		var getPercentage = Session.get('DIS_PERCENTAG');
		var getAll = Session.get("GETALL");
		console.log("NAME="+getName);
		console.log("PER="+getPercentage);
		if(getName){
			
			return discount.find({"name":getName}).map(function(document, index){
			    document.index = index+1;
			    return document;
			});
		}
		else if(getPercentage){
			
			return discount.find({"percentage":getPercentage}).map(function(document, index){
			    document.index = index+1;
			    return document;
			});
		}
		else if(getAll){
			var result = discount.find().map(function(document, index){
			    document.index = index+1;
			    return document;
			});
			return result;
		}
		else{
				var result = discount.find().map(function(document, index){
			    document.index = index+1;
			    return document;
			});
			return result;
		}
	},
    getProductName:function(proid){
    	var result = products.findOne({_id:proid});
    	var a = result.title;
    	return a;
    }

});

Template.proDiscount.helpers({
	getProducts:function(){
		return products.find();
	}
});

Template.proDiscount.events({
	'click #btn-save':function(e,tpl){
		e.preventDefault();
		var name = tpl.$("#name").val();
		var proId = $('#product_name').val();
		alert(proId);
		var image = Session.get('ADDIMAGEID');
		var discount = tpl.$('#pro_discount').val();
		var startDate = tpl.$('#startDate').val();
		var dateStart = new Date(startDate).getTime();
		var endDate = tpl.$('#endDate').val();
		var dateEnd = new Date(endDate).getTime();
		var obj ={
			name:name,
			image:image,
			proId:proId,
			percentage:discount,
			dateStart:dateStart,
			dateEnd:dateEnd
		}
		if (name == "" || name == null) {
			Bert.alert( 'Please input name', 'danger', 'growl-top-right', 'fa-bolt' );
		}
		else if(image == "" || image == null){
			Bert.alert( 'Please choose image', 'danger', 'growl-top-right', 'fa-bolt' );
		}
		else if(discount == "" || discount == null){
			Bert.alert( 'Please input Discount', 'danger', 'growl-top-right', 'fa-bolt' );
		}
		else if(startDate == "" || startDate == null){
			Bert.alert( 'Please input start date', 'danger', 'growl-top-right', 'fa-bolt' );
		}
		else if(endDate == "" || endDate == null){
			Bert.alert('Please input end date', 'danger', 'growl-top-right');
		}
		else{
			Meteor.call("insertProDiscount",obj,function (err){
			if(err)
				console.log("Discount Error: "+err.reason);
			else 
				console.log("Success!!!");
				Router.go("/manageDiscount");
		});
		}
		
	},
	'change #image': function(event, template) {
		event.preventDefault();
		var files = event.target.files;
		for (var i = 0, ln = files.length; i < ln; i++) {
			images.insert(files[i], function (err, fileObj) {
				console.log('inserted image: '+fileObj);
				console.log('error:'+JSON.stringify(err));
				Session.set('ADDIMAGEID', fileObj._id);
			});
		}
	},
	'change #product_name':function(e){
		e.preventDefault();
		var pro_name = $('#product_name').val();
		Session.set("PRODUCTNAME",pro_name);
	}
});


//=============================update Product discount=============
Template.updateProDiscount.helpers({
	getTime:function(dateStart){
     	if(typeof(dateStart) == "number"){
     	var d = new Date(dateStart), // Convert the passed timestamp to milliseconds
		  yyyy = d.getFullYear(),
		  mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
		  dd = ('0' + d.getDate()).slice(-2),   // Add leading 0.
		  hh = d.getHours(),
		  h = hh,
		  min = ('0' + d.getMinutes()).slice(-2),  // Add leading 0.
		  ampm = 'AM',
		  dateStart;
	   
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
 		}else{
 		    return "no date";

 		}
		  
     },
	getProducts:function(){
		return products.find();
	},
	currentPro:function(id){
		return products.findOne({_id:id}).title;
	},
	getDiscount:function(){
		return discount.find();
	}
});
Template.updateProDiscount.events({
	'click #btn-update':function(e,tpl){
		e.preventDefault();
		var id = this._id;
		var name = tpl.$("#name").val();
		var pro_id = $("#product_name").val();
		alert(pro_id);
		var image = Session.get('ADDIMAGEID');
		var discount = tpl.$('#pro_discount').val();
		var startDate = tpl.$('#startDate').val();
		var dateStart = new Date(startDate).getTime();
		var endDate = tpl.$('#endDate').val();
		var dateEnd = new Date(endDate).getTime();
		//alert(startDate+endDate);
		var obj ={
			name:name,
			image:image,
			proId:pro_id,
			percentage:discount,
			dateStart:dateStart,
			dateEnd:dateEnd
		}
		Meteor.call("updateProDiscount",id,obj,function (err){
			if(err)
				console.log("Discount Error: "+err.reason);
			else 
				console.log("Success!!!");
				Router.go("/manageDiscount");
		});
	},
	'change #image': function(event, template) {
		event.preventDefault();
		var files = event.target.files;
		for (var i = 0, ln = files.length; i < ln; i++) {
			images.insert(files[i], function (err, fileObj) {
				console.log('inserted image: '+fileObj);
				console.log('error:'+JSON.stringify(err));
				Session.set('ADDIMAGEID', fileObj._id);
			});
		}
	},
	'change #product_name':function(e){
		e.preventDefault();
		var pro_name = $('#product_name').val();
		Session.set("PRODUCTNAME",pro_name);
	}

});
Template.updateProDiscount.helpers({
	getDiscount:function(){
		return discount.find();
	}

});

// Template.updateProDiscount.events({
// 	'change #datepick': function (e, tmpl) {
//      	var date = moment(e.timeStamp).format("lll");
//    		$('#datepickerend input').val(date);
//   	}
// });

