
Template.attribute.helpers({
    datashow:function(){
        return attribute_value.find();
    },
    getparent:function(){
        return parentattr.find();
    },
    getparentName: function(parentid){
        return parentattr.findOne({"_id":parentid}).name;
    }
})
//Delete attribute
Template.attribute.events({
    'click #bnt_delete':function(e){
        e.preventDefault();
        var result=confirm('Do you want to delete?');
        //alert(id);
        if(result){
            Meteor.call('deleteAttr',this._id);
        }
    },
    'submit form':function(e){
        e.preventDefault();
        var parentId=e.target.selectParent.value;
        var value=e.target.value.value
        
        var obj={
            parentId:parentId,
            value:value
        }
        Meteor.call('insertAttr',obj);
        
        e.target.value.value='';
    }
    
})
Template.editattr.events({
    'submit form':function(e){
        e.preventDefault();
        var value=e.target.value.value;
        var parentId=e.target.selectParent.value;
        var id=this._id;
        //alert(name+''+value);
        var obj={
            parentId:parentId,
            value:value,
        }
        Meteor.call('editAttr',id,obj);
        Router.go('attribute');
    },
 
});

Template.editattr.helpers({
    getparentToEdit:function(){
        var id=Session.get('parentID');
        return parentattr.find({_id:{$ne:id}});
    }
});
