
Meteor.methods({
	//add products
	addPro: function(prod){
		console.log(JSON.stringify(prod));

		var attributes={ 
				oldId		:prod.oldId,
				price		:prod.price,
				attrImage   :prod.attrImage,
				title		:prod.title,
				description	:prod.description,
				image		:prod.image,
				Brand		:prod.brand,
				CODE		:123,
				metaTitle	:prod.description,
				metaKeyword	:prod.description,
				point		:prod.point,
				ratio		:prod.ratio,
				status		:prod.status,
				category	:prod.category,
				priority	:prod.priority,
				shop		:prod.shop,
				date		:prod.date,
				tags        :prod.tags,
				articles	:prod.articles,
				tutoes      :prod.tutoes
		};
		var productId=products.insert(attributes);

		console.log('Attribute:'+prod.attr.length);
		for(var i=0;i<prod.attr.length;i++){
			console.log('Inserting '+JSON.stringify(prod.attr[i]));
			var obj={
				product: prod.oldId,
				parent: prod.attr[i].parent,
				price: prod.attr[i].price,
				point: prod.attr[i].point,
				value: prod.attr[i].value,
				barcode:prod.attr[i].barcode,
				productImage:prod.attr[i].productImage
			};
			attribute.insert(obj);
		}

		console.log("Inserted");
		return productId;
	},

	updateProduct: function(id,prod){
		console.log(JSON.stringify(prod));
		var attributes={
				//_id			:prod._id,
				oldId		:prod.oldId,
				price		:prod.price,
				attrImage   :prod.attrImage,
				title		:prod.title,
				description	:prod.description,
				image		:prod.image,
				Brand		:prod.brand,
				CODE		:123,
				metaTitle	:prod.description,
				metaKeyword	:prod.description,
				point		:prod.point,
				ratio		:prod.ratio,
				status		:prod.status,
				category	:prod.category,
				priority	:prod.priority,
				shop		:prod.shop,
				date		:prod.date,
				tags        :prod.tags,
				articles	:prod.articles,
				tutoes      :prod.tutoes
		};

		var productId=products.update({"_id":prod._id},{$set :attributes});
		

	},
	deletePro: function(id){
		products.remove(id);
	},
	//publish 
	publishPro: function(id, attr){
		products.update({_id:id},{$set: attr});
	},
	//unpublish 
	unpublishPro: function(id, attr){
		products.update({_id:id},{$set: attr});
	},
	add_review: function(title,comment,userid,productid){
		var date=new Date.now();
		var attr={
			'title':title,
			'comment':comment,
			'userid':userid,
			'date':date
		};
		console.log('Adding this review '+JSON.stringify(attr));
		products.update({_id:productid},{ $push: { review: attr } });

	},
	getPath: function(){
		return process.env.PWD;
	},
	addlistPro:function(obj){
		return list_product.insert(obj);
	},
	insertAddress:function(id,obj){
		users.update({_id:id}, {$set:obj});
	},
	insertTradeDetail:function(obj){
		translation.insert(obj);
	},
	addPointdetails:function(userid,obj){
  		Meteor.users.update({_id:userid}, {$set:obj});
    }

    
});

