Template.addProductNode.events({
	"click #add-pro":function(e){
		e.preventDefault();
		var pro_name = $("#productName").val();
		var image = Session.get('ADDIMAGEID');
		var pyramid = [];
		var accords= [];
		var ratings = [];
        var longevity = [];
        var sillage = [];
        var have_it = $("#have_it").val();
        var had_it = $("#had_it").val();
        var want_it = $("#want_it").val();
        var signature = $("#signature").val();
        var recommend = $("#recommend").val();
        var top_notes = [];
        var middle_notes = [];
        var base_notes = [];
        if (pro_name == "" || pro_name == null) {
        	Bert.alert('please choose product name', 'danger', 'growl-top-right');
        }
        else if(image == "" || image == null){
        	Bert.alert('please choose image', 'danger', 'growl-top-right');
        }
        else if(have_it == "" || have_it == null){
        	Bert.alert('Please input have it','danger', 'growl-top-right');
        }
        else if(had_it == "" || had_it == null){
        	Bert.alert('Please input had it','danger','growl-top-right');
        }
        else if(want_it == "" || want_it == null){
        	Bert.alert('Please input want it','danger','growl-top-right');
        }
        else if(signature == "" || signature == null){
        	Bert.alert('Please input signature','danger','growl-top-right');
        }
        else if(recommend == "" || recommend == null){
        	Bert.alert('Please input recommend','danger','growl-top-right');
        }
        else{
        	var myPyramid=$("#tbodypyramid .pyramid-attr");
		console.log('Len:'+myPyramid.length);
		for(var i=0;i<myPyramid.length;i++){
			var type = myPyramid[i].getAttribute('data-pyramid-type');
        	var title = myPyramid[i].getAttribute('data-pyramid-title');
        	var url = myPyramid[i].getAttribute('data-url');
        	var val = "";
        	var obj = {title:title,url:url};
        	if(type=="top_notes"){
        		top_notes.push(obj);
        		
			}else if(type=="middle_notes"){
				middle_notes.push(obj);
			}else if(type=="base_notes"){
				base_notes.push(obj);
			}
		}
		pyramid = {top_notes:top_notes, middle_notes:middle_notes, base_notes:base_notes};
		
		console.log(pyramid);

		/*=================== ACCORDS ======================*/
		var myAccords=$("#tbodyaccords .type-accords");
		console.log('Len:'+myAccords.length);
		for(var i=0;i<myAccords.length;i++){
			//var a = myAccords[i].getAttribute('data-type-ratings');
			accords.push( {name:myAccords[i].getAttribute('data-accords-name')} );
			
		}
		console.log(accords);
		/*=================== RATINGS ======================*/
		var myRatings=$("#tbodyratings .rat");
		console.log('Len:'+myRatings.length);
		for(var i=0;i<myRatings.length;i++){
			var a = myRatings[i].getAttribute('data-type-ratings');
			var b = myRatings[i].getAttribute('data-value-ratings');
			ratings.push({feel:a,value:b});
			
		}
		console.log(ratings);
		/*=================== LONGEVITY ======================*/
		var myLongevity=$("#tbodylongevity .longevity");
		console.log('Len:'+myLongevity.length);
		for(var i=0;i<myLongevity.length;i++){
			var name = myLongevity[i].getAttribute('data-longevity-name');
			var user = myLongevity[i].getAttribute('data-longevity-user');
			var value = myLongevity[i].getAttribute('data-longevity-value');
			
			longevity.push({name:name,user:user,value:Number(value)});
			
		}
		console.log(longevity);
		/*=================== SILLAGE ======================*/
		var mySillage=$("#tbodysillage .sillage");
		console.log('Len:'+mySillage.length);
		for(var i=0;i<mySillage.length;i++){
			var name = mySillage[i].getAttribute('data-sillage-name');
			var user = mySillage[i].getAttribute('data-sillage-user');
			var value = mySillage[i].getAttribute('data-sillage-value');
			
			sillage.push({name:name,user:user,value:Number(value)});
			
		}
		console.log(sillage);
		
		/*=================== STRUCTURE JSON =====================*/
		var peoplevote = {
				have_it:have_it,
				had_it:had_it,
				want_it:want_it,
				signature:signature
			};
			console.log("proname="+pro_name);
			console.log("img="+image);
			Meteor.call("addProduct",pro_name,image, pyramid,accords,ratings,longevity,sillage,peoplevote,recommend,function(error,res){
				console.log(error);
				console.log(res);
			if(error){
				console.log("Error insert product"+error.reason());
			}else{
				Bert.alert( 'success', 'success', 'growl-top-right' ); 
				Router.go("/manageProductNode");
			}
		});
        }
        /*=================== PYRAMIT ======================*/
        
	},
	"click #add-pyramid":function(e){
		e.preventDefault();
    	var html = "";
        var type = $('#pyramid_type').val();
        var title = $("#pyramid_title").val();
       var url = Session.get("pyramidImage");
        if (type == "" || type == null) {
        	Bert.alert( 'Please choose type', 'danger', 'growl-top-right');
        }
        else if(title == "" || title == null){
        	Bert.alert( 'Please input title', 'danger', 'growl-top-right');
        }
        else{
        	 html += '<tr class="pyramid-attr" data-pyramid-type="'+type+'" data-pyramid-title="'+title+'" data-url="'+url+'">';
            html += '<td></td>'
            html += '<td class="pyramid-type">'+type+'</td>';
            html += '<td class="pyramid-title">'+title+'</td>';
            html += '<td class="pyramid-url">'+url+'</td>';
            //html += '<td class="value_shop" data-value-shop="'+value_shop+'">'+value_shop+'</td>';
            html += '<td><a class="remove glyphicon glyphicon-remove-circle"></a></td>';
	        html += '</tr>';
	        $('#tbodypyramid').append(html);
        }
	},
	"click #add-accords":function(e){
		e.preventDefault();
    	var html = "";
        var name = $('#accords_name').val();
         if (name == "" || name == null) {
        	Bert.alert("Please input name", "danger" , "growl-top-right");
        }
        else{
        	html += '<tr>';
            html += '<td></td>'
            html += '<td class="type-accords" data-accords-name="'+name+'">'+name+'</td>';
            //html += '<td class="value_shop" data-value-shop="'+value_shop+'">'+value_shop+'</td>';
            html += '<td><a class="remove glyphicon glyphicon-remove-circle"></a></td>';
	        html += '</tr>';
	        $('#tbodyaccords').append(html);
        }
	},
	"click #add-feel":function(e){
		e.preventDefault();
    	var html = "";
        var type = $('#type_feel').val();
        var value = $('#feel_value').val();
        if (type == "" || type== null) {
        	Bert.alert('Please choose type', 'danger' , 'growl-top-right');
        }
        else if(value == "" || value == null){
        	Bert.alert('Please input value','danger', 'growl-top-right');
        }
        else{
        	html += '<tr class="rat" data-type-ratings="'+type+'" data-value-ratings="'+value+'">';
            html += '<td></td>'
            html += '<td class="type_ratings" data-type-ratings="'+type+'">'+type+'</td>';
            html += '<td class="value_ratings" data-value-ratings="'+value+'">'+value+'</td>';
            //html += '<td class="value_shop" data-value-shop="'+value_shop+'">'+value_shop+'</td>';
            html += '<td><a class="remove glyphicon glyphicon-remove-circle"></a></td>';
	        html += '</tr>';
	        $('#tbodyratings').append(html);	
        }
       
	},
	"click #add-longevity":function(e){
		e.preventDefault();
    	var html = "";
        var name = $('#longevity_name').val();
        var user = $('#longevity_user').val();
        var val = $('#longevity_value').val();
        if (name == "" || name == null) {
        	Bert.alert('Please input name', 'danger' , 'growl-top-right');
        }
        else if(user == "" || user == null){
        	Bert.alert('Please input user name','danger','growl-top-right');
        }
        else if(val == "" || val == null){
        	Bert.alert('Please input value','danger', 'growl-top-right');
        }
        else{
        	html += '<tr class="longevity" data-longevity-name="'+name+'" data-longevity-user="'+user+'" data-longevity-value="'+val+'">';
            html += '<td></td>'
            html += '<td class="longevity-name">'+name+'</td>';
            html += '<td class="longevity-user">'+user+'</td>';
            html += '<td class="longevity-val">'+val+'</td>';
            //html += '<td class="value_shop" data-value-shop="'+value_shop+'">'+value_shop+'</td>';
            html += '<td><a class="remove glyphicon glyphicon-remove-circle"></a></td>';
	        html += '</tr>';
	        $('#tbodylongevity').append(html);
        }
	},
	"click #add-sillage":function(e){
		e.preventDefault();
    	var html = "";
        var name = $('#sillage_name').val();
        var user = $('#sillage_user').val();
        var val = $('#sillage_value').val();
        if (name == "" || name == null) {
        	Bert.alert('Please input name', 'danger' , 'growl-top-right');
        }
        else if(user == "" || user == null){
        	Bert.alert('Please input user name','danger','growl-top-right');
        }
        else if(val == "" || val == null){
        	Bert.alert('Please input value','danger', 'growl-top-right');
        }
        else{
        	html += '<tr class="sillage" data-sillage-name="'+name+'" data-sillage-user="'+user+'" data-sillage-value="'+val+'">';
            html += '<td></td>'
            html += '<td class="sillage-name">'+name+'</td>';
            html += '<td class="sillage-user">'+user+'</td>';
            html += '<td class="sillage-val">'+val+'</td>';
            //html += '<td class="value_shop" data-value-shop="'+value_shop+'">'+value_shop+'</td>';
            html += '<td><a class="remove glyphicon glyphicon-remove-circle"></a></td>';
        html += '</tr>';
        $('#tbodysillage').append(html);	
        }
	},
	'click .remove': function(e,tpl){
		$(e.currentTarget).parent().parent().remove();
	},
	'change #img': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
          	images.insert(files[i], function (err, fileObj) {
	            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            	Session.set('ADDIMAGEID', fileObj._id);
          	});
        }
    },
        'change #pyramid_url': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
          	images.insert(files[i], function (err, fileObj) {
	            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            	Session.set('pyramidImage', fileObj._id);
          	});
        }
    },
    'click #add':function(e,tlp){
    	e.preventDefault();
    	//alert();
    	var num = tlp.$('#number').val();
    	var cod = tlp.$('#code').val();
    	var obj = {
    	 	number:num,
    	 	code:cod
    	 }
    	arr.push(obj);
    	Session.set('perfume',arr);
    }
});
var arr = [];
Template.addproduct.helpers({
	getCatname:function(){
		return category.find();
	}
});

Template.addProductNode.helpers({
	getProductName:function(){
		return products.find();
	}
});
Template.manageProductNode.helpers({
	getAllProduct:function(){
		var result = products_node.find().map(function(document, index){
		    document.index = index+1;
		    return document;
		});
		return result;
	},
	getImage: function(){
		var image = Session.get('ADDIMAGEID');
        var img = images.findOne({_id:image});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
    getProductName:function(product){
    	var result = products.findOne({_id:product});
    	return result.title;

    }
});
Template.manageProductNode.events({
	'click #remove':function(){
		var id = this._id;
		if(confirm("Are you sure want to remove this?")){
			Meteor.call('removeProductNode',id);
		}
		
	},
	'click #goAddProduct':function(){
		Router.go("/addProductNode");
	}
});
Template.updateProductNode.helpers({
	getProductName:function(){
		return products.find();
	},
	getCurrentProduct:function(id){
		return products.findOne({_id:id}).title;
	}
});
Template.updateProductNode.events({
	"click #edit-pro":function(e){
		e.preventDefault();
		var id = this._id;
		var pro_name = $("#productName").val();
		var image = Session.get('ADDIMAGEID');
		var currentImage = $('#topImage').val();
		if (image == undefined) {
			image = currentImage;
		}
		var pyramid = [];
		var accords= [];
		var ratings = [];
        var longevity = [];
        var sillage = [];
        var have_it = $("#have_it").val();
        var had_it = $("#had_it").val();
        var want_it = $("#want_it").val();
        var signature = $("#signature").val();
        var recommend = $("#recommend").val();
        var top_notes = [];
        var middle_notes = [];
        var base_notes = [];
        /*=================== PYRAMIT ======================*/
        var myPyramid=$("#tbodypyramid .pyramid-attr");
		console.log('Len:'+myPyramid.length);
		for(var i=0;i<myPyramid.length;i++){
			var type = myPyramid[i].getAttribute('data-pyramid-type');
        	var title = myPyramid[i].getAttribute('data-pyramid-title');
        	var url = myPyramid[i].getAttribute('data-url');
        	var val = "";
        	var obj = {title:title,url:url};
        	if(type=="top_notes"){
        		top_notes.push(obj);
        		
			}else if(type=="middle_notes"){
				middle_notes.push(obj);
			}else if(type=="base_notes"){
				base_notes.push(obj);
			}
		}
		pyramid = {top_notes:top_notes, middle_notes:middle_notes, base_notes:base_notes};
		
		console.log(pyramid);

		/*=================== ACCORDS ======================*/
		var myAccords=$("#tbodyaccords .type-accords");
		console.log('Len:'+myAccords.length);
		for(var i=0;i<myAccords.length;i++){
			//var a = myAccords[i].getAttribute('data-type-ratings');
			accords.push( {name:myAccords[i].getAttribute('data-accords-name')} );
			
		}
		console.log(accords);
		/*=================== RATINGS ======================*/
		var myRatings=$("#tbodyratings .rat");
		console.log('Len:'+myRatings.length);
		for(var i=0;i<myRatings.length;i++){
			var a = myRatings[i].getAttribute('data-type-ratings');
			var b = myRatings[i].getAttribute('data-value-ratings');
			ratings.push({feel:a,value:b});
			
		}
		console.log(ratings);
		/*=================== LONGEVITY ======================*/
		var myLongevity=$("#tbodylongevity .longevity");
		console.log('Len:'+myLongevity.length);
		for(var i=0;i<myLongevity.length;i++){
			var name = myLongevity[i].getAttribute('data-longevity-name');
			var user = myLongevity[i].getAttribute('data-longevity-user');
			var value = myLongevity[i].getAttribute('data-longevity-value');
			
			longevity.push({name:name,user:user,value:Number(value)});
			
		}
		console.log(longevity);
		/*=================== SILLAGE ======================*/
		var mySillage=$("#tbodysillage .sillage");
		console.log('Len:'+mySillage.length);
		for(var i=0;i<mySillage.length;i++){
			var name = mySillage[i].getAttribute('data-sillage-name');
			var user = mySillage[i].getAttribute('data-sillage-user');
			var value = mySillage[i].getAttribute('data-sillage-value');
			
			sillage.push({name:name,user:user,value:Number(value)});
			
		}
		console.log(sillage);

		/*=================== STRUCTURE JSON =====================*/
		var peoplevote = {
				have_it:have_it,
				had_it:had_it,
				want_it:want_it,
				signature:signature
			};
			console.log("proname="+pro_name);
			console.log("img="+image);
			Meteor.call("updateProductnode",id,pro_name,image,pyramid,accords,ratings,longevity,sillage,peoplevote,recommend,function(error,res){
				console.log(error);
				console.log(res);
			if(error){
				console.log("Error Update product"+error.reason());
			}else{
				Session.set('ADDIMAGEID', undefined);
				Bert.alert('success','success','growl-top-right');
				Router.go("/manageProductNode");
			}
		});
	},
	"click #add-pyramid":function(e){
		e.preventDefault();
    	var html = "";
        var type = $('#pyramid_type').val();
        var title = $("#pyramid_title").val();
        var url = Session.get("pyramidImage");
        html += '<tr class="pyramid-attr" data-pyramid-type="'+type+'" data-pyramid-title="'+title+'" data-url="'+url+'">';
            html += '<td></td>'
            html += '<td class="pyramid-type">'+type+'</td>';
            html += '<td class="pyramid-title">'+title+'</td>';
            html += '<td class="pyramid-url">'+url+'</td>';
            //html += '<td class="value_shop" data-value-shop="'+value_shop+'">'+value_shop+'</td>';
            html += '<td><a class="remove glyphicon glyphicon-remove-circle"></a></td>';
        html += '</tr>';
        $('#tbodypyramid').append(html);
	},
	"click #add-accords":function(e){
		e.preventDefault();
    	var html = "";
        var name = $('#accords_name').val();
        html += '<tr>';
            html += '<td></td>'
            html += '<td class="type-accords" data-accords-name="'+name+'">'+name+'</td>';
            //html += '<td class="value_shop" data-value-shop="'+value_shop+'">'+value_shop+'</td>';
            html += '<td><a class="remove glyphicon glyphicon-remove-circle"></a></td>';
        html += '</tr>';
        $('#tbodyaccords').append(html);
	},
	"click #add-feel":function(e){
		e.preventDefault();
    	var html = "";
        var type = $('#type_feel').val();
        var value = $('#feel_value').val();
        html += '<tr class="rat" data-type-ratings="'+type+'" data-value-ratings="'+value+'">';
            html += '<td></td>'
            html += '<td class="type_ratings">'+type+'</td>';
            html += '<td class="value_ratings">'+value+'</td>';
            //html += '<td class="value_shop" data-value-shop="'+value_shop+'">'+value_shop+'</td>';
            html += '<td><a class="remove glyphicon glyphicon-remove-circle"></a></td>';
        html += '</tr>';
        $('#tbodyratings').append(html);
	},
	"click #add-longevity":function(e){
		e.preventDefault();
    	var html = "";
        var name = $('#longevity_name').val();
        var user = $('#longevity_user').val();
        var val = $('#longevity_value').val();
        html += '<tr class="longevity" data-longevity-name="'+name+'" data-longevity-user="'+user+'" data-longevity-value="'+val+'">';
            html += '<td></td>'
            html += '<td class="longevity-name">'+name+'</td>';
            html += '<td class="longevity-user">'+user+'</td>';
            html += '<td class="longevity-val">'+val+'</td>';
            //html += '<td class="value_shop" data-value-shop="'+value_shop+'">'+value_shop+'</td>';
            html += '<td><a class="remove glyphicon glyphicon-remove-circle"></a></td>';
        html += '</tr>';
        $('#tbodylongevity').append(html);
	},
	"click #add-sillage":function(e){
		e.preventDefault();
    	var html = "";
        var name = $('#sillage_name').val();
        var user = $('#sillage_user').val();
        var val = $('#sillage_value').val();
        html += '<tr class="sillage" data-sillage-name="'+name+'" data-sillage-user="'+user+'" data-sillage-value="'+val+'">';
            html += '<td></td>'
            html += '<td class="sillage-name">'+name+'</td>';
            html += '<td class="sillage-user">'+user+'</td>';
            html += '<td class="sillage-val">'+val+'</td>';
            //html += '<td class="value_shop" data-value-shop="'+value_shop+'">'+value_shop+'</td>';
            html += '<td><a class="remove glyphicon glyphicon-remove-circle"></a></td>';
        html += '</tr>';
        $('#tbodysillage').append(html);
	},
	'click .remove': function(e,tpl){
		$(e.currentTarget).parent().parent().remove();
	},
	'change #img': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
          	images.insert(files[i], function (err, fileObj) {
	            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            	Session.set('ADDIMAGEID', fileObj._id);
          	});
        }
    },
    'change #pyramid_url': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
          	images.insert(files[i], function (err, fileObj) {
	            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            	Session.set('pyramidImage', fileObj._id);
          	});
        }
    },
    'click #goManageProduct':function(){
    	Router.go("/manageProductNode");
    }
});
