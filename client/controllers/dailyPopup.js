Template.dailyPopup.helpers({
	getMyPopup:function(){
/*		var arr=[];
		var popup = list_product.findOne({title:"popup"}).products;
		alert(popup);
		for(var i=0;i<popup.length;i++){
			var pro = products.findOne({_id:popup[i]});
			alert(popup[i]);
			alert('result:'+JSON.stringify(pro));	
			arr.push(pro);
		}
		alert('products:'+arr);
		return arr;*/
		
		function shuffle(o){
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }
        var myArray=[];
        var resultRandom=[];
       	var result = products.find();
        result.forEach(function(value){
            myArray.push(value);
        });
        var arrayRandom=shuffle(myArray);
        for(var ran=0;ran<4;ran++){
            if(arrayRandom[ran]){
               resultRandom.push(arrayRandom[ran]); 
            }  
        }
        return resultRandom;
		},
		getWebzine:function(){
			var result = contents_type.findOne({type:"Webzine"});
			var contentsresult= contents.find({typeid:result._id},{limit:2});
			return contentsresult;
		},
		getTutocontent:function(){
			var result = contents_type.findOne({type:"Tuto"});
			var contentsresult = contents.find({typeid:result._id},{limit:4});
			return contentsresult;
			
		},
		imagelink:function(image){
			alert(this_id);
		}
});
Template.dailyPopup.events({
	'click #x-close':function(e){
		e.preventDefault();
		Router.go('/profile');
	},
	'click .removegrey':function(e){
		e.preventDefault();
		$('.modal-backdrop.in').hide();
		Router.go('/details/'+this._id);
	},
	'click .linkwebzine':function(e){
		e.preventDefault();
		Router.go('/webzinedetails/'+this._id);
	},
	'click .linktuto':function(e){
		e.preventDefault();
		Router.go('/tutodetails/'+this._id);
	}
});