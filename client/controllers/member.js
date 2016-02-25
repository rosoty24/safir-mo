
Template.member.helpers({
	nb_comments: function(){
		var me=Meteor.user();
		var number=products.find({"review.user":me._id}).count();
		return number;
	},
	nb_likes: function(){
		var me=Meteor.user();
		var number=favorite.find({"userId":me._id}).count();
		return number;
	},
	getpoint: function(){
		var me=Meteor.user();
		if(me==null)
			return;
		if(me.profile.shipcard!='undefined')
			return me.profile.shipcard.point;
		else
			return 0;
	},
	getPourcentage: function(){
		var me=Meteor.user();
		if(me==null){
			console.log('Me null');
			return;
		}
		if(me.profile.shipcard!='undefined'){
			var pt=Number(me.profile.shipcard.point);
			var result = pt/100000;
			console.log('ME PROFILE='+result);
			return result;
		}
		else
			console.log('ME 0');
			return 0;
	},
	nextRank: function(){
		
			var me=Meteor.user();
			console.log('Getting user');
		if(me.profile.shipcard!='undefined')
			var point=Number(me.profile.shipcard.point);
		else
			point=0;

		console.log('POINT:'+point);
		if(point>=0 && point<1000){
			
			return 'SILVER';
		}
		else if(point>=1000 && point <10000){
			Session.set('rank','SILVER');
			//$('#ranking').addClass("backptsilver");
			return 'GOLD';
		}
  			
  		else{
  			//$('#ranking').addClass("backptgold");
  			Session.set('rank','GOLD');
  			return 'VIP';
  		}
  		console.log('rank:'+Session.get('rank'));
		
		
	},
	pointLeft: function(){
		var me=Meteor.user();
		console.log('Getting user'+JSON.stringify(me));
		if(typeof me.profile.shipcard != "undefined")
			var point=Number(me.profile.shipcard.point);
		else
			point=0;

		console.log("POINT RESTANT"+point);

		if(point<=1000)
			return 1000-point;
		else if(point >1000 && point<10000)
			return 10000-point;
		else
			return 100000-point;
	},
	isBronze: function(){
		if(Session.get('rank')==''){
			var me=Meteor.user();
			console.log('Getting user');
		if(me.profile.shipcard!='undefined')
			var point=Number(me.profile.shipcard.point);
		else
			point=0;

		console.log('POINT:'+point);
		if(point>=0 && point<1000){
			Session.set('rank','BRONZE');
			//$('#ranking').addClass("backpt");
		}
		else if(point>=1000 && point <10000){
			Session.set('rank','SILVER');
			//$('#ranking').addClass("backptsilver");
		}
  			
  		else{
  			//$('#ranking').addClass("backptgold");
  			Session.set('rank','GOLD');
  		}
  		console.log('rank:'+Session.get('rank'));
		}
		if(Session.get('rank')=='BRONZE')
			return true;
		else
			return false;
	},
	isSilver: function(){
		if(Session.get('rank')==''){
			var me=Meteor.user();
			console.log('Getting user');
		if(me.profile.shipcard!='undefined')
			var point=Number(me.profile.shipcard.point);
		else
			point=0;

		console.log('POINT:'+point);
		if(point>=0 && point<1000){
			Session.set('rank','BRONZE');
			//$('#ranking').addClass("backpt");
		}
		else if(point>=1000 && point <10000){
			Session.set('rank','SILVER');
			//$('#ranking').addClass("backptsilver");
		}
  			
  		else{
  			//$('#ranking').addClass("backptgold");
  			Session.set('rank','GOLD');
  		}
  		console.log('rank:'+Session.get('rank'));
		}
		if(Session.get('rank')=='SILVER')
			return true;
		else
			return false;
	},
	isGold: function(){
		if(Session.get('rank')==''){
			var me=Meteor.user();
			console.log('Getting user');
		if(me.profile.shipcard!='undefined')
			var point=Number(me.profile.shipcard.point);
		else
			point=0;

		console.log('POINT:'+point);
		if(point>=0 && point<1000){
			Session.set('rank','BRONZE');
			//$('#ranking').addClass("backpt");
		}
		else if(point>=1000 && point <10000){
			Session.set('rank','SILVER');
			//$('#ranking').addClass("backptsilver");
		}
  		else{
  			//$('#ranking').addClass("backptgold");
  			Session.set('rank','GOLD');
  		}
  		console.log('rank:'+Session.get('rank'));
		}
		if(Session.get('rank')=='GOLD')
			return true;
		else
			return false;
	},
	getproduct:function(){

		var point = Meteor.user().profile.shipcard.point;
		//console.log('MyResult:'+point);
		var p = Number(point);
		console.log('MyResult:'+p);
			var result = products.find({point:{$gte:0,$lte:p}});
			//console.log('MyProduct: '+result);
			console.log("NB result: "+result.fetch().length);
			return result;
		
	}
});