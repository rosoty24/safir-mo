Session.set("pro","");
Template.searchproduct.events({
    'click #unlike':function(e){
        //alert('unlike');
        e.preventDefault();
        var unlike = '#unlike'+this._id;
        var like = '#like'+this._id;
        $(like).removeClass('nonelike');
        $(unlike).addClass('nonelike');
         if(Meteor.userId()){
                var userId=Meteor.userId();
             }else{
                var userId=Session.get('userId');
                if(!userId){
                    var newId=Random.id();
                    Session.setPersistent('userId',newId);
                }
                
             }
             
            var obj={
                proId:this._id,
                userId:userId
            }

            Meteor.call('insertFavoritee',obj);
           
    },
    'click #like':function(e){
        e.preventDefault();
        //alert('like');
        var unlike = '#unlike'+this._id;
        var like = '#like'+this._id;
        $(like).addClass('nonelike');
        $(unlike).removeClass('nonelike');
        if(Meteor.userId()){
                var userId=Meteor.userId();
        }else{
            var userId=Session.get('userId');
              
        }
        //alert(userId);
        var obj=favorite.findOne({userId:userId},{proId:this._id});
        //alert(obj._id);
       
        favorite.remove(obj._id);
    }
});

Template.addlistproduct.helpers({
    getListPro:function(){
        var arr=[];
        var ids=Session.get('pro');
        var idArray=ids.split(':');
        Session.set('idlistpro', idArray);
        for(var i=0;i<idArray.length;i++){
            if(idArray[i]!=""){
                var result=products.findOne({_id:idArray[i]});
                arr.push(result);
            }
        }
        return arr;
    },
    getListProduct: function(){
        return list_product.find();
    },
    getProcount: function(products){
        return products.length;
    },
    getProduct: function(){
        return products.find();
    },
});
Template.updatelistproduct.helpers({
    getProduct: function(){
        return products.find();
    },
    getlistPro: function(){
        var id = this._id;
        var list = list_product.find({_id:id});
        return list;
    }
});

Template.addlistproduct.events({
    'click #btnAdd': function(e) {
        e.preventDefault();
        var site = $('#product').val();
        if(Session.get("pro")){
        var listTags=Session.get("pro")+":"+site;
        }else{
            var listTags=site;
        }
        Session.set("pro", listTags);
    },
    'click #btnSubmit': function(e){
        var arr=[];
        e.preventDefault();
        var title = $('#title').val();
        var code = $('#code').val();
        var publish = $('#publish').val();
        var myArray=Session.get('idlistpro');
        for(var i=0;i<myArray.length;i++){
            if(myArray[i]!=""){
                arr.push(myArray[i]);
            }
        }
        var obj={
            title:title,
            code:code,
            products:arr,
            publish:publish
        }
        Meteor.call('addlistPro',obj);
        alert("Successfully appended");
        Router.go(addlistproduct);
    },
    'click #remove':function(e){
        e.preventDefault();
        var alltags = Session.get('pro');
        var id = this._id;
        var resl = alltags.replace(id, "");
        Session.set("pro", resl);   
    },
     'click #remove': function(e){
        e.preventDefault();
        var id = this._id;
        return list_product.remove({_id:id});
    },
    "click #sortname":function(e){
        e.preventDefault();
        var result = products.find({}, {sort: {title:1}});
        alert(result);
        return result;
    }
});