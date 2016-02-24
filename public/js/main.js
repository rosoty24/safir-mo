<<<<<<< HEAD
/*$(document).on("scroll", function() {
  if ($(document).scrollTop() > 120) {
    $("nav").addClass("small");
  } else {
    $("nav").removeClass("small");
  };
});*/

/* drop down menu */
// $(function(){
// 	$("li.dropdown").hover( function(){           
// 		$(this).addClass('open');
// 	});
// 	$(".dropdown-menu").mouseleave( function(e){ 
// 		e.preventDefault();       
// 		$("li.dropdown").removeClass('open');
// 		alert("test");
// 	});
// });

/*$(document).ready(function(){
    $("li.dropdown").mouseover( function(){           
       $(this).addClass('open');
    });
    $(".dropdown-full").mouseout( function(e){       
      console.log('closing');
      $('li.dropdown').removeClass('open');
    });
});*/
// Dropdown Menu Fade    
jQuery(document).ready(function(){
    $(".dropdown").hover(
        function() { $('.dropdown-menu', this).stop().fadeIn("fast");
        },
        function() { $('.dropdown-menu', this).stop().fadeOut("fast");
    });
});
=======
/*$(document).on("scroll", function() {
  if ($(document).scrollTop() > 120) {
    $("nav").addClass("small");
  } else {
    $("nav").removeClass("small");
  };
});*/

/* drop down menu */
// $(function(){
// 	$("li.dropdown").hover( function(){           
// 		$(this).addClass('open');
// 	});
// 	$(".dropdown-menu").mouseleave( function(e){ 
// 		e.preventDefault();       
// 		$("li.dropdown").removeClass('open');
// 		alert("test");
// 	});
// });

/*$(document).ready(function(){
    $("li.dropdown").mouseover( function(){           
       $(this).addClass('open');
    });
    $(".dropdown-full").mouseout( function(e){       
      console.log('closing');
      $('li.dropdown').removeClass('open');
    });
});*/
// Dropdown Menu Fade    
jQuery(document).ready(function(){
    $(".dropdown").hover(
        function() { $('.dropdown-menu', this).stop().fadeIn("fast");
        },
        function() { $('.dropdown-menu', this).stop().fadeOut("fast");
    });
});

// quizz

>>>>>>> ee633a3e796ea0ff93f91376f8e787dc9b82f256
