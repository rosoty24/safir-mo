Session.set('children1','');
Session.set('children2','');
Session.set('selected_menu','');
Template.mainLayoutMobile.events({
	'click #en':function(e,tpl){
		e.preventDefault();
		if(TAPi18n.getLanguage()=='fa'){
			var lang='en';		
		}
		else{	
			var lang='fa';		
		}
		Session.set('LANG',lang);

      	TAPi18n.setLanguage(lang).done(function () {
        Session.set("showLoadingIndicator", false);
      })
      .fail(function (error_message) {
        console.log(error_message);
      });

	}
});
Template.mainLayoutMobile.helpers({
	changeLanguage: function(){
		if(TAPi18n.getLanguage()=='fa')
			return 'English';
		if(TAPi18n.getLanguage()=='en')
			return 'فارسی';
	}
});
Template.menu.events({
	'click #secondChild':function(e){
		e.preventDefault();
		$("#second_makeup").slideToggle("show");
		$("#panel_makeup").hide();
		$("#panel_all_makeup").hide();
		
	},
	'click #second_child':function(){
		$("#second_makeup").slideToggle("hide");
	},
	"click #child_child":function(){
		var id = this._id;
		var seChCl='.secondchild'+this._id;
		var name = $(seChCl).attr('data-value');
		$("#secondChild").html(name);
		Session.set("FIRSTCHILDID", id);
		$("#panel_all_makeup").slideToggle("hide");
		$('#caret-sreydent').show();
	},
	"click #makeup":function(){
        $("#makeup").addClass("active");
        //$("#secondChild").html("");
        $("#panel_makeup").slideToggle("slow");
        $("#panel_all_makeup").hide();
        $("#second_makeup").hide();
    },
    "click #child_makeup":function(){
    	var parentsId = this._id; 
    	Session.set("PARENTS",parentsId );
    	var childId='.firstchild'+this._id;
    	var parentName = $(childId).attr('data-value');
    		$("#makeup").html(parentName);
    		Session.set("parentNAME", parentName);
    		//$("#all_makeup").html("All "+parentName);
    		$("#allCategory").html("All "+parentName);
    		$("#panel_makeup").slideToggle("hide");
    		$('#caret-sreydent').hide();
    		Session.set("FIRSTCHILDID",'');

    },
    "click #all_makeup":function(e){
    	e.preventDefault();
    	var id = this._id;
        $("#panel_all_makeup").slideToggle("slow");
        $("#all_makeup").addClass("active");
        $("#panel_makeup").hide();
        $("#second_makeup").hide();
    }
});
Template.menu.helpers({
	getParent: function(){
		Session.get('LANG');
		return categories.find({"$or":[{"parent":"0"},{"parent":" "}]}).map(function(document, index) {
            document.index = index + 1;
            return document;
        });
	},
	getChildren: function(){
		var id = Session.get("PARENTS");
		Session.get('LANG');
		return categories.find({"parent":id}).map(function(document, index) {
            document.index = index + 1;
            return document;
        });
	},
	getFirstChild:function(){
		var id = Session.get("FIRSTCHILDID");
		return categories.find({"parent":id}).map(function(document, index) {
            document.index = index + 1;
            return document;
        });
	},
	getTitlechild1:function(){
		var title=categories.findOne({_id:Session.get('PARENTS')}).title;
		return title;
	},
	gettitlechild2:function(){
		return categories.findOne({_id:Session.get("FIRSTCHILDID")}).title;
	},
	changeLanguage: function(){
		if(TAPi18n.getLanguage()=='fa')
			return 'English';
		if(TAPi18n.getLanguage()=='en')
			return 'فارسی';
	},
	navnodisplay:function(){
		var url=window.location.href;
		if(url.indexOf('category')>-1){
			return true;
		}else{
			return false;
		}
	}
	
});

Template.headermenu.onRendered(function () {
//default font
$('body').css('font-family','Nazanin Bold');

  var userId = Meteor.userId();
  var time = Date.now();
  var currenturl = window.location.href;
  if( !Session.get('userId') || Session.get('userId') == ""){
         			var newId=Random.id();
         			Session.setPersistent('userId',newId);
         			console.log('Newid'+newId);
  }
});

Template.footer.events({
	'mouseenter #footer':function(e){
		e.preventDefault();
		var userId = Meteor.userId();
		var time = Date.now();
		var currenturl = window.location.href
		var location = 'Footer';
	}
});

Template.headermenu.events({
	'mouseenter #header':function(e){
		e.preventDefault();
		var userId = Meteor.userId();
		var time = Date.now();
		var currenturl = window.location.href
		var location = 'Header';
	}
});

Template.headermenu.events({
	'click .kesearch': function(e,tpl){
		var search=tpl.$("#textToSearch").val();
		if(search ==''){
            console.log("Please fill in search box!");
            var currenturl = window.location.href
            Router.go(currenturl);
        }else{
			Session.set('keyword',search);
			var url="/searchproduct"+"/"+search;
			Router.go(url);

		}
	
	}

});