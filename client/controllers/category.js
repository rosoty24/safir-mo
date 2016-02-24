
Session.set("search",'');
Session.set("refine",'');
Session.set("rating",'');
Session.set("brand",'');
Session.set("advance",'');
Session.set('subcategories','');
Session.set('multiUploadCategory','');

Session.set('limit', -1);

Template.listing.rendered = function(){
		console.log('DJIBI');
		Session.set('limit',20);
	  	console.log('CHANGING LIMIT TO 20');
	  // Use the Packery jQuery plugin
	  //console.log("MACTEGORY:"+this.data._id);
	  if(journey.find({"category":this.data._id}).fetch().length>0)
	  	$('#myJourney').modal('show');
	  //$("#refine").click();
	  
		/*$("#refine").click(function(){
			$("#body_refine").slideToggle("slow");
		});
		//$('#sl2').slider();  
		$('#sl2').slider().on('slideStop', function(ev){
			var value = $('.tooltip-inner').text();
			data = value.split(":");
			console.log(value);
			Session.set('refine',data);
		});
		*/
	
};

Template.listing.onDestroyed(function () {
 
  Session.set('limit',-1);
  console.log('CHANGING LIMIT TO -1');
});

// add categories
Template.addcategory.events({
	'submit form': function(e){
		e.preventDefault();
		var imgArray=[];
		var title = $('#title').val();
		var parent = $('#parent').val();
		var imgArray=Session.get('multiUploadCategory').split(":");

		Meteor.call("addCat", title, parent, imgArray);
		Router.go("/managecategory");
	},
	'change #image': function(event, template) {
		event.preventDefault();
	    var files = event.target.files;
	    for (var i = 0, ln = files.length; i < ln; i++) {
	      images.insert(files[i], function (err, fileObj) {
	      if(Session.get('multiUploadCategory')){
	      	var strImage=Session.get('multiUploadCategory')+":"+fileObj._id;
	      }else{
	      	var strImage=fileObj._id;
	      }
	      Session.set('multiUploadCategory',strImage);
	        
		 });
    	}
  	},
    'click #rmFile':function(e){
    	e.preventDefault();
    	var result=confirm('Do you want to delete?');
    	if(result){
    		var aferRemove=Session.get('multiUploadCategory').replace(this.image,'');
    		Session.set('multiUploadCategory',aferRemove);
	    	images.remove(this.image, function(err, file) {
		        if (err) {
		        	console.log('error', err);
		        }else {
		            console.log('remove success');
		            success();
		        };
	        });
    	}  	

    }
	
});

Template.addcategory.helpers({
	getIdImage:function(){
		var arr=[];
		var arrayImage=Session.get('multiUploadCategory').split(":");
		for(var i=0;i<arrayImage.length;i++){
			if(arrayImage[i]){
				var obj={
					image:arrayImage[i]
				}
				arr.push(obj);
			}
		}
		return arr;
	}
});

Template.updatecategory.events({
	"submit form": function(e) {
		e.preventDefault();
		var arrayIMG=[];
		var id = $("#idRecord").val();
		var title = $('#title').val();
		var parent = $('#parent').val();

		$('input[name="checkImg"]:checked').each(function() {
		   arrayIMG.push(this.value);
		});

		var attr={
			title:title,
			parent:parent,
			image:arrayIMG
		};
		Meteor.call('updateCat',id, attr);
		Router.go('/manageCategory');   
	},
	'change #image': function(event, template) {
		event.preventDefault();
		var arrayImage=[];
		var imagsearr=this.image;
		for(var j=0;j<imagsearr.length;j++){
			arrayImage.push(imagsearr[j]);
		}
		
		var files = event.target.files;
		for (var i = 0, ln = files.length; i < ln; i++) {
			images.insert(files[i], function (err, fileObj) {
			
				if(Session.get('multiUploadCategory')){
					var strImage=Session.get('multiUploadCategory')+','+fileObj._id;
				}else{
				
					var strImage=arrayImage.toString()+','+fileObj._id;
					
				}
				Session.set('multiUploadCategory',strImage);

			});			

		}
	}
});

Template.updatecategory.helpers({
	getCat: function(cat){
		var cats = categories.findOne({_id:cat});
		Session.set('data',cats.title);
		return cats.title;
	},
	checkParent:function(catId,realParent){
		
		return catId==realParent.parent;
	},
	getCatall: function(){
		//var catName = Session.get('data');
		return categories.find({});
	},
	getIdImage:function(image){
		if(Session.get('multiUploadCategory')){
			var imageArr=Session.get('multiUploadCategory').split(',');
		}else{
			var imageArr=image;
		}

		var nameImage=[];
		for(var i=0;i<imageArr.length;i++){
			var img = images.findOne({_id:imageArr[i]});
			if(!img)
				continue;
			if(!img.copies)
				continue;
            console.log(img.copies.images.key);
            var name=img.copies.images.key;
            var obj={
            	imageId:imageArr[i],
            	imageName:name
            }
            nameImage.push(obj);
		}
		console.log('All img='+JSON.stringify(nameImage));
		return nameImage;
	},
	getListImg: function(image){
		var p=categories.findOne({_id:image});
		console.log("img p" + p);
		if(p.image instanceof Array)
			return p.image;
		else
			return [p.image];
	}
});

Template.managecategory.events({
	'click #remove': function(){
		var id = this._id;
		if (confirm("Are you sure you want to delete this Category?")){
			Meteor.call('deleteCategory', id);
		}
	}
	
});
// helpers categories
Template.addcategory.helpers({
	getCategories: function(){	
		return categories.find();
	}	
});	

Template.managecategory.helpers({
	manageCat: function(){
		var result = categories.find({});
		console.log(result);
		return result;
	},
	catName: function(cat){
		if(cat=='0')
			return;
		var result = categories.findOne({_id:cat});
		return result.title;
    },
    getListImg: function(product){
		var p=categories.findOne({_id:product});
		console.log("img p" + p);
		if(p.image instanceof Array)
			return p.image;
		else
			return [p.image];
	}
});



Template.listing.helpers({
	isLiked: function(productId){
		if(Session.get('userId')){
    		  var ses=Session.get('userId');
	          var data=  favorite.find({userId:ses});
	          var object=[];
	          var obj={};
	          var found=false;
	          data.forEach(function(entry) {
	            var proid=entry.proId;
	            if(proid==productId)
	            	found=true;
	                
	           });
	          //console.log(found);
        		return found;
    	}else
    		return false;
	},
	parentTag: function(category){
		return parent_tags.find({"category_id":category});
	},
	tags: function(parent){
		return tags.find({parent:parent});
	},
	search: function(){
		return Session.get('search');
	},
	refine: function(){
		return Session.get('refine');
	},
	rating: function(){
		return Session.get('rating');
	},
	getChildrenCaegories: function(category){

	},
	limit: function(){
		return Session.get('limit');
	},
	brand: function(){
		return Session.get('brand');
	},
	advance: function(){
		return Session.get('advance');
	},
	listParent: function(category){
		var finalList=[];
		var curCat=categories.findOne({"_id":category});
		finalList.push(curCat);
		var current=categories.findOne({"_id":category}).parent;
		while(current!="0"){
			curCat=categories.findOne({"_id":current});
			//console.log('parent:'+curCat.title);
			finalList.push(curCat);
			current=categories.findOne({"_id":current}).parent;
		}
		var revert=[];
		for(var i=finalList.length-1;i>=0;i--)
			revert.push(finalList[i]);
		return revert;
	},

	countResult: function(){
		return 879;
	},

	filter: function(list,category, refine, rating, brand,tags){
		console.log("Refine ="+refine);
		var ids=list.split(";");
		var result;

		var fils=Meteor.call('getChildrenList',category,function(err,result){
			//console.log('fils:'+result);
			//console.log('err:'+err);
			var finalList=result;
			finalList.push(category);
			Session.set('subcategories',finalList);
			//console.log('subcategories:'+Session.get('subcategories'));

			
		});

		/*
		var id= [];
		var cat = categories.findOne({_id:category});
		if(cat.parent == 0){
			result = categories.find({"parent":category}).fetch();
			result.map(function (data) {
				id.push(data._id);
			});
		}else{
			id.push(category);
			//result= products.find({"tags":{$in: ids},"category":category});
		}
		console.log("visal"+id);
		*/
		var query ="";
		if( refine.length > 0 || rating.length > 0 || brand.length > 0 || tags.length > 0){
			var min = parseInt(refine[0]);
			var max = parseInt(refine[1]);

			if(rating.length > 0) rating = parseInt(rating);
			else rating = "";

			//price
			if( refine.length > 0 && rating =="" && brand.length <= 0 && tags.length <= 0 ){
				query = {"price":{$gte:min, $lte:max}, "category":{$in:Session.get('subcategories')}};
				console.log("price ok");
			}
			//price + rate
			else if( refine.length > 0 && rating !="" && brand.length <= 0 && tags.length <= 0 ){
				query = {"review.grade":rating,"price" : {$gte:min, $lte:max},"category":{$in:Session.get('subcategories')}};
				console.log("price + rate ok");
			}
			//price + brand
			else if( refine.length > 0 && rating =="" && brand.length > 0 && tags.length <= 0 ){
				query = {"price" : {$gte:min, $lte:max},"brand": { $in: brand },"category":{$in:Session.get('subcategories')}};
				console.log("price + brand ok");
			}
			//price + rate + brand
			else if( refine.length > 0 && rating !="" && brand.length > 0 && tags.length <= 0 ){
				query = {"review.grade":rating,"price" : {$gte:min, $lte:max},"brand": { $in: brand },"category":{$in:Session.get('subcategories')}};
				console.log("price + rate + brand ok");}
			//price + rate + brand + tags
			else if( refine.length > 0 && rating !="" && brand.length > 0 && tags.length > 0 ){
				query = {"review.grade":rating,"price" : {$gte:min, $lte:max},"brand": { $in: brand },"tags": { $in: tags },"category":{$in:Session.get('subcategories')}};
				console.log("price + rate + brand + tags ok");
			}
			//rate
			else if( refine.length <= 0 && rating !="" && brand.length <= 0 && tags.length <= 0 ){
				query = {"review.grade":rating,"category":{$in:Session.get('subcategories')}};
				console.log("rate ok");
			}
			//rate + brand
			else if( refine.length <= 0 && rating !="" && brand.length > 0 && tags.length <= 0 ){
				query = {"review.grade":rating, "brand": { $in: brand },"category":{$in:Session.get('subcategories')}};

			}
			//rate +  tags
			else if( refine.length <= 0 && rating !="" && brand.length <= 0 && tags.length > 0 ){
				query = {"review.grade":rating, "tags": { $in: tags },"category":{$in:Session.get('subcategories')}};
				console.log("rate +  tags ok");
			}
			//rate + brand +  tags

			else if( refine.length <= 0 && rating !="" && brand.length > 0 && tags.length > 0 ){
				query = {"review.grade":rating, "brand": { $in: brand }, "tags": { $in: tags },"category":{$in:Session.get('subcategories')}};
				console.log("rate + brand +  tags ok");
			}
			//brand
			else if( refine.length <= 0 && rating =="" && brand.length > 0 && tags.length <= 0 ){
				query = {"brand": { $in: brand },"category":{$in:Session.get('subcategories')}};
				console.log("brand ok");
			}
			//brand + tags
			else if( refine.length <= 0 && rating =="" && brand.length > 0 && tags.length > 0 ){
				query = {"brand": { $in: brand }, "tags": { $in: tags },"category":{$in:Session.get('subcategories')}};
				console.log("brand + tags ok");
			}
			//tags
			else if( refine.length <= 0 && rating =="" && brand.length <= 0 && tags.length > 0 ){
				query = {"tags": { $in: tags },"category":{$in:Session.get('subcategories')}};
				console.log(" tags ok");
			}
			//tags + price
			else if( refine.length > 0 && rating =="" && brand.length <= 0 && tags.length > 0 ){
				query = {"price" : {$gte:min, $lte:max}, "tags": { $in: tags },"category":{$in:Session.get('subcategories')}};
				console.log(" tags + price ok");
			}
			result = products.find(query);
			console.log('Result:'+result.fetch().length);
		}
		else{
			if(list ==""){

				console.log('before query');
				if(Array.isArray(Session.get('subcategories'))){
					result= products.find({"category":{$in:Session.get('subcategories')}});
					console.log('id:'+Session.get('subcategories'));
					console.log("size7:"+result.fetch().length);
				}
				
			}else{
				result= products.find({"category":{$in:[Session.get('subcategories')]}});
				console.log("size8:"+result.fetch().length);
			}
		}

		//console.log(result.fetch()[0]);
		return result;
	},
	/*
	filter: function(list,category, refine, rating){

		var fils=Meteor.call('getChildrenList',category,function(err,result){
			console.log('fils:'+result);
			console.log('err:'+err);
			var finalList=result;
			finalList.push(category);
			Session.set('subcategories',finalList);
			console.log('subcategories:'+Session.get('subcategories'));

			
		});
		
		console.log('list:'+list);
		console.log('category:'+category);
		console.log('rating:'+rating);
		console.log("rating.length: "+rating.length);
		var ids=list.split(";");
		var result;
		console.log("Refine: "+refine);
		if( refine.length > 0 || rating!=""){
			var min = parseInt(refine[0]);
			var max = parseInt(refine[1]);
			console.log("Min: "+min+"  /  Max:"+max);
			//console.log(rating);
			
			console.log("refine.length: "+refine.length);

			if(rating !="" && refine.length <= 0){
				rating = parseInt(rating);
				result = products.find({"review.grade":rating,"category":{"$in":Session.get('subcategories')}});
				console.log("size1:"+result.fetch().length);
			}	
			else if(refine.length > 0 && rating=="") {
				result = products.find({"price" : {$gte:min, $lte:max},"category":{"$in":Session.get('subcategories')}});
				console.log("size2:"+result.fetch().length);
			}
			else{
				rating = parseInt(rating);
				result = products.find({"review.grade":rating,"price" : {$gte:min, $lte:max},"category":{"$in":Session.get('subcategories')}});
				console.log("size3:"+result.fetch().length);
			}
				
		}
		//else if( refine.length > 0 )
		else{
			if(list ==""){
				result= products.find({"category":{"$in":Session.get('subcategories')}});
				console.log("size4:"+result.fetch().length);
			}else{
				result= products.find({"tags":{$in: ids},"category":{"$in":Session.get('subcategories')}});
				console.log("size5:"+result.fetch().length);
			}
			
			
		}
			
	
		//console.log(result.fetch()[0]);
		return result;
	}*/
});

Template.updatecategory.onRendered(function(){

	Session.set('img_categ',this.data.image);
	
});

Template.addcategory.onRendered(function(){

	Session.set('img_categ','');
	
});

Template.listing.events({
	
	'click .more': function(e,tpl){
		console.log('click');
		var number=Number(Session.get('limit'));
		console.log('val='+number);
		number=number+20;
		Session.set('limit',number);
		console.log('new LIMIT:'+Session.get('limit'));
	},
	'click .tag': function(e){
		var id=this._id+";";
		var position=Session.get('search').indexOf(id);
		console.log(position);
		if(position<0){
			var newVal=Session.get('search')+this._id+";";
			Session.set('search',newVal);
		}else{
			var newVal=Session.get('search').replace(this._id+";","");
			Session.set('search',newVal);
		}
		console.log("Search:"+Session.get('search'));
		
	},
	'click #favorite':function(e){
        
        
             e.preventDefault();
             var id=this._id;
             console.log('id'+Session.get('userId'));
             if(Session.get('userId')){
                 //alert();
                 var obj={
                    proId:id,
                    userId:Session.get('userId')
                 }

                 Meteor.call('insertFavorite',obj);
                 $(event.target).addClass("red");
                 $(event.target).removeClass("fa-heart-o");
                 // alert('Product successfully append to favorite!');
            }
            else{
            	var newId=Random.id();
                Session.setPersistent('userId',newId);
                 //var ses=Session.get('userId');
                 
                 var obj={
                    proId:id,
                    userId:Session.get('userId')
                 }
				$(event.target).addClass("red");
				$(event.target).removeClass("fa-heart-o");
                 Meteor.call('insertFavorite',obj);
                 //alert('Product successfully added to favorite!');
            }
    }
});


