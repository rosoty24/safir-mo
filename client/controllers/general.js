    Template.registerHelper('getImgForProduct', function (id_product) {
        var p=products.findOne({_id:id_product});
        if(p.image instanceof Array){
            var id= p.image[0];
        }           
        else{
            var id= p.image;
        }

    if(id=='' || typeof id == "undefined")
        return '/img/unknown.png';

    else if(id.indexOf("uploads")>-1){
        id=id.replace(/ /g, "%20");
        console.log("id img 1---" + id);
        path = id.replace('/uploads/images/','');
        return 'http://d1ak0tqynavn2m.cloudfront.net/'+path;

    }
    else if(id.indexOf("http://")>-1){
        return id;

    }else{
        var img = images.findOne({_id:id});
        if(img){
            var id= img.copies.images.key;
            console.log("id img 2---" + id);
            //path = id.replace('images/','');
            //return 'http://d1ak0tqynavn2m.cloudfront.net/'+path;
            path=id.replace('UserUploads/','');
            console.log("path "+path);
            return 'http://d2l5w8pvs4gpu2.cloudfront.net/'+path;
        }else{
            return;
        } 
    }

    });

    //For user upload img
    Template.registerHelper('getImg', function (id) {
        if(id=='' || typeof id == "undefined")
            return '/img/unknown.png';

        else if(id.indexOf("uploads")>-1){
            id=id.replace(/ /g, "%20");
            console.log('repaclement===='+id);
            path = id.replace('/uploads/images/','');
            return 'http://d1ak0tqynavn2m.cloudfront.net/'+path;
            //return id;
        }
        else if(id.indexOf("http://")>-1 || id.indexOf("https://")>-1 ){
            return id;

        }else{
            var img = images.findOne({_id:id});
            if(img){
                var id= img.copies.images.key;
                console.log("id img---" + id);
                path=id.replace('UserUploads/','');
                console.log("path "+path);
                return 'http://d2l5w8pvs4gpu2.cloudfront.net/'+path;
            }else{
                return;
            } 
        }

    });

    Template.registerHelper('trimString', function(passedString) {
        var theString = passedString.substring(0,110);
        return new Handlebars.SafeString(theString)
    });

    Template.registerHelper('getDate', function (curdate) {
        var d = new Date(curdate);
        var str=d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
        return str;
    }); 

    Template.registerHelper('recap', function (text) {
        return text.split(" ").splice(0,3).join(" ");
    }); 

    Template.registerHelper('getTotal', function (text) {
        return Session.get("total");
    }); 

    Template.registerHelper('getProductInfo', function (item_id) {
        var cartItem=cart.findOne({"_id":item_id});
        var pro=products.findOne({"_id":cartItem.id_product});
        var shop = cartItem.shop; //shops.findOne({"_id":cartItem.shop});
       // console.log('TESTING CART' +pro.title);  
        return {_id:item_id,product:pro, qty:cartItem.quantity, subtotal:cartItem.subtotal, item_id:item_id,shop:shop};
    }); 

    Template.registerHelper('getCart', function (curdate) {
        var mycart = '';

        userid = Session.get('userId');
        mycart = cart.find({userId:userid});
      //  console.log('cart id='+userid);
        var total = 0;

        mycart.forEach( function(value,index){
            total = total + value.subtotal;
        })
        Session.set("total", total);
       // console.log('TOTAL'+total);
        return mycart;
    }); 

    var clock = 100;

    var timeLeft = function() {
        if (clock > 0) {
            clock--;
            Session.set("time", clock);
    // return console.log(clock);
    } else {
       // console.log("That's All Folks");
        return Meteor.clearInterval(interval);
    }
    };

    var interval = Meteor.setInterval(timeLeft, 1000);

    Template.registerHelper("time", function() {
        return Session.get("time");
    });


    Template.registerHelper("getFirstImgContent",function(id){
        var p=contents.findOne({_id:id});
        if(p.image instanceof Array)
            return p.image[0];
        else
            return p.image;
    });

    Template.registerHelper("getFirstImgProduct",function(id){
        var p=products.findOne({_id:id});
        if(p.image instanceof Array)
            return p.image[0];
        else
            return p.image;
    });

    Template.registerHelper("validProduct",function(img,price){
        if(typeof price === "undefined" || price=="" || typeof img === "undefined" || img=="")
            return false;
        else
            return true;
    });

    Template.registerHelper("getDirection",function(img,price){
        if(TAPi18n.getLanguage()=='fa')
            return 'rtl';
        else
            return 'ltr'
    });

    Template.registerHelper("getCurrentLanguage",function(img,price){
        if(TAPi18n.getLanguage()=='fa')
            return 'fa-IR';
        else
            return 'en'
    });

    Template.registerHelper("getDirectionMenu",function(img,price){
        if(TAPi18n.getLanguage()=='fa')
            return 'navbar-right';
        else
            return 'navbar-left'
    });

Template.registerHelper("classCom",function(img,price){
    if(TAPi18n.getLanguage()=='fa')
        return 'megamenu_left';
    else
        return 'megamenu_right'
    });

Template.registerHelper("classItem",function(img,price){
    if(TAPi18n.getLanguage()=='fa')
        return 'megamenu_right';
    else
        return 'megamenu_left'
    });
Template.registerHelper("backCom",function(img,price){
    if(TAPi18n.getLanguage()=='fa')
        return 'background:url(/images/bg_nav1.png)';
    else
        return 'background:url(/images/bg_nav_right.png)'
    });


Template.registerHelper("smaller",function(text,size){
    var finalText='';
        var line=text.split(' ');
        if(line.length<size)
            var wordmax=line.length;
        else
            wordmax=size;
        for(var i=0;i<wordmax;i++){
            finalText=finalText+line[i]+' ';
        }
        return finalText;
    });

    Template.registerHelper("slug",function(){
        var title = this.title;
        title = title.replace(/\-/g,"(minus)");
        title = title.replace(/\s/g,"-");
        title = title.replace(/\%/g,"(percentag)");
        title = title.replace(/\+/g,"(plush)");
        title = title.replace(/\ô/g,"(ocir)");
        title = title.replace(/\®/g,"(copyright)");
        title = title.replace(/\°/g,"(number)");
        title = title.replace(/\Ô/g,"(bigocir)");
        title = title.replace(/\²/g,"(square)");
        title = title.replace(/\`/g,"(accentaigu)");
        title = title.replace(/\é/g,"(eaccentaigu)");
        title = title.replace(/\É/g,"(bigeaccentaigu)");
        title = title.replace(/\&/g,"(and)");
        title = title.replace(/\//g,"(slash)");
        title = title.replace(/\’/g,"(apostrophe)");
        title = title.replace(/\'/g,"(quote)");
        title = title.replace(/\!/g,"(warning)");
        title = title.replace(/\?/g,"(question)");
        title = title.replace(/\$/g,"(dolla)");
        title = title.replace(/\è/g,"(eaccentgrave)");
        title = title.replace(/\–/g,"(hyphen)");
        title = title.toLowerCase();
        return title;
    });
    Template.registerHelper("unSlug",function(){
        var title = this.title;
        title = title.replace(/\-/g," ");
        title = title.replace(/\(percentag\)/g,"%");
        title = title.replace(/\(plush\)/g,"+");
        title = title.replace(/\(ocir\)/g,"ô");
        title = title.replace(/\(minus\)/g,"-");
        title = title.replace(/\(copyright\)/g,"®");
        title = title.replace(/\(number\)/g,"°");
        title = title.replace(/\(bigocir\)/g,"Ô");
        title = title.replace(/\(square\)/g,"²");
        title = title.replace(/\(accentaigu\)/g,"`");
        title = title.replace(/\(eaccentaigu\)/g,"é");
        title = title.replace(/\(bigeaccentaigu\)/g,"É");
        title = title.replace(/\(and\)/g,"&");
        title = title.replace(/\(slash\)/g,"/");
        title = title.replace(/\(apostrophe\)/g,"’");
        title = title.replace(/\(quote\)/g,"'");
        title = title.replace(/\(warning\)/g,"!");
        title = title.replace(/\(question\)/g,"?");
        title = title.replace(/\(dolla\)/g,"$");
        title = title.replace(/\(eaccentgrave\)/g,"è");
        title = title.replace(/\(hyphen\)/g,"–");
        return title;
    });
    // Template.registerHelper("slug",function(){
    //     return slugify(this.title);
    // });

    Template.registerHelper("slugProduct",function(){
        var title=this.title;
       // console.log("SLUG="+title);
        title=title.toLowerCase();
        title=title.replace(/ /g, "-");
        title=title.replace(/\+/g, "(plus)");
        title=title.replace(/ô/g, "(o-cir)");
        return title;
    });

   // Template.registerHelper("getMenuClass",function(index){

Template.registerHelper("getMenuClass",function(index){
    if(TAPi18n.getLanguage()=='fa')
        return 'dropdown_fullwidth';
        if(index==1)
            return 'dropdown_fullwidth';
        index=Number(index);
        var newIndex=12-(1*index);
        var str='dropdown_'+newIndex+'columns dropdown_container'
        return str;
    });
Template.registerHelper("convertMsTimeStamp", function(tms) {
         var d = new Date(tms), // Convert the passed timestamp to milliseconds
           yyyy = d.getFullYear(),
           mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
           dd = ('0' + d.getDate()).slice(-2),   // Add leading 0.
           hh = d.getHours(),
           h = hh,
           min = ('0' + d.getMinutes()).slice(-2),  // Add leading 0.
           ampm = 'AM',
           hTime;
            
          if (hh > 12) {
           h = hh - 12;
           ampm = 'PM';
          } else if (hh === 12) {
           h = 12;
           ampm = 'PM';
          } else if (hh == 0) {
           h = 12;
          } 
          // ie: 2013-02-18, 8:35 AM 
           hTime = yyyy + '/' + mm + '/' + dd + ', ' + h + ':' + min + ' ' + ampm;
        return hTime;
    });
// ==========makara=======================
Template.registerHelper("getReviewBySort", function(review) {
    var result=review.sort(function(x, y){
    return y.date - x.date;
    })
    return result;
});
//======end makara==============================

Template.registerHelper("capitalWord", function(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
});