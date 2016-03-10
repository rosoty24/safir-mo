Meteor.methods({
   getBrand: function(str) {
      return products.find({ "Brand": { $regex: str } }).fetch();
    }
});