Template.email.events({
  'submit form':function(event){
   // var resultRandom=[];
   var str='';
        event.preventDefault();
        function shuffle(o){
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }
        var myArray=['0','1','2','3','4','5','6','7','8','9'];
        var arrayRandom=shuffle(myArray);
        for(var ran=0;ran<4;ran++){
            if(arrayRandom[ran]){
               //resultRandom.push(arrayRandom[ran]); 
               str=str+arrayRandom[ran];
            }
            
        }
        
        //alert(str);
        Session.set('veryfy',str);
        var subject = 'your must veryfy code!';
        var sendTo = event.target.email.value;
        var message = 'your code veryfy:'+Session.get('veryfy');

        //alert("Email:"+ subject +'/'+ sendTo + '/' + message);

        Meteor.call('mysendEmail',sendTo, subject, message,function(err){
            if(err){
              console.log("error"+err.reason);
            }else{
                
                Router.go('ForgotPassword');
            }
        }); 
    }
    
  
});



