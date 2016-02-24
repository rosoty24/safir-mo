jQuery(function($) {
        // open a popup window at the center of the screen
        /*function open_popup(url, width, height, scroll) {
            var left = ($(window).width() - width) / 2,
                top = ($(window).height() - height) / 2,
                opts = 'status=1,' + (scroll ? 'scrollbars=1,' : '') + 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;

            window.open(url, "", opts);
        }

        // add the sharing container on the page
        $('<div class="prepbootstrap-sharing-container"></div>')
            .appendTo(document.body)
            .append(
                $('<div class="sharing-item sharing-fb"><div class="sharing-img">COLOR</div></div>').click(function () {
					var html = "";
					html 	+= "<ul>";
						html+= "<li>aa</li>";
						html+= "<li>bb</li>";
					html 	+= "</ul>";
					
					console.log("test");
					$('.sharing-fb').removeClass('sharing-item');
					$('.sharing-fb').addClass('slide');
					$('.sharing-fb').children().html(html);
					selectColor();
					return false;
					
                }),
                $('<div class="sharing-item sharing-gp"><div class="sharing-img"></div></div>').click(function () {
                    
                })
            );*/
		selectColor();
		$( "#foo" ).on( "click",function(){
			$('.sharing-fb').removeClass('slide');
			//$('.sharing-fb').addClass('sharing-item');
		})
    });
	
	function selectColor(){
		$('.sharing-item').click( function(){
			$('.sharing-fb').removeClass('sharing-item');
			$('.sharing-fb').addClass('slide');
			var html = "";
					html 	+= "<ul>";
						html+= "<li>aa</li>";
						html+= "<li>bb</li>";
					html 	+= "</ul>";
			$('.sharing-fb').html(html);	
			$('.slide ul li').each( function(){
				$(this).click( function(){
					console.log( $(this).html());
					$( "#foo" ).trigger( "click" );
					selectColor();
				})
			})
		})
	}