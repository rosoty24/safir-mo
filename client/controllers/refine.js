Session.set('currentLetter',"A");
/*
if(Session.get('advanced_price_min')=='undefined')
	Session.set('advanced_price_min',0);
if(Session.get('advanced_price_max')=='undefined')
	Session.set('advanced_price_max',100000);
if(Session.set('advanced_tagss')=='undefined')
	Session.set('advanced_tagss','');
if(Session.set('advanced_brand')=='undefined')
	Session.set('advanced_brand','');
if(Session.set('advanced_has_comment')='undefined')
	Session.set('advanced_has_comment',0);
if(Session.set('advanced_is_favorite')=='undefined')
	Session.set('advanced_is_favorite',0);
*/
Session.setDefault('advanced_price_min',0);
Session.setDefault('advanced_price_max',100000000);
Session.setDefault('advanced_tags','');
Session.setDefault('advanced_brand','');
Session.setDefault('advanced_has_comment',0);
Session.setDefault('advanced_is_favorite',0);
Session.setDefault('currentCategory','');
Session.setDefault('parentTagId','');
Session.setDefault('click','');
Template.myrefine.events({
	'click #refine_price_range': function(e,tpl){
			$("#panel_price").slideToggle("slow");
			//$('#sl2').slider(); 
		},
		'click #refineBrand': function(e,tpl){
			console.log('changing');
			$(".refine-item").addClass('tohide');
			$(".refine-item").removeClass('toshow');
			$("#brands").removeClass('tohide');
			$("#brands").addClass('toshow');
			
		},
		'click #refinetag': function(e,tpl){
			console.log('changing');
			$(".refine-item").addClass('tohide');
			$(".refine-item").removeClass('toshow');
			$("#parentTag").removeClass('tohide');
			$("#parentTag").addClass('toshow');
			
		},
		'click #refineRating': function(e,tpl){
			console.log('changing');
			$(".refine-item").addClass('tohide');
			$(".refine-item").removeClass('toshow');
			$("#rating").removeClass('tohide');
			$("#rating").addClass('toshow');
		},
		'click #refinePrix': function(e,tpl){
			console.log('changing');
			$(".refine-item").addClass('tohide');
			$(".refine-item").removeClass('toshow');
			$(".price-range").removeClass('tohide');
			$(".price-range").addClass('toshow');
			if(Session.get('click')==''){
				$(".slider.slider-horizontal .slider-tick-label-container .slider-tick-label").css('margin-left','35px');
				Session.set('click',true);
			}
			

			Router.go('advanced');
		},
		'click .alphabet': function(e,tpl){
			e.preventDefault();
			Session.set('limit', -1);
			var value=$(e.currentTarget).text();

			console.log('selected value:'+value);
			letter=value.toUpperCase();
			var myBrands=[];

			var liste=products.find().fetch();
			console.log("Processing2:"+liste.length);
			for(var i=0;i<liste.length;i++){
				if(liste[i].hasOwnProperty('Brand')){
					//console.log('Brand:'+liste[i].Brand);
					var first=liste[i].Brand;
					//console.log('first:'+first);
					//console.log(first.substr(0,1)+' = '+letter+' ???');
					if(first!='' && first.toUpperCase().substr(0,1)==letter && myBrands.indexOf(first)==-1)
						myBrands.push(first);
				}
			
			}
			tpl.$("#allBrands").html("");
			console.log('myBrands='+myBrands);
			for(var i=0;i<myBrands.length;i++)
				tpl.$("#allBrands").append('<li><a href="/listproducts/'+myBrands[i]+'" class="targetBrand">'+myBrands[i]+'</a></li>');
		
		},
		'click #tagrefine':function(e,tpl){
			e.preventDefault();
			Session.set('advanced_tagss',this._id);
			Router.go('/advanced');
			
		},
		'click #parentTags':function(e){
			e.preventDefault();
			Session.set('parentTagId',this._id);
		},
		'click .targetBrand': function(e,tpl){
			e.preventDefault();
			var brand=$(e.currentTarget).text();

			var oldValue=Session.get('advanced_brand');
			var newVal=oldValue+''+brand+';';


			Session.set('advanced_brand',newVal);
			console.log('Liste Brand= '+Session.get('advanced_brand'));

			//$("#refineitem").append('<li><a href="" class="border-dashed">'+brand+' <span class="fa fa-times removeRefineItemBrand" ></span></a></li>');
			Router.go('advanced');advanced_tags
			//Router.go('listproducts',{'brand':brand});
		},
		'click .targetTag': function(e,tpl){
			e.preventDefault();
			var tag=$(e.currentTarget).text();

			var oldValue=Session.get('advanced_tags');
			var newVal=oldValue+''+tag+';';

			Session.set('advanced_tags',newVal);
			console.log('Liste Brand= '+Session.get('advanced_tags'));

			//$("#refineitem").append('<li><a href="" class="border-dashed">'+brand+' <span class="fa fa-times removeRefineItemBrand" ></span></a></li>');
			Router.go('advanced');
			//Router.go('listproducts',{'brand':brand});
		},
		'click .removeRefineItemBrand': function(e,tpl){
			e.preventDefault();
			var brand=$(e.currentTarget).parent().text();
			brand=brand.substr(0,brand.length-1);
			console.log('Deleting '+brand);
			var oldValue=Session.get('advanced_brand');

			var toDelete=brand+';';
			console.log('Brand to delete:'+toDelete);
			var newVal=oldValue.replace(toDelete,'');
			Session.set('advanced_brand',newVal);
			$(e.currentTarget).parent().parent().remove();
			Router.go('advanced');

		},
		'click .removeRefineItemTag': function(e,tpl){
			e.preventDefault();
			var tags=$(e.currentTarget).parent().text();
			tags=tags.substr(0,tags.length-1);
			//console.log('Deleting '+brand);
			var oldValue=Session.get('advanced_tags');

			var toDelete=tags+';';
			console.log('Brand to delete:'+toDelete);
			var newVal=oldValue.replace(toDelete,'');
			Session.set('advanced_tags',newVal);
			$(e.currentTarget).parent().parent().remove();
			Router.go('advanced');

		},
		'click .removeRefineItemPrice':function(e,tpl){
			e.preventDefault();
			$(e.currentTarget).parent().parent().remove();

			Session.set('advanced_price_min',0);
			Session.set('advanced_price_max',100000000);
		}


});

Template.myrefine.helpers({
	getParentTag:function(){
		var result=parent_tags.find({"category_id":Session.get('refineCateId')});
		Session.set('getrresultparenttag',result.count());
		return result;
	},
	getNoParenttag:function(){
		if(Session.get('getrresultparenttag')<1) return true;
		else return false;
	},
	getListTag:function(){
		if(Session.get('parentTagId')!=='')
			return tags.find({"parent":Session.get('parentTagId')});			
	},
	getPriceFilter: function(){
		var min=Session.get('advanced_price_min');
		var max=Session.get('advanced_price_max');
		return {min:min,max:max};
	},
	getAllFilter: function(){
		var allFilter=Session.get('advanced_brand').split(';');
		var res=[];
		for(var i=0;i<allFilter.length;i++)
			if(allFilter[i]!='')
				res.push(allFilter[i]);
		return res;
	},
	getAllTag: function(){
		var allFilter=Session.get('advanced_tags').split(';');
		var res=[];
		for(var i=0;i<allFilter.length;i++)
			if(allFilter[i]!='')
				res.push(allFilter[i]);
		return res;
	},
	isBrand: function(letter){
		letter=letter.toUpperCase();
		var found=false;
		var liste=products.find().fetch();
		for(var i=0;i<liste.length;i++){
			if(liste[i].hasOwnProperty('Brand')){
					var first=liste[i].Brand.toUpperCase().substr(0,1);
					if(first==letter)
						found=true;
			}
			
		}
		console.log('letter:'+letter+'= '+found);
		return found;
	},
	listBrand: function(letter){
		console.log("Processing "+letter);
		letter=letter.toUpperCase();
		var myBrands=[];
		var liste=products.find().fetch();
		//console.log("Processing2:"+liste.length);
		for(var i=0;i<liste.length;i++){
			if(liste[i].hasOwnProperty('Brand')){
				//console.log('Brand:'+liste[i].Brand);
				var first=liste[i].Brand.toUpperCase();
				//console.log(first.substr(0,1)+' = '+letter+' ???');
				if(first.substr(0,1)==letter && myBrands.indexOf(first)==-1)
					myBrands.push(first);
			}
			
		}

		console.log('myBrands='+myBrands);
		return myBrands;
	},
	categories: function(){
		var route=Router.current().route.getName();
		var currentCategory;
		if(route=='details'){
			console.log('Entering details page');
			var productId=Router.current().params.id;
			var product=products.findOne({"_id":productId});
			currentCategory=product.category;
		}else if(route=='listing'){
			//console.log('Entering category page');
			currentCategory=Router.current().params.id;
		}
		else{
			console.log('Entering any page');
			return;
		}

		//console.log("currentCat="+currentCategory);
		var listCategories=[];
		var obj=categories.findOne({"_id":currentCategory});
		while(obj!= null && obj.parent!="0"){
			listCategories.push(obj);
			currentCategory=obj.parent;
			obj=categories.findOne({"_id":currentCategory});
		}
		listCategories.push(obj);

		var res=[];
		for(var i=listCategories.length-1;i>=0;i--)
			res.push(listCategories[i]);

		//console.log('route:'+route);
		//console.log('pyramide:'+res.length);
		//console.log(JSON.stringify(res));
		return res;
	},
	currentLetter: function(){
		return Session.get('currentLetter');
	}
});

Template.myrefine.onRendered(function(){
	// $('#sl2').slider(); 
	// $('#sl2').slider().on('slideStop', function(ev){
	//     console.log('sliderstop');
	//     var min=Number($(".tooltip-inner").text().split(':')[0].replace(' ',''));//$("#sl2").data('slider-min');
	//     var max=Number($(".tooltip-inner").text().split(':')[1].replace(' ',''));//$("#sl2").data('slider-max');
	// 	console.log('valuePrice='+min+'-'+max);
	// 	Session.set('advanced_price_max',max);
	// 	Session.set('advanced_price_min',min);
	// 	Router.go('/advanced');
	// 	/*var interval=min+'-'+max;
	// 	$(".removeRefineItemPrice").parent().parent().remove();
	// 	$("#refineitem").append('<li><a href="" class="border-dashed">'+interval+' <span class="fa fa-times removeRefineItemPrice" ></span></a></li>');
	// */
	// });
	//$('#makara').slider(); 
	$('#makara').on('slideStop', function(ev){
		$(".slider.slider-horizontal .slider-tick-label-container .slider-tick-label").css('margin-left','0px');
	    console.log('sliderstop');
	    var slide=Number($(".tooltip-inner").text().split(':')[0].replace(' ',''));//$("#sl2").data('slider-min');
	    //var max=Number($(".tooltip-inner").text().split(':')[1].replace(' ',''));//$("#sl2").data('slider-max');
		//console.log('valuePrice='+min+'-'+max);
		Session.set('advanced_price_max',slide);
		Session.set('advanced_price_min',0);
		Router.go('/advanced');
		/*var interval=min+'-'+max;
		$(".removeRefineItemPrice").parent().parent().remove();
		$("#refineitem").append('<li><a href="" class="border-dashed">'+interval+' <span class="fa fa-times removeRefineItemPrice" ></span></a></li>');
	*/
	});
	var currenturl = window.location.href;
	if(currenturl.indexOf("category")== -1){
		Session.set('advanced_brand','');
        Session.set('advanced_tags','');
        Session.set('advanced_price_max',100000000);
        Session.set('parentTagId','');
	}
	
	
});