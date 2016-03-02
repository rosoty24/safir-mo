Session.set('ADDAVATAR','');
Session.set("error_mg","");
Template.profile.helpers({
    getprofile:function(){
        var id = Meteor.userId();
        return Meteor.users.findOne({_id:id});
    },
     getImage: function(id){
            var img = images.findOne({_id:id});
            if(img){
                console.log(img.copies.images.key);
                return img.copies.images.key;
            }
            else{
                return;
            }
    },
    getquestions:function(){
        return question.find({});
    },
    Answer:function(qId){
        var id = Meteor.userId();
        var answer = "";
        var question = Meteor.users.findOne({_id:id,"answerdata.qcmId":qId});
        question.answerdata.forEach(function(i){
            if(i.qcmId == qId){
                answer = i.answer;
            }
       });
        return answer;
    },
    getpoint: function(){
        var me=Meteor.user();
        //alert("me mellow ");
        if(me==null)
            return;
        if(typeof me.profile.shipcard != "undefined")
            return me.profile.shipcard.point;
        else
            return 0;
    }
});
Template.editprofile.helpers({
    getprofile:function(){
        var id = Meteor.userId();
        var profile = Meteor.users.find({_id:id});
        return profile;
        //console.log(profile+'UserId'+id);
    },
     getImage: function(){
            var profile = Session.get('ADDAVATAR');
            var img = images.findOne({_id:profile});
            if(img){
                console.log(img.copies.images.key);
                return img.copies.images.key;
            }
            else{
                return;
            }
    },
    isProfile:function(){
        var profile = Session.get('ADDAVATAR');
        if(profile)
            return true;
        else
            return false;
    },
    error_message: function (){
            var msg = Session.get('error_mg',msg);
                if( msg !="" ) return msg;
                else msg ='';
            }
});

Template.editprofile.events({
    'click #updateProfile': function(event){
        event.preventDefault();
        var firstname =$('#firstname').val();
        var lastname =$('#lastname').val();
        var birth = $('#birth').val();
        var sex = $('#gender').val();
        var address = $('#address').val();
        var id = Meteor.userId();
        //alert(id+ sex+ address+ birth+ lastname+ firstname);
        var point = 5;
        var profile = Meteor.users.findOne({_id:id}).profile.firstname;
            var upoint = Meteor.users.findOne({_id:id}).profile.shipcard.point;
                upoint = Number(upoint);
                upoint+=point;
            // alert(profile+ upoint);
            var attr= {
              profile:{
                firstname:firstname,
                lastname:lastname,
                sex:sex,
                birth:birth,
                address:address,
               shipcard:
               {
               point:upoint
               }
             }
            }
                var error_mg="";
                if( firstname  =="" || lastname ==""){

                    if (firstname =="")
                            error_mg += "Firstname is requied";
                    if (lastname =="")
                            error_mg += "Lastname is requied";
                    // if (address =="")
                    //         error_mg +="Address is requied";
                    return Session.set("error_mg",error_mg);

                }else {
                    Session.set("error_mg","");
                    delete Session.keys['error_mg'];
                    var profile = {
                    firstname:firstname,
                    lastname:lastname,
                    sex:sex,
                    birth:birth,
                    address:address
                   };
            if(Session.get('ADDAVATAR')!=''){
                var img_id = Session.get('ADDAVATAR');
                var obj={
                    profile:profile,
                    image:img_id
                };
            }else{
                var obj={
                    profile:profile,
                };
            }
            Meteor.call('editprofile',id,obj,function(error){
                if(error)
                    console.log("editprofile error"+error.reason)
                else
                    console.log("editprofile successfully");
            });
            
            Meteor.call('addpoint',id,attr,function(error){
                if(error)
                    console.log("addpoint error"+error.reason)
                else
                    console.log("addpoint successfully");
            });
            // alert("You have earned "+upoint+" points!");
        }

                // Meteor.call('editarray',id,ojb);
         Router.go('profile');
    },
    'change #upload': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
          images.insert(files[i], function (err, fileObj) {
            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            Session.set('ADDAVATAR',fileObj._id);

          });
        }
    }
});

Template.profile.events({
    'click #btn-answer': function(e){
        //alert("Hello");
        var value=[];
        var attr = [];
        //alert(value);
        e.preventDefault();
        var id = Meteor.userId();
        var answer = $('[name=answer]');
        answer.each(function(i,val){
            //console.log($(this).val());
            if(val){
                var val=$(this).val();
                 value.push(val);
            }
        });
        //console.log(JSON.stringify(value));
        var qcm = [];
        var question = $('[name=question]');
        question.each(function(i,val1){
            //console.log($(this).val());
            var val1=$(this).val();
            //console.log(val);
             qcm.push(val1);
        });
        for(var i=0;i<value.length;i++){
            //alert(qcm[i]+'macth'+value[i]);
            obj = {
                qcmId:qcm[i],
                answer:value[i]
            }
            attr.push(obj);
        }
        //console.log(JSON.stringify(attr));
        var array = {answerdata:attr};
            Meteor.call('addanswer',id,array);
            alert("Answer saved successfully");
    }
});
Template.editprofile.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});
