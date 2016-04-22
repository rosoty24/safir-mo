Meteor.methods({
 regUser:function(firstname, lastname, email, password, con_password, validateEmail, shipcard, point, rerole, country, city, username){
   targetUserId = Accounts.createUser({
   	username:username,
    email: email,
    password: password,
    con_password:con_password,
    profile:{firstname:firstname,lastname:lastname,country:country,city:city,shipcard:{shipcardId:shipcard,point:point}}
   });
   console.log(targetUserId);
   //Roles.setUserRoles(id, roleid, 'noolab')
   Roles.setUserRoles(targetUserId, [rerole], 'mygroup')
  }
});