
Meteor.methods({
  insertanswer:function(obj){
    anwser.insert(obj);
  },
  insertQuestionAnswer:function(obj){
    answerquizz.insert(obj);
  },
  redoQuizzAnswer:function(id, obj){
    answerquizz.update({quizzId:id},{$set: obj});
  }
});
