 Meteor.methods({
  insertAttr:function(attr){
    attribute_value.insert(attr);
  },
  editAttr:function(id,attr){
    attribute_value.update({_id:id},{$set:attr});
  },
  deleteAttr:function(id,attr){
    attribute_value.delete({_id:id});
  },
  changePriceAttr:function(id,price){
  	attribute.update({_id:id},{$set:{price:price}});
  },
  changePiontAttr:function(id,point){
  	attribute.update({_id:id},{$set:{point:point}});
  },
  changeBarcodetAttr:function(id,barcode){
  	attribute.update({_id:id},{$set:{barcode:barcode}});
  },
  insertattribute:function(obj){
    attribute.insert(obj);
  },
  updateImgAttr:function(id, image){
      attribute.update({_id:id}, {$set:{productImage:image}});
  }
});
