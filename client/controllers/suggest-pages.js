Template.suggestpages.onRendered(function(){
    var userId=Session.get('userId');
    var favoritelist=favorite.find({userId:userId});
    favoritelist.forEach(function(value){
      var like=".like"+value.proId;
      var unlike=".unlike"+value.proId;
      $(like).removeClass('nonelike');
      $(unlike).addClass('nonelike');
    });
});

Template.suggestpages.helpers({
    getDataTuto: function() {
       /* var result = contents_type.findOne({ type: "Tuto" });
        var contentsresult = contents.find({ typeid: result._id }, { limit: 3 })
        return contentsresult;*/
        return contents.find({});

    },
    getDataLipsticks: function() {
        var result = contents_type.findOne({ type: "Lipsticks" });
        var contentsresult = contents.find({ typeid: result }, { limit: 6 });
        console.log("Lipsticks" + JSON.stringify(contentsresult));
        return contentsresult;

    },
    getprofile: function() {
        var id = Meteor.userId();
        return Meteor.users.findOne({ _id: id });
    },
    getListprice: function(oldId) {
        //console.log("oldID="+oldId);
        var attrprice = attribute.findOne({ "product": oldId });
        //console.log("OLDID="+oldId+'price='+attrprice.price);
        return attrprice;
    },
    testerproduct:function(){
        return products.find({});
    }
});
