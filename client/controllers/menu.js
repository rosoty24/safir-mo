Session.set('children1','');
Session.set('children2','');
Session.set('selected_menu','');
Session.setDefault('CHILDMAKEUP','');
Template.menu.events({
	"click #makeup":function(){
        $("#makeup").addClass("active");
        $("#panel_makeup").slideToggle("slow");
        $("#panel_all_makeup").hide();
    },
    "click #child_makeup":function(e){
    	//alert("pisey toggle");
    	//$( "p" ).removeClass( "myClass yourClass" )
    	var parentsId = this._id; 
    	Session.set("PARENTS",parentsId );
    	console.log("MY ID CATGORY IS==========="+parentsId);
    	var parentName = $(e.currentTarget).text();
    		$("#makeup").html(parentName);
    		Session.set("parentNAME", parentName);
    		$("#all_makeup").html("All "+parentName);
    		$("#allCategory").html("All "+parentName);
    	$("#panel_makeup").slideToggle("hide");
    },
    "click #all_makeup":function(){
    	var id = this._id;
    	alert(id);
        $("#panel_all_makeup").slideToggle("slow");
        $("#all_makeup").addClass("active");
        $("#panel_makeup").hide();
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
		//cnonsole.log("MY_CHILDREN="+id);
		var id = Session.get("PARENTS");
		Session.get('LANG');
		return categories.find({"parent":id}).map(function(document, index) {
            document.index = index + 1;
            return document;
        });
	},
	changeLanguage: function(){
		if(TAPi18n.getLanguage()=='fa')
			return 'English';
		if(TAPi18n.getLanguage()=='en')
			return 'فارسی';
	}
});
Template.header.onRendered(function () {
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
  console.log('MY CART USER ID='+Session.get('userId'));
  //alert(currentPage);
	//Meteor.call('getMonIp',userId,time,currenturl);
	//alert('inserted');
});
Template.footer.events({
	'mouseenter #footer':function(e){
		e.preventDefault();
		//alert("hi");
		var userId = Meteor.userId();
		var time = Date.now();
		var currenturl = window.location.href
		var location = 'Footer';
		//alert(currenturl);
		//Meteor.call('getfooter',userId,time,location, currenturl);
		//alert('footer');
	}
});
Template.header.events({
	'mouseenter #header':function(e){
		e.preventDefault();
		//alert("hi");
		var userId = Meteor.userId();
		var time = Date.now();
		var currenturl = window.location.href
		var location = 'Header';
		//alert(currenturl);
		//Meteor.call('getheader',userId,time,location,currenturl);
		//alert('header');
	}
});
Template.mainLayout.events({
	'mouseenter #mainContent':function(e){
		e.preventDefault();
		var userId = Meteor.userId();
		var time = Date.now();
		var currenturl = window.location.href
		var location = 'Content';
		//alert(currenturl);
		//Meteor.call('contenttrack',userId,time,location,currenturl);
		//alert('contenttrack');
	}
});


Template.header.events({
	'click #en':function(e,tpl){
		//alert(TAPi18n.getLanguage());
		if(TAPi18n.getLanguage()=='fa'){
			var lang='en';			
			$("body").css("font-family","HelveticaNeue, sans-serif");
			
		}
		else{	

			var lang='fa';		
			$('body').css('font-family','Nazanin Bold');
			
		}
			
		Session.set('LANG',lang);
		
		
      TAPi18n.setLanguage(lang).done(function () {
        Session.set("showLoadingIndicator", false);
      })
      .fail(function (error_message) {
        // Handle the situation
        console.log(error_message);
      });

	},
	'click .kesearch': function(e,tpl){
		var search=tpl.$("#textToSearch").val();
		Session.set('keyword',search);
		var url="/searchproduct"+"/"+search;
		Router.go(url);
		//var listProducts=products.find({"title":{"$regex": search}});
		 // if (Router.current().route.getName() == "search") { // new
   //      products.update(t.data._id, {$set: search});
   //      Router.go('/properties/' + t.data._id);
   //  } else { // edit 
   //      var id = Properties.insert(searchproduct);
   //      Router.go('/properties/' + id + '/edit');
   //  }   
// }
		
	}

});