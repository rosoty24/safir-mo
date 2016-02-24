
//crud parent attribute

Template.parentattr.events({
    'submit form':function(e){
        e.preventDefault();
        
        var name=e.target.name.value;
        var obj={
            name:name
        }
        Meteor.call('inserparentAttr',obj);
        e.target.name.value="";

    }
})
Template.parentattr.helpers({
    getdata:function(){
        return parentattr.find();
    }
})
Template.editparentattr.events({
    'submit form':function(e){
        e.preventDefault();
        var name=e.target.name.value;
        var id=e.target.id_edit.value;
        var obj={
            name:name
        }
        Meteor.call('editparentAttr',id,obj);
        Router.go('parentattr');

    }
})
Template.parentattr.events({
    'click #bnt_delete':function(e){
        e.preventDefault();
        var result=confirm('Do you want to delete?');
        //alert(id);
        if(result){
            parentattr.remove(this._id);
        }
    },
    
})