Meteor.methods({
  	addProduct:function(pro_name,image, pyramid,accords,ratings,longevity,sillage,peoplevote,recommend){
        var timestamp = new Date().getTime();
        var obj = {
            product_name:pro_name,
            image:image,
            perfume_pyramid:pyramid,
            accords:accords,
            ratings:ratings,
            Longevity:longevity,
            Sillage:sillage,
            peoplevote:peoplevote,
            recommend:recommend,
            date:timestamp,
            status:0
        }
    	products_node.insert(obj);
  	},
  	updateProductnode:function(id,pro_name,image, pyramid,accords,ratings,longevity,sillage,peoplevote,recommend){
        var timestamp = new Date().getTime();
        var obj = {
            product_name:pro_name,
            image:image,
            perfume_pyramid:pyramid,
            accords:accords,
            ratings:ratings,
            Longevity:longevity,
            Sillage:sillage,
            peoplevote:peoplevote,
            recommend:recommend,
            date:timestamp,
            status:0
        }
        products_node.update({_id:id},{$set:obj});
    },
    removeProductNode:function(id){
        products_node.remove({_id:id});
    }
});
