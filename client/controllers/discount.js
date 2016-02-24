Template.discount.helpers({
	getProductDiscount:function(){
		return discount.find();
	},
	getProduct:function(productId){
		//console.log("MY ID OF PRODUCTS IS ====="+productId);
		var result = products.findOne({_id:productId});
		console.log("MY ID OF return IS ====="+result);
		return result;
	},
	getPriceDiscount:function(price,percentag){
		var discount = (Number(percentag) / 100) * Number(price);
		return price - discount;
	}
});
Template.discount.events({
    'click #unlike':function(e){
        e.preventDefault();
        var unlike = '#unlike'+this._id;
        var like = '#like'+this._id;
        alert(like+unlike);
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
        var unlike = '#unlike'+this._id;
        var like = '#like'+this._id;
        $(like).addClass('nonelike');
        $(unlike).removeClass('nonelike');
        if(Meteor.userId()){
                var userId=Meteor.userId();
        }else{
            var userId=Session.get('userId');
              
        }
        var obj=favorite.findOne({userId:userId},{proId:this._id});
        //alert(obj._id);
        favorite.remove(obj._id);
    },
    "click #sort_price":function(e){
        e.preventDefault();
        Session.set("SORT_DISCOUNT","dis_price");
    },
    'click #sort_name':function(e){
        e.preventDefault();
        Session.set("SORT_DISCOUNT","sort_name");
    }
});
