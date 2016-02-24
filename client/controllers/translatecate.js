Template.translate_category.events({
	'submit form':function(e){
		e.preventDefault();
		var title = $('#title').val();
		var cateid=this._id;
		var collection= "categories"; 
		var lang = $('#lang').val(); 
		var obj ={
			title:title
		};
		
		if(lang=='en'){
			var object={
				id:cateid,
				collectionName:collection,
				i18n:{en:obj}
			}
		}else{
			var object={
				id:cateid,
				collectionName:collection,
				i18n:{fa:obj}
			}
		}
		Meteor.call('insertTradeCategory',object,cateid,collection,lang, function(err){
			if(err){
				console.log(err);
			}else{
				alert("Successful update");
				Router.go('/managecategory');
			}
		});
	}
});
Template.translateparentTag.events({
	'submit form':function(e){
		e.preventDefault();
		var title = $('#title').val();
		var parenttagid=this._id;
		var collection="parent_tags";
		var lang = $('#lang').val(); 
		var obj ={
			title:title
		};
		if(lang=='en'){
			var object={
				id:parenttagid,
				collectionName:collection,
				i18n:{en:obj}
			}
		}else{
			var object={
				id:parenttagid,
				collectionName:collection,
				i18n:{fa:obj}
			}
		}

		Meteor.call('insertTradparentTag',object,parenttagid,collection,lang, function(err){
			if(err){
				console.log(err);
			}else{
				alert("Successful update");
				Router.go('/manageparenttag');
			}
		});
	}
});
Template.translatTags.events({
	'submit form':function(e){
		e.preventDefault();
		var title = $('#title').val();
		var tagid=this._id;
		var collection="tags";
		var lang = $('#lang').val(); 

		var obj ={
			title:title
		};
		if(lang=='en'){
			var object={
				id:tagid,
				collectionName:collection,
				i18n:{en:obj}
			}
		}else{
			var object={
				id:tagid,
				collectionName:collection,
				i18n:{fa:obj}
			}
		}

		Meteor.call('insertTradTags',object,tagid,collection,lang, function(err){
			if(err){
				console.log(err);
			}else{
				alert("Successful update");
				Router.go('/managetag');
			}
		});
	}
});
Template.translatParent_attr.events({
	'submit form':function(e){
		e.preventDefault();
		var title = $('#title').val();
		var parentattrid=this._id;
		var collection="parentattr";
		var lang = $('#lang').val(); 
		var obj ={
			title:title
		};
		if(lang=='en'){
			var object={
				id:parentattrid,
				collectionName:collection,
				i18n:{en:obj}
			}
		}else{
			var object={
				id:parentattrid,
				collectionName:collection,
				i18n:{fa:obj}
			}
		}
		Meteor.call('insertTradparentattr',object,parentattrid,collection,lang, function(err){
			if(err){
				console.log(err);
			}else{
				alert("Successful update");
				Router.go('/parentattr');
			}
		});
	}
});
Template.transleattribute_value.events({
	'submit form':function(e){
		e.preventDefault();
		var title = $('#title').val();
		var attrid=this._id;
		var collection="attribute_value";
		var lang = $('#lang').val(); 
		var obj ={
			title:title
		};
		if(lang=='en'){
			var object={
				id:attrid,
				collectionName:collection,
				i18n:{en:obj}
			}
		}else{
			var object={
				id:attrid,
				collectionName:collection,
				i18n:{fa:obj}
			}
		}

		Meteor.call('insertTradAttri',object,attrid,collection,lang, function(err){
			if(err){
				console.log(err);
			}else{
				alert("Successful update");
				Router.go('/attribute');
			}
		});
	}
});

Template.transleshops.events({
	'submit form':function(e){
		e.preventDefault();
		var title = $('#title').val();
		var shopid=this._id;
		var collection="shops";
		var lang = $('#lang').val(); 
		var obj ={
			title:title
		};
		if(lang=='en'){
			var object={
				id:shopid,
				collectionName:collection,
				i18n:{en:obj}
			}
		}else{
			var object={
				id:shopid,
				collectionName:collection,
				i18n:{fa:obj}
			}
		}
		Meteor.call('insertTradshops',object,shopid,collection,lang, function(err){
			if(err){
				console.log(err);
			}else{
				alert("Successful update");
				Router.go('/manageshop');
			}
		});
	}
});