Session.set("filter", "");
Session.set('fiterValue', "");
Session.set('removefilter', '');
Session.set('numberOfReviews', 2);
Template.details.events({
    'click #unlike':function(e){
        e.preventDefault();
        var unlike = '#unlike'+this._id;
        var like = '#like'+this._id;
        $(like).removeClass('nonelike');
        $(unlike).addClass('nonelike');
         if(Meteor.userId()){
                var userId=Meteor.userId();
             }else{
                var userId=Session.get('userId');
                if(!userId){
                    var newId=Random.id();
                    Session.setPersistent('userId',newId);
                }
                
             }
             
            var obj={
                proId:this._id,
                userId:userId
            }

            Meteor.call('insertFavoritee',obj);
    },
    'click #like':function(e){
        e.preventDefault();
        var unlike = '#unlike'+this._id;
        var like = '#like'+this._id;
        $(like).addClass('nonelike');
        $(unlike).removeClass('nonelike');
        if(Meteor.userId()){
                var userid=Meteor.userId();
        }else{
            var userid=Session.get('userId');
              
        }
        var obj=favorite.findOne({userId:userid,proId:this._id});
        //alert(obj._id);    
        favorite.remove(obj._id);
    },
    "click .likereview": function(e) {
        var arraylike = [];
        var reivewid = this.idreview;
        var userid = Meteor.userId();
        var like = 1;
        var productsid = $("#reviwhidden").val();
        var reviews = products.findOne({ _id: productsid }).review;
        var obj = {
            "user": userid,
            "like": like
        };
        // arraylike.push(obj);
        for (var i = 0; i < reviews.length; i++) {
            if (reviews[i].idreview == reivewid) {
                if (reviews[i].likereview) {
                    var myarraylike = reviews[i].likereview;
                    for (var j = 0; j < myarraylike.length; j++) {
                        if (myarraylike[j].user == userid) {
                            myarraylike[j] = {
                                'user': myarraylike[j].user,
                                'like': 0
                            }
                            arraylike.push(myarraylike[j]);
                        } else {
                            arraylike.push(obj);
                            arraylike.push(myarraylike[j]);
                        }

                    }

                } else {
                    arraylike.push(obj);
                }
                reviews[i] = {
                    "idreview": reviews[i].idreview,
                    "title": reviews[i].title,
                    "comment": reviews[i].comment,
                    "grade": reviews[i].grade,
                    "user": reviews[i].user,
                    "likereview": arraylike,
                    "date": Date.now()
                }
            }
        }
        alert("like review" + productsid);
        $(e.currentTarget).toggleClass("addheart");

        Meteor.call("updatelikereview", reviews, productsid, function(error, result) {
            if (error) {
                console.log("error update like review" + error);
            } else {
                console.log("update like review" + result);
            }
        });
    },
    'click .starRang': function(e, tpl) {
        e.preventDefault();
        var value = tpl.$(e.currentTarget).attr('data-star');
        //alert("Rating "+value);
        Session.set("STARRATE", value);
    },
    'click div i.starRang': function(e) {
        var currentStar = $(e.currentTarget).attr('class');
        if (!currentStar.match('yellow-star')) {
            $(e.currentTarget).addClass('yellow-star');
            $(e.currentTarget).parent().prevAll('div').children('i').addClass('yellow-star');
        } else {
            $(e.currentTarget).parent().nextAll('div').children('i').removeClass('yellow-star');
        }

    },
    'click #addreview': function(e, tpl) {
        e.preventDefault();
        var userid = Meteor.userId();
        var title = tpl.$("#title").val();
        var comment = tpl.$("#comment").val();
        //console.log(title+ comment);
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
            var point = 10;
        }
        if (arrmem[0].name == 'silver') {
            var point = 20;
        }
        if (arrmem[0].name == 'gold') {
            var point = 40
        }

        if (profile.shipcard != null)
            var upoint = Number(profile.shipcard.point);
        else
            var upoint = 0;
        upoint += point;
        var grade = Session.get("STARRATE");
        console.log("grad "+ grade);
        $("#bt_review").click();
        var idreview = Random.id();

        if (title == "" || comment == "") {
        	if(title==""){
                if (TAPi18n.getLanguage() == 'fa') {
                    $("#validdetail").text("لطفا عنوان ورودی در اینجا ");
                } else {
                    $("#validdetail").text("please input title here ");
                }
			}
			if(comment==""){
                if (TAPi18n.getLanguage() == 'fa') {
                    $("#validdetail").text("لطفا نظر ورودی در اینجا ");
                } else {
                    $("#validdetail").text("please input comment here ");
                }
			}
        } else {
            Meteor.call('addReview', title, comment, userid, grade, this._id, function(err) {
                if (err) {
                    console.log("addreview: " + err.reason);
                } else {
                    var title = tpl.$("#title").val("");
                    var comment = tpl.$("#comment").val("");
                    $('#validdetail').text("");
                    $('#validdetail1').text("");
                    Session.set("STARRATE",'');

                    Meteor.call('commentDetail', function(err, data) {
                        if (!err) {
                            Session.set('countReview', data);
                        }
                    })
                    var countR = Session.get('countReview');
                    if ( countR < 5) {
                        Meteor.call('earnPoint', userid, upoint, function(err) {
                            if (err) {
                                console.log("error " + reason);
                            } else {
                                console.log("success" + upoint);
                            }
                        });
                        if (TAPi18n.getLanguage() == 'fa') {
                            Bert.alert('شما باید کسب ' + point + ' امتیاز بیشتر!', 'success', 'growl-bottom-right');
                        } else {
                            Bert.alert('You have earn ' + point + ' point more!', 'success', 'growl-bottom-right');
                        }
                        $(".close").click();
                        console.log("successfully");
                    }else{
                        console.log("you have comment more than 5 time!");
                    }
                }

            });
        }
        //alert("Review added successfully!")
    }
});

Template.details.helpers({
    getRate: function(num) {
        var rate = $('fa-star-o');
        var allhtm = '';
        var html = '<div class="col-md-3 col-md-offset-2 pull-left rate-star" style="margin-left: -25px" style=""><i class="fa fa-star" data-star="1" style="font-size:15px;" disabled="disabled"></i></div>';
        var htmlyellow = '<div class="col-md-3 col-md-offset-2 pull-left rate-star" style="margin-left: -25px" style=""><i class="fa fa-star yellow-star" data-star="1" style="font-size:15px;" disabled="disabled"></i></div>';
        for (var i = 0; i < 5; i++) {
            if (i < Number(num)) {
                allhtm += htmlyellow;
            } else {
                allhtm += html;
            }
        }

        return allhtm;
    },
    existReview: function(review) {
        if (review) {
            return true;
        } else {
            return false;
        }
    },
    getReviews: function(reviews, filtre, toremove) {

        /*      console.log('reloading reviews...'+Session.get('fiterValue'));
                var toRemove=Session.get('removefilter').split(':');
                var myFilter=Session.get('fiterValue');
                for(var i=0;i<toRemove.length;i++){
                    if(toRemove[i]=='')
                        continue;
                    var str=':'+toRemove[i];
                    myFilter.replace(str,'');
                }*/

        //console.log('Before: '+Session.get('fiterValue'));
        //console.log('ToRemove:'+Session.get('removefilter'));

        if (Session.get('fiterValue') == "" || Session.get('fiterValue') == "undefined") {
            var lastResult = [];
            var numberOfResult = Session.get('numberOfReviews');

            if (numberOfResult > reviews.length)
                numberOfResult = reviews.length
                //console.log('NUMBER OF lastResult.length '+numberOfResult);
            for (var i = 0; i < numberOfResult; i++)
                lastResult.push(reviews[i]);

            //console.log('NUMBER OF lastResult.length '+lastResult.length);
            return lastResult;

        }
        //console.log('Calling filterReview='+reviews.length);
        var values = Session.get('fiterValue').split(':');
        //fiterValue
        var ages = [];
        var myTags = [];
        var grades = [];

        for (var i = 0; i < values.length; i++) {
            var param = values[i];
            if (param == '')
                continue;
            // console.log("Processing "+param);
            if (param.indexOf('-') >= 0) {
                ages.push(param);
            } else if (param.indexOf('/') >= 0) {
                grades.push(param);
            } else {
                myTags.push(param);
            }
        }

        // console.log('ages:'+ages.length);
        // console.log('myTags:'+myTags.length);
        // console.log('grades:'+grades.length);
        var results = [];
        for (var i = 0; i < ages.length; i++) {
            var ageMin = Number(ages[i].split('-')[0]);
            var ageMax = Number(ages[i].split('-')[1]);
            // console.log('min:'+ageMin);
            // console.log('max:'+ageMax);
            //Loop into reviews
            for (var j = 0; j < reviews.length; j++) {
                Meteor.subscribe("users", reviews[j].user);
                var curUser = users.findOne({ "_id": reviews[j].user });
                if (Number(curUser.profile.age) <= ageMax && Number(curUser.profile.age) >= ageMin) {
                    results.push(reviews[j]);

                }

            }
        }
        // console.log('Size of the rest:'+reviews.length);
        // console.log('Still in the sand after ager filter:'+results.length);
        if (results.length > 0) {
            //console.log('remise a 0');
            reviews = [];
            reviews = results.slice(0);
            results = [];
        }

        //console.log('Size of the rest:'+reviews.length);
        for (var i = 0; i < myTags.length; i++) {
            var curTag = myTags[i];
            //console.log('tagging '+curTag);
            for (var j = 0; j < reviews.length; j++) {
                var curUser = users.findOne({ "_id": reviews[j].user });
                if (curUser.profile.tag.indexOf(curTag) >= 0)
                    results.push(reviews[j]);
            }
        }

        //console.log('Still in the sand(tags):'+results.length);
        if (results.length > 0) {
            //console.log('remise a 0');
            reviews = [];
            reviews = results.slice(0);
            results = [];

        }
        if (grades.length == 0)
            results = reviews.slice(0);
        //console.log('Size of the rest:'+reviews.length);
        for (var i = 0; i < grades.length; i++) {
            var curGrade = grades[i].split('/')[0];
            //Loop into reviews

            for (var j = 0; j < reviews.length; j++) {

                if (Number(reviews[j].grade) == Number(curGrade) && results.indexOf(reviews[j]) < 0) {
                    results.push(reviews[j]);
                    //console.log('Comparing '+curGrade+' and '+reviews[j].grade);
                }

            }
        }

        // console.log('Still in the sand(grades):'+results.length);
        // console.log('afterFilter:'+results.length);

        var lastResult = [];
        var numberOfResult = Session.get('numberOfReviews');

        if (numberOfResult > results.length)
            numberOfResult = results.length
            // console.log('NUMBER OF lastResult.length '+numberOfResult);
        for (var i = 0; i < numberOfResult; i++)
            lastResult.push(results[i]);

        // console.log('NUMBER OF lastResult.length '+lastResult.length);
        return lastResult;


    },
    getReviewsShort: function(reviews, limit) {
        if (Session.get("filter") == "") {
            var ret = [];
            for (var i = 0; i < reviews.length && i <= limit; i++) {
                var current = reviews[i];
                ret.push(current);
            }
            return ret;
        } else {
            var ret = [];
            for (var i = 0; i < reviews.length && i <= limit; i++) {
                var current = reviews[i];
                var currentAuthor = users.findOne({ _id: current.user });
                if (currentAuthor.emails[0].address == Session.get("filter"))
                    ret.push(current);
            }
            return ret;
        }
    }
});
