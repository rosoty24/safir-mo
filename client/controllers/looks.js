Template.looks.helpers({
	getallContent: function(){
		return contents.find({});
	}
});

Template.looks.helpers({
	getImage: function(id){
			var img = images.findOne({_id:id});
			if(img){
				console.log(img.copies.images.key);
				return img.copies.images.key;
			}else{
				return;
			}
	}
});
Template.look1.events({
	'click #samat':function(e){
		e.preventDefault();
		//alert('POpoup');
		$('#squarespaceModal').modal('show');
	}
});
Template.look2.events({
	'click #look2':function(e){
		e.preventDefault();
		//alert('POpoup');
		$('#squarespaceModal').modal('show');
	}
});
Template.pagelook.events({
	'click #samat':function(e){
		e.preventDefault();
		//alert('POpoup');
		$('#squarespaceModal').modal('show');
	}
});
