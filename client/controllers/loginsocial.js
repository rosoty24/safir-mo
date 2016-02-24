
Template.login.events({
    'click #twitter-login': function(event) {
        event.preventDefault()
        Meteor.loginWithTwitter({}, function(err) {
            if (err) {
                throw new Meteor.Error("Twitter login failed");
            }else{
                var user=Meteor.users.findOne({_id:Meteor.userId()});
                //alert(fname);
                var firstname=user.services.twitter.screenName;
                var lastname='';
                var image=user.services.twitter.profile_image_url;
                var sex='';
                if(user.profile.firstname){
                   $('.close').click(); 
                }else{
                    var userObj={
                    firstname:firstname,
                    lastname:lastname,
                    sex:sex,
                    shipcard:{
                        shipcardId:"",
                        point:0
                        }
                    }
                    var obj={
                        profile:userObj,
                        roles:{mygroup:["member"]},
                        image:image
                    }
                    Meteor.call('updateRoleWithSocail',Meteor.userId(),obj,function(err,data){
                        if(!err) $('.close').click(); 

                    });
                }
                
            }
        });
    },
    'click #facebook-login': function(event) {
        event.preventDefault()
        Meteor.loginWithFacebook({}, function(err) {
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }else{
                var user=Meteor.users.findOne({_id:Meteor.userId()});
                //alert(fname);
                var firstname=user.services.facebook.first_name;
                var lastname=user.services.facebook.last_name;
                var sex=user.services.facebook.gender;
                var image="http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
                //alert(picture);
                if(user.profile.firstname){
                   $('.close').click(); 
                }else{
                    var userObj={
                    firstname:firstname,
                    lastname:lastname,
                    sex:sex,
                    shipcard:{
                        shipcardId:"",
                        point:0
                        }
                    }
                    var obj={
                        profile:userObj,
                        roles:{mygroup:["member"]},
                        image:image
                    }
                    Meteor.call('updateRoleWithSocail',Meteor.userId(),obj,function(err,data){
                        if(!err) $('.close').click(); 

                    });
                }
                
            }
        });
    },
    'click #google-login': function(event) {
        event.preventDefault()
        Meteor.loginWithGoogle({}, function(err) {
            if (err) {
                throw new Meteor.Error("Google login failed");
            }else{
                var user=Meteor.users.findOne({_id:Meteor.userId()});
                //alert(fname);
                var firstname=user.services.google.given_name;
                var lastname=user.services.google.family_name;
                var image=user.services.google.picture;
                var sex=user.services.google.gender;
                if(user.profile.firstname){
                   $('.close').click(); 
                }else{
                    var userObj={
                    firstname:firstname,
                    lastname:lastname,
                    sex:sex,
                    shipcard:{
                        shipcardId:"",
                        point:0
                        }
                    }
                    var obj={
                        profile:userObj,
                        roles:{mygroup:["member"]},
                        image:image
                    }
                    Meteor.call('updateRoleWithSocail',Meteor.userId(),obj,function(err,data){
                        if(!err) $('.close').click(); 

                    });
                }
                
            }
        });
    },
    'click #insta-login': function(event) {
        event.preventDefault()
        Meteor.loginWithInstagram({}, function(err) {
            if (err) {
                throw new Meteor.Error("Instagram login failed");
            }else{
                var user=Meteor.users.findOne({_id:Meteor.userId()});
                //alert(fname);
                var firstname=user.services.instagram.username;
                var lastname='';
                var image=user.services.instagram.profile_picture;
                var sex='';
                if(user.profile.firstname){
                   $('.close').click(); 
                }else{
                    var userObj={
                    firstname:firstname,
                    lastname:lastname,
                    sex:sex,
                    shipcard:{
                        shipcardId:"",
                        point:0
                        }
                    }
                    var obj={
                        profile:userObj,
                        roles:{mygroup:["member"]},
                        image:image
                    }
                    Meteor.call('updateRoleWithSocail',Meteor.userId(),obj,function(err,data){
                        if(!err) $('.close').click(); 

                    });
                }
                
            }
        });
    },
    // 'click #logout': function(event) {
    //     event.preventDefault()
    //     Meteor.logout(function(err) {
    //         if (err) {
    //             throw new Meteor.Error("Logout failed");
    //         }
    //     })
    // }

});
