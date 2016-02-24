
Meteor.methods({
 /*insertFavorite:function(attr){
    favorite.insert(attr);
  },
  deleteFavorite:function(attr){
    favorite.remove({"proId":attr});
  },*/
  insertFavoritee:function(attr){
    favorite.insert(attr);
  },
  deleteFavoritee:function(attr){
    favorite.remove({"proId":attr});
  },
  reviewtFavorite:function(attr){
    favoritereview.insert(attr);
  }

});