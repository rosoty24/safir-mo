Meteor.methods({
	resetPwd: function(email){
    var arr=[];
		var result=Meteor.users.find({"emails.address":email});
    //console.log('makara='+result.fetch().username);
    result.forEach(function(value){
      //console.log('makara='+value.services.password.reset.token);
      var token=value.services.password.reset.token;
      //console.log('token='+token+':'+'passwords='+passwords);
      arr.push(token);
      
    })
    console.log('token='+arr[0]);
    return arr[0];   
      
	}
  
});