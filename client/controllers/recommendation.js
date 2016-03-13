Template.recommendation.helpers({
    
    products: function(id){
        var pro=products.findOne({_id:id});
        return products.find({$and:[{categoryid:pro.categoryid},{_id:{$ne:pro._id}}]});
    }
});