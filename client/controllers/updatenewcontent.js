Template.updatenewcontent.events({
	"click #btnUpdate": function(e) {
		//alert("Update");
		var datestr = new Date().toString("yyyy-MM-dd HH:mm:ss");
		//var datestr = 'Thu Sep 17 2015 18:24:52 GMT+0700 (SE Asia Standard Time)';
		var timestamp = (new Date(datestr.split(".").join("-")).getTime())/1000;
		var id = $("#idRecord").val();
		var title = $('#title').val();
		var content = $('#content').val();
		var typeid = $('#type').val();
		var comment =$('#comment').val();
		var date =timestamp;
		var image = $('#image').val();
		var img_id = Session.get('UPDATEIMAGEID');
		var attr={
			title:title,
			content:content,
			typeid:typeid,
			comment:comment,
			date:date,
			image:img_id
    };
    Meteor.call('updatecontentPost',id, attr);
    Router.go('contenmember');   
  },
  'change #image': function(event, template) {
    var files = event.target.files;
    for (var i = 0, ln = files.length; i < ln; i++) {
      images.insert(files[i], function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
		Session.set('UPDATEIMAGEID', fileObj._id);
	  });
    }
  }
});
Template.updatenewcontent.helpers({
	typeupdate:function(curtype){
		var types =  contents_type.find();
		//<option value="{{_id}}" selected="selecte">{{name}}</option>
		var html="";
		types.forEach( function(item){
			console.log(item._id);
			
			if( item._id === curtype ){
				html += '<option value="'+item._id+'" selected="selected">'+item.name+'</option>';
			}else{
				html += '<option value="'+item._id+'">'+item.name+'</option>';
			}
		});
		console.log(html);
		return html;
		
	}
	
});
Template.updatenewcontent.helpers({
	namecontentRecord: function(id){
		//var id = this.params._id;
        var da = contents.findOne({_id: id });
		//console.log(da);
		return da;
		
	},
	typeName: function(nametype){
		var typeresult = contents_type.find();
		return typeresult;
	},
	typeNameid: function(nametype){
		var types = contents_type.find();
		return types;
	}
	/*isCurrent: function(curId){
		var types = contents_type.find();
		types.forEach( function(item){
			if(item._id === curId){
				return true;
			}
			else{
				return false;
			}
		});
	}
*/
});


