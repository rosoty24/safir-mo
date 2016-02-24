Template.contenttype.events({
	'click #btnAdd': function(e) {
		e.preventDefault();
		var datestr = new Date().toString("yyyy-MM-dd HH:mm:ss");
		//var datestr = 'Thu Sep 17 2015 18:24:52 GMT+0700 (SE Asia Standard Time)';
	    var timestamp = (new Date(datestr.split(".").join("-")).getTime())/1000;
		var type = $('#type').val();
		var date = timestamp;
		Meteor.call('addContenttype', type, date);
	}
});