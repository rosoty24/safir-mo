Meteor.methods({
	// add categories
	addCat: function(title, parent, image) {
		var attributes={
			title:title,
			parent:parent,
			image:image
		};
		categories.insert(attributes);
		console.log("Inserted");
	},
	updateCat: function(id,attr) {
		categories.update({_id:id},{$set: attr});
	},
	deleteCategory: function(id){
		categories.remove(id);
	},
	getChildrenList: function(elt){
		
		var finalList=[];
		var current=categories.find({"parent":elt}).fetch();
		//console.log('finding parent of: '+elt);
		for(var i=0;i<current.length;i++){
			finalList.push(current[i]._id);
			//console.log('finaList:'+finalList);
			var listchildren=Meteor.call('getChildrenList',current[i]._id);
			//console.log('listChild:'+listchildren);
			for(var j=0;j<listchildren.length;j++){
				finalList.push(listchildren[i]);
			}
		}
		return finalList;
	}
});

//a
// b c