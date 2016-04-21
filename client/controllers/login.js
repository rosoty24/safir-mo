Session.set("loginError","");
Session.set("registerError","");
//Session.set("DUPLICATE");

Template.register.events({
	'click #btnRegister': function(event){
    	event.preventDefault();
    	console.log('Register in progress...');
    	var username=$("#uname").val();
    	var firstname =$('#fname').val();
    	var lastname =$('#lname').val();
    	var email = $('#email').val();
    	var password =$('#password').val();
        var con_password=$('#con_password').val();
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
        var validateEmail='/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm';
    	//var regPassword=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
		//console.log('register in progress 2...')
	    if(username == "" || firstname == "" ||  lastname == "" ||country == "" ||city == "" ||email == "" ||password == "" ||con_password == ""){
              if( username == "")
                if(TAPi18n.getLanguage()=='fa'){
                  $('.error_username').text("لطفا ورودی نام کاربری خود را.");
                }else{
                  $('.error_username').text("Error username.");
                }
              if( firstname == "")
                if(TAPi18n.getLanguage()=='fa'){
                  $('.error_firstname').text("لطفا ورودی نام خود را.");
                }else{
                  $('.error_firstname').text("Error firstname.");
                }
              if( lastname == "")
                if(TAPi18n.getLanguage()=='fa'){
                  $(".error_lastname").text("لطفا نام خانوادگی خود را به.");
                }else{
                  $(".error_lastname").text("Error lastname.");
                }
              if( country == "")
                if(TAPi18n.getLanguage()=='fa'){
                  $('.error_pays').text("لطفا ورودی کشور خود را.");
                }else{
                  $('.error_pays').text("Error pays.");
                }
              if( city == "")
                if(TAPi18n.getLanguage()=='fa'){
                  $('.error_ville').text("لطفا ورودی شهرستان خود را.");
                }else{
                  $('.error_ville').text("Error ville.");
                }
              if(email == "")
                if(TAPi18n.getLanguage()=='fa'){
                  $(".error_email").text("لطفا ایمیل خود را ورودی.");
                }else{
                  $(".error_email").text("Error email.");
                }
              if( con_password == "")
                if(TAPi18n.getLanguage()=='fa'){
                  $('.error_conpassword').text("لطفا ورودی عبور تکرار رمز عبور خود را.");
                }else{
                  $('.error_conpassword').text("Error con_password.");
                }
              if(password == "")
                if(TAPi18n.getLanguage()=='fa'){
                  $(".error_password").text("لطفا ورودی رمز عبور خود را."); 
                }else{
                  $(".error_password").text("Error password.");
                } 

    		    }else if(con_password != password){
                if(TAPi18n.getLanguage()=='fa'){
                  $(".error_conpassword").text("رمز عبور خود را مطابقت ندارد.");
                }else{
                  $(".error_conpassword").text("Error con_password.");
                }
            }
        else{
			//alert(firstname+lastname+email+password);
			if(password.length>=6){
				console.log('controls passed with success!');
				Meteor.call('regUser',firstname, lastname, email, password,con_password,validateEmail,shipcard, point, rerole,country,city,username,function(err){
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

	},
  'change #email':function(e){
      e.preventDefault(); 
      var email = $('#email').val();
      Meteor.call('validateUserByEmail',email,function(err,data){
        if(!err){
          if(data ==true){
            Session.set("DUPLICATE",true);
          }else{
            Session.set("DUPLICATE",false);
          }
        }
      });
      
    }
});

Template.register.helpers({
  duplicateEmail:function(){
    if(Session.get("DUPLICATE") == true) return true;
    else return false;
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
Template.register.events({
  'click .close':function(e){
    e.preventDefault();
    Router.go('/profile');
  },
  'keyup .reg-password':function(e){
    e.preventDefault();
    $(".alert-warning").addClass("hid_div");
        var password = $('.reg-password').val();
        // alert("my pass:"+password);
        var passwordsInfo   = $('#pass-info');
            //Must contain 5 characters or more
        var WeakPass = /(?=.{6,}).*/;
        //Must contain lower case letters and at least one digit.
        var MediumPass = /^(?=\S*?[a-z])(?=\S*?[0-9])\S{6,}$/;
        //Must contain at least one upper case letter, one lower case letter and one digit.
        var StrongPass = /^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])\S{6,}$/;
        //Must contain at least one upper case letter, one lower case letter and one digit.
        var VryStrongPass = /^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[^\w\*])\S{6,}$/;
       
        if(password){
            if(VryStrongPass.test(password))
            {
                passwordsInfo.removeClass().addClass('vrystrongpass').html("بسیار قوی! (عالی، لطفا عبور خود را فراموش کرده ام حال حاضر!)");
            }  
            else if(StrongPass.test(password))
            {
                passwordsInfo.removeClass().addClass('strongpass').html("قوی! (را وارد کنید کاراکتر های خاص را حتی قوی تر");
            }  
            else if(MediumPass.test(password))
            {
                passwordsInfo.removeClass().addClass('goodpass').html("خوب! (را وارد کنید حروف بزرگ به قوی)");
            }
            else if(WeakPass.test(password))
            {
                passwordsInfo.removeClass().addClass('stillweakpass').html("هنوز ضعیف! (ارقام را وارد کنید برای ایجاد رمز عبور خوب)");
            }
            else
            {
                passwordsInfo.removeClass().addClass('weakpass').html("خیلی ضعیف! (باید 6 یا بیشتر کاراکتر)");
            }
        };
    
  },
  'click #poplogin': function(event){
      //alert("jjss");
      $("#squarespaceModal").modal({                    
        "backdrop"  : "static",
        "keyboard"  : true,
      "show"      : true   // show the modal immediately                  
    });
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
              if(TAPi18n.getLanguage()=='fa'){
          			$("#loginError").text("نام و یا رمز عبور شما اشتباه است! ");
              }else{
                $("#loginError").text("Login Error! ");
              }
        		} else {
                    //Router.go('/profile');
        			Session.set("loginError","");
        			//$('.close').click();
        			var loggedInUser = Meteor.user();
        			var group = 'mygroup';
                    var curRoute = Session.get("REDIRECT");
                    var curCheckout = Session.get("REDIRECTCHECKOUT");
                    if(curRoute){
            			if (Roles.userIsInRole(loggedInUser, ['admin'], group)) {
            				/*Router.go(Session.get('THELASTPAGE'));*/
                            if(curRoute == "/" || curRoute == "/login" || curRoute == "/register"){
                                Router.go('/manageproduct');
                            }else{
                                Router.go(curRoute);
                            }
            				$('.close').click();
            			}
            			else if (Roles.userIsInRole(loggedInUser, ['member'], group)) {	
            				//alert('Hello');
                            if(curRoute == "/" || curRoute == "/login" || curRoute == "/register"){
                                Router.go('/profile');
                            }else{
                                Router.go(curRoute);
                            }
            				$('.close').click();
                        }
        			}else if(curCheckout){
                        Router.go("/confirmorder");
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


