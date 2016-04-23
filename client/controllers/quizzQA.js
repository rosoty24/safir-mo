Session.set('sesIndex', 0);
Session.set('strqu', '');
Template.quizzQA.rendered = function() {
    $("#quizzpop").click();
}
Template.listQuizz.events({
    'click #quizzName': function() {
        var id = this._id;
        Session.set("QUIZZID", id);
    },
    'click #redo': function() {
        var id = this._id;
        Session.set("REDOQUIZZID", id);
    }
});
Template.quizzQA.events({
    'click #goNext': function(e) {
        var quizzID = Session.get("REDOQUIZZID");
        var userID = Meteor.userId();
        var id = this._id;
        console.log("QUIZZID_LIST=" + id);
        var Aquizz = answerquizz.find({ quizzId: id }).count();

        var arr = [];
        e.preventDefault();
        var index = Session.get('sesIndex');
        quizzId = Session.get("QUIZZID");
        Session.set('sesIndex', index + 1);
        var question = this.question[index].question;
        var answer = $("input[name='radios_checkbox']:checked").val();
        var str = question + ':' + answer + ';';
        if (Session.get('strqu') == '') {
            var newstr = str;
        } else {
            var newstr = str + Session.get('strqu');
        }
        Session.set('strqu', newstr);
        //alert(newstr);
        var quAndan = Session.get('strqu').split(';');
        for (var i = 0; i < quAndan.length; i++) {
            if (quAndan[i]) {
                var arrayquan = quAndan[i].split(':');
                var obj = {
                    quetion: arrayquan[0],
                    answer: arrayquan[1]
                }
                arr.push(obj);
            }
        }
        var countqu = this.question.length;
        var countses = Session.get('sesIndex');

        var userid = Meteor.userId();
        var profile = Meteor.users.findOne({ _id: userid }).profile;
        var oldpoint = profile.shipcard.point;
        var resultmembership = membership.find();
        var arrmem = [];
        resultmembership.forEach(function(value) {
            if (value.minpoint <= oldpoint && oldpoint <= value.maxpoint) {
                arrmem.push(value);
            }
        });
        if (arrmem[0].name == 'black') {
            var point = 50;
        }
        if (arrmem[0].name == 'silver') {
            var point = 100;
        }
        if (arrmem[0].name == 'gold') {
            var point = 200
        }

        if(countqu == countses){
        	Meteor.call('insertQuestionAnswer',{quizzId:id,userId:Meteor.userId(),quizz:arr},function(error){
        		if(error){
        			console.log("insertQuestionAnswer error"+error.reason)
        		}else{
        			Session.set('sesIndex',0);
        			Session.set('strqu','');
        			console.log("insertQuestionAnswer success");
        			var countQA = answerquizz.find({ userId: Meteor.userId() }).count();
        			alert("countQA "+ countQA);
        			if(countQA == 1 || countQA == 3 || countQA == 10){
        				if (profile.shipcard != null){
                            var upoint = Number(profile.shipcard.point);
        				}
                        else{
                            var upoint = 0;
                        }
                        upoint += point;
                        Meteor.call('earnPoint', userid, point);
                        alert("point " +profile.shipcard.point);
        			}
        			
        		}
        	});
        	Bert.alert('Insert success','success','growl-top-right');
        	Router.go('/listQuizz');
        	$('.close').click();
        }
    },
    'click #question': function() {
        alert('ok');
        var qestion = $("#q_id").val();
        console.log(question);
    },
    'click #goBack': function() {
        Router.go('/listQuizz');
    }
});
Template.quizzQA.helpers({
    getFirstQu: function(question) {
        //return question[0];
        var index = Session.get('sesIndex');
        if (question.length - 1 < index) {
            Session.set('sesIndex', question.length - 1);
            index = Session.get('sesIndex');
        }
        console.log(question[index]);
        return question[index];
    }
});
