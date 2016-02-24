// Template.header.helpers({
// 	getCart: function(){
// 		var totalItem=0;
// 		mycart = cart.find({userId:Session.get('userId')});
// 		mycart.forEach(function(value){
// 			//var totalItem=value.quantity;
// 			totalItem+=parseInt(value.quantity);
// 		});
// 		return totalItem;
// 	}
// });

Template.mainLayoutMobile.onRendered(function(){
 // Toggle script

 $(".container").hide();

 $(".toggle").click(function(){
  $(this).toggleClass("active").next().slideToggle(350);
   return false;
 });

 // -------- Toggle script end ------ //

 $("#submenu-1").hide();

 jQuery('#a-submenu-1').click(function(){
  jQuery('#submenu-1').toggle(250);
 });

 var events = ("ontouchstart" in document.documentElement) ? 'touchstart touchon' : 'click';

 jQuery('#a-menu').bind(events, {direction:'right'},evthandler);
 jQuery('#a-sidebar').bind(events, {direction:'left'},evthandler);


 function evthandler (event) {
  var direction = event.data.direction;
  var class_selector = 'moved-'+direction;
  if (jQuery('#content-wrapper').is("."+class_selector)) {
                 jQuery('#content-wrapper').removeClass(class_selector);

             } else {
                 jQuery('#sidebar-wrapper').css("z-index", "-2");
                 if(class_selector == "moved-right") jQuery('#sidebar-wrapper').css("z-index", "-2");
                 if(class_selector == "moved-left") jQuery('#sidebar-wrapper').css("z-index", "0");
                 jQuery('#content-wrapper').addClass(class_selector);
             }

 }

 function evthandlerswipe(from, to){
  var cls_to = 'moved-'+to, cls_from = 'moved-'+from;
             if (jQuery('#content-wrapper').is("."+cls_from)) {
                 jQuery('#content-wrapper').removeClass(cls_from);
             } else if (!jQuery('#content-wrapper').is("."+cls_to)) {
                 if(cls_to == "moved-right") jQuery('#sidebar-wrapper').css("z-index", "-2");
                 if(cls_to == "moved-left") jQuery('#sidebar-wrapper').css("z-index", "0");
                 jQuery('#content-wrapper').addClass(cls_to);
             }

 }

 jQuery("body").swipe({
         swipeLeft: function (event, direction, distance, duration, fingerCount) {
   evthandlerswipe('right','left');
         },
         swipeRight: function (event, direction, distance, duration, fingerCount) {
   evthandlerswipe('left','right');
         },
         excludedElements: jQuery.fn.swipe.defaults.excludedElements + ", .slides, .toggle"
 });


});

Template.mainLayoutMobile.events({
  "click #makeup":function(){
    $("#panel_makeup").slideToggle("slow");
  },
  "click #panel_makeup":function(){
    $(".sub_dropdown").slideToggle("slow");
  },
  "click #price_range":function(){
    $(".panel_price_range").slideToggle("slow");
  },
  "click #brands":function(){
    $(".panel_brands").slideToggle("slow");
  },
  "click #advanced":function(){
    $(".panel_advanced").slideToggle("slow");
  },
  "click #skin_type":function(){
    $(".panel_skin_type").slideToggle("slow");
  }

});




