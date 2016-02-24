Template.membershipcard.events({
    'click #addshipcard': function(event){
        event.preventDefault();
        var mySelect = $('[name=mySelect]').val();
        var minval = $('[name=minval]').val();
        var maxval = $('[name=maxval]').val();
        alert(mySelect+minval+maxval);
        Meteor.call('addshipcard',mySelect,minval,maxval);
    },
    'click #delete': function(event){
        var id=this._id;
        var result=confirm('Do you want to delete?');
        if(result){
            membershipcard.remove(id);
        }
        
    }
});
Template.membershipcard.helpers({
    data:function(){
        return membershipcard.find();
    }
});
Template.edit.events({
    'submit form':function(e){
        //alert();
        e.preventDefault();
        //alert();
        var type_shipcard=e.target.slect_type.value;
        var minval=e.target.minval.value;
        var maxval=e.target.maxval.value;
        var id=e.target.id_ship.value;
        //alert(type_shipcard+ minval+maxval+id);
        var attr={
            name:type_shipcard,
            minval:minval,
            maxval:maxval
        }
        //alert(attr);
        Meteor.call('editdata',id,attr);
        Router.go('membershipcard');
    }
});