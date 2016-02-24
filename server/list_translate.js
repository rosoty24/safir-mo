Meteor.methods({
	addToCollection: function(id){
		var translate=translation.findOne({"_id":id});
		 var obj={
		 	"i18n": translate.i18n
		 };
		if(translate.collectionName=='products'){
			var idproduct=translate.id;
			products.update({"_id":idproduct},{"$set":obj});
		}
		else if(translate.collectionName=='categories'){
			var idcat=translate.id;
			categories.update({"_id":idcat},{"$set":obj});
		}
		else if(translate.collectionName=='parent_tags'){
			var idparent_tags=translate.id;
			parent_tags.update({"_id":idparent_tags},{"$set":obj});
		}
		else if(translate.collectionName=='tags'){
			var idtags=translate.id;
			tags.update({"_id":idtags},{"$set":obj});
		}
		else if(translate.collectionName=='parentattr'){
			var idparentattr=translate.id;
			parentattr.update({"_id":idparentattr},{"$set":obj});
		}
		else if(translate.collectionName=='attribute_value'){
			var idattribute_value=translate.id;
			attribute_value.update({"_id":idattribute_value},{"$set":obj});
		}
		else{
			var idshops=translate.id;
			shops.update({"_id":idshops},{"$set":obj});
		}
	},
	removeTranslate:function(id){
		translation.remove(id);
	}
});