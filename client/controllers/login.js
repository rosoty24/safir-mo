Session.set("loginError","");
Session.set("registerError","");
Template.register.events({
	'click #btnRegister': function(event){
    	event.preventDefault();
    	console.log('Register in progress...');
    	var username=$("#uname").val();
    	var firstname =$('#fname').val();
    	var lastname =$('#lname').val();
    	var email = $('#email').val();
    	var password =$('#password').val();
    	var country=$('#pays').val();
    	var city=$('#ville').val();
    	var shipcard = '';
    	var point = 0;
 		var dataime=imedation.find();

 		
 		dataime.forEach(function(v){
 			if(v.email_imedate==email){
 				point=5;
 			}
 		});

    	console.log("let's start");
    	var rerole = 'member';
    	var msg = "";
    	//var regPassword=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
		//console.log('register in progress 2...')
		if(firstname == "" ||  lastname == "" ||email == "" ||password == ""){
			if( firstname == "")
				Bert.alert( 'Please input your firstname', 'danger', 'growl-top-right', 'fa-bolt' );
			if( lastname == "")
				Bert.alert( 'Please input your lastname', 'danger', 'growl-top-right', 'fa-bolt' );
			if(email == "")
				Bert.alert( 'Please input your email', 'danger', 'growl-top-right', 'fa-bolt' );
			if(password == "")
				Bert.alert( 'Please input your password', 'danger', 'growl-top-right', 'fa-bolt' );

			$(".register_msg").html(msg);
			Session.set("registerError", msg );
			console.log('error1');

		}else{
			//alert(firstname+lastname+email+password);
			if(password.length>=6){
				console.log('controls passed with success!');
				Meteor.call('regUser',firstname, lastname, email, password, shipcard, point, rerole,country,city,username,function(err){
					if(err){
						console.log(err.reason);
						Session.set("registerError",err.reason);
					}else{
						console.log('register done!!!');
						Session.set("registerError","");
						var dataImedation=imedation.find();
						dataImedation.forEach(function(value){
							if(email==value.email_imedate){
								var profiles=Meteor.users.findOne({_id:value.user_id}).profile;
								if(!profiles.shipcard){
									var oldShipcardid='';
									var oldPoint=0;
								}
								else{
									var oldPoint=profiles.shipcard.point;
									var oldShipcardid=profiles.shipcard.shipcardId
								}
								var obj={
									profile:{
										firstname:profiles.firstname,
										lastname:profiles.lastname,
										country:profiles.country,
										city:profiles.city,
										shipcard:{
											shipcardId:oldShipcardid,
											point:oldPoint+5
										}
									}
								}
								Meteor.call('imedatPoint',value.user_id,obj);
								alert('success');
								
							}
						});
						Router.go('/login'); 
					}
				});
			}
		}

	}
});
Template.login.helpers({
	loginEurror:function(){
		var msg = Session.get("loginError");
		if( msg ) return true;
		else return false;
	},
	loginErrormsg: function(){
		return Session.get("loginError");
	},
	registerError:function(){
		var msg = Session.get("registerError");
		if( msg ) return true;
		else return false;
	},
	registerErrormsg: function(){
		return Session.get("registerError");
	},
	Duplicate:function(){
		return Session.get("Duplicate");
	}
});
Template.login.events({

	'click #btn_login': function(event,tpl){
		event.preventDefault();
		//alert("login");
		//alert('ok');
		$("#loginError").text("");
		var fields = $('#email').val();
        email=fields;
        var password = $('#password').val();
        //alert(fields+" "+password);

        	Meteor.loginWithPassword(email, password, function(error){
        		if(error){
        			console.log("MY USER======"+error.reason);
        			Session.set("loginError",error.reason);
        			$("#loginError").text("نام و یا رمز عبور شما اشتباه است! ");
        		} else {
        			Session.set("loginError","");
        			$('.close').click();
        			
        			var loggedInUser = Meteor.user();
        			var group = 'mygroup';
        			if (Roles.userIsInRole(loggedInUser, ['admin'], group)) {
        				/*Router.go(Session.get('THELASTPAGE'));*/
        				Router.go(Session.get('/manageproduct'));
        				$('.close').click();
        			}
        			else if (Roles.userIsInRole(loggedInUser, ['member'], group)) {	
        				//alert('Hello');
        				Router.go('/profile');
        				$('.close').click();
        			}
        			else{

        				Router.go('/profile');
        				$('.close').click();
        			}
        		}
        		Session.set('pass',null);
        	});	


    }

});

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