Template.quizzQA.helpers({
 getQuestion:function(){
  return quizzQA.find();
 },
 getAnswer:function(){
  var get_AS = Session.get("GET_QA");
  alert("My id: "+get_AS);
  return tags.find({_id:get_AS});
 }
});
Template.quizzQA.events({
 'change #selectQ':function(){
  // var get_QA = 
  var get_QA = $("#selectQ").val();
  Session.set("GET_QA", get_QA);
  // alert(" get "+get_QA);
 }

});