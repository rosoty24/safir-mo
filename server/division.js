Meteor.methods({
	divide: function(){
		
var prod=products.find({}).fetch();
		for(var i=0;i<prod.length;i++){
			if(typeof prod[i].price == "undefined")
				continue;
			var newprice=0;
			newprice=Number(prod[i].price);
			if(newprice>0){
				newprice=newprice/10;
				products.update({"_id":prod[i]._id},{ $set: { price: newprice } });
			}
				
		}

		var attr=attribute.find().fetch();
		for(var i=0;i<attr.length;i++){
			if(typeof attr[i].price == "undefined")
				continue;
			var newprice=0;
			newprice=Number(attr[i].price);
			if(newprice>0){
				newprice=newprice/10;
				attribute.update({"_id":attr[i]._id},{ $set: { price: newprice } });
			}
		}

	}
});