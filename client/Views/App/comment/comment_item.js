Template.commentSubmit.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  },
  submittedText: function() {
    return this.submitted.toString();
  }
});