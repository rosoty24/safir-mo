Meteor.methods({
    addPayment: function(obj){
    	payments.insert(obj);

    }
  });