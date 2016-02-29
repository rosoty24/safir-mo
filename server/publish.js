TAPi18n.publish('brand', function (limit){
    // if(limit!=-1)
        return products.i18nFind({},{fields:{Brand:1}});//return products.find({},{limit:limit});
    // else
    //     return products.i18nFind({},{fields:{Brand:1}});
});
TAPi18n.publish("categories", function () {//console.log('categories:'+categories.find({}).fetch().length);
    return categories.i18nFind({});
});
//Meteor.publish('products', function (limit){ 
TAPi18n.publish('products', function (limit){ 
    if(limit!=-1)
        return products.i18nFind({},{limit:limit});//return products.find({},{limit:limit});
    else
        return products.i18nFind({});
});
TAPi18n.publish('productsHome', function (limit){ 
    if(limit!=-1)
        return products.i18nFind({},{limit:limit,fields:{_id:1,title:1,image:1,price:1}});//return products.find({},{limit:limit});
    else
        return products.i18nFind({},{fields:{_id:1,title:1,image:1,price:1}});
});
TAPi18n.publish('productsDetails', function (limit){ 
    if(limit!=-1)
        return products.i18nFind({},{limit:limit});//return products.find({},{limit:limit});
    else
        return products.i18nFind({});
});
TAPi18n.publish('productsCategory', function (limit){ 
    if(limit!=-1)
        return products.i18nFind({},{limit:limit,fields:{_id:1,Brand:1,category:1,description:1,image:1,price:1,title:1}});//return products.find({},{limit:limit});
    else
        return products.i18nFind({},{fields:{_id:1,Brand:1,category:1,description:1,image:1,price:1,title:1}});
});
Meteor.publish('images', function (){ 
  return images.find({});
});

Meteor.publish('shops', function (){ 
  return shops.find({})
});
TAPi18n.publish('parent_tags', function (){ 
  return parent_tags.i18nFind({},{fields:{_id:1,title:1,category_id:1}});
});
TAPi18n.publish('tags', function (){ 
  return tags.i18nFind({},{fields:{_id:1,title:1,parent:1,categoryId:1}});
});
Meteor.publish('stats', function (){ 
  return stats.find({});
});
Meteor.publish('answerquizz', function (){ 
  return answerquizz.find({"userId":this.userId});
});
Meteor.publish('quizzQA', function (){ 
  return quizzQA.find({});
});

Meteor.publish("attribute", function (product) {
    
    if(product==-1)
      return attribute.find({});
    else{
      var old=products.findOne({"title":product});
      //console.log('SOUSCRIRE A '+old.oldId);
      return attribute.find({"product":old.oldId});
    }
      
 });
Meteor.publish("attributeProDetails", function (product) {
    
    if(product==-1)
      return attribute.find({});
    else{
      var old=products.findOne({"title":product},{fields:{_id:1,title:1,image:1}});
      //console.log('SOUSCRIRE A '+old.oldId);
      return attribute.find({"product":old.oldId},{fields:{_id:1,product:1,parent:1,productImage:1}});
    }
      
 });
TAPi18n.publish("parentattr", function () {
    return parentattr.i18nFind({});
 });
TAPi18n.publish("parentattrProDetails", function () {
    return parentattr.i18nFind({});
 });

Meteor.publish("users", function (tab) {
    if(tab==null)
      tab=[];
    tab.push(this.userId);
    if(tab[0]==-1)
      return Meteor.users.find();
    return Meteor.users.find({"_id":{ $in: tab }});
 });


Meteor.publish("cart", function (id) {
    return cart.find({"userId":id});
 });
//contents
Meteor.publish("contents", function () {
    return contents.find({});
 });
Meteor.publish("contentsProDetails", function () {
    return contents.find({});
 });
Meteor.publish("contents_type", function () {
    return contents_type.find({});
 });
// address
Meteor.publish("address", function () {
    return address.find({});
 });
 Meteor.publish("favorite", function () {
    return favorite.find({});
 });
 Meteor.publish("role", function () {
    return Meteor.roles.find({});
 
});
 //Question
 Meteor.publish("question", function () {
    return question.find({});
});

  Meteor.publish("journey", function () {
    return journey.find({});
});

  Meteor.publish("linkselling", function () {
    return linkselling.find({});
});

  Meteor.publish("membershipcard", function () {
    return membershipcard.find({});
});

    TAPi18n.publish("list_product", function () {
    return list_product.i18nFind({});
});

Meteor.publish('attribute_value', function (){ 
  return attribute_value.find({});
});

Meteor.publish('translation', function (){ 
  return translation.find({});
});

Meteor.publish('payments', function (){ 
  return payments.find({});
});
Meteor.publish('banner', function (){ 
  return banner.find({});
});
Meteor.publish('daily', function (){ 
  return daily.find({});
});
Meteor.publish('imedation',function(){
  return imedation.find({});
});
Meteor.publish('anwser',function(){
  return anwser.find({});
});

Meteor.publish('barcode',function(){
  return barcode.find({});
});

Meteor.publish('userTracking',function(skip,field1,field2,field3){
  if(field1 && field2 && field3 !=null){
     return  userTracking.find( { time: { $gt: field2, $lt: field3 } },{skip: skip, limit: 20});
  }
  if(field1 && field2 && field3 == null){
    if(field1 == "ip"){
        return  userTracking.find({ip:field2},{skip: skip, limit: 20});
    }
    if(field1 == "currenturl"){
        return  userTracking.find({currenturl: {$regex: field2, $options: 'i'}},{skip: skip, limit: 20});
    }
    if(field1 == "location"){
      return  userTracking.find({location:field2},{skip: skip, limit: 20});
    }
    if(field1 == "userId"){
      return  userTracking.find({userId:field2},{skip: skip, limit: 20});
    }
  }else{
      return  userTracking.find({},{skip: skip, limit: 20});

  }
});

Meteor.publish('mouse',function(){
  return mouse.find({});
});
Meteor.publish('quizz', function (){ 
    return quizz.find({});
});
Meteor.publish('tracking',function(){
  return tracking.find({});
});

Meteor.publish('order',function(){
  return order.find({});
});
//stock publisher
Meteor.publish('stock',function(skip,sesShop,field,val){
  if( val!= ""){
    return stock.find({Barcode:val},{skip:skip,limit:20});
  }else if(field != ""){
    return stock.find({RetailStoreName:field},{skip:skip,limit:20});
  }else if(sesShop != ""){
    return stock.find({RetailStoreName:sesShop},{skip:skip,limit:20});
  }else
    return stock.find({},{skip:skip,limit:20});
});
Meteor.publish('products_node',function(){
  return products_node.find({});
});
Meteor.publish('discount',function(){
  return discount.find({});
});
Meteor.publish('collect',function(){
  return collect.find({});
});
Meteor.publish("posts", function () {
    return posts.find({});
});

