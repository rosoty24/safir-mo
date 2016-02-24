Template.manageUserTracking.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});
Template.manageUserTracking.helpers({
    getUserTracking: function() {
        var userTr = userTracking.find({});
        var arrTracking = [];
        userTr.forEach(function(val) {
            var obj = {
                _id: val._id,
                userId: val.userId,
                t: val.time,
                ip: val.ip,
                location: val.location,
                currenturl: val.currenturl
            };
            arrTracking.push(obj);
        });
        return arrTracking;
    },
    getTrackUser: function(id) {
        Meteor.call("getUserTracking", id, function(err, data) {
            if (err) {
                console.log("error");
            } else {
            	$("."+id).text(data);
			}
        });
    }
});
Session.setDefault('page', 1);
Template.manageUserTracking.events({
    "click .prev": function(e) {
        e.preventDefault();
        var dnext = userTracking.find({}).count();
        if (Number(Session.get('page')) == 1) {
            $(".prev").css("display", "none");
        } else {
            Session.set('page', Number(Session.get('page')) - 1);
        }
    },
    "click .next": function(e) {
        e.preventDefault();
        var dnext = userTracking.find({}).count();
        if (dnext < 20) {
            $(".next").css("display", "none");
        } else {
            Session.set('page', Number(Session.get('page')) + 1);
        }
    },
    'focusout input#searchUsername': function(e) {
        e.preventDefault();
        var text = $("#searchUsername").val();
        if(text.match(/@/g) == "@"){
        	Meteor.call("getUserEmail", text, function(err, data) {
	            if (err) {
	                console.log("error");
	            } else {
	                var obj = {
	                    field1: "userId",
	                    field2: data,
	                    field3: null
	                }
	                Session.set("findField", obj);
	            }
	        });
        }else{
        	 Meteor.call("getUserName", text, function(err, data) {
	            if (err) {
	                console.log("error");
	            } else {
	                var obj = {
	                    field1: "userId",
	                    field2: data,
	                    field3: null
	                }
	                Session.set("findField", obj);
	            }
	        });
        }
    },
    'change #selecturl': function(e) {
        e.preventDefault();
        var url = $("#selecturl").val();
        if (url == "Select URL") {
            $("#selecturl").focus();
            return false;
        } else {
            var obj = {
                field1: "currenturl",
                field2: url,
                field3: null
            }
            Session.set("findField", obj);
            console.log("Successfully " + url);
        }
    },
    'focusout #searchIP': function(e) {
        e.preventDefault();
        var ip = $('#searchIP').val();
        console.log(ip);
        var obj = {
            field1: "ip",
            field2: ip,
            field3: null
        }
        Session.set("findField", obj);
        $('#searchIP').val(ip);
    },
    'change #selectlocation': function(e) {
        e.preventDefault();
        var loc = $("#selectlocation").val();
        if (loc == "Select Location") {
            $("#selectlocation").focus();
            return false;
        } else {
            var obj = {
                field1: "location",
                field2: loc,
                field3: null
            }
            Session.set("findField", obj);
        }
    },
    'focusout .getDate': function() {
        var datepick = $(".getDate").val();
        if (datepick == "mm/dd/yy") {
            $(".getDate").focus();
            return false;
        } else {
            var startDate = datepick + " 00:00 AM";
            var endDate = datepick + " 11:59 PM"
            var sdate = new Date(startDate);
            startDate = sdate.getTime();
            var edate = new Date(endDate);
            endDate = edate.getTime();
            var obj = {
                field1: "time",
                field2: Number(startDate),
                field3: Number(endDate)
            }
            Session.set("findField", obj);
        }
        $(".getDate").val(datepick);
    }

});
