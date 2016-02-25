Session.set('compteur',0);
Session.set('rank','');
Template.reward.helpers({
	
	short: function(count){
		return count.substr(0,20);
	},
	getCount: function(){
		var cc=Session.get('compteur');
		cc=Number(cc);
		cc=cc+1;
		Session.set('compteur',cc);
		return cc;
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
	},
	isBronze: function(){
		if(Session.get('rank')==''){
			var me=Meteor.user();
			console.log('Getting user'+JSON.stringify(me));
		if(typeof me.profile.shipcard != "undefined")
			var point=Number(me.profile.shipcard.point);
		else
			point=0;

		console.log('ISBRONZEPOINT:'+point);
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
			console.log('Getting user ISSILVER');
		if(typeof me.profile.shipcard != "undefined")
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
			console.log('Getting user ISGOLD');
		if(typeof me.profile.shipcard != "undefined")
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
	isGold: function(){
		if(Session.get('rank')==''){
				var me=Meteor.user();
				console.log('Getting user ISSILVER');
			if(typeof me.profile.shipcard != "undefined")
				var point=Number(me.profile.shipcard.point);
			else
				point=0;
			return point;
		}
	},
	getproduct:function(){
		var me=Meteor.user();
		if(typeof me.profile.shipcard != "undefined")
			var point=Number(me.profile.shipcard.point);
		else
			point=0;
		
		//console.log('MyResult:'+point);
		var p = Number(point);
		console.log('MyResult:'+p);
			var result = products.find({point:{$gte:0,$lte:p}});
			//console.log('MyProduct: '+result);
			console.log("NB result: "+result.fetch().length);
			return result;
		
	},
	getproductreward:function(getpoint){
		result = products.find({point:getpoint},{limit:6});
			return result;
	}
	
});


Template.rewardsilver.helpers({
	getpoint: function(){
		var id = Meteor.userId();
		return Meteor.users.find({_id:id});
	},
	getproduct:function(){
		var point = Meteor.user().profile.shipcard.point;
		//console.log('MyResult:'+point);
		var p = Number(point);
		console.log('MyResult:'+p);
		var silver = 200;
		var gold = 300;
		var result = products.find({point:{$gte:silver,$lte:p}});
		return result;
	},
	getImage: function(id){
			//var id = this.image;
			//alert('display'+id);
			//console.log('Display:' + id);
			var img = images.findOne({_id:id});
			if(img){
				console.log(img.copies.images.key);
				return img.copies.images.key;
			}else{
				return;
			}
	}
});
Template.rewardgold.helpers({
	getpoint: function(){
		var id = Meteor.userId();
		return Meteor.users.find({_id:id});
	},
	getproduct:function(){
		var point = Meteor.user().profile.shipcard.point;
		//console.log('MyResult:'+point);
		var p = Number(point);
		console.log('MyResult:'+p);
		var gold = 300;
		var result = products.find({point:{$gte:gold,$lte:p}});
		return result;
	},
	getImage: function(id){
			//var id = this.image;
			//alert('display'+id);
			//console.log('Display:' + id);
			var img = images.findOne({_id:id});
			if(img){
				console.log(img.copies.images.key);
				return img.copies.images.key;
			}else{
				return;
			}
	}

});