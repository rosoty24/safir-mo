
Template.ForgotPassword.events({
  'submit form': function(e) {
    var arr=[];
    e.preventDefault();
   var trimInput = function(val) {
    return val.replace(/^\s*|\s*$/g, "");
   }
   var code=e.target.code.value;
   //alert(code+'='+Session.get('veryfy'));
   if(code==Session.get('veryfy')){
      var email=trimInput(e.target.emailRecovery.value);
    
      Accounts.forgotPassword({email: email}, function(err) {
          if (err) {
            if (err.message === 'User not found [403]') {
              console.log('This email does not exist.');
            } else {
              console.log('We are sorry but something went wrong.');
            }
          } else {
            console.log('Email Sent. Check your mailbox.');
          }
        });
      
      Session.set('email',email); 
      Router.go('ResetPassword');
   }
   
      

  },
});

Template.ResetPassword.events({
  'submit form': function(e) {
    e.preventDefault();

    
        var passwords = e.target.password.value;
        //Meteor.call('resetPwd',Session.get('email'),passwords);
        //alert('email='+Session.get('email')+'passwords='+passwords)

        Meteor.call('resetPwd',Session.get('email'),function(err,data){
          if(err){
            console.log(err);
          }else{
            
            Accounts.resetPassword(data, passwords, function(err) {
              if (err) {
                console.log('We are sorry but something went wrong.');
              } else {
                console.log('Your password has been changed. Welcome back!');
                //Session.set('resetPassword',null);
                alert('Reset Successfully');
                Router.go('/');
              }
            });
          }
            
            //alert(data);
        });
        

        
    
  }
});