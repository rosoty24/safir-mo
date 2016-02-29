Session.set('currentLetter',"A");
Session.setDefault('advanced_price_min',0);
Session.setDefault('advanced_price_max',100000000);
Session.setDefault('advanced_tags','');
Session.setDefault('advanced_brand','');
Session.setDefault('advanced_has_comment',0);
Session.setDefault('advanced_is_favorite',0);
Session.setDefault('currentCategory','');
Session.setDefault('parentTagId','');
Session.setDefault('click','');
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
    'click .checkbox input': function(event) {
        var rank = [];
        $('.checkbox input').each( function(){
            if(this.checked){
                var max = $(this).attr('data-max');
                var min = $(this).attr('data-min');
                rank.push({max:max,min:min});
            }
        });
        var minX = Infinity, maxX = -Infinity;
        for( var min in rank){
            if( minX > rank[min].min )
                minX = rank[min].min;
        }
        for( var max in rank ){
            if( maxX < rank[max].max )
                maxX = rank[max].max;
        }
        // console.log("min: "+minX);
        // console.log("max: "+maxX);
        // console.log(rank);
        Session.set("advanced_price_min",minX);
        //console.log("SESS MIN: "+Session.get("advanced_price_min"));
        Session.set("advanced_price_max",maxX);
        //console.log("SESS MAX: "+Session.get("advanced_price_max"));
        if(Router.current().route.getName()=='advanced'){
            return;
        }else{
            Router.go("/advanced");
        }
    },
    // "click #makeup":function(){
    //     $("#panel_makeup").slideToggle("slow");
    // },
    // "click #panel_makeup":function(){
    //     $(".sub_dropdown").slideToggle("slow");
    // },
    "click #price_range":function(){
        $(".panel_price_range").slideToggle("slow");
    },
    "click #brands":function(){
        $(".panel_brands").slideToggle("slow");
    },
    "click #advanced":function(){
        $(".panel_advanced").slideToggle("slow");
    },
    // "click #skin_type":function(){
    //     $(".panel_skin_type").slideToggle("slow");
    // },
    "click #logout":function(e){
        e.preventDefault();
        Meteor.logout();
        Router.go("/login");
    },
    'click .alphabet': function(e,tpl){
        e.preventDefault();
        Session.set('limit', -1);
        var value=$(e.currentTarget).text();
        letter=value.toUpperCase();
        var myBrands=[];
        var str="^"+letter;
        var liste=products.find({"Brand":{$regex : str}}).fetch();
        for(var i=0;i<liste.length;i++){
            if(liste[i].hasOwnProperty('Brand')){
                var first=liste[i].Brand;
                if(myBrands.indexOf(first)==-1)
                    myBrands.push(first);
            }
        }
        var html="";
        for(var i=0;i<myBrands.length;i++)
            html=html+"<h4><a href='' class='targetBrand'  >"+myBrands[i]+"</a></h4>";
        tpl.$("#allBrands").html(html);
    },
    'click .targetBrand': function(e,tpl){
        e.preventDefault();
        var brand=$(e.currentTarget).text();
        var oldValue='';//Session.get('advanced_brand');
        var newVal=oldValue+''+brand+';';
        Session.set('advanced_brand',newVal);
        console.log('Liste Brand= '+Session.get('advanced_brand'));
        //$("#refineitem").append('<li><a href="" class="border-dashed">'+brand+' <span class="fa fa-times removeRefineItemBrand" ></span></a></li>');
        Router.go('advanced');
    }
});
Template.menu.onRendered(function(){
    $(document).ready(function() {
        $(".u-vmenu").vmenuModule({
            Speed: 200,
            autostart: false,
            autohide: true
        });
    });
});
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