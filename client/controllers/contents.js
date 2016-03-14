Session.set('multiUploadContentAdd','');
Session.set('multiUploadContent','');
Session.set('numberOfReviews',2);
Session.set('contentlimit',4);
var processScroll = true;
$(window).scroll(function() {
	if (processScroll  && $(window).scrollTop() > $(document).height() - $(window).height() - 100) {
		processScroll = false;
    // your functionality here
    //alert("Welcome scroll");
    var oldLimit=Session.get('contentlimit');
    oldLimit+=16;
    Session.set('contentlimit',oldLimit);
    processScroll = true;
}
});
Template.addContent.events({
	'submit form': function(e){
		var imgArray=[];
		e.preventDefault();
		var datestr = new Date().toString("yyyy-MM-dd HH:mm:ss");
		var timestamp = (new Date(datestr.split(".").join("-")).getTime())/1000;
		var author = Meteor.userId();
		var title =$('#title').val();
		var content = $('#editor1').val();
		var typeid =$('#type').val();
		var category =$('#catId').val();
		var url =$('#url').val();
		var date = timestamp;
		var imgArray=Session.get('multiUploadContentAdd').split(":");
		Meteor.call('addContent', title, content, typeid, date, imgArray, author,category,url);
		Session.set('multiUploadContentAdd','');		
		Router.go('managecontent');
	},
	'change #image': function(event, template) {
		event.preventDefault();
	    var files = event.target.files;
	    for (var i = 0, ln = files.length; i < ln; i++) {
	      images.insert(files[i], function (err, fileObj) {
	      if(Session.get('multiUploadContentAdd')){
	      	var strImage=Session.get('multiUploadContentAdd')+":"+fileObj._id;
	      }else{
	      	var strImage=fileObj._id;
	      }
	      Session.set('multiUploadContentAdd',strImage);
	        
		 });
    	}
  	},
    'click #rmFile':function(e){
    	e.preventDefault();
    	var result=confirm('Do you want to delete?');
    	if(result){
    		var aferRemove=Session.get('multiUploadContentAdd').replace(this.image,'');
    		Session.set('multiUploadContentAdd',aferRemove);
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
Template.addContent.helpers({
	getIdImage:function(){
		var arr=[];
		var arrayImage=Session.get('multiUploadContentAdd').split(":");
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
Session.get('UPDATEIMAGEID','');
Template.updateContent.events({
	'click #btnUpdate': function(e,tmp){
		e.preventDefault();
		var arrayIMG=[];
		var datestr = new Date().toString("yyyy-MM-dd HH:mm:ss");
		var timestamp = (new Date(datestr.split(".").join("-")).getTime())/1000;
		var author = Meteor.userId();
		var title =$('#title').val();
		var content =CKEDITOR.instances.editor1.getData();//$('#editor1').val();
		var typeid =$('#type').val();
		var category =$('#catId').val();
		var url =$('#url').val();
		var date = timestamp;

		$('input[name="checkImg"]:checked').each(function() {
		   arrayIMG.push(this.value);
		});
		
		if( typeid=="" || category==""){
			console.log("Some field is require. Check again!");
		}else{

			var obj={
				title:title,
				image:arrayIMG,
				url:url,
				author:author,
				content:content,
				typeid:typeid,
				category:category,
				date:timestamp
			}
			contents.update(this._id,obj);
			Session.set('multiUploadContentAdd','');
			Session.set('multiUploadContent','');
			Router.go('managecontent');
			console.log("updated!");
		}
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
			
				if(Session.get('multiUploadContent')){
					var strImage=Session.get('multiUploadContent')+','+fileObj._id;
				}else{
				
					var strImage=arrayImage.toString()+','+fileObj._id;
					
				}
				Session.set('multiUploadContent',strImage);

			});			

		}
 	},

});

Template.updateContent.helpers({
	getIdImage:function(image){
		if(Session.get('multiUploadContent')){
			var imageArr=Session.get('multiUploadContent').split(',');
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
	}
});
Template.webzinelisting.onRendered(function(){
    var swiper = new Swiper('.swiper-container', {
        autoplay: 5000,
        pagination: '.swiper-pagination',
        paginationClickable: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        hashnav: true,
        autoplayDisableOnInteraction: true
    });
});
Template.webzinelisting.helpers({
	webzinelists:function(){
		var arr=[];
		var i=0;
		var type=contents_type.findOne({"type":"Webzine"});
		var result=contents.find({"typeid":type._id},{limit:Session.get('contentlimit')});
		result.forEach(function(value){
			var obj={
				_id:value._id,
				number:i,
				title:value.title,
				image:value.image,
				author:value.author,
				content:value.content,
				typeid:value.typeid,
				category:value.category,
				date:value.date,
				review:value.review			
			}
			arr.push(obj);
			i=i+1;
		});
		//console.log(JSON.stringify+arr);
		return arr;
	},

	// odd:function(number){
	// 	//alert(number);
	// 	if(number % 2 ==0){
	// 		return true;
	// 	}else{
	// 		return false;
	// 	}
	// },

	// webzine1 : function(){
	// 	var type=contents_type.findOne({"type":"Webzine"});

	// 	return contents.findOne({"typeid":type._id});
	// },
	// webzineall : function(){
	// 	var type=contents_type.findOne({"type":"Webzine"});

	// 	return contents.find({"typeid":type._id});
	// },
	getCatergoryName: function(categoryId){
		 return categories.findOne({"_id":categoryId}).title;
	},
	isFirstWebzine: function(){
		i = i +1;
		if( i <= 1 ) return false;
		else return true;
	},
    getImage: function(id){
		var p=contents.findOne({_id:id});
		if(p.image instanceof Array)
			return p.image[0];
		else
			return p.image;
	},
	getbanner:function(){
	return banner.find({"typebanner":"webzine"});
	}
});
Session.set("commentValidation","");
Template.webzinedetails.helpers({
	productwebzine: function(){
		return products.find();
	},
	related: function(category,id){
		console.log("article related of "+category);
		var list=contents.find({category:category,_id: { $not: id }});
		var max=list.count();
		console.log('relatedcount='+max);
		var index=Math.floor((Math.random() * max) + 1);
		console.log('index='+index);
		if(max==0)
			return null;
		else
			return list.fetch()[index-1];
	},
	getErrormsg: function(){
		return Session.get("commentValidation");
	},
	getComment: function(){
		var comment = contents.findOne({_id:this._id});
		if( comment ) return comment.review;
		else return;
	},
	getUsername: function( userid ){
		var user = users.findOne(userid);
		if( user ) return user.profile.firstname+' '+user.profile.lastname
	},
	getarticle: function(){
		var article = contents_type.findOne({_id:this.typeid}).type;
		return article;
	},
	getReviews: function(reviews,filtre,toremove){			
			if(Session.get('fiterValue')=="" || Session.get('fiterValue')=="undefined"){
				var lastResult=[];
				var numberOfResult=Session.get('numberOfReviews');

				if(numberOfResult>reviews.length)
					numberOfResult=reviews.length
				console.log('NUMBER OF lastResult.length '+numberOfResult);
				for(var i=0;i<numberOfResult;i++)
					lastResult.push(reviews[i]);

				console.log('NUMBER OF lastResult.length '+lastResult.length);
				return lastResult;
					
			}
			console.log('Calling filterReview='+reviews.length);
			var values=Session.get('fiterValue').split(':');
			//fiterValue
			var ages=[];
			var myTags=[];
			var grades=[];

			for(var i=0;i<values.length;i++){
				var param=values[i];
				if(param=='')
					continue;
				console.log("Processing "+param);
				if(param.indexOf('-')>=0){
					ages.push(param);
				}else if(param.indexOf('/')>=0){
					grades.push(param);
				}else{
					myTags.push(param);
				}
			}

			console.log('ages:'+ages.length);
			console.log('myTags:'+myTags.length);
			console.log('grades:'+grades.length);

			var results=[];
			for(var i=0;i<ages.length;i++){
				var ageMin=Number(ages[i].split('-')[0]);
				var ageMax=Number(ages[i].split('-')[1]);

				console.log('min:'+ageMin);
				console.log('max:'+ageMax);
				//Loop into reviews
				for(var j=0;j<reviews.length;j++){
					var curUser=users.findOne({"_id":reviews[j].user});
					if(Number(curUser.profile.age)<= ageMax && Number(curUser.profile.age)>=ageMin){
						results.push(reviews[j]);

					}
						
				}
			}
			console.log('Size of the rest:'+reviews.length);
			console.log('Still in the sand after ager filter:'+results.length);
			if(results.length>0){
					console.log('remise a 0');
					reviews=[];
					reviews=results.slice(0);
					results=[];
			}
				
			console.log('Size of the rest:'+reviews.length);
			for(var i=0;i<myTags.length;i++){
				var curTag=myTags[i];
				console.log('tagging '+curTag);
				for(var j=0;j<reviews.length;j++){
					var curUser=users.findOne({"_id":reviews[j].user});
					if(curUser.profile.tag.indexOf(curTag)>=0)
						results.push(reviews[j]);
				}
			}

			console.log('Still in the sand(tags):'+results.length);
			if(results.length>0){
					console.log('remise a 0');
					reviews=[];
					reviews=results.slice(0);
					results=[];

			}
			if(grades.length==0)
				results=reviews.slice(0);
			console.log('Size of the rest:'+reviews.length);
			for(var i=0;i<grades.length;i++){
				var curGrade=grades[i].split('/')[0];
				//Loop into reviews

				for(var j=0;j<reviews.length;j++){
					
					if(Number(reviews[j].grade)==Number(curGrade) && results.indexOf(reviews[j])<0){
						results.push(reviews[j]);
						console.log('Comparing '+curGrade+' and '+reviews[j].grade);
					}
						
				}
			}

			console.log('Still in the sand(grades):'+results.length);
			console.log('afterFilter:'+results.length);

			var lastResult=[];
			var numberOfResult=Session.get('numberOfReviews');

			if(numberOfResult>results.length)
				numberOfResult=results.length
			console.log('NUMBER OF lastResult.length '+numberOfResult);
			for(var i=0;i<numberOfResult;i++)
				lastResult.push(results[i]);

			console.log('NUMBER OF lastResult.length '+lastResult.length);
			//return lastResult;
	},
	getCatergoryName: function(categoryId){
		 return categories.findOne({"_id":categoryId}).title;
	}
});

Template.addContent.helpers({
	getFEContext: function () {
    var self = this;
    return {
      // Set html content
      _value: self.myDoc.myHTMLField,

      // Set some FE options
      toolbarInline: true,
      initOnClick: false,
      tabSpaces: false,

      // FE save.before event handler function:
      "_onsave.before": function (e, editor) {
        // Get edited HTML from Froala-Editor
        var newHTML = editor.html.get();
        // Do something to update the edited value provided by the Froala-Editor plugin, if it has changed:
        if (!_.isEqual(newHTML, self.myDoc.myHTMLField)) {
          console.log("onSave HTML is :"+newHTML);
          myCollection.update({_id: self.myDoc._id}, {
            $set: {myHTMLField: newHTML}
          });
        }
        return false; // Stop Froala Editor from POSTing to the Save URL
      },
    }
  },
	contentposttype: function(){
		var co = contents_type.find();
		return co;
	},	
	getcategory: function(){
		return categories.find();
	}
});

Template.updateContent.helpers({
	contentposttype: function(){
		return contents_type.find();;
	},	
	getcategory: function(){
		
		return categories.find();
	},
	getCategoryOne:function(cat){
		console.log('ILOVEU:'+cat);
		return categories.findOne({_id:cat});
	},
	getText: function( content ){
		return Session.get('contentText');
	},
	getToUpadteSelectType:function(id){
		return contents_type.findOne({_id:id});
	},

});

//ManageContent
Template.managecontent.helpers({
	getAllImg: function(c){
		var p=contents.findOne({_id:c});
		if(p.image instanceof Array)
			return p.image;
		else
			return [p.image];
	},
	managecontent: function(){
		return contents.find();
	},
	getTypename: function(){displayLink
		var id =this.typeid;
		return contents_type.findOne({_id:id}).type;
	},
	getCatname: function(){
		var id = this.category;
		return categories.findOne({_id:id}).title;
	}
   
});
//Remove all content
Template.managecontent.events({
'click #remove':function(){
		var id = this._id;
		//alert(id);
		if (confirm("Are you sure you want to delete this Contents?")){
			Meteor.call('deleteContent', id);
		}
	}
});

Template.tutonew.helpers({
	getTutoCategory:function(){
		return categories.find({"parent":" "});
	},
	getCategoryImg: function(id){
		var p=categories.findOne({_id:id});
		if(p.image instanceof Array)
			return p.image[0];
		else
			return p.image;
	},
	getContentTuto:function(tutoId){
		var result = contents.findOne({typeid:tutoId});
		return result.content;
	}
});
Template.tutolisting.events({
	'click #getPoint': function(e){
	 e.preventDefault
      var userid=Meteor.userId();
      var earnpoints = Meteor.users.findOne({_id:userid});
      var point = Number(earnpoints.profile.shipcard.point) + 5;
      var obj= {
			profile:{
				firstname:mypoints.profile.firstname,
				lastname:mypoints.profile.lastname,
				country:mypoints.profile.country,
				city:mypoints.profile.city,
				shipcard:{
					point:point
				}
			}
   		}
      
      Meteor.call('earnPoint',userid,obj);
    }
});

Template.tutolisting.helpers({
	getContent:function(id){
		var type=contents_type.findOne({type:"Tuto"});
		console.log('makar:'+type._id+'categoryId:'+id);

		console.log('Displaying tuto');
		var string=type._id+':'+id;
		Session.set('Tuto',string);
		return contents.find({category:id},{typeid:type._id});
		//return contents.find({typeid:type._id});
	},
	getTutoImg: function(id){
		var p=contents.findOne({_id:id});
		if(p.image instanceof Array)
			return p.image[0];
		else
			return p.image;
	}
});

Template.tutodetails.helpers({
	getReviewsShort: function(reviews,limit){
		if(Session.get("filter")==""){
			var ret=[];
			for(var i=0;i<reviews.length && i<=limit;i++){
					var current=reviews[i];
					ret.push(current);
			}
			return ret;
		}
		else{
			var ret=[];
			for(var i=0;i<reviews.length && i<=limit;i++){
				var current=reviews[i];
				var currentAuthor=users.findOne({_id:current.user});
				if(currentAuthor.emails[0].address==Session.get("filter"))
					ret.push(current);
			}
			return ret;
		}
	},
	getImgTuTO: function(id){
		var p=contents.findOne({_id:id});
		if(p.image instanceof Array)
			return p.image[0];
		else
			return p.image;
	},
	getTutodetails:function(id){
		$("#mainVideo").load();
		return contents.findOne({_id:id});
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
		  	ampm = 'AM';
		 } else if (hh === 12) {
	  	 h = 12;
		  	 ampm = 'PM';
		 } else if (hh == 0) {
		  	h = 12;
		 }
	 // ie: 2013-02-18, 8:35 AM 
	 	time = hh + ':' + min +' '+ ampm;
	
		return time;
     },
	getImageUser:function(userId){
		//alert(userId);
		
		Meteor.call('getUserReview',userId,function(err,value){
			if(err){
				alert(err);
			}else{
				
				$('.'+value._id).text(value.profile.firstname);
				
			}
		});
	},
	getImages:function(userId){
		
		Meteor.call('getUserReview',userId,function(err,value){
			if(err){
				alert(err);
			}else{
				//makara
				var id=value.image;
				if(id=='' || typeof id == "undefined")
            	$('.image'+value._id).attr('src', '/img/unknown.png');

		        else if(id.indexOf("uploads")>-1){
		            id=id.replace(/ /g, "%20");
		            console.log('repaclement===='+id);
		            path = id.replace('/uploads/images/','');
	
		            $('.image'+value._id).attr('src','http://d1ak0tqynavn2m.cloudfront.net/'+path);
		            //return id;
		        }
		        else if(id.indexOf("http://")>-1 || id.indexOf("https://")>-1 ){
		            $('.image'+value._id).attr('src', id);

		        }else{
		            var img = images.findOne({_id:id});
		            if(img){
		                var id= img.copies.images.key;
		                console.log("id img---" + id);
		                path=id.replace('UserUploads/','');
		                console.log("path "+path);
		                $('.image'+value._id).attr('src', 'http://d2l5w8pvs4gpu2.cloudfront.net/'+path);
		            }
		        }
				//end makara
				
				
			}
		});
	},
	// getRelated: function(){
	// 	var ret=[];
 //       	var currentTuto=contents.findOne({"_id":this._id});
 //       	var currentCategory=currentTuto.category;
	// 	var currenttypeid=currentTuto.typeid;
	// 	var result= contents.find({typeid:currenttypeid,category:currentCategory}).fetch();
	// 	console.log('ALL RELATED:'+result.length);
	// 	if(result.length<4)
	// 		var max=result.length;
	// 	else
	// 		var max=4;
	// 	var historique=[];
	// 	for(var i=0;i<max;i++){
	// 		var index=Math.floor((Math.random() * max) );
	// 		while(historique.indexOf(index)!=-1)
	// 			index=Math.floor((Math.random() * max) );
	// 		historique.push(index);
	// 		ret.push(result[index]);
			

	// 	}
	// 	console.log(ret.length);
	// 	return ret;
	// },
	tuto : function(){
		return contents.find({});
	},
	getCatergoryName: function(categoryId){
		 	return categories.findOne({"_id":categoryId}).title;
	},
	getReviews: function(reviews,filtre,toremove){
			
			if(Session.get('fiterValue')=="" || Session.get('fiterValue')=="undefined"){
				var lastResult=[];
				var numberOfResult=Session.get('numberOfReviews');

				if(numberOfResult>reviews.length)
					numberOfResult=reviews.length
				console.log('NUMBER OF lastResult.length '+numberOfResult);
				for(var i=0;i<numberOfResult;i++)
					lastResult.push(reviews[i]);

				console.log('NUMBER OF lastResult.length '+lastResult.length);
				return lastResult;
					
			}
			console.log('Calling filterReview='+reviews.length);
			var values=Session.get('fiterValue').split(':');
			//fiterValue
			var ages=[];
			var myTags=[];
			var grades=[];

			for(var i=0;i<values.length;i++){
				var param=values[i];
				if(param=='')
					continue;
				console.log("Processing "+param);
				if(param.indexOf('-')>=0){
					ages.push(param);
				}else if(param.indexOf('/')>=0){
					grades.push(param);
				}else{
					myTags.push(param);
				}
			}

			console.log('ages:'+ages.length);
			console.log('myTags:'+myTags.length);
			console.log('grades:'+grades.length);

			var results=[];
			for(var i=0;i<ages.length;i++){
				var ageMin=Number(ages[i].split('-')[0]);
				var ageMax=Number(ages[i].split('-')[1]);

				console.log('min:'+ageMin);
				console.log('max:'+ageMax);
				//Loop into reviews
				for(var j=0;j<reviews.length;j++){
					var curUser=users.findOne({"_id":reviews[j].user});
					if(Number(curUser.profile.age)<= ageMax && Number(curUser.profile.age)>=ageMin){
						results.push(reviews[j]);

					}
						
				}
			}
			console.log('Size of the rest:'+reviews.length);
			console.log('Still in the sand after ager filter:'+results.length);
			if(results.length>0){
					console.log('remise a 0');
					reviews=[];
					reviews=results.slice(0);
					results=[];
			}
				
			console.log('Size of the rest:'+reviews.length);
			for(var i=0;i<myTags.length;i++){
				var curTag=myTags[i];
				console.log('tagging '+curTag);
				for(var j=0;j<reviews.length;j++){
					var curUser=users.findOne({"_id":reviews[j].user});
					if(curUser.profile.tag.indexOf(curTag)>=0)
						results.push(reviews[j]);
				}
			}

			console.log('Still in the sand(tags):'+results.length);
			if(results.length>0){
					console.log('remise a 0');
					reviews=[];
					reviews=results.slice(0);
					results=[];

			}
			if(grades.length==0)
				results=reviews.slice(0);
			console.log('Size of the rest:'+reviews.length);
			for(var i=0;i<grades.length;i++){
				var curGrade=grades[i].split('/')[0];
				//Loop into reviews

				for(var j=0;j<reviews.length;j++){
					
					if(Number(reviews[j].grade)==Number(curGrade) && results.indexOf(reviews[j])<0){
						results.push(reviews[j]);
						console.log('Comparing '+curGrade+' and '+reviews[j].grade);
					}
						
				}
			}

			console.log('Still in the sand(grades):'+results.length);
			console.log('afterFilter:'+results.length);

			var lastResult=[];
			var numberOfResult=Session.get('numberOfReviews');

			if(numberOfResult>results.length)
				numberOfResult=results.length
			console.log('NUMBER OF lastResult.length '+numberOfResult);
			for(var i=0;i<numberOfResult;i++)
				lastResult.push(results[i]);

			console.log('NUMBER OF lastResult.length '+lastResult.length);
			return lastResult;
		
		
	},
});
Template.webzinedetails.events({
	'click #addreview': function(e,tpl){
		e.preventDefault();
		var userid=Meteor.userId();
		var title=tpl.$("#title").val();
		var text=tpl.$("#comment").val();
		var grade=tpl.$("#sel1").val();
		if(userid==null){
			alert("You have to be logged to submit a review!");
			return;
		}
		Meteor.call('addReviewwebzine',title,text,grade,userid,this._id);
		alert("Review added successfully!")
	},
	'click .morereview':function(e){
			e.preventDefault();
			var last = Session.get('numberOfReviews');
			alert(last);
			var sum = Number(last) + 5;
			Session.set('numberOfReviews',sum);
			
	},
	"submit .addComment": function(e,tmp){
		e.preventDefault();
		var title = $("#inputName").val();
		var description = $("#description").val();
		var grade = 0;
		$(".group-grade input").each( function(){
			if( this.checked ){
				grade = parseInt($(this).val());
			}
		});
		if( title == "" || description =="" || grade == 0 || !Meteor.userId() ){
			$("#inputName").parent().removeClass("has-error");
			$("#description").parent().removeClass("has-error");
			$(".group-grade").removeClass("has-error");
			$(".group-grade").children(".with-errors").html("");
			if( title == "" )
				$("#inputName").parent().addClass("has-error");
			if( description == "" )
				$("#description").parent().addClass("has-error");
			if( grade == 0 ){
				var error = $(".group-grade").attr("data-error");
				$(".group-grade").addClass("has-error");
				$(".group-grade").children(".with-errors").html(error)
			}
			if( !Meteor.userId() ){
				var msg = '<div class="alert-danger form-control" role="alert">Please <a href="/login">login </a>before add comment.</div>';
				Session.set("commentValidation",msg);
			}
		}else{
			var userId = Meteor.userId();
			var review = [];
			var con = contents.findOne({_id:this._id});
			var review = ( con.review )? con.review:[];
			review.push({title:title,description:description,grade:grade,userId:userId});
			var id = contents.update(this._id,{$set:{review:review}})
			if( id ){
				$("#inputName").val("");
				$("#description").val("");
				$("#inputName").parent().removeClass("has-error");
				$("#description").parent().removeClass("has-error");
				$(".group-grade").removeClass("has-error");
				$(".group-grade").children(".with-errors").html("");
				Session.set("commentValidation","");
			}
		}
	}

});
Template.details.events({
	'click #addreview':function(e,tpl){
		e.preventDefault();
		var title=tpl.$("#title").val();
		var comment=tpl.$("#comment").val();
		if(title==""){
			$('#validdetail').text("please input title here")
		}
		if(comment==""){
			$('#validdetail1').text("please input comment here")
		}
	}
});
Template.tutodetails.events({
	'click #addreview': function(e,tpl){
		e.preventDefault();
		var comment=tpl.$("#comment").val();
		//alert(comment);
		//var grade=tpl.$("#sel1").val();
		 if( comment == ""){
		 	$('#validTuto').text("Please input your comment here!!!")
		 }else{
		 	Meteor.call('addReviewTuto',comment,Meteor.userId(),this._id);
		 }

	},
	'click .morereview':function(e){
			e.preventDefault();
			//alert();
			var last = Session.get('numberOfReviews');
			var sum = Number(last) + 5;
			var update = Session.set('numberOfReviews',sum);
			return update;
	}
});


Template.webzinedetails.helpers({
	
	suggestion: function(title){
		return contents.find({"content":{"$regex":title}});
	},
	getArticle: function(idarticle){
		return contents.findOne({"_id":idarticle});
	},
	getTutoes: function(idtutoes){
		return contents.findOne({"_id":idtutoes});
	},
	getAllAttributes: function(productId,parent){
		return attribute.find({"product":productId,"parent":parent});
	},
	getParentDetails: function(parent){
		return parentattr.findOne({"_id":parent});
	},
	listAttr: function(parent){
		console.log("OLDID="+parent);
		return attribute.find({"product":parent});
	},
	getParentAttr: function(product){
		console.log('cherche les attr de '+product);
		var list=attribute.find({"product":product}).fetch();
		var out=[];
		for(var i=0;i<list.length;i++){
			var contains=0;
			for(var j=0;j<out.length;j++)
				if(out[j].parent==list[i].parent)
					contains=1;
			if(contains==0)
				out.push(list[i]);
		}
			
		return out;
	},
	getShops: function(id){
		return shops.find({"products.product":id,"products.quantity":{ "$nin": ["0"] }});
	},
	getAttribute: function(id){
  		
  		return attribute.findOne({"_id": id});
  	},
	getTagName: function(tagid){
		if(tagid!=null)
			return tags.findOne({_id:tagid}).title;
		else
			return;
	},
	getAttr: function(id){
		return attribute.findOne({"_id":id});
	},
	getCategoryName: function(categoryid){
		console.log("cat:"+categoryid);
		if(categoryid!=null)
			return categories.findOne({_id:categoryid}).title;
		else
			return;
	},
	getShopname: function( id ){
		var shop = shops.findOne({_id:id });
		if( shop ) return shop.name; 
	},
	filterReview: function(){
		Tracker.autorun(function () {
			console.log('RERUNNING');
			return Session.get('fiterValue');
		});
	},
	removeFilter: function(){
		Tracker.autorun(function () {
			console.log('RERUNNING delete');
			return Session.get('removefilter');
		});
	},
	slic:function(tags){
		var parentarr=[];
		var valuearr=[];
		var nameParent=[];
		//alert('Tags:'+JSON.stringify(tags));
		for(var i=0;i<tags.length;i++){

			parentarr.push(tags[i].parent);
			valuearr.push(tags[i].value);
		}
		function onlyUnique(value, index, self) { 
		 return self.indexOf(value) === index;
		}
		//var arr=['aaa','cc','ajdjfdj','aaa',12];
		var unique = parentarr.filter( onlyUnique );
		for(var j=0;j<unique.length;j++){
			var name=parent_tags.findOne({"_id":unique[j]}).title;
			nameParent.push(name);
		}
		var obj={
			parents:nameParent,
			values:valuearr
		}
		
		return obj;

	},
	getParentTagName: function(id){
		return parent_tags.findOne({"_id":id}).title;
	},
	getReviews: function(reviews,filtre,toremove){			
			if(Session.get('fiterValue')=="" || Session.get('fiterValue')=="undefined"){
				var lastResult=[];
				var numberOfResult=Session.get('numberOfReviews');

				if(numberOfResult>reviews.length)
					numberOfResult=reviews.length
				console.log('NUMBER OF lastResult.length '+numberOfResult);
				for(var i=0;i<numberOfResult;i++)
					lastResult.push(reviews[i]);

				console.log('NUMBER OF lastResult.length '+lastResult.length);
				return lastResult;
					
			}
			console.log('Calling filterReview='+reviews.length);
			var values=Session.get('fiterValue').split(':');
			//fiterValue
			var ages=[];
			var myTags=[];
			var grades=[];

			for(var i=0;i<values.length;i++){
				var param=values[i];
				if(param=='')
					continue;
				console.log("Processing "+param);
				if(param.indexOf('-')>=0){
					ages.push(param);
				}else if(param.indexOf('/')>=0){
					grades.push(param);
				}else{
					myTags.push(param);
				}
			}

			console.log('ages:'+ages.length);
			console.log('myTags:'+myTags.length);
			console.log('grades:'+grades.length);

			var results=[];
			for(var i=0;i<ages.length;i++){
				var ageMin=Number(ages[i].split('-')[0]);
				var ageMax=Number(ages[i].split('-')[1]);

				console.log('min:'+ageMin);
				console.log('max:'+ageMax);
				//Loop into reviews
				for(var j=0;j<reviews.length;j++){
					var curUser=users.findOne({"_id":reviews[j].user});
					if(Number(curUser.profile.age)<= ageMax && Number(curUser.profile.age)>=ageMin){
						results.push(reviews[j]);

					}
						
				}
			}
			console.log('Size of the rest:'+reviews.length);
			console.log('Still in the sand after ager filter:'+results.length);
			if(results.length>0){
					console.log('remise a 0');
					reviews=[];
					reviews=results.slice(0);
					results=[];
			}
				
			console.log('Size of the rest:'+reviews.length);
			for(var i=0;i<myTags.length;i++){
				var curTag=myTags[i];
				console.log('tagging '+curTag);
				for(var j=0;j<reviews.length;j++){
					var curUser=users.findOne({"_id":reviews[j].user});
					if(curUser.profile.tag.indexOf(curTag)>=0)
						results.push(reviews[j]);
				}
			}

			console.log('Still in the sand(tags):'+results.length);
			if(results.length>0){
					console.log('remise a 0');
					reviews=[];
					reviews=results.slice(0);
					results=[];

			}
			if(grades.length==0)
				results=reviews.slice(0);
			console.log('Size of the rest:'+reviews.length);
			for(var i=0;i<grades.length;i++){
				var curGrade=grades[i].split('/')[0];
				//Loop into reviews

				for(var j=0;j<reviews.length;j++){
					
					if(Number(reviews[j].grade)==Number(curGrade) && results.indexOf(reviews[j])<0){
						results.push(reviews[j]);
						console.log('Comparing '+curGrade+' and '+reviews[j].grade);
					}
						
				}
			}

			console.log('Still in the sand(grades):'+results.length);
			console.log('afterFilter:'+results.length);

			var lastResult=[];
			var numberOfResult=Session.get('numberOfReviews');

			if(numberOfResult>results.length)
				numberOfResult=results.length
			console.log('NUMBER OF lastResult.length '+numberOfResult);
			for(var i=0;i<numberOfResult;i++)
				lastResult.push(results[i]);

			console.log('NUMBER OF lastResult.length '+lastResult.length);
			return lastResult;
	},
	getReviewsShort: function(reviews,limit){
		if(Session.get("filter")==""){
			var ret=[];
			for(var i=0;i<reviews.length && i<=limit;i++){
					var current=reviews[i];
					ret.push(current);
			}
			return ret;
		}
		else{
			var ret=[];
			for(var i=0;i<reviews.length && i<=limit;i++){
				var current=reviews[i];
				var currentAuthor=users.findOne({_id:current.user});
				if(currentAuthor.emails[0].address==Session.get("filter"))
					ret.push(current);
			}
			return ret;
		}
	},
	path: function(){
		return Session.get('path');
	},
	selected_attr: function(){
		return Session.get('selected_attr');
	},
	selected_price: function(){
		return Session.get('selected_price');
	},
	selected_point: function(){
		return Session.get('selected_point');
	}
});
