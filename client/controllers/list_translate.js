Template.listTranslate.helpers({
	getListTranslate: function(){
		return translation.find({});

	}
});

Template.listTranslate.events({
	"click #btnAdd":function(e){
		e.preventDefault();
		var id=this._id;
		alert(id);
		Meteor.call("addToCollection", id, function(err){
			if(err){
				console.log(err+reason);
			}else{
				alert("successful Add");
				Router.go("/listTranslate");
			}
		});

		//removeTranslate after insert
		Meteor.call("removeTranslate", id,  function(err){
			if(err){
				console.log(err+reason);
			}else{
				alert("successful removeTranslate");
				Router.go("/listTranslate");
			}
		});
	}
});