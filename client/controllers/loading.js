Template.loading.helpers({
 	srctime:function(){
 		if(Number(Session.get('time'))%2==0)
 			return "/img/A_Safir.gif?a=ojnoj";
 		else
 			return "/img/A_Safir.gif?a=azerty";
 	}
 });