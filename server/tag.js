Meteor.methods({
	// parent tags
	insertTag: function(obj){
		tags.insert(obj);
	},
	updateTag:function(id,obj){
		tags.update({_id:id},{$set:obj});
	},
	removeTag: function(id){
		tags.remove(id);
	},
	addParentTag: function(title, category_id){
		var attributes = {
			title:title,
			category_id:category_id
		};
		parent_tags.insert(attributes);
		console.log("parent_tags inserted");
	},
	updateParentTag: function(id, attributes){
		parent_tags.update({_id:id},{$set:attributes})
	},
	removeParentTag: function(id){
		parent_tags.remove(id);
	},
	addTagValue: function(title, parent_id){
		var attributes = {
			title:title,
			parent:parent_id
		};
		tags.insert(attributes);
		console.log("tag inserted");
	},
	removeValue: function(id){
		tags.remove(id);
	},
	insertParentTag:function(obj){
		parent_tags.insert(obj);
	},
	updateparenttag:function(id,obj){
		parent_tags.update({_id:id},{$set:obj});
	}
});