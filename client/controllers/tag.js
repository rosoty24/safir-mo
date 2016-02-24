//tags CRUD
Session.set('tag_msg','');
Session.set('ADDIMAGEID','');
Session.set('tagValidation', "");
Session.setDefault('selectedCategoryTag','');

function attrDept( id = 0){
	var multi_level_attr =  "";
	var attr = parent_tags.find( {category_id:Session.get('selectedCategoryTag'),_id:{$ne:id}});
	console.log('attrDep: '+id);
	console.log('cat:'+Session.get('selectedCategoryTag'));
	console.log('count: '+attr.count());
	if( attr ){

		var dep = 0;
		attr.forEach( function(val, index){
			
			
				
					multi_level_attr += '<option value="'+val._id+'">&mdash; '+ val.title+'</option>';
					
				
			
			
		});
		return multi_level_attr;
	}
}
function catDept(){
	var multi_level =  "";
	var attr = categories.find({parent:" "});
	if( attr ){
		var dep = 0;
		attr.forEach( function(val, index){
			
			multi_level += '<option value="'+val._id+'">'+val.title+'</option>';
			var attr =  categories.find({parent:val._id});
			if(attr){
				attr.forEach( function(val, index){
					multi_level += '<option value="'+val._id+'">&mdash;'+ val.title+'</option>';
					var attr =  categories.find({parent:val._id});
					if(attr){
						attr.forEach( function(val, index){
							multi_level += '<option value="'+val._id+'">&mdash;'+ val.title+'</option>';
						})
					}
				})
			}
	
		})
		return multi_level;
	}
}
Template.managetag.events({
    'submit form':function(e){
        e.preventDefault();
        var parent = e.target.selectParent.value;
		var categoryId = e.target.selectCategory.value;
        var value=e.target.value.value;
        //var image =$('#image').val();
        //var img_id = Session.get('ADDIMAGEID');
		var error = "";
         if( value == '' ||  categoryId == ''){
			 if( value == '' )
				error += '<p>tags name is require.</p>';
			if( categoryId == '' )
				error += '<p>Category is require.</p>';
			msg = {status:false,data:error};
		}else{
			msg = {status:true,data:'Successfully added.'}
			var obj={
				title:value,
				parent:parent,
				categoryId:categoryId
			}
			//var id = tags.insert(obj);
			Meteor.call('insertTag',obj);
			e.target.name.value='';
			e.target.value.value='';
		}
		//Session.set('tagValidation', msg);
    },
	'click #bnt_delete':function(e){
        e.preventDefault();
        var result=confirm('Do you want to delete?');
        //alert(id);
        if(result){
            Meteor.call('removeTag',this._id);
            
        }
    },
    'change #selectCategory' : function(e,tpl){
    	var catId=$("#selectCategory").val();
    	//alert("selected: "+catId);
    	Session.set('selectedCategoryTag',catId);

    }
})
Template.managetag.helpers({
    datashow:function(){
        return tags.find();
    },
    getImage: function(id){
		var img = images.findOne({_id:id});
		console.log(img);
		
		if(img){
			console.log(img.copies.images.key);
			return img.copies.images.key;
		}else{
			return;
		}
    },
    getparent:function(){
    	if(Session.get('selectedCategoryTag')=='')
			return parent_tags.find();
		else
			return parent_tags.find({"category_id":Session.get('selectedCategoryTag')});
    },
	getParentTagName:function(id){
        return parent_tags.findOne({_id:id}).title;
    },
	getCategory:function(){
        var data = catDept( );
		console.log(data);
		return data;
	},
	getCateName:function(id){
		return categories.findOne({_id:id}).title;
	},
	
});
//Delete tags

Template.edittag.events({
   'submit form':function(e){
        e.preventDefault();
        var parent = e.target.selectParent.value;
		var categoryId = e.target.selectCategory.value;
        var value=e.target.value.value;
        //var image =$('#image').val();
        //var img_id = Session.get('ADDIMAGEID');
		var error = "";
         if( value == '' ||  categoryId == ''){
			 if( value == '' )
				error += '<p>tags name is require.</p>';
			if( categoryId == '' )
				error += '<p>Category is require.</p>';
			msg = {status:false,data:error};
			Session.set('tagValidation', msg);
		}else{
			msg = {status:true,data:'Successfully updated.'}
			var obj={
				title:value,
				parent:parent,
				categoryId:categoryId
			}
			Meteor.call('updateTag',this._id,obj);
			e.target.name.value='';
			e.target.value.value='';
			Router.go('/managetag');
		}
		
    }
});
Template.edittag.helpers({
	getparentTagName:function(id){
		
		return parent_tags.findOne({_id:id}).title;
    },
	getParentTag:function(parentId){
        return parent_tags.find();
    },
	getCategory:function(){
        var data = catDept( );
		console.log(data);
		return data;
	},
	getCategoryName:function(id){
		return categories.findOne({_id:id}).title;
	}
	
});

//===================parenttag==============
Template.manageparenttag.helpers({
    
	
	getCategory:function(){
  //       var data = catDept( );
		// console.log(data);
		return categories.find();
	},
	parentTags:function(){

		return parent_tags.find();
	},
	catName:function(id){
		return categories.findOne({_id:id}).title;
	}
	
	
});
Template.manageparenttag.events({
	'submit form':function(e){
		e.preventDefault();
		var obj={
			title:e.target.title.value,
			category_id:e.target.cate.value
		}
		Meteor.call('insertParentTag',obj);
	},
	'click #remove':function(){
		var id=this._id;
		parent_tags.remove({_id:id});
	}
})
Template.updateparenttag.helpers({
	getCatName:function(id){
		return categories.findOne({_id:id}).title;
	},
	getCat:function(){
		return categories.find();
	}
})
Template.updateparenttag.events({
	'submit form':function(e){
		alert(e.target.cate.value);
		e.preventDefault();
		var obj={
			title:e.target.title.value,
			category:e.target.cate.value
		}
		Meteor.call('updateparenttag',this._id,obj);
		Router.go('/manageparenttag');
	}
})