Meteor.methods({
	insertTradeCategory: function(obj,cateid,lang){
		console.log('MY CALL'+JSON.stringify(obj));
		console.log('Cateid: '+cateid);
		if(lang=="en")
			translation.insert(obj);
		else
			translation.insert(obj);
	}
});
Meteor.methods({
	insertTradparentTag: function(obj,parenttagid,lang){
		console.log('MY CALL'+JSON.stringify(obj));
		console.log('parenttagid: '+parenttagid);
		if(lang=="en")
			translation.insert(obj);
		else
			translation.insert(obj);
	}
});
Meteor.methods({
	insertTradTags: function(obj,tagid,lang){
		console.log('MY CALL'+JSON.stringify(obj));
		console.log('IDTAG: '+tagid);
		if(lang=="en")
			translation.insert(obj);
		else
			translation.insert(obj);
	}
});
Meteor.methods({
	insertTradparentattr: function(obj,parentattrid,lang){
		console.log('MY CALL'+JSON.stringify(obj));
		console.log('parentattrid: '+parentattrid);
		if(lang=="en")
			translation.insert(obj);
		else
			translation.insert(obj);
	}
});
Meteor.methods({
	insertTradAttri: function(obj,attrid,lang){
		console.log('MY CALL'+JSON.stringify(obj));
		console.log('attrid: '+attrid);
		if(lang=="en")
			translation.insert(obj);
		else
			translation.insert(obj);
	}
});
Meteor.methods({
	insertTradshops: function(obj,shopid,lang){
		console.log('MY CALL'+JSON.stringify(obj));
		console.log('shopid: '+shopid);
		if(lang=="en")
			translation.insert(obj);
		else
			translation.insert(obj);
	}
});
