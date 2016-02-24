
Meteor.methods({
   insertQuestion: function(obj) {
      question.insert(obj);
  },
  updateQuestion: function(id,obj) {
      question.update({_id:id},{$set:obj});
  }
});
