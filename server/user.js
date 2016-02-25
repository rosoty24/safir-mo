Meteor.methods({
    registerUsers:function(username,firstname, lastname, pays, ville,email,password){
        var myroles = "member";
        targetUserId=Accounts.createUser({
             profile:{
                username:username,
                firstname:firstname,
                lastname:lastname
                },
                email: email,
                password: password
               });
        //console.log(targetUserId);
        Roles.setUserRoles(targetUserId,myroles);
   }
});
