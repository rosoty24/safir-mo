Template.homeMenu.onRendered(function(){
	// var $ = jQuery.noConflict();
			
	// $('#slider').flexslider({
	// 	animation: "slide",
	// 	directionNav: true,
	// 	animationLoop: true,
	// 	controlNav: false,
	// 	slideToStart: 1,
	// 	slideshow: true,
	// 	animationDuration: 300,
	// 	start: function(){
	// 		 $('#slider').animate({opacity: 1}, 750);
	// 	},
	// });
	var swiper = new Swiper('.swiper-container', {
		// autoplay: 2500,
        pagination: '.swiper-pagination',
        paginationClickable: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        hashnav: true,
        autoplayDisableOnInteraction: true
    });
});

Template.homeMenu.onRendered(function(){
	var $ = jQuery.noConflict();
	$('#trendy').flexslider({
		animation: "trendy",
		directionNav: true,
		animationLoop: true,
		controlNav: false,
		slideToStart: 1,
		slideshow: true,
		animationDuration: 300,
		start: function(){
			 $('#trendy').animate({opacity: 1}, 750);
		},
	});
	$('#best_selling').flexslider({
		animation: "best_selling",
		directionNav: true,
		animationLoop: true,
		controlNav: false,
		slideToStart: 1,
		slideshow: true,
		animationDuration: 300,
		start: function(){
			 $('#best_selling').animate({opacity: 1}, 750);
		},
	});
	$('#season').flexslider({
		animation: "slide",
		directionNav: true,
		animationLoop: true,
		controlNav: false,
		slideToStart: 1,
		slideshow: true,
		animationDuration: 300,
		start: function(){
			$('#season').animate({opacity: 1}, 750);
		},
	});
});