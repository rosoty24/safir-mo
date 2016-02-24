Meteor.methods({
	 addContenttype: function(type, date, author) {
	//var userid = Meteor.user(this._id);
	var author = Meteor.userId();
  	var attributes={
  		type:type,
  		date:date,
  		author:author
  	};
  	contents_type.insert(attributes);
  }
});