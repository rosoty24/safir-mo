Meteor.methods({
    removeTracking: function(id) {
        tracking.remove(id);
    },
    getUserName: function(text) {
        var result = Meteor.users.findOne({username: text });
        // console.log(" server name "+result._id);
        return result._id;
    },
    getUserEmail: function(text) {
        var result = Meteor.users.findOne({"emails.address": text });
        // console.log(" server email "+result._id);
        return result._id;
    },
    getUserTracking: function(id) {
        var result = Meteor.users.findOne({ _id: id });
        if(result){
        	if(result.username){
        		return result.username;
		    }else{
		    	var email = "";
		    	result.emails.forEach(function(i){
		    		email = i.address;
		    	});
		    	return email;
		    }
        }else{
        	return "anonymous";
        }
        
    },
    trackingRouter: function(userId,time,currenturl){
        var ipAddress=this.connection.clientAddress;
        var obj={
            "userId" : userId,
            "time" : time,
            "ip" : ipAddress,
            "currenturl" : currenturl
        };
        userTracking.insert(obj);
    }
});
