Session.set("loginError","");
Session.set("registerError","");
Template.login.helpers({
	loginError:function(){
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
	'click .close':function(e){
		e.preventDefault();
		Router.go('/profile');
	},
	'keyup .reg-password':function(e){
		e.preventDefault();
		$(".alert-warning").addClass("hid_div");
        var password = $('.reg-password').val();
       	//alert("my pass:"+password);
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
                passwordsInfo.removeClass().addClass('vrystrongpass').html("Very Strong! (Awesome, please don't forget your pass now!)");
            }  
            else if(StrongPass.test(password))
            {
                passwordsInfo.removeClass().addClass('strongpass').html("Strong! (Enter special chars to make even stronger");
            }  
            else if(MediumPass.test(password))
            {
                passwordsInfo.removeClass().addClass('goodpass').html("Good! (Enter uppercase letter to make strong)");
            }
            else if(WeakPass.test(password))
            {
                passwordsInfo.removeClass().addClass('stillweakpass').html("Still Weak! (Enter digits to make good password)");
            }
            else
            {
                passwordsInfo.removeClass().addClass('weakpass').html("Very Weak! (Must be 6 or more chars)");
            }
        };
		
	},
	'click .btn_login': function(event,tpl){
		event.preventDefault();
		//alert("login");
		
		$("#loginError").text("");
		var fields = $('[name=email]').val();
        //alert('te='+fields);
        email=fields;
        
        var password = $('[name=password]').val();
        

        	Meteor.loginWithPassword(email, password, function(error){
        		if(error){
        			console.log(error.reason);
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


    },
    'click #poplogin': function(event){
    	//alert("jjss");
    	$("#squarespaceModal").modal({                    
    		"backdrop"  : "static",
    		"keyboard"  : true,
			"show"      : true   // show the modal immediately                  
		});
    },
    'click #register': function(event){
    	event.preventDefault();
    	console.log('Register in progress...');
    	var username=$(".reg-username").val();
    	var firstname =$('.reg-firstname').val();
    	var lastname =$('.reg-lastname').val();
    	var email = $('.reg-email').val();
    	var password =$('.reg-password').val();
    	var country=$('.reg-country').val();
    	var city=$('.reg-city').val();
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
				msg += "<p> نام مورد نیاز است.</p>";
			if( lastname == "")
				msg += "<p>نام خانوادگی مورد نیاز است.</p>";
			if(email == "")
				msg += "<p>ایمیل مورد نیاز است</p>";
			if(password == "")
				msg += "<p>رمز عبور مورد نیاز است</p>";

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
						Router.go('/success'); 
					}
				});
			}
		}

	},
	'change #email':function(e){
    	e.preventDefault();
    	
    		Session.clear();
    	
    }
});



Template.login.onRendered(function(){
	$(".hid_div").remove();
	$("#displayLogin").click();
	//$('.modal-backdrop').remove();
	$("#squarespaceModal").modal({                    
		"backdrop"  : "static",
		"keyboard"  : true,
			"show"      : true   // show the modal immediately                  
		});
	$('#squarespaceModal').on('hidden.bs.modal', function () {
		var d = new Date();
		var date = d.toLocaleDateString();
		var obj={
			userId:Meteor.userId(),
			date:date
		}
		var result=daily.find({userId:Meteor.userId()}).fetch();
		if(Meteor.userId()){
			if(result.length>0){
				var lastRecord=result[result.length-1];
				//alert(lastRecord.date);
				if(date!==lastRecord.date){
					Meteor.call('insertDaily',obj);
					Router.go('/dailyPopup');
				}else{
					Router.go('/profile');
				}
			}else{
				Meteor.call('insertDaily',obj);
				Router.go('/dailyPopup');
			}	
		}else{
			Router.go('/');
		}
		

	});
});
Template.success.onRendered(function(){
	$("#displayWindow").click();
});
Template.success.events({
	"click #goto-login": function(){
		$('.modal-backdrop').remove();
		Router.go('/login');
	}
});
Template.login.helpers({
	getMasage:function(){
		Session.set("Info","رمز عبور شما مي بايست حداقل ٦ كاراكتر و شامل يك حرف بزرگ و يك حرف كوچك باشد")
		return Session.get("Info");
		/*if(Session.get('pass')==true){
			//return '<div class="alert alert-success"><strong>رمز عبور خود را به اندازه کافی قوی است</strong></div>';
			//return "<label class="">your password is strong *</label>";
		}else{
			//return "<label>your password must be have lowercase , uppercase and number!</label> ";
			//return '<div class="alert alert-warning"><strong>رمز عبور شما مي بايست حداقل ٦ كاراكتر و شامل يك حرف بزرگ و يك حرف كوچك باشد</strong></div>';
			//return '<div class="pass-info"><strong></strong></div>';

		}*/
	}
})

