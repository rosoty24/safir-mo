// add Products
Session.set("tags", "");
Session.set("category", "");
Session.set("filter","");
Session.set("attributes","");
Session.set('selected_attr','No attribute');
Session.set("tag_filter",'');
Session.set("adminBrand",'');

Session.set("parentAttr","");
Session.set('ADDIMAGEID', "");
Session.set('ADDIMAGEID_ATTR', "");
Session.set("filter","");
Session.set('fiterValue',"");
Session.set('tags','');
Session.setDefault('userId','');
Session.set('removefilter','');
Session.set('numberOfReviews',2);
Session.set("PRICE", '');
Session.set('cateTag','');
Session.set('limitmanagequery',16);
Meteor.call('getPath',function(err,res){
	Session.set('path',res);
});
var processScroll = true;
$(window).scroll(function() {
	if (processScroll  && $(window).scrollTop() > $(document).height() - $(window).height() - 100) {
		processScroll = false;
		var oldLimit=Session.get('limitmanagequery');
		oldLimit+=16;
		Session.set('limitmanagequery',oldLimit);
		processScroll = true;
	}
});
Template.addproduct.events({
	'click #add_attr': function(e,tpl){
		var price=tpl.$('#price_attr').val();
		var point=tpl.$('#point_attr').val();
		var attr=tpl.$('#attribute').val();
		var barcode=tpl.$('#barcode').val();
		var parent=tpl.$('#parent_attr').val();
		var image =$('#attr_image').val();
		var img_id = Session.get('ADDIMAGEID');
		var obj={
			product:this.oldId,
			parent:parent,
			price:price,
			point:point,
			value:attr,
			barcode:barcode,
			productImage:img_id
		}
		if(this._id){
			Meteor.call('insertattribute',obj);
		}else{
			var str=Session.get('attributes');
			str=str+price+':'+point+':'+parent+':'+attr+':'+barcode+':'+img_id+';';
			Session.set('attributes',str);
		}

		
	},
	'click #deleteAttr': function(e,tpl){
		//var oldAttr=Session.get('attributes');
		//alert('oldAttr='+oldAttr);
		//var stricOldAttr=oldAttr.replace('undefined','no barcode');
		//alert(stricOldAttr);
		// var str=this.price+':'+this.point+':'+this.parent+':'+this.attribute+ ':'+this.barcode+':'+';'
		// oldAttr=oldAttr.replace(str,'');
		// console.log('New attr='+oldAttr);
		// Session.set('attributes',oldAttr);
		//alert(this.id);
		attribute.remove({_id:this.id});
	},
	'click #btnAdd': function(e){
		e.preventDefault();
		var imgageArray=[];
		var title = $('#title').val();
		var description =CKEDITOR.instances.editor1.getData();//$('#editor1').val();// $('.froala-element').html();//froala-element
		var price = -1;//$('#price').val();
		var point = -1; //$('#point').val();
		var priority = $('#priority').val();
		var img_id = Session.get('ADDIMAGEID');
		var brand = $('#brand').val();
		var text = 0;
		var rate = 0;
		var date = new Date();
		var category = $('#category').val();
		var status = 0;
		var ratio=100;

		$('input[name="checkImg"]:checked').each(function() {
			imgageArray.push(this.value);
		});
		
		
		var alltags=Session.get('tags');
		alltags=alltags.split(';');

		jsonToSend=[];
		if(alltags!= null){
			for(var i=0;i<alltags.length;i++){
				if(alltags[i]=='')
					continue;
				var parent=alltags[i].split(':')[0];
				var value=alltags[i].split(':')[1];
				var current={
					parent: parent,
					value: value
				};
				if(current!=null && current!='')
					jsonToSend.push(current);
			}
		}

		var attr=Session.get('attributes');
		attr=attr.split(';');

		var oldId=Session.get('oldId');

		listAttr=[];
		
		
		if(attr!= null){
			price=attr[0].split(',')[0];
			point=attr[0].split(',')[1];
			for(var i=0;i<attr.length;i++){
				var current=attr[i];
				var vals=current.split(',');
				var obj={'value':vals[3],'parent':vals[2],'price':vals[0],'point':vals[1],'product':oldId,'barcode':vals[4],'productImage':vals[5]};
				if(current!='null' && current!='')
					listAttr.push(obj);
			}
		}
		
		var shopid = [];
		var instock= [];
		$("#shophtml .shopname").each( function(){
			shopid.push( $(this).attr('dataid') );
		})
		$("#shophtml .instock").each( function(){
			instock.push( $(this).val() );
		})
		var data_shop = [];
		for(i=0; i< shopid.length; i++){
			data_shop.push({shopid:shopid[i],instock:instock[i]});
		}


		var listArticle=[];
		if(Session.get('article')){
			var articles=Session.get('article');
			articles=articles.split(':');
			
			for(var i=0;i<articles.length;i++){
				if(articles[i]!='')
					listArticle.push(articles[i]);
			}
		}
		
		var listTutoes=[];
		if(Session.get('totues')){
			var tutoes=Session.get("totues");
			tutoes=tutoes.split(':');;
			
			for (var i=0;i<tutoes.length;i++){
				if(tutoes[i]!='')
					listTutoes.push(tutoes[i]);
			}
		}
		
		var data ={
			oldId 		:oldId,
			price		:price,
			attrImage   :img_id,
			title		:title,
			description	:description,
			image		:imgageArray,
			Brand		:brand,
			CODE		:123,
			metaTitle	:description,
			metaKeyword	:description,
			point		:point,
			ratio		:ratio,
			status		:status,
			category	:category,
			rate		:rate,
			priority	:priority,
			shop		:data_shop,
			date		:date,
			brand 		:brand,
			tags        :jsonToSend,
			attr 		:listAttr ,
			articles    :listArticle,
			tutoes 		:listTutoes

		}
		if(Router.current().route.getName()=='updateproduct'){
			var currentid=Router.current().params._id;
			data._id=currentid;
			var id = Meteor.call('updateProduct',this._id,data);
			delete Session.keys['multiUploadProduct'];

		}
		else{
			var id = Meteor.call('addPro',data);
			delete Session.keys['multiUploadProduct'];

		}
		Router.go('manageproduct');


	},

	'change #attr_image': function(event, template) {
		event.preventDefault();
		var files = event.target.files;
		for (var i = 0, ln = files.length; i < ln; i++) {
			images.insert(files[i], function (err, fileObj) {
				Session.set('ADDIMAGEID', fileObj._id);
			});
		}
	},
	'click #rmFile':function(e){
		e.preventDefault();
		var result=confirm('Do you want to delete?');
		if(result){
			var aferRemove=Session.get('multiUploadProduct').replace(this.image,'');
			Session.set('multiUploadProduct',aferRemove);
			images.remove(this.image, function(err, file) {
				if (err) {
					console.log('error', err);
				}else {
					console.log('remove success');
					success();
				};
			});
		}
	},
	'click .deleteTag': function(e,tpl){
		var allTags=Session.get('tags');
		var parent=this.parent;
		var value=this.value;
		var str=parent+':'+value+';';
		allTags=allTags.replace(str,'');
		Session.set('tags',allTags);
	},
	'change #category': function(e,tpl){
		var category=tpl.$('#category').val();
		Session.set('category',category);
		
	},

	'change #parent_attr': function(e,tpl){
		var parent=tpl.$("#parent_attr").val();
		Session.set('parentAttr',parent);
	},
	'change #image': function(event, template) {
		event.preventDefault();
		var files = event.target.files;
		for (var i = 0, ln = files.length; i < ln; i++) {
			images.insert(files[i], function (err, fileObj) {
				if(Session.get('multiUploadProduct')){
					var strImage=Session.get('multiUploadProduct')+","+fileObj._id;
				}else{
					var strImage=fileObj._id;
				}

				Session.set('multiUploadProduct',strImage);
				var result = Session.get('multiUploadProduct');

			});
		}

	},
	'click #tagAdd': function(e,tpl){
		e.preventDefault();
		var nameTag="#tag_"+this._id;
		var value=tpl.$(nameTag).find(":selected").text();;
		var parent=tpl.$(nameTag).find(":selected").attr('id');


		var listTags=Session.get("tags")+parent+':'+value+";";
		Session.set("tags", listTags);
	},
	'click .remove': function(e,tpl){
		$(e.currentTarget).parent().parent().remove();
	},
	'click #addshop': function(e,tpl){
		var html = "";
		var instock = ($("#instock").val()!="")? parseInt($("#instock").val()):"";
		var value= $("#myshop").val();
		var text = $("#myshop option:selected").text();
		var msg = "";
		if( instock == "" || value==""){
			if( instock == 0 || instock == "" )
				msg += "In Stock can not empty or 0<br>";
			if( value=="" )
				msg += "Select shop is require.";
			
		}else{
			html += '<div class="row" style="margin-bottom:5px;">';
			html += '<label class="control-label col-sm-3" for="tag"></label>';
			html += '<div class="col-sm-3">';
			html += '<input class="form-control shopname" type="text" name="shopname" dataid="'+value+'" value="'+text+'">';
			html += '</div>';
			html += '<div class="col-sm-3"><input type="text" name="instock" class="form-control instock" value="'+instock+'"></div>';
			html += '<div class="col-sm-3"><a class="remove glyphicon glyphicon-remove-circle"></a></div>';
			html += '</div>';
			$('#shophtml').append(html);
			$("#instock").val('');		
		}		
	},

	'click #addarticle': function(e,tpl){
		e.preventDefault();

		var article=tpl.$('#article').val();

		if(Session.get('article')){
			var strArticle=article+':'+Session.get('article');
		}else{
			var strArticle=article;
		}
		Session.set("article",strArticle);		
	},
	'click .deleteArticle': function(e,tpl){
		e.preventDefault();
		var allArticle=Session.get('article');		
		var afterdelete=allArticle.replace(this,'');	
		Session.set('article',afterdelete);
	},
	'click #btn_tuto': function(e,tpl){
		e.preventDefault();
		var tutoes=tpl.$('#tuto').val();
		if(Session.get('totues')){
			var strTutoes=tutoes+':'+Session.get('totues');
		}else{
			var strTutoes=tutoes;
		}
		Session.set("totues",strTutoes);		
	},
	'click .deleteTutoes': function(e,tpl){
		e.preventDefault();
		var allTutoes=Session.get('totues');		
		var afterdelete=allTutoes.replace(this,'');	
		Session.set('totues',afterdelete);
	},
	"change #price":function(e){
		e.preventDefault();
		var price = $(e.currentTarget).val();
		var id_attr=this.id;
		Meteor.call('changePriceAttr',id_attr,price,function(err,resp){
			/*var allAttr="";
			//console.log('OLDID='+this.data.oldId);
			var attrs=attribute.find({"product":this.data.oldId}).fetch();

			for(var i=0;i<attrs.length;i++){
				allAttr=allAttr+attrs[i].price+':'+attrs[i].point+':'+attrs[i].parent+':'+attrs[i].value+':'+attrs[i].barcode+':'+attrs[i].productImage+':'+attrs[i]._id+';';
			}
			console.log('Old:'+allAttr);
			Session.set('attributes',allAttr);*/
		});

	},
"change #point":function(e){
	e.preventDefault();
	var point = $(e.currentTarget).val();
	//alert(price);
	//Session.setPersistent("PRICE", price);
	//alert(Session.get("PRICE"));
	var id_attr=this.id;
	//alert('id='+id_attr+' / point='+point);
	Meteor.call('changePiontAttr',id_attr,point,function(err,resp){
		/*var allAttr="";
		console.log('OLDID='+this.data.oldId);
		var attrs=attribute.find({"product":this.data.oldId}).fetch();

		for(var i=0;i<attrs.length;i++){
			allAttr=allAttr+attrs[i].price+':'+attrs[i].point+':'+attrs[i].parent+':'+attrs[i].value+':'+attrs[i].barcode+':'+attrs[i].productImage+':'+attrs[i]._id+';';
		}
		console.log('Old:'+allAttr);
		Session.set('attributes',allAttr);*/
	});

},
"change #barcode":function(e){
	e.preventDefault();
	var barcode = $(e.currentTarget).val();
	//alert(price);
	//Session.setPersistent("PRICE", price);
	//alert(Session.get("PRICE"));
	var id_attr=this.id;
	//alert(id_attr);
	//alert('id='+id_attr+' / barcode='+barcode);
	Meteor.call('changeBarcodetAttr',id_attr,barcode,function(err,resp){
		/*var allAttr="";
		console.log('OLDID='+this.data.oldId);
		var attrs=attribute.find({"product":this.data.oldId}).fetch();

		for(var i=0;i<attrs.length;i++){
			allAttr=allAttr+attrs[i].price+':'+attrs[i].point+':'+attrs[i].parent+':'+attrs[i].value+':'+attrs[i].barcode+':'+attrs[i].productImage+':'+attrs[i]._id+';';
		}
		console.log('Old:'+allAttr);
		Session.set('attributes',allAttr);*/
	});

},
'change #updateAttrImg': function(event, template) {
	var id=this.id;
	event.preventDefault();
	var files = event.target.files;
	for (var i = 0, ln = files.length; i < ln; i++) {
		images.insert(files[i], function (err, fileObj) {
			//alert(fileObj._id);
			//alert(id);
			Meteor.call('updateImgAttr',id,fileObj._id);
		});
	}
}
// end

});

// Template.updateproduct.events({
// 	getTag: function(parentid){
// 		console.log('parent='+parentid);
// 		return tags.find({"parent":parentid});
// 	},
// 	'click #btnUpdate': function(e,tpl){
// 		e.preventDefault();
// 		var imgArray=[];
// 		var title = $('#title').val();
// 		var description =CKEDITOR.instances.editor1.getData();//$('#editor1').val();// $('.froala-element').html();//froala-element
// 		var price = -1;// $('#price').val();
// 		var point =-1;// $('#point').val();
// 		var priority = $('#priority').val();
// 		var image =$('#attr_image').val(); // attr img
// 		var img_id = Session.get('UPDATEIMAGEID');
// 		var brand = $('#brand').val();
// 		var text = 0;
// 		var rate = 0;
// 		var date = new Date();
// 		var category = $('#category').val();
// 		var status = 0;
// 		var ratio=100;
// 		//var img_id = Session.get('UPDATEIMAGEID');
// 		var imgArray=Session.get('multiUploadProduct').split(":");

// 		$('input[name="checkImg"]:checked').each(function() {
// 			arrayIMG.push(this.value);
// 		});

// 		var alltags=Session.get('tags');
// 		alltags=alltags.split(';');

// 		jsonToSend=[];
// 		if(alltags!= null){
// 			for(var i=0;i<alltags.length;i++){
// 				if(alltags[i]=='')
// 					continue;
// 				var parent=alltags[i].split(':')[0];
// 				var value=alltags[i].split(':')[1];
// 				var current={
// 					parent: parent,
// 					value: value
// 				};
// 				if(current!=null && current!='')
// 					jsonToSend.push(current);
// 			}
// 		}

// 		var attr=Session.get('attributes');
// 		attr=attr.split(';');

// 		var oldId=Session.get('oldId');

// 		listAttr=[];
// 		if(attr!= null){
// 			price=attr[0].split(',')[0];
// 			point=attr[0].split(',')[1];
// 			for(var i=0;i<attr.length;i++){
// 				var current=attr[i];
// 				var vals=current.split(',');
// 				var obj={'value':vals[3],'parent':vals[2],'price':vals[0],'point':vals[1],'product':oldId};
// 				if(current!='null' && current!='')
// 					listAttr.push(obj);
// 			}

// 		}

// 		//console.log('title:'+title+' price:'+price+' point:'+point+' priority:'+priority+' imageid:'+img_id+' category:'+category+' status:'+status);

// 		var shopid = [];
// 		var instock= [];
// 		$("#shophtml .shopname").each( function(){
// 			shopid.push( $(this).attr('dataid') );
// 		});
// 		$("#shophtml .instock").each( function(){
// 			instock.push( $(this).val() );
// 		});
// 		console.log(shopid);
// 		console.log(instock);
// 		var data_shop = [];
// 		for(i=0; i< shopid.length; i++){
// 			data_shop.push({shopid:shopid[i],instock:instock[i]});
// 		}
// 		var data ={
// 			_id			:this._id,
// 			oldId 		:oldId,
// 			price		:price,
// 			attrImage   :img_id,
// 			title		:title,
// 			description	:description,
// 			image		:imgArray,
// 			Brand		:brand,
// 			CODE		:123,
// 			metaTitle	:description,
// 			metaKeyword	:description,
// 			point		:point,
// 			ratio		:ratio,
// 			status		:status,
// 			category	:category,
// 			rate		:rate,
// 			priority	:priority,
// 			shop		:data_shop,
// 			date		:date,
// 			brand 		:brand,
// 			tags        :jsonToSend,
// 			attr 		:listAttr 

// 		}
// 		alert("OK");
// 		var id = Meteor.call('updateProduct',data);
// 		console.log('ProductID:'+id);
// 		//Meteor.call('addPro',title, description, price,point,img_id, category, status,ratio,jsonToSend,listAttr,priority);
// 		Router.go('manageproduct');
// 	},
// 	'change #image': function(event, template) {
// 		event.preventDefault();
// 		var arrayImage=[];
// 		var imagsearr=this.image;
// 		for(var j=0;j<imagsearr.length;j++){
// 			arrayImage.push(imagsearr[j]);
// 		}

// 		var files = event.target.files;
// 		for (var i = 0, ln = files.length; i < ln; i++) {
// 			images.insert(files[i], function (err, fileObj) {

// 				if(Session.get('multiUploadProduct')){
// 					var strImage=Session.get('multiUploadProduct')+','+fileObj._id;
// 				}else{

// 					var strImage=arrayImage.toString()+','+fileObj._id;

// 				}
// 				var result = Session.set('multiUploadProduct',strImage);
// 				alert("result "+result);

// 			});			

// 		}
// 	},
// 	'click #addshop': function(e,tpl){
// 		var html = "";
// 		var instock = ($("#instock").val()!="")? parseInt($("#instock").val()):"";
// 		var value= $("#myshop").val();
// 		var text = $("#myshop option:selected").text();
// 		//console.log("#instock"+instock);
// 		//console.log("#myshop"+);
// 		var msg = "";
// 		if( instock == "" || value==""){
// 			if( instock == 0 || instock == "" )
// 				msg += "In Stock can not empty or 0<br>";
// 			if( value=="" )
// 				msg += "Select shop is require.";

// 			alert(msg);
// 		}else{
// 			html += '<div class="row" style="margin-bottom:5px;">';
// 			html += '<label class="control-label col-sm-3" for="tag"></label>';
// 			//html += ''
// 			html += '<div class="col-sm-3">';
// 						//console.log( value._id);
// 						html += '<input class="form-control shopname" type="text" name="shopname" dataid="'+value+'" value="'+text+'">';
// 						//i++;
// 						html += '</div>';
// 						html += '<div class="col-sm-3"><input type="text" name="instock" class="form-control instock" value="'+instock+'"></div>';
// 						html += '<div class="col-sm-3"><a class="remove glyphicon glyphicon-remove-circle"></a></div>';
// 						html += '</div>';
// 						$('#shophtml').append(html);
// 						$("#instock").val('');

// 					}

// 				},
// 				'click .remove': function(e,tpl){
// 					$(e.currentTarget).parent().parent().remove();
// 				},
// 				'change #category': function(e,tpl){

// 					var category=tpl.$('#category').val();
// 					Session.set('category',category);
// 		//console.log('heho');
// 		//console.log(category);
// 	},

// 	'change #attr_image': function(event, template) {
// 		alert(this.image);
// 		event.preventDefault();
// 		var id=this.image;
// 		alert(id);
// 		images.remove(id, function(err, file) {
// 			if (err) {
// 				console.log('error', err);
// 			} else {
// 				console.log('remove success');
// 				success();
// 			};
// 		});

// 		var files = event.target.files;
// 		for (var i = 0, ln = files.length; i < ln; i++) {
// 			images.insert(files[i], function (err, fileObj) {
// 				Session.set('UPDATEIMAGEID', fileObj._id);
// 			});
// 		}
// 	}
// });
// helpers products
Template.addproduct.helpers({
	getBrand: function(){
		var myBrands=[];

		var liste=products.find().fetch();
		console.log("Processing2:"+liste.length);
		for(var i=0;i<liste.length;i++){
			if(liste[i].hasOwnProperty('Brand')){
				var first=liste[i].Brand;
					//console.log('first:'+first);
					//console.log(first.substr(0,1)+' = '+letter+' ???');
					if(first!='' && myBrands.indexOf(first)==-1)
						myBrands.push(first);
				}

			}
			return myBrands;
		},
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
getSessionTag: function(){
	Tracker.autorun(function () {
		console.log('SESSION: '+Session.get('tags'));
		return Session.get('tags');
	});
},
listTag: function(){
	var list=Session.get('tags');
	if(list=='')
		return;
	console.log('process:'+list);
	var liste=list.split(";");
	var tab=[];
	for(var i=0;i<liste.length;i++){
		if(liste[i]=='')
			continue;
		console.log('elt-> '+liste[i]);
		var elt=liste[i].split(':');
		var parent=elt[0];
		var value=elt[1];

		var currentTag={parent:parent,value:value};
		console.log('currentTag: '+JSON.stringify(currentTag));
		tab.push(currentTag);
	}
	console.log('tab: '+JSON.stringify(tab));
	return tab;

},
listAttr: function(){
	if(Session.get('attributes')=='')
		return;
	//var clear_undefine=Session.get('attributes').replace('undefined','')
	//Session.set('attributes',clear_undefine);
	var liste=Session.get('attributes').split(";");
	var tab=[];
	for(var i=0;i<liste.length;i++){
		if(liste[i]=='')
			continue;
		var line=liste[i].split(",");
		var obj={
			id: line[6],
			price:line[0],
			point:line[1],
			attribute:line[3],
			parent:line[2],
			barcode:line[4],
			productImage: line[5]
		};
		console.log('IMG ATTR='+line[5]);
		tab.push(obj);
	}
	return tab;
},
getParentNameTag: function(parent){
	if(parent=='' || parent==null)
		return;
	return parent_tags.findOne({"_id":parent}).title;
},
getAttributeName: function(id){
	if(id=='' || id==null)
		return;
	return attribute.findOne({"_id":id}).value;
},
getParentName: function(id_attr){
	if(id_attr=='undefined' || id_attr==null)
		return;

	return parentattr.findOne({"_id":id_attr}).name;
},
getCat: function(){
	return categories.find({});
},
getShop: function(){
	return shops.find({});
},
parentTag: function(){

	var cat=Session.get('category');
	console.log("CATI:"+cat);
	if(cat==null)
		var ret= parent_tags.find({});
	else
		var ret= parent_tags.find({"category_id":cat});
	console.log("category:"+ret.count());
	return ret;



},
getTag: function(parentid){
	console.log('parent='+parentid);
	return tags.find({"parent":parentid});
},
myTags: function () {
	return Session.get("tags");
},
getcategory: function(){
	Tracker.autorun(function () {
		return Session.get('category');
	});
},
getParentAttr: function(){
	return parentattr.find();
},
getAttr: function(parent){
	return attribute_value.find({"parentId": parent});
},
parentAttr: function(){
	return Session.get('parentAttr');
},
catName: function(cat){

	if(cat==0 || cat=='' || cat=='undefined' || cat==null)
		return;
	var result = categories.findOne({_id:cat});
	console.log(result);
	if(result){
		Session.set('data',result.title);
		return result.title;
	}

},
getArticle:function(){
	var typeId=contents_type.findOne({type:"Article"})._id;
	var result=contents.find({typeid:typeId});
	console.log("article--- " + JSON.stringify(result));
	return result;
		//return contents_type.find({});
	},
	getTypeName:function(typeid){
		return contents_type.findOne({_id:typeid}).type;
	},
	getContentArt:function(){
		var arr=[];
		var getArt = Session.get("article");
		var arrAtrticle=getArt.split(':');
		for(var i=0;i<arrAtrticle.length;i++){
			if(arrAtrticle[i]!==""){
				arr.push(arrAtrticle[i]);
			}
			
		}
		return arr;

	},
	getTitle:function(id){
		return contents.findOne({_id:id}).title;
	},

// sokhy tuto
getTutoes:function(){
	var tutoId=contents_type.findOne({type:"Tuto"})._id;
	console.log("tutoId-- "+tutoId);
	var result=contents.find({typeid:tutoId});
	return result;
},
getContentTutoes:function(){
	var arr=[];
	var getTutoes = Session.get("totues");
	var arrTutoes=getTutoes.split(':');
	for(var i=0;i<arrTutoes.length;i++){
		if(arrTutoes[i]!==""){
			arr.push(arrTutoes[i]);
		}

	}
	return arr;

},
getContenttuto:function(){
	var arr=[];
	var getAlltuto = Session.get("tuto");
	var arrAlltutoes=getAlltuto.split(':');
	for(var i=0;i<arrAlltutoes.length;i++){
		if(arrAlltutoes[i]!==""){
			arr.push(arrAlltutoes[i]);
		}

	}
	return arr;

},
	//add product
	getIdImageUpdate:function(image){

		if(Session.get('multiUploadProduct')){
			var str=image.toString()+','+Session.get('multiUploadProduct');
			
		}else{
			var str=image.toString();
			
		}
		var arr=[];
		var arrayImage=str.split(",");
		for(var i=0;i<arrayImage.length;i++){
			if(arrayImage[i]){
				var obj={
					image:arrayImage[i]
				}
				arr.push(obj);
			}
		}

		return arr;
	},
	getIdImageAdd:function(){
		
		var str=Session.get('multiUploadProduct');

		var arr=[];
		var arrayImage=str.split(",");
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

// Template.updateproduct.helpers({
// 	catName: function(cat){
// 		if(cat==0 || cat=='' || cat=='undefined' || cat==null)
// 			return;
// 		var result = categories.findOne({_id:cat});
// 		console.log(result);
// 		if(result){
// 			Session.set('data',result.title);
// 			return result.title;
// 		}

// 	},
// 	catAll: function(){
// 		var catName = Session.get('data');
// 		return categories.find({title:{$ne:catName}});
// 	},
// 	getShop: function(){
// 		return shops.find({});
// 	},
// 	getShopname: function( id ){
// 		var shop = shops.findOne({_id:id });
// 		if( shop ) return shop.name; 
// 	},
// 	getIdImage:function(image){
// 		if(Session.get('multiUploadProduct')){
// 			var imageArr=Session.get('multiUploadProduct').split(',');
// 		}else{
// 			var imageArr=image;
// 		}

// 		var nameImage=[];
// 		for(var i=0;i<imageArr.length;i++){
// 			var img = images.findOne({_id:imageArr[i]});
// 			if(!img)
// 				continue;
// 			if(!img.copies)
// 				continue;
// 			console.log(img.copies.images.key);
// 			var name=img.copies.images.key;
// 			var obj={
// 				imageId:imageArr[i],
// 				imageName:name
// 			}
// 			nameImage.push(obj);
// 		}
// 		return nameImage;
// 	}
// });



Template.manageproduct.events({
	'change #sortcate':function(e){
		e.preventDefault();
		var id=$('#sortcate').val();
		Session.set('cateTag',id);
	},
	'change #sorttag':function(e){
		e.preventDefault();
		Session.set('sorttag',$('#sorttag').val());
	},
	'click #remove': function(){
		var id = this._id;
		Meteor.call('deletePro', id);
	},
	'change #brandname':function(e){
		e.preventDefault();
		var mybrand = $('#brandname').val();
		Session.set('adminBrand',mybrand);
	},

	'click #publish': function(e){
		e.preventDefault();
		var id = this._id;
		var status = 0;
		var attributes = {
			status:status
		};
		Meteor.call('publishPro',id, attributes);
	},
	'click .more': function(e,tpl){
		var limit=Number(Session.get('limitmanagequery'));
		limit=limit+16;
		Session.set('limitmanagequery',limit);
		console.log('limite='+Session.get('limitmanagequery'));
	},
	"click #unpublish": function(e) {
		e.preventDefault();
		var id = this._id;
		var status = 1;
		var attr = {
			status:status
		};
		Meteor.call('unpublishPro',id, attr);
	}
});

Template.add_review.events({
	'click #commentok': function(e,tpl){
		var title=tpl.$("#title").val();
		var comment=tpl.$("#comment").val();
		var grade=tpl.$("#grade").val();
		var user=Meteor.user()._id;
		var productid=this._id;
		Meteor.call("add_review",title,comment,grade,user,productid);
	}
});

Template.details.events({
	'click .morereview':function(e){
			e.preventDefault();
			var last = Session.get('numberOfReviews');
			var sum = Number(last) + 5;
			var update = Session.set('numberOfReviews',sum);
			return update;
	},
	"mouseenter #ex1": function(e,tpl){
		if(Session.get('miniature')==0){
			$('#ex1').trigger('zoom.destroy');
			$('#ex1').zoom();
			Session.set('miniature',1);
			//console.log('refresh zoom');
		}

	},
	'click .btn-filter-view':function(e,tpl){
		var v
		al=$(".octofilter-container").css('display');
		//alert(val);
		if(val=='block'){
			$("#closeFilter").css('display','block');
		}

	},
	'click #closeFilter':function(e,tpl){
		$(".octofilter-container").toggle();
		$("#closeFilter").css('display','none');
	},
	'click #loads':function(e){
		//alert();
		var url=$('#loads').attr('src');
		Session.set('src',url);
	},
	'click .miniature': function(e,tpl){
		var str=JSON.stringify(this);
		str=str.replace('"','');
		str=str.replace('"','');
		$(".img_principle").attr('src',str);
		//Session.set('mainImg',str);
		//alert('wow:'+Session.get('mainImg'));
		//console.log('wow:'+Session.get('mainImg'));


	},
	'click #refresh': function(e,tpl){

	},
	'click .octofilter-link': function(e,tpl){
		console.log('ABC');
	},
	'click .octofilter-clear': function(e,tpl){
		//alert("deleting...");
	},
	'click #flip': function(e,tpl){
		$("#panel").slideToggle("slow");
	},
	'click #show': function(e,tpl){
		$("#show-text").slideToggle("slow");
	},
	'click h3': function(e,tpl){
		$(".fa-angle-down").slideToggle("slow");
	},
	'click .octofilter-link':function(e,tpl){

		//alert('heho');
	},
	'click #filterok': function(e,tpl){
		var username=tpl.$("#filter").val();
		Session.set("filter",username);
		
	},
	'click #img_attr':function(e,tpl){
		var attr=attribute.findOne({"_id":this._id});
		var title=attribute.findOne({"_id":this._id}).value;
		var product=products.findOne({"oldId":this.product});
		Session.set('selected_price',attr.price);
		Session.set('selected_point',attr.point);
		Session.set('selected_attr',attr._id);
		

		var url=this.productImage;
		
		//Session.set('mainImg',url);
		$("#current_attr").text(title);
		$(".img_principle").attr('src',url);
		Session.set('miniature',0);

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
                 alert('Product successfully append to favorite!');
             }
             else{
             	var newId=Random.id();
             	Session.setPersistent('userId',newId);
                 //var ses=Session.get('userId');
                 
                 var obj={
                 	proId:id,
                 	userId:Session.get('userId')
                 }

                 Meteor.call('insertFavorite',obj);
                 alert('Product successfully added to favorite!');
             }
         },
         'click #addtocart':function(e,tpl){       
         	e.preventDefault();
         	var id_product=this._id;
         	//alert(id_product);
         	var qty=tpl.$("#qty").val();
         	var attribute=Session.get('selected_attr');
         	if(attribute=='No attribute')
         		attribute='';	
         	console.log('ADDINGTOCARTid='+Session.get('userId'));
         	var userId = Session.get('userId');
         	var selectPrice=Session.get('selected_price')
         	//alert(selectPrice);
         	var subtotal = 0;

         	var sameproduct = cart.findOne({ id_product:id_product, userId:userId,attribute:attribute})
         	if( sameproduct){
         		var pro = products.findOne({_id:id_product});
         		upqty = parseInt( sameproduct.quantity ) + parseInt(qty);
         		if( pro ){
         			subtotal = upqty * parseInt(Session.get('selected_price'));
         		}
         		console.log('update of the cart');
         		var obj={quantity: upqty, subtotal:subtotal};
         		Meteor.call('updateStatus',sameproduct._id,obj);
         		//alert('محصول با موفقیت به سبد خرید اضافه شد');
         		cart.update(sameproduct._id, {$set: {quantity: upqty, subtotal:subtotal}});
         		Router.go("/checkout");
         	}else{
         		var pro = products.findOne({_id:id_product});
         		if( pro ){
         			subtotal = parseInt(qty) * parseInt(Session.get('selected_price'));
         		}
         		var obj={
         			id_product:id_product,
         			userId:Session.get('userId'),
         			quantity:qty,
         			subtotal:subtotal,
         			/*shop:shop,*/
         			attribute:attribute,
         			order_status:0
         		};

         		//console.log('adding to the cart');
         		Meteor.call('addtocart',obj);
				//alert('محصول با موفقیت به سبد خرید اضافه شد');
				Router.go("/checkout");
			}           
		},
		"change #shop":function(e,tpl){
			/*var shopid=$("#shop").val();
			var qty=stock.findOne({"Barcode":Session.get('barcode'),"RetailStoreID":shopid});
			console.log("shopid="+shopid+" / found="+qty.QTY);
			$("#available_qty").text(qty.QTY);*/
		},
		'click #posting':function(e){
			e.preventDefault();
			if(Meteor.userId()){
				var description=$('#status').val();
				var detailId=this._id;
				var collection="products";
				var userid = Meteor.userId();
				var profile = users.findOne({_id:userid}).profile;
				var point = 5;
			if(profile.shipcard!=null)
				var upoint=Number(profile.shipcard.point);
			else
				var upoint=0;
			upoint+=point;

			var obj={
				description:description
			};

			if(TAPi18n.getLanguage()=='fa'){
				var object={
					id:detailId,
					userid:userid,
					collectionName:collection,
					i18n:{fa:{description}}
				}
			}
			else{
				var object={
					id:detailId,
					userid:userid,
					collectionName:collection,
					i18n:{en:{description}}
				}
			}
			
			if(description==""){
				alert("Please put a text before to click the button.");
			}else{
				Meteor.call('insertTradeDetail', object, function(err){
					if(err){
						console.log(err);
					}else{
						Meteor.call('earnPoint',userid,upoint);
						alert("You have earned "+point+" points!");
					}
				});
			}
		}else{
			alert("Please login before making translation!");
		}
	}
});
Template.manageproduct.helpers({
	getListImg: function(product){
		var p=products.findOne({_id:product});
		console.log("img p" + p);
		if(p.image instanceof Array)
			return p.image;
		else
			return [p.image];
	},
	getImgeAttribute:function(oldId){
		var imageAttr = attribute.find({"product":oldId});
		console.log("hi hi " + imageAttr)+ "hii";
		return imageAttr;
		// var imageAttr=attribute.find({"product":oldId});
		// console.log("img imageAttr" + imageAttr);
		// if(imageAttr.image instanceof Array)
		// 	return imageAttr.image;
		// console.log("sokhy " + imageArr.image);
		// else
		// 	return [imageAttr.image];
	},
	getBrandSort:function(){
		var arrBrand=[];
		var getBrand = products.find({});
		getBrand.forEach(function(value){
			arrBrand.push(value.Brand);
		})
		function onlyUnique(value, index, self) { 
			return self.indexOf(value) === index;
		}
		var uniqueBrand = arrBrand.filter( onlyUnique );
		return uniqueBrand;
	},
	managePro: function(){
		var arr=[];
		var number=1;

		//console.log("sreyden"+JSON.stringify);
		if(Session.get('adminBrand')){
			var data= products.find({Brand:Session.get('adminBrand')},{limit:Session.get('limitmanagequery')});
		}else if(Session.get('sorttag')){
			var data=products.find({"tags.parent":Session.get('sorttag')},{limit:Session.get('limitmanagequery')});
		}else{
			var data= products.find({},{limit:Session.get('limitmanagequery')});
		}
		//var data= products.find({Brand:Session.get('adminBrand')},{limit:Session.get('limitmanagequery')});
		data.forEach(function(value){
			var object={
				number:number,
				_id:value._id,
				oldId:value.oldId,
				price:value.price,
				title:value.title,
				description:value.description,
				image:value.image,
				Brand:value.Brand,
				CODE:value.CODE,
				metaTitle:value.metaTitle,
				metaKeywords:value.metaKeywords,
				point:value.point,
				ratio:value.ratio,
				status:value.status,
				category:value.category,
				metaKeyword:value.metaKeyword,
				priority:value.priority,
				shop:value.shop,
				date:value.date,
				tags:value.tags,
			};
			console.log("MYPORDUCT:"+JSON.stringify(object));
			arr.push(object);
			number=number+1;
		});
		
		
		if(data.count()<=0){
			console.log("NO PORDUCT");
			return false;
		}
		else{

			return arr;
		}
	},
	catName: function(cat){
		var result = categories.findOne({_id:cat});
		return result.title;
	},
	checkStatus: function(status){
		if(status === 0){
			return false;
		}
		else{
			return true;
		}
	},
	shopName: function(name){
		if(name=='0')
			return;
		var result = shops.findOne({_id: name});
		return result.title;
	},
	shopIn: function(nameIn){
		var result = shops.findOne({_id:nameIn});
		return result.instock;
	},
	getCatSort:function(){
		return categories.find();
	},
	getParentTagSort:function(){
		var cateTag=Session.get('cateTag');
		var result=parent_tags.find({category_id:cateTag});
		return result;

	},
	getProductToSort:function(){
		var parent=Session.get('sorttag');
		return products.find({"tags.parent":parent});
	}
});

Template.details.helpers({
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
	getTagList: function(productid) {
		var pro = products.findOne({
			_id: productid
		});
		if (pro) {
			var y = pro.tags;

			var x = {};
			var id = [];
			for (var i = 0; i < y.length; ++i) {
				var obj = y[i];

                //If a property for this DtmStamp does not exist yet, create
                if (x[obj.parent] === undefined) {
                    x[obj.parent] = [obj.parent]; //Assign a new array with the first element of DtmStamp.
                    id.push(obj.parent);
                }
                //x will always be the array corresponding to the current DtmStamp. Push a value the current value to it.
                x[obj.parent].push(obj.value);

            }

            var s = '';
            //console.log(id);
            //console.log(x);

            for (j = 0; j < id.length; j++) {
            	var data = x[id[j]];
                //console.log(x[id[j]]);
                var p = 0;
                for (k = 0; k < data.length; k++) {
                	p++;

                	if (p == 1) {
                		var tag = parent_tags.findOne({
                			_id: data[k]
                		});
                		var name = (tag) ? tag.title : 'no name';
                		s += '<li><strong>' + name + '</strong> : ';
                	} else {
                		s += data[k];
                		s += (p < data.length) ? ' , ' : '';
                	}
                	if (p >= data.length) {
                		p = 0;
                		s += '</li>';
                	}
                }
                console.log(s);
            };

            return s;

        }
    },
    existReview:function(review){
    	if(review){
    		return true;
    	}else{
    		return false;
    	}
    },
    getMainImg: function(){
    	console.log('mainImg'+Session.get('mainImg'));
    	return Session.get('mainImg');
		// delete Session.keys['mainImg'];
	},
	getProductImg: function(product){
		var p=products.findOne({_id:product});
		if(p.image instanceof Array)
			return p.image[0];
		else
			return p.image;
	},
	getListImg: function(product){
		var p=products.findOne({_id:product});
		if(p.image instanceof Array)
			return p.image;
		else
			return [p.image];
	},
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
		var result=attribute.find({"product":productId,"parent":parent});
		if(result.count()<2){
			Session.set('removescroll',true);
			
		}else{
			Session.set('removescroll',false);
		}
		return result;
	},
	getParentDetails: function(parent){
		return parentattr.findOne({"_id":parent});
	},
	listAttr: function(parent){
		//console.log("OLDID="+parent);
		return attribute.find({"product":parent});
	},
	getParentAttr: function(product){
		//console.log('cherche les attr de '+product);
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
			//console.log('finish');
			return out;
		},
		getShops: function(id){
			return shops.find({"products.product":id,"products.quantity":{ "$nin": ["0"] }});
			//stock.find({"Barcode":Session.get('barcode')});
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
		//alert('Tags:'+JSON.stringify(tags));
		for(var i=0;i<tags.length;i++){
			parentarr.push(tags[i].parent);
		}
		function onlyUnique(value, index, self) { 
			return self.indexOf(value) === index;
		}
		//var arr=['aaa','cc','ajdjfdj','aaa',12];
		var unique = parentarr.filter( onlyUnique );
		for(var j=0;j<unique.length;j++){
			if(unique[j]==tags[j].parent){
				valuearr.push(tags[j].value);
			}
		}

	},
	getParentTagName: function(id){
		return parent_tags.findOne({"_id":id}).title;
	},
	getReviews: function(reviews,filtre,toremove){

		console.log('reloading reviews...'+Session.get('fiterValue'));
		var toRemove=Session.get('removefilter').split(':');
		var myFilter=Session.get('fiterValue');
		for(var i=0;i<toRemove.length;i++){
			if(toRemove[i]=='')
				continue;
			var str=':'+toRemove[i];
			myFilter.replace(str,'');
		}

			//console.log('Before: '+Session.get('fiterValue'));
			//console.log('ToRemove:'+Session.get('removefilter'));
			
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
					Meteor.subscribe("users",reviews[j].user);
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


Template.details.rendered=function(){
	$(".toggle").click(function(){
		$(this).toggleClass("active").next().slideToggle(350);
			return false;
	});
	if(TAPi18n.getLanguage()=='en'){
		Session.set("MAKEUP", "ALL CATEGORY");	   
	}else{
		Session.set("MAKEUP", "رده");	    
	}
	$("#makeup").html(Session.get("MAKEUP"));
	//error tooltip
	//$("[rel='tooltip']").tooltip(); 

	$("#myElement").click();
	$("#gallerycontainer").scrollLeft(0);
	var productId=this.data._id;

	var p=products.find({"_id":productId});

	var attr=attribute.findOne({"product":p.fetch()[0].oldId});
	Session.set('selected_price',attr.price);
	Session.set('selected_point',attr.point);


	var arr=[];
	//console.log('data: '+productId);
	//alert('test');
	if(p.fetch().length>0){
		var currentProduct=p.fetch()[0];
		//console.log('user selected');
		
		if(p.hasOwnProperty('review')){
			var coms=currentProduct.review;
			//console.log('has my reviews2 '+coms );

			for(var i=0;i<coms.length;i++){
				var curUser=users.findOne({"_id":coms[i].user});
				//console.log('comm selected'+curUser.profile.tag);
				

				//if(curUser.profile.tag!='undefined'){
					if(curUser.profile.hasOwnProperty('tag')){
						//console.log('saving'+curUser.profile.tag);
						for(var j=0;j<curUser.profile.tag.length;j++)
							arr.push(curUser.profile.tag[j]);
					}

				}
			}
			//console.log("tagggg:"+arr);
		}
		var result=[];
		for(var i=0;i<arr.length;i++){
			if(result.indexOf(arr[i])<0)
				result.push(arr[i]);
		}
		// console.log("final:"+result);
		//error octofilter
		// $('#input').octofilter({

		// 	source: {
		// 		Grade: ['1/5', '2/5', '3/5', '4/5', '5/5'],
		// 		Tag:result ,
		// 		Age: ['15-25','25-35' , '35-50', '50-100'],
		// 		Hair:['Black ','White']
		// 	}
		// });
		//alert('makra');
		$('.container').click();

		$('.octofilter-link').click(function() {
			console.log("TRIGGER");
			var value=$( this ).text();

		if($( this ).hasClass('octofiltered')){//delete
			
			var tagSession=Session.get("tag_filter");
			
			var indexTag=tagSession.indexOf(value);
			tagSession=tagSession.replace(value+';','');
			Session.set("tag_filter",tagSession);
		}else{
			var tagSession=Session.get("tag_filter");
			if(tagSession.indexOf(value)<0){
				tagSession=tagSession+value+';';
				Session.set("tag_filter",tagSession);
			}
		}
	});



	};

// datetimepicker
Template.addproduct.onRendered(function() {

});
Template.updateproduct.onRendered(function() {
	

});

Template.addproduct.rendered = function(){
	/*Session.set('ADDIMAGEID',this.data.image);
	console.log('PUT IMAGE='+Session.get('ADDIMAGEID'));
	this.$('.datetimepicker').datetimepicker();*/

	if(this.data!=null){
		Session.set('oldId',this.data.oldId);


		//console.log('yeah');
		Session.set('category',this.data.category);
		var alltags="";
		if(this.data.hasOwnProperty('tags')){
			for(var i=0;i<this.data.tags.length;i++){
				alltags=alltags+''+this.data.tags[i].parent+':'+this.data.tags[i].value+';';
			}
			//console.log('OldTags='+alltags);
			Session.set('tags',alltags);
		}


		var allAttr="";
		//console.log('OLDID='+this.data.oldId);
		var attrs=attribute.find({"product":this.data.oldId}).fetch();

		for(var i=0;i<attrs.length;i++){
			allAttr=allAttr+attrs[i].price+','+attrs[i].point+','+attrs[i].parent+','+attrs[i].value+','+attrs[i].barcode+','+attrs[i].productImage+','+attrs[i]._id+';';
		}
		//console.log('Old:'+allAttr);
		Session.set('attributes',allAttr);

		if(this.data.hasOwnProperty('shop'))
			var list_shops=this.data.shop;
		else
			var list_shops=[];

		for(var i=0;i<list_shops.length;i++){
			var html = "";
			var instock = list_shops[i].instock;
			var value= list_shops[i].shopid;
			var text=shops.findOne({"_id":value}).name;
			

			html += '<div class="row" style="margin-bottom:5px;">';
			html += '<label class="control-label col-sm-3" for="tag"></label>';
			//html += ''
			html += '<div class="col-sm-3">';
						//console.log( value._id);
						html += '<input class="form-control shopname" type="text" name="shopname" dataid="'+value+'" value="'+text+'">';
						//i++;
						html += '</div>';
						html += '<div class="col-sm-3"><input type="text" name="instock" class="form-control instock" value="'+instock+'"></div>';
						html += '<div class="col-sm-3"><a class="remove glyphicon glyphicon-remove-circle"></a></div>';
						html += '</div>';
						$('#shophtml').append(html);

					}

				}else{
					Session.set('oldId',Random.id());
				}

				//console.log('hopppp');

			};
// add Products
Session.set("tags", "");
Session.set("category", "");
Session.set("filter","");
Session.set("attributes","");
Session.set('selected_attr','No attribute');
Session.set("tag_filter",'');
Session.set("adminBrand",'');

Session.set("parentAttr","");
Session.set('ADDIMAGEID', "");
Session.set('ADDIMAGEID_ATTR', "");
Session.set("filter","");
Session.set('fiterValue',"");
Session.set('tags','');
Session.setDefault('userId','');
Session.set('removefilter','');
Session.set('numberOfReviews',2);
Session.set("PRICE", '');
Session.set('cateTag','');
Session.set('limitmanagequery',16);
Meteor.call('getPath',function(err,res){
	Session.set('path',res);
});
var processScroll = true;
$(window).scroll(function() {
	if (processScroll  && $(window).scrollTop() > $(document).height() - $(window).height() - 100) {
		processScroll = false;
		var oldLimit=Session.get('limitmanagequery');
		oldLimit+=16;
		Session.set('limitmanagequery',oldLimit);
		processScroll = true;
	}
});
Template.addproduct.events({
	'click #add_attr': function(e,tpl){
		var price=tpl.$('#price_attr').val();
		var point=tpl.$('#point_attr').val();
		var attr=tpl.$('#attribute').val();
		var barcode=tpl.$('#barcode').val();
		var parent=tpl.$('#parent_attr').val();
		var image =$('#attr_image').val();
		var img_id = Session.get('ADDIMAGEID');
		var obj={
			product:this.oldId,
			parent:parent,
			price:price,
			point:point,
			value:attr,
			barcode:barcode,
			productImage:img_id
		}
		if(this._id){
			Meteor.call('insertattribute',obj);
		}else{
			var str=Session.get('attributes');
			str=str+price+':'+point+':'+parent+':'+attr+':'+barcode+':'+img_id+';';
			Session.set('attributes',str);
		}

		
	},
	'click #deleteAttr': function(e,tpl){
		//var oldAttr=Session.get('attributes');
		//alert('oldAttr='+oldAttr);
		//var stricOldAttr=oldAttr.replace('undefined','no barcode');
		//alert(stricOldAttr);
		// var str=this.price+':'+this.point+':'+this.parent+':'+this.attribute+ ':'+this.barcode+':'+';'
		// oldAttr=oldAttr.replace(str,'');
		// console.log('New attr='+oldAttr);
		// Session.set('attributes',oldAttr);
		//alert(this.id);
		attribute.remove({_id:this.id});
	},
	'click #btnAdd': function(e){
		e.preventDefault();
		var imgageArray=[];
		var title = $('#title').val();
		var description =CKEDITOR.instances.editor1.getData();//$('#editor1').val();// $('.froala-element').html();//froala-element
		var price = -1;//$('#price').val();
		var point = -1; //$('#point').val();
		var priority = $('#priority').val();
		var img_id = Session.get('ADDIMAGEID');
		var brand = $('#brand').val();
		var text = 0;
		var rate = 0;
		var date = new Date();
		var category = $('#category').val();
		var status = 0;
		var ratio=100;

		$('input[name="checkImg"]:checked').each(function() {
			imgageArray.push(this.value);
		});
		
		
		var alltags=Session.get('tags');
		alltags=alltags.split(';');

		jsonToSend=[];
		if(alltags!= null){
			for(var i=0;i<alltags.length;i++){
				if(alltags[i]=='')
					continue;
				var parent=alltags[i].split(':')[0];
				var value=alltags[i].split(':')[1];
				var current={
					parent: parent,
					value: value
				};
				if(current!=null && current!='')
					jsonToSend.push(current);
			}
		}

		var attr=Session.get('attributes');
		attr=attr.split(';');

		var oldId=Session.get('oldId');

		listAttr=[];
		
		
		if(attr!= null){
			price=attr[0].split(',')[0];
			point=attr[0].split(',')[1];
			for(var i=0;i<attr.length;i++){
				var current=attr[i];
				var vals=current.split(',');
				var obj={'value':vals[3],'parent':vals[2],'price':vals[0],'point':vals[1],'product':oldId,'barcode':vals[4],'productImage':vals[5]};
				if(current!='null' && current!='')
					listAttr.push(obj);
			}
		}
		
		var shopid = [];
		var instock= [];
		$("#shophtml .shopname").each( function(){
			shopid.push( $(this).attr('dataid') );
		})
		$("#shophtml .instock").each( function(){
			instock.push( $(this).val() );
		})
		var data_shop = [];
		for(i=0; i< shopid.length; i++){
			data_shop.push({shopid:shopid[i],instock:instock[i]});
		}


		var listArticle=[];
		if(Session.get('article')){
			var articles=Session.get('article');
			articles=articles.split(':');
			
			for(var i=0;i<articles.length;i++){
				if(articles[i]!='')
					listArticle.push(articles[i]);
			}
		}
		
		var listTutoes=[];
		if(Session.get('totues')){
			var tutoes=Session.get("totues");
			tutoes=tutoes.split(':');;
			
			for (var i=0;i<tutoes.length;i++){
				if(tutoes[i]!='')
					listTutoes.push(tutoes[i]);
			}
		}
		
		var data ={
			oldId 		:oldId,
			price		:price,
			attrImage   :img_id,
			title		:title,
			description	:description,
			image		:imgageArray,
			Brand		:brand,
			CODE		:123,
			metaTitle	:description,
			metaKeyword	:description,
			point		:point,
			ratio		:ratio,
			status		:status,
			category	:category,
			rate		:rate,
			priority	:priority,
			shop		:data_shop,
			date		:date,
			brand 		:brand,
			tags        :jsonToSend,
			attr 		:listAttr ,
			articles    :listArticle,
			tutoes 		:listTutoes

		}
		if(Router.current().route.getName()=='updateproduct'){
			var currentid=Router.current().params._id;
			data._id=currentid;
			var id = Meteor.call('updateProduct',this._id,data);
			delete Session.keys['multiUploadProduct'];

		}
		else{
			var id = Meteor.call('addPro',data);
			delete Session.keys['multiUploadProduct'];

		}
		Router.go('manageproduct');


	},

	'change #attr_image': function(event, template) {
		event.preventDefault();
		var files = event.target.files;
		for (var i = 0, ln = files.length; i < ln; i++) {
			images.insert(files[i], function (err, fileObj) {
				Session.set('ADDIMAGEID', fileObj._id);
			});
		}
	},
	'click #rmFile':function(e){
		e.preventDefault();
		var result=confirm('Do you want to delete?');
		if(result){
			var aferRemove=Session.get('multiUploadProduct').replace(this.image,'');
			Session.set('multiUploadProduct',aferRemove);
			images.remove(this.image, function(err, file) {
				if (err) {
					console.log('error', err);
				}else {
					console.log('remove success');
					success();
				};
			});
		}
	},
	'click .deleteTag': function(e,tpl){
		var allTags=Session.get('tags');
		var parent=this.parent;
		var value=this.value;
		var str=parent+':'+value+';';
		allTags=allTags.replace(str,'');
		Session.set('tags',allTags);
	},
	'change #category': function(e,tpl){
		var category=tpl.$('#category').val();
		Session.set('category',category);
		
	},

	'change #parent_attr': function(e,tpl){
		var parent=tpl.$("#parent_attr").val();
		Session.set('parentAttr',parent);
	},
	'change #image': function(event, template) {
		event.preventDefault();
		var files = event.target.files;
		for (var i = 0, ln = files.length; i < ln; i++) {
			images.insert(files[i], function (err, fileObj) {
				if(Session.get('multiUploadProduct')){
					var strImage=Session.get('multiUploadProduct')+","+fileObj._id;
				}else{
					var strImage=fileObj._id;
				}

				Session.set('multiUploadProduct',strImage);
				var result = Session.get('multiUploadProduct');

			});
		}

	},
	'click #tagAdd': function(e,tpl){
		e.preventDefault();
		var nameTag="#tag_"+this._id;
		var value=tpl.$(nameTag).find(":selected").text();;
		var parent=tpl.$(nameTag).find(":selected").attr('id');


		var listTags=Session.get("tags")+parent+':'+value+";";
		Session.set("tags", listTags);
	},
	'click .remove': function(e,tpl){
		$(e.currentTarget).parent().parent().remove();
	},
	'click #addshop': function(e,tpl){
		var html = "";
		var instock = ($("#instock").val()!="")? parseInt($("#instock").val()):"";
		var value= $("#myshop").val();
		var text = $("#myshop option:selected").text();
		var msg = "";
		if( instock == "" || value==""){
			if( instock == 0 || instock == "" )
				msg += "In Stock can not empty or 0<br>";
			if( value=="" )
				msg += "Select shop is require.";
			
		}else{
			html += '<div class="row" style="margin-bottom:5px;">';
			html += '<label class="control-label col-sm-3" for="tag"></label>';
			html += '<div class="col-sm-3">';
			html += '<input class="form-control shopname" type="text" name="shopname" dataid="'+value+'" value="'+text+'">';
			html += '</div>';
			html += '<div class="col-sm-3"><input type="text" name="instock" class="form-control instock" value="'+instock+'"></div>';
			html += '<div class="col-sm-3"><a class="remove glyphicon glyphicon-remove-circle"></a></div>';
			html += '</div>';
			$('#shophtml').append(html);
			$("#instock").val('');		
		}		
	},

	'click #addarticle': function(e,tpl){
		e.preventDefault();

		var article=tpl.$('#article').val();

		if(Session.get('article')){
			var strArticle=article+':'+Session.get('article');
		}else{
			var strArticle=article;
		}
		Session.set("article",strArticle);		
	},
	'click .deleteArticle': function(e,tpl){
		e.preventDefault();
		var allArticle=Session.get('article');		
		var afterdelete=allArticle.replace(this,'');	
		Session.set('article',afterdelete);
	},
	'click #btn_tuto': function(e,tpl){
		e.preventDefault();
		var tutoes=tpl.$('#tuto').val();
		if(Session.get('totues')){
			var strTutoes=tutoes+':'+Session.get('totues');
		}else{
			var strTutoes=tutoes;
		}
		Session.set("totues",strTutoes);		
	},
	'click .deleteTutoes': function(e,tpl){
		e.preventDefault();
		var allTutoes=Session.get('totues');		
		var afterdelete=allTutoes.replace(this,'');	
		Session.set('totues',afterdelete);
	},
	"change #price":function(e){
		e.preventDefault();
		var price = $(e.currentTarget).val();
		var id_attr=this.id;
		Meteor.call('changePriceAttr',id_attr,price,function(err,resp){
			/*var allAttr="";
			//console.log('OLDID='+this.data.oldId);
			var attrs=attribute.find({"product":this.data.oldId}).fetch();

			for(var i=0;i<attrs.length;i++){
				allAttr=allAttr+attrs[i].price+':'+attrs[i].point+':'+attrs[i].parent+':'+attrs[i].value+':'+attrs[i].barcode+':'+attrs[i].productImage+':'+attrs[i]._id+';';
			}
			console.log('Old:'+allAttr);
			Session.set('attributes',allAttr);*/
		});

	},
"change #point":function(e){
	e.preventDefault();
	var point = $(e.currentTarget).val();
	//alert(price);
	//Session.setPersistent("PRICE", price);
	//alert(Session.get("PRICE"));
	var id_attr=this.id;
	//alert('id='+id_attr+' / point='+point);
	Meteor.call('changePiontAttr',id_attr,point,function(err,resp){
		/*var allAttr="";
		console.log('OLDID='+this.data.oldId);
		var attrs=attribute.find({"product":this.data.oldId}).fetch();

		for(var i=0;i<attrs.length;i++){
			allAttr=allAttr+attrs[i].price+':'+attrs[i].point+':'+attrs[i].parent+':'+attrs[i].value+':'+attrs[i].barcode+':'+attrs[i].productImage+':'+attrs[i]._id+';';
		}
		console.log('Old:'+allAttr);
		Session.set('attributes',allAttr);*/
	});

},
"change #barcode":function(e){
	e.preventDefault();
	var barcode = $(e.currentTarget).val();
	//alert(price);
	//Session.setPersistent("PRICE", price);
	//alert(Session.get("PRICE"));
	var id_attr=this.id;
	//alert(id_attr);
	//alert('id='+id_attr+' / barcode='+barcode);
	Meteor.call('changeBarcodetAttr',id_attr,barcode,function(err,resp){
		/*var allAttr="";
		console.log('OLDID='+this.data.oldId);
		var attrs=attribute.find({"product":this.data.oldId}).fetch();

		for(var i=0;i<attrs.length;i++){
			allAttr=allAttr+attrs[i].price+':'+attrs[i].point+':'+attrs[i].parent+':'+attrs[i].value+':'+attrs[i].barcode+':'+attrs[i].productImage+':'+attrs[i]._id+';';
		}
		console.log('Old:'+allAttr);
		Session.set('attributes',allAttr);*/
	});

},
'change #updateAttrImg': function(event, template) {
	var id=this.id;
	event.preventDefault();
	var files = event.target.files;
	for (var i = 0, ln = files.length; i < ln; i++) {
		images.insert(files[i], function (err, fileObj) {
			//alert(fileObj._id);
			//alert(id);
			Meteor.call('updateImgAttr',id,fileObj._id);
		});
	}
}
// end

});

// Template.updateproduct.events({
// 	getTag: function(parentid){
// 		console.log('parent='+parentid);
// 		return tags.find({"parent":parentid});
// 	},
// 	'click #btnUpdate': function(e,tpl){
// 		e.preventDefault();
// 		var imgArray=[];
// 		var title = $('#title').val();
// 		var description =CKEDITOR.instances.editor1.getData();//$('#editor1').val();// $('.froala-element').html();//froala-element
// 		var price = -1;// $('#price').val();
// 		var point =-1;// $('#point').val();
// 		var priority = $('#priority').val();
// 		var image =$('#attr_image').val(); // attr img
// 		var img_id = Session.get('UPDATEIMAGEID');
// 		var brand = $('#brand').val();
// 		var text = 0;
// 		var rate = 0;
// 		var date = new Date();
// 		var category = $('#category').val();
// 		var status = 0;
// 		var ratio=100;
// 		//var img_id = Session.get('UPDATEIMAGEID');
// 		var imgArray=Session.get('multiUploadProduct').split(":");

// 		$('input[name="checkImg"]:checked').each(function() {
// 			arrayIMG.push(this.value);
// 		});

// 		var alltags=Session.get('tags');
// 		alltags=alltags.split(';');

// 		jsonToSend=[];
// 		if(alltags!= null){
// 			for(var i=0;i<alltags.length;i++){
// 				if(alltags[i]=='')
// 					continue;
// 				var parent=alltags[i].split(':')[0];
// 				var value=alltags[i].split(':')[1];
// 				var current={
// 					parent: parent,
// 					value: value
// 				};
// 				if(current!=null && current!='')
// 					jsonToSend.push(current);
// 			}
// 		}

// 		var attr=Session.get('attributes');
// 		attr=attr.split(';');

// 		var oldId=Session.get('oldId');

// 		listAttr=[];
// 		if(attr!= null){
// 			price=attr[0].split(',')[0];
// 			point=attr[0].split(',')[1];
// 			for(var i=0;i<attr.length;i++){
// 				var current=attr[i];
// 				var vals=current.split(',');
// 				var obj={'value':vals[3],'parent':vals[2],'price':vals[0],'point':vals[1],'product':oldId};
// 				if(current!='null' && current!='')
// 					listAttr.push(obj);
// 			}

// 		}

// 		//console.log('title:'+title+' price:'+price+' point:'+point+' priority:'+priority+' imageid:'+img_id+' category:'+category+' status:'+status);

// 		var shopid = [];
// 		var instock= [];
// 		$("#shophtml .shopname").each( function(){
// 			shopid.push( $(this).attr('dataid') );
// 		});
// 		$("#shophtml .instock").each( function(){
// 			instock.push( $(this).val() );
// 		});
// 		console.log(shopid);
// 		console.log(instock);
// 		var data_shop = [];
// 		for(i=0; i< shopid.length; i++){
// 			data_shop.push({shopid:shopid[i],instock:instock[i]});
// 		}
// 		var data ={
// 			_id			:this._id,
// 			oldId 		:oldId,
// 			price		:price,
// 			attrImage   :img_id,
// 			title		:title,
// 			description	:description,
// 			image		:imgArray,
// 			Brand		:brand,
// 			CODE		:123,
// 			metaTitle	:description,
// 			metaKeyword	:description,
// 			point		:point,
// 			ratio		:ratio,
// 			status		:status,
// 			category	:category,
// 			rate		:rate,
// 			priority	:priority,
// 			shop		:data_shop,
// 			date		:date,
// 			brand 		:brand,
// 			tags        :jsonToSend,
// 			attr 		:listAttr 

// 		}
// 		alert("OK");
// 		var id = Meteor.call('updateProduct',data);
// 		console.log('ProductID:'+id);
// 		//Meteor.call('addPro',title, description, price,point,img_id, category, status,ratio,jsonToSend,listAttr,priority);
// 		Router.go('manageproduct');
// 	},
// 	'change #image': function(event, template) {
// 		event.preventDefault();
// 		var arrayImage=[];
// 		var imagsearr=this.image;
// 		for(var j=0;j<imagsearr.length;j++){
// 			arrayImage.push(imagsearr[j]);
// 		}

// 		var files = event.target.files;
// 		for (var i = 0, ln = files.length; i < ln; i++) {
// 			images.insert(files[i], function (err, fileObj) {

// 				if(Session.get('multiUploadProduct')){
// 					var strImage=Session.get('multiUploadProduct')+','+fileObj._id;
// 				}else{

// 					var strImage=arrayImage.toString()+','+fileObj._id;

// 				}
// 				var result = Session.set('multiUploadProduct',strImage);
// 				alert("result "+result);

// 			});			

// 		}
// 	},
// 	'click #addshop': function(e,tpl){
// 		var html = "";
// 		var instock = ($("#instock").val()!="")? parseInt($("#instock").val()):"";
// 		var value= $("#myshop").val();
// 		var text = $("#myshop option:selected").text();
// 		//console.log("#instock"+instock);
// 		//console.log("#myshop"+);
// 		var msg = "";
// 		if( instock == "" || value==""){
// 			if( instock == 0 || instock == "" )
// 				msg += "In Stock can not empty or 0<br>";
// 			if( value=="" )
// 				msg += "Select shop is require.";

// 			alert(msg);
// 		}else{
// 			html += '<div class="row" style="margin-bottom:5px;">';
// 			html += '<label class="control-label col-sm-3" for="tag"></label>';
// 			//html += ''
// 			html += '<div class="col-sm-3">';
// 						//console.log( value._id);
// 						html += '<input class="form-control shopname" type="text" name="shopname" dataid="'+value+'" value="'+text+'">';
// 						//i++;
// 						html += '</div>';
// 						html += '<div class="col-sm-3"><input type="text" name="instock" class="form-control instock" value="'+instock+'"></div>';
// 						html += '<div class="col-sm-3"><a class="remove glyphicon glyphicon-remove-circle"></a></div>';
// 						html += '</div>';
// 						$('#shophtml').append(html);
// 						$("#instock").val('');

// 					}

// 				},
// 				'click .remove': function(e,tpl){
// 					$(e.currentTarget).parent().parent().remove();
// 				},
// 				'change #category': function(e,tpl){

// 					var category=tpl.$('#category').val();
// 					Session.set('category',category);
// 		//console.log('heho');
// 		//console.log(category);
// 	},

// 	'change #attr_image': function(event, template) {
// 		alert(this.image);
// 		event.preventDefault();
// 		var id=this.image;
// 		alert(id);
// 		images.remove(id, function(err, file) {
// 			if (err) {
// 				console.log('error', err);
// 			} else {
// 				console.log('remove success');
// 				success();
// 			};
// 		});

// 		var files = event.target.files;
// 		for (var i = 0, ln = files.length; i < ln; i++) {
// 			images.insert(files[i], function (err, fileObj) {
// 				Session.set('UPDATEIMAGEID', fileObj._id);
// 			});
// 		}
// 	}
// });
// helpers products
Template.addproduct.helpers({
	getBrand: function(){
		var myBrands=[];

		var liste=products.find().fetch();
		console.log("Processing2:"+liste.length);
		for(var i=0;i<liste.length;i++){
			if(liste[i].hasOwnProperty('Brand')){
				var first=liste[i].Brand;
					//console.log('first:'+first);
					//console.log(first.substr(0,1)+' = '+letter+' ???');
					if(first!='' && myBrands.indexOf(first)==-1)
						myBrands.push(first);
				}

			}
			return myBrands;
		},
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
getSessionTag: function(){
	Tracker.autorun(function () {
		console.log('SESSION: '+Session.get('tags'));
		return Session.get('tags');
	});
},
listTag: function(){
	var list=Session.get('tags');
	if(list=='')
		return;
	console.log('process:'+list);
	var liste=list.split(";");
	var tab=[];
	for(var i=0;i<liste.length;i++){
		if(liste[i]=='')
			continue;
		console.log('elt-> '+liste[i]);
		var elt=liste[i].split(':');
		var parent=elt[0];
		var value=elt[1];

		var currentTag={parent:parent,value:value};
		console.log('currentTag: '+JSON.stringify(currentTag));
		tab.push(currentTag);
	}
	console.log('tab: '+JSON.stringify(tab));
	return tab;

},
listAttr: function(){
	if(Session.get('attributes')=='')
		return;
	//var clear_undefine=Session.get('attributes').replace('undefined','')
	//Session.set('attributes',clear_undefine);
	var liste=Session.get('attributes').split(";");
	var tab=[];
	for(var i=0;i<liste.length;i++){
		if(liste[i]=='')
			continue;
		var line=liste[i].split(",");
		var obj={
			id: line[6],
			price:line[0],
			point:line[1],
			attribute:line[3],
			parent:line[2],
			barcode:line[4],
			productImage: line[5]
		};
		console.log('IMG ATTR='+line[5]);
		tab.push(obj);
	}
	return tab;
},
getParentNameTag: function(parent){
	if(parent=='' || parent==null)
		return;
	return parent_tags.findOne({"_id":parent}).title;
},
getAttributeName: function(id){
	if(id=='' || id==null)
		return;
	return attribute.findOne({"_id":id}).value;
},
getParentName: function(id_attr){
	if(id_attr=='undefined' || id_attr==null)
		return;

	return parentattr.findOne({"_id":id_attr}).name;
},
getCat: function(){
	return categories.find({});
},
getShop: function(){
	return shops.find({});
},
parentTag: function(){

	var cat=Session.get('category');
	console.log("CATI:"+cat);
	if(cat==null)
		var ret= parent_tags.find({});
	else
		var ret= parent_tags.find({"category_id":cat});
	console.log("category:"+ret.count());
	return ret;



},
getTag: function(parentid){
	console.log('parent='+parentid);
	return tags.find({"parent":parentid});
},
myTags: function () {
	return Session.get("tags");
},
getcategory: function(){
	Tracker.autorun(function () {
		return Session.get('category');
	});
},
getParentAttr: function(){
	return parentattr.find();
},
getAttr: function(parent){
	return attribute_value.find({"parentId": parent});
},
parentAttr: function(){
	return Session.get('parentAttr');
},
catName: function(cat){

	if(cat==0 || cat=='' || cat=='undefined' || cat==null)
		return;
	var result = categories.findOne({_id:cat});
	console.log(result);
	if(result){
		Session.set('data',result.title);
		return result.title;
	}

},
getArticle:function(){
	var typeId=contents_type.findOne({type:"Article"})._id;
	var result=contents.find({typeid:typeId});
	console.log("article--- " + JSON.stringify(result));
	return result;
		//return contents_type.find({});
	},
	getTypeName:function(typeid){
		return contents_type.findOne({_id:typeid}).type;
	},
	getContentArt:function(){
		var arr=[];
		var getArt = Session.get("article");
		var arrAtrticle=getArt.split(':');
		for(var i=0;i<arrAtrticle.length;i++){
			if(arrAtrticle[i]!==""){
				arr.push(arrAtrticle[i]);
			}
			
		}
		return arr;

	},
	getTitle:function(id){
		return contents.findOne({_id:id}).title;
	},

// sokhy tuto
getTutoes:function(){
	var tutoId=contents_type.findOne({type:"Tuto"})._id;
	console.log("tutoId-- "+tutoId);
	var result=contents.find({typeid:tutoId});
	return result;
},
getContentTutoes:function(){
	var arr=[];
	var getTutoes = Session.get("totues");
	var arrTutoes=getTutoes.split(':');
	for(var i=0;i<arrTutoes.length;i++){
		if(arrTutoes[i]!==""){
			arr.push(arrTutoes[i]);
		}

	}
	return arr;

},
getContenttuto:function(){
	var arr=[];
	var getAlltuto = Session.get("tuto");
	var arrAlltutoes=getAlltuto.split(':');
	for(var i=0;i<arrAlltutoes.length;i++){
		if(arrAlltutoes[i]!==""){
			arr.push(arrAlltutoes[i]);
		}

	}
	return arr;

},
	//add product
	getIdImageUpdate:function(image){

		if(Session.get('multiUploadProduct')){
			var str=image.toString()+','+Session.get('multiUploadProduct');
			
		}else{
			var str=image.toString();
			
		}
		var arr=[];
		var arrayImage=str.split(",");
		for(var i=0;i<arrayImage.length;i++){
			if(arrayImage[i]){
				var obj={
					image:arrayImage[i]
				}
				arr.push(obj);
			}
		}

		return arr;
	},
	getIdImageAdd:function(){
		
		var str=Session.get('multiUploadProduct');

		var arr=[];
		var arrayImage=str.split(",");
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

// Template.updateproduct.helpers({
// 	catName: function(cat){
// 		if(cat==0 || cat=='' || cat=='undefined' || cat==null)
// 			return;
// 		var result = categories.findOne({_id:cat});
// 		console.log(result);
// 		if(result){
// 			Session.set('data',result.title);
// 			return result.title;
// 		}

// 	},
// 	catAll: function(){
// 		var catName = Session.get('data');
// 		return categories.find({title:{$ne:catName}});
// 	},
// 	getShop: function(){
// 		return shops.find({});
// 	},
// 	getShopname: function( id ){
// 		var shop = shops.findOne({_id:id });
// 		if( shop ) return shop.name; 
// 	},
// 	getIdImage:function(image){
// 		if(Session.get('multiUploadProduct')){
// 			var imageArr=Session.get('multiUploadProduct').split(',');
// 		}else{
// 			var imageArr=image;
// 		}

// 		var nameImage=[];
// 		for(var i=0;i<imageArr.length;i++){
// 			var img = images.findOne({_id:imageArr[i]});
// 			if(!img)
// 				continue;
// 			if(!img.copies)
// 				continue;
// 			console.log(img.copies.images.key);
// 			var name=img.copies.images.key;
// 			var obj={
// 				imageId:imageArr[i],
// 				imageName:name
// 			}
// 			nameImage.push(obj);
// 		}
// 		return nameImage;
// 	}
// });



Template.manageproduct.events({
	'change #sortcate':function(e){
		e.preventDefault();
		var id=$('#sortcate').val();
		Session.set('cateTag',id);
	},
	'change #sorttag':function(e){
		e.preventDefault();
		Session.set('sorttag',$('#sorttag').val());
	},
	'click #remove': function(){
		var id = this._id;
		Meteor.call('deletePro', id);
	},
	'change #brandname':function(e){
		e.preventDefault();
		var mybrand = $('#brandname').val();
		Session.set('adminBrand',mybrand);
	},

	'click #publish': function(e){
		e.preventDefault();
		var id = this._id;
		var status = 0;
		var attributes = {
			status:status
		};
		Meteor.call('publishPro',id, attributes);
	},
	'click .more': function(e,tpl){
		var limit=Number(Session.get('limitmanagequery'));
		limit=limit+16;
		Session.set('limitmanagequery',limit);
		console.log('limite='+Session.get('limitmanagequery'));
	},
	"click #unpublish": function(e) {
		e.preventDefault();
		var id = this._id;
		var status = 1;
		var attr = {
			status:status
		};
		Meteor.call('unpublishPro',id, attr);
	}
});

Template.add_review.events({
	'click #commentok': function(e,tpl){
		var title=tpl.$("#title").val();
		var comment=tpl.$("#comment").val();
		var grade=tpl.$("#grade").val();
		var user=Meteor.user()._id;
		var productid=this._id;
		Meteor.call("add_review",title,comment,grade,user,productid);
	}
});
Template.manageproduct.helpers({
	getListImg: function(product){
		var p=products.findOne({_id:product});
		console.log("img p" + p);
		if(p.image instanceof Array)
			return p.image;
		else
			return [p.image];
	},
	getImgeAttribute:function(oldId){
		var imageAttr = attribute.find({"product":oldId});
		console.log("hi hi " + imageAttr)+ "hii";
		return imageAttr;
		// var imageAttr=attribute.find({"product":oldId});
		// console.log("img imageAttr" + imageAttr);
		// if(imageAttr.image instanceof Array)
		// 	return imageAttr.image;
		// console.log("sokhy " + imageArr.image);
		// else
		// 	return [imageAttr.image];
	},
	getBrandSort:function(){
		var arrBrand=[];
		var getBrand = products.find({});
		getBrand.forEach(function(value){
			arrBrand.push(value.Brand);
		})
		function onlyUnique(value, index, self) { 
			return self.indexOf(value) === index;
		}
		var uniqueBrand = arrBrand.filter( onlyUnique );
		return uniqueBrand;
	},
	managePro: function(){
		var arr=[];
		var number=1;
		if(Session.get('adminBrand')){
			var data= products.find({Brand:Session.get('adminBrand')},{limit:Session.get('limitmanagequery')});
		}else if(Session.get('sorttag')){
			var data=products.find({"tags.parent":Session.get('sorttag')},{limit:Session.get('limitmanagequery')});
		}else{
			var data= products.find({},{limit:Session.get('limitmanagequery')});
		}

		data.forEach(function(value){
			var object={
				number:number,
				_id:value._id,
				oldId:value.oldId,
				price:value.price,
				title:value.title,
				description:value.description,
				image:value.image,
				Brand:value.Brand,
				CODE:value.CODE,
				metaTitle:value.metaTitle,
				metaKeywords:value.metaKeywords,
				point:value.point,
				ratio:value.ratio,
				status:value.status,
				category:value.category,
				metaKeyword:value.metaKeyword,
				priority:value.priority,
				shop:value.shop,
				date:value.date,
				tags:value.tags,
			};
			console.log("MYPORDUCT:"+JSON.stringify(object));
			arr.push(object);
			number=number+1;
		});
		
		
		if(data.count()<=0){
			console.log("NO PORDUCT");
			return false;
		}
		else{

			return arr;
		}
	},
	catName: function(cat){
		var result = categories.findOne({_id:cat});
		return result.title;
	},
	checkStatus: function(status){
		if(status === 0){
			return false;
		}
		else{
			return true;
		}
	},
	shopName: function(name){
		if(name=='0')
			return;
		var result = shops.findOne({_id: name});
		return result.title;
	},
	shopIn: function(nameIn){
		var result = shops.findOne({_id:nameIn});
		return result.instock;
	},
	getCatSort:function(){
		return categories.find();
	},
	getParentTagSort:function(){
		var cateTag=Session.get('cateTag');
		var result=parent_tags.find({category_id:cateTag});
		return result;

	},
	getProductToSort:function(){
		var parent=Session.get('sorttag');
		return products.find({"tags.parent":parent});
	}
});

// Template.details.helpers({
// 	getTagList: function(productid) {
// 		var pro = products.findOne({
// 			_id: productid
// 		});
// 		if (pro) {
// 			var y = pro.tags;

// 			var x = {};
// 			var id = [];
// 			for (var i = 0; i < y.length; ++i) {
// 				var obj = y[i];

//                 //If a property for this DtmStamp does not exist yet, create
//                 if (x[obj.parent] === undefined) {
//                     x[obj.parent] = [obj.parent]; //Assign a new array with the first element of DtmStamp.
//                     id.push(obj.parent);
//                 }
//                 //x will always be the array corresponding to the current DtmStamp. Push a value the current value to it.
//                 x[obj.parent].push(obj.value);

//             }

//             var s = '';
//             for (j = 0; j < id.length; j++) {
//             	var data = x[id[j]];
//                 var p = 0;
//                 for (k = 0; k < data.length; k++) {
//                 	p++;

//                 	if (p == 1) {
//                 		var tag = parent_tags.findOne({
//                 			_id: data[k]
//                 		});
//                 		var name = (tag) ? tag.title : 'no name';
//                 		s += '<li><strong>' + name + '</strong> : ';
//                 	} else {
//                 		s += data[k];
//                 		s += (p < data.length) ? ' , ' : '';
//                 	}
//                 	if (p >= data.length) {
//                 		p = 0;
//                 		s += '</li>';
//                 	}
//                 }
//                 console.log(s);
//             };

//             return s;

//         }
//     },
//     existReview:function(review){
//     	if(review){
//     		return true;
//     	}else{
//     		return false;
//     	}
//     },
//     getMainImg: function(){
//     	console.log('mainImg'+Session.get('mainImg'));
//     	return Session.get('mainImg');
// 	},
// 	getProductImg: function(product){
// 		var p=products.findOne({_id:product});
// 		if(p.image instanceof Array)
// 			return p.image[0];
// 		else
// 			return p.image;
// 	},
// 	getListImg: function(product){
// 		var p=products.findOne({_id:product});
// 		if(p.image instanceof Array)
// 			return p.image;
// 		else
// 			return [p.image];
// 	},
// 	suggestion: function(title){
// 		return contents.find({"content":{"$regex":title}});
// 	},
// 	getArticle: function(idarticle){
// 		return contents.findOne({"_id":idarticle});
// 	},
// 	getTutoes: function(idtutoes){
// 		return contents.findOne({"_id":idtutoes});
// 	},
// 	getAllAttributes: function(productId,parent){
// 		var result=attribute.find({"product":productId,"parent":parent});
// 		if(result.count()<2){
// 			Session.set('removescroll',true);
			
// 		}else{
// 			Session.set('removescroll',false);
// 		}
// 		return result;
// 	},
// 	getParentDetails: function(parent){
// 		return parentattr.findOne({"_id":parent});
// 	},
// 	listAttr: function(parent){
// 		return attribute.find({"product":parent});
// 	},
// 	getParentAttr: function(product){
// 		console.log('cherche les attr de '+product);
// 		var list=attribute.find({"product":product}).fetch();
// 		var out=[];
// 		for(var i=0;i<list.length;i++){
// 			var contains=0;
// 			for(var j=0;j<out.length;j++)
// 				if(out[j].parent==list[i].parent)
// 					contains=1;
// 				if(contains==0)
// 					out.push(list[i]);
// 			}
// 			console.log('finish');
// 			return out;
// 		},
// 		getShops: function(id){
// 			return shops.find({"products.product":id,"products.quantity":{ "$nin": ["0"] }});
// 		},
// 		getAttribute: function(id){

// 			return attribute.findOne({"_id": id});
// 		},
// 		getTagName: function(tagid){
// 			if(tagid!=null)
// 				return tags.findOne({_id:tagid}).title;
// 			else
// 				return;
// 		},
// 		getAttr: function(id){
// 			return attribute.findOne({"_id":id});
// 		},
// 		getCategoryName: function(categoryid){
// 			console.log("cat:"+categoryid);
// 			if(categoryid!=null)
// 				return categories.findOne({_id:categoryid}).title;
// 			else
// 				return;
// 		},
// 		getShopname: function( id ){
// 			var shop = shops.findOne({_id:id });
// 			if( shop ) return shop.name; 
// 		},
// 		filterReview: function(){
// 			Tracker.autorun(function () {
// 				console.log('RERUNNING');
// 				return Session.get('fiterValue');
// 			});
// 		},
// 		removeFilter: function(){
// 			Tracker.autorun(function () {
// 				console.log('RERUNNING delete');
// 				return Session.get('removefilter');
// 			});
// 		},
// 		slic:function(tags){
// 			var parentarr=[];
// 			var valuearr=[];
// 		for(var i=0;i<tags.length;i++){
// 			parentarr.push(tags[i].parent);
// 		}
// 		function onlyUnique(value, index, self) { 
// 			return self.indexOf(value) === index;
// 		}

// 		var unique = parentarr.filter( onlyUnique );
// 		for(var j=0;j<unique.length;j++){
// 			if(unique[j]==tags[j].parent){
// 				valuearr.push(tags[j].value);
// 			}
// 		}

// 	},
// 	getParentTagName: function(id){
// 		return parent_tags.findOne({"_id":id}).title;
// 	},
// 	getReviews: function(reviews,filtre,toremove){

// 		console.log('reloading reviews...'+Session.get('fiterValue'));
// 		var toRemove=Session.get('removefilter').split(':');
// 		var myFilter=Session.get('fiterValue');
// 		for(var i=0;i<toRemove.length;i++){
// 			if(toRemove[i]=='')
// 				continue;
// 			var str=':'+toRemove[i];
// 			myFilter.replace(str,'');
// 		}
			
// 			if(Session.get('fiterValue')=="" || Session.get('fiterValue')=="undefined"){
// 				var lastResult=[];
// 				var numberOfResult=Session.get('numberOfReviews');

// 				if(numberOfResult>reviews.length)
// 					numberOfResult=reviews.length
// 				console.log('NUMBER OF lastResult.length '+numberOfResult);
// 				for(var i=0;i<numberOfResult;i++)
// 					lastResult.push(reviews[i]);

// 				console.log('NUMBER OF lastResult.length '+lastResult.length);
// 				return lastResult;

// 			}
// 			console.log('Calling filterReview='+reviews.length);
// 			var values=Session.get('fiterValue').split(':');
// 			//fiterValue
// 			var ages=[];
// 			var myTags=[];
// 			var grades=[];

// 			for(var i=0;i<values.length;i++){
// 				var param=values[i];
// 				if(param=='')
// 					continue;
// 				console.log("Processing "+param);
// 				if(param.indexOf('-')>=0){
// 					ages.push(param);
// 				}else if(param.indexOf('/')>=0){
// 					grades.push(param);
// 				}else{
// 					myTags.push(param);
// 				}
// 			}

// 			console.log('ages:'+ages.length);
// 			console.log('myTags:'+myTags.length);
// 			console.log('grades:'+grades.length);

// 			var results=[];
// 			for(var i=0;i<ages.length;i++){
// 				var ageMin=Number(ages[i].split('-')[0]);
// 				var ageMax=Number(ages[i].split('-')[1]);

// 				console.log('min:'+ageMin);
// 				console.log('max:'+ageMax);
// 				//Loop into reviews
// 				for(var j=0;j<reviews.length;j++){
// 					Meteor.subscribe("users",reviews[j].user);
// 					var curUser=users.findOne({"_id":reviews[j].user});
// 					if(Number(curUser.profile.age)<= ageMax && Number(curUser.profile.age)>=ageMin){
// 						results.push(reviews[j]);

// 					}

// 				}
// 			}
// 			console.log('Size of the rest:'+reviews.length);
// 			console.log('Still in the sand after ager filter:'+results.length);
// 			if(results.length>0){
// 				console.log('remise a 0');
// 				reviews=[];
// 				reviews=results.slice(0);
// 				results=[];
// 			}

// 			console.log('Size of the rest:'+reviews.length);
// 			for(var i=0;i<myTags.length;i++){
// 				var curTag=myTags[i];
// 				console.log('tagging '+curTag);
// 				for(var j=0;j<reviews.length;j++){
// 					var curUser=users.findOne({"_id":reviews[j].user});
// 					if(curUser.profile.tag.indexOf(curTag)>=0)
// 						results.push(reviews[j]);
// 				}
// 			}

// 			console.log('Still in the sand(tags):'+results.length);
// 			if(results.length>0){
// 				console.log('remise a 0');
// 				reviews=[];
// 				reviews=results.slice(0);
// 				results=[];

// 			}
// 			if(grades.length==0)
// 				results=reviews.slice(0);
// 			console.log('Size of the rest:'+reviews.length);
// 			for(var i=0;i<grades.length;i++){
// 				var curGrade=grades[i].split('/')[0];
// 				//Loop into reviews

// 				for(var j=0;j<reviews.length;j++){
					
// 					if(Number(reviews[j].grade)==Number(curGrade) && results.indexOf(reviews[j])<0){
// 						results.push(reviews[j]);
// 						console.log('Comparing '+curGrade+' and '+reviews[j].grade);
// 					}

// 				}
// 			}

// 			console.log('Still in the sand(grades):'+results.length);
// 			console.log('afterFilter:'+results.length);

// 			var lastResult=[];
// 			var numberOfResult=Session.get('numberOfReviews');

// 			if(numberOfResult>results.length)
// 				numberOfResult=results.length
// 			console.log('NUMBER OF lastResult.length '+numberOfResult);
// 			for(var i=0;i<numberOfResult;i++)
// 				lastResult.push(results[i]);

// 			console.log('NUMBER OF lastResult.length '+lastResult.length);
// 			return lastResult;


// 		},
// 		getReviewsShort: function(reviews,limit){
// 			if(Session.get("filter")==""){
// 				var ret=[];
// 				for(var i=0;i<reviews.length && i<=limit;i++){
// 					var current=reviews[i];
// 					ret.push(current);
// 				}
// 				return ret;
// 			}
// 			else{
// 				var ret=[];
// 				for(var i=0;i<reviews.length && i<=limit;i++){
// 					var current=reviews[i];
// 					var currentAuthor=users.findOne({_id:current.user});
// 					if(currentAuthor.emails[0].address==Session.get("filter"))
// 						ret.push(current);
// 				}
// 				return ret;
// 			}
// 		},
// 		path: function(){
// 			return Session.get('path');
// 		},
// 		selected_attr: function(){
// 			return Session.get('selected_attr');
// 		},
// 		selected_price: function(){
// 			return Session.get('selected_price');
// 		},
// 		selected_point: function(){
// 			return Session.get('selected_point');
// 		}
// 	});
// });



Template.addproduct.rendered = function(){
	if(this.data!=null){
		Session.set('oldId',this.data.oldId);
		console.log('yeah');
		Session.set('category',this.data.category);
		var alltags="";
		if(this.data.hasOwnProperty('tags')){
			for(var i=0;i<this.data.tags.length;i++){
				alltags=alltags+''+this.data.tags[i].parent+':'+this.data.tags[i].value+';';
			}
			console.log('OldTags='+alltags);
			Session.set('tags',alltags);
		}

		var allAttr="";
		console.log('OLDID='+this.data.oldId);
		var attrs=attribute.find({"product":this.data.oldId}).fetch();

		for(var i=0;i<attrs.length;i++){
			allAttr=allAttr+attrs[i].price+','+attrs[i].point+','+attrs[i].parent+','+attrs[i].value+','+attrs[i].barcode+','+attrs[i].productImage+','+attrs[i]._id+';';
		}
		console.log('Old:'+allAttr);
		Session.set('attributes',allAttr);

		if(this.data.hasOwnProperty('shop'))
			var list_shops=this.data.shop;
		else
			var list_shops=[];

		for(var i=0;i<list_shops.length;i++){
			var html = "";
			var instock = list_shops[i].instock;
			var value= list_shops[i].shopid;
			var text=shops.findOne({"_id":value}).name;
			

			html += '<div class="row" style="margin-bottom:5px;">';
			html += '<label class="control-label col-sm-3" for="tag"></label>';
			//html += ''
			html += '<div class="col-sm-3">';
						html += '<input class="form-control shopname" type="text" name="shopname" dataid="'+value+'" value="'+text+'">';
						//i++;
						html += '</div>';
						html += '<div class="col-sm-3"><input type="text" name="instock" class="form-control instock" value="'+instock+'"></div>';
						html += '<div class="col-sm-3"><a class="remove glyphicon glyphicon-remove-circle"></a></div>';
						html += '</div>';
						$('#shophtml').append(html);

					}

				}else{
					Session.set('oldId',Random.id());
				}

				//console.log('hopppp');

			};

			
