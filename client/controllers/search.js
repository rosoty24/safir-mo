
Session.set('querylimitsearch',16);
var processScroll = true;
$(window).scroll(function() {
    if (processScroll  && $(window).scrollTop() > $(document).height() - $(window).height() - 100) {
        processScroll = false;
        // your functionality here
        //alert("Welcome scroll");
            var oldLimit=Session.get('querylimitsearch');
            oldLimit+=16;
            Session.set('querylimitsearch',oldLimit);
        processScroll = true;
    }
});
Session.set('keyword', "");
Session.set('groupsearch', "");
Session.set("searchall","");
Template.headermenu.events({
'click .kesearch': function(e){
        e.preventDefault();
        //alert('ok');
        var Search = $(".input-search").val();
         //alert(Search);
        if(Search =='')
            console.log("Please fill in search box!");
        else{
            var key = $(".input-search").val();
        var groupid = $("#group-text").attr("data-selected");
        Session.set('keyword', key);
        Session.set('groupsearch', groupid);
        if(Session.get('groupsearch')=='')
            Session.set('groupsearch', 10);
        Router.go('/searchproduct/' +Search);
        $('#textToSearch').val('');
    }
},
'click .searchselection': function(e,tpl){
    var id=$(e.currentTarget).attr("data-group");
    Session.set('groupsearch', id);
    console.log('searching: '+id);
       //alert('hoop');
   },
    // 'keyup #textToSearch':function(e){

    //     //var Search = $(".input-search").val();
    //     var code = e.keyCode || e.which;
    //      if(code == 13) { //Enter keycode
    //         //e.preventDefault();
    //        alert();
    //      }
    // },
    'click .search-group': function(e,tmp){
        var group_text = $(e.currentTarget).html();
        var group_value = $(e.currentTarget).attr('data-group');
        $("#group-text").html( group_text );
        $("#group-text").attr("data-selected",group_value);
        $(".box-inner").toggle();
    }
});

Template.search.events({
    // 'click .tag': function(e){
    //     var id=this._id+";";
    //     var position=Session.get('search').indexOf(id);
    //     console.log(position);
    //     if(position<0){
    //         var newVal=Session.get('search')+this._id+";";
    //         Session.set('search',newVal);
    //     }else{
    //         var newVal=Session.get('search').replace(this._id+";","");
    //         Session.set('search',newVal);
    //     }
    //     console.log("Search:"+Session.get('search'));

// Template.headermenu.events({
//     'click .tag': function(e){
//         var id=this._id+";";
//         var position=Session.get('search').indexOf(id);
//         console.log(position);
//         if(position<0){
//             var newVal=Session.get('search')+this._id+";";
//             Session.set('search',newVal);
//         }else{
//             var newVal=Session.get('search').replace(this._id+";","");
//             Session.set('search',newVal);
//         }
//         console.log("Search:"+Session.get('search'));
        
    // },
    'click #favorite':function(e){


     e.preventDefault();
     var id=this._id;
     console.log('id'+Session.get('userId'));
     if(Session.get('userId')){
                 //alert();
                 var obj={
                    proId:id,
                    userId:Session.get('userId')
                }
                Meteor.call('insertFavorite',obj);
                alert('Product successfully append to favorite!');
            }
            else{
                var newId=Random.id();
                Session.setPersistent('userId',newId);
                 //var ses=Session.get('userId');
                 var obj={
                    proId:id,
                    userId:Session.get('userId')
                }

                Meteor.call('insertFavorite',obj);
                //alert('Product successfully added to favorite!');
            }
        }
    });


Template.headermenu.helpers({
    parentTag: function(category){
        return parent_tags.find({"category_id":category});
    },
    tags: function(parent){
        return tags.find({parent:parent});
    },
    search: function(){
        return Session.get('search');
    },
    refine: function(){
        return Session.get('refine');
    },
    rating: function(){
        return Session.get('rating');
    }
    ,
    filter: function(list,search, refine, rating){
        console.log('list:'+list);
        console.log('search:'+search);
        console.log('rating:'+rating);
        console.log("rating.length: "+rating.length);
        var ids=list.split(";");
        var result;
        console.log("Refine: "+refine);
        if( refine.length > 0 || rating!=""){
            var min = parseInt(refine[0]);
            var max = parseInt(refine[1]);
            console.log("Min: "+min+"  /  Max:"+max);
            //console.log(rating);
            
            console.log("refine.length: "+refine.length);

            if(rating !="" && refine.length <= 0){
                rating = parseInt(rating);
                result = products.find({"review.grade":rating,'title': {'$regex': search}});
                console.log("size1:"+result.fetch().length);
            }   
            else if(refine.length > 0 && rating=="") {
                result = products.find({"price" : {$gte:min, $lte:max},'title': {'$regex': search}});
                console.log("size2:"+result.fetch().length);
            }
            else{
                rating = parseInt(rating);
                result = products.find({"review.grade":rating,"price" : {$gte:min, $lte:max},'title': {'$regex': search}});
                console.log("size3:"+result.fetch().length);
            }

        }
        //else if( refine.length > 0 )
        else{
            if(list ==""){
                result= products.find({'title': {'$regex': search}});
                console.log("size4:"+result.fetch().length);
            }else{
                result= products.find({"tags":{$in: ids},'title': {'$regex': search}});
                console.log("size5:"+result.fetch().length);
            }
            
            
        }


        //console.log(result.fetch()[0]);
        return result;
    }
});

/*Kis Search Product*/

Template.searchproduct.rendered=function(){
    Session.set("MAKEUP", "ALL CATEGORY");
    /*Session.set("MAKEUP", "MAKEUP");
    Session.set("ALLMAKEUP", "ALL MAKEUP");
    Session.set("ALLALLMAKEUP" , "ALL ALL MAKEUP");*/
   /* $("#makeup").html(Session.get("MAKEUP"));
    $("#all_makeup").html(Session.get("ALLMAKEUP"));
    $("#secondChild").html(Session.get("ALLALLMAKEUP"));*/
    $("#makeup").html(Session.get("MAKEUP"));
    $("#all_makeup").html('ALL '+Session.get("parentNAME"));
};


Template.searchproduct.helpers({
    nbproducts: function(){
        return Session.get('nbproducts');
    },
    nbcontents: function(){
        return Session.get('nbcontents');
    },
    displayContent:function(){
        if(Number(Session.get('nbcontents'))>0)
            return true;
        else
            return false;
    },
    displayproduct: function(){
        if(Number(Session.get('nbproducts'))>0)
            return true;
        else
            return false;
    },
    isLiked: function(productId){
        if(Session.get('userId')){
          var ses=Session.get('userId');
          var data=  favorite.find({userId:ses});
          var object=[];
          var obj={};
          var found=false;
          data.forEach(function(entry) {
            var proid=entry.proId;
            if(proid==productId){
                    //console.log(productId+'=>'+proid+ " favorite?");
                    found=true;
                }


            });

          return found;
      }else{
            //console.log(productId+' isNotFavorite');
            return false;
        }

    },
});

Template.headermenu.rendered = function(){
    $(document).ready(function(){
        $(".slide-toggle").click(function(){
            $(".box-inner").toggle();
        });
        $('#textToSearch').keypress(function(e){
            
            var code = e.keyCode || e.which;
             if(code == 13) { //Enter keycode
                //alert('enter');
                e.preventDefault();
                var Search=$('#textToSearch').val();
                if(Search ==''){
                   console.log("Please fill in search box!");
                }else{
                   
                    Session.set('keyword', Search);
                    if(Session.get('groupsearch')=='')
                        Session.set('groupsearch', 10);
                    var url="/searchproduct"+"/"+Search;
                    Router.go(url);
                    $('#textToSearch').val('');
                }
            }
        });
    });

}
// Template.searchproduct.onCreated(function(){
//     $(window).on('scroll', function(e) {
//        if($(window).scrollTop() == $(document).height() - $(window).height()) {
//             var limit=Number(Session.get('querylimitsearch'));
//             limit=limit+16;
//             Session.set('querylimitsearch',limit);
//            //alert("Welcome Rosoty");
//         }
//     });
// });

