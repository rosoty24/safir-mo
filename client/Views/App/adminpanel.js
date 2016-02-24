Template.adminpanel.onRendered(function(){
	$('#header').hide();
	$('#footer').hide();
});
Template.adminpanel.helpers({
	getRouter:function(){
		return "{{>managecontent}}"
	}
})