Template.listing.events({
	//sorting list product
	'change #rating .rating': function(event, tmp){
		var value = $(event.target).val();
		console.log('click: '+value);
		Session.set('rating',value);
	},
	'click .brand': function(){
		var checked = [];

		$('#brand .brand').each( function(){
			if( this.checked ){
				checked.push($(this).val());
			}
		})
		Session.set('brand',checked);
	},
	'click .advance': function(){

		var checked = [];

		$('#advanced .advance').each( function(){

			if( this.checked ){
				checked.push($(this).val());
			}
		})
		Session.set('advance',checked);
	},

});
