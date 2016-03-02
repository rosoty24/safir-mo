var IR_BeforeHooks = {
    isAdmin: function(pause) {
      console.log('djib hook');   
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'],'mygroup')) {
          this.render('login');
          pause();
        }else{
          this.next();
        }
    },
    isAdminOrMember:function(pause){
      if (!Roles.userIsInRole(Meteor.userId(), ['admin','member'],'mygroup')) {
          this.render('login');
          pause();
      }else{
          this.next();
      }
    },
    checkoutNotLogin:function(pause){
      if (!Roles.userIsInRole(Meteor.userId(), ['admin','member'],'mygroup')) {
          this.render('login');
          pause();
      }else{
          //Session.set("THELASTPAGE",'checkout');
          this.next();
      }
    },
    trackingRouter:function(){
     if(Meteor.isClient){
      if(Meteor.userId()!=null)
        userId=Meteor.userId();
      else
        userId=Session.get('userId');
      var time = Date.now();
      var currenturl = window.location.href;
      //alert(currentPage);
      Meteor.call('trackingRouter',userId,time,currenturl);
     }
        
    },
    MySubscription:function(){
      console.log('subscribing');
      if(Meteor.isClient){
        //Session.set('users_to_subsribe',[this.userId]);
        this.subscribe("users",[this.userId]);
        this.next();
      }
    }
};

var routerNameAdmin=[
  'addproduct',
  'banner',
  'manageproduct',
  'updateproduct',
  'addcategory',
  'managecategory',
  'updatecategory',
  'manageshop',
  'updateshop',
  'manageparenttag',
  'updateparenttag',
  'managetag',
  'edittag',
  'addContent',
  'updatecontent',
  'managecontent',
  'parentattr',
  'editparentattr',
  'attribute',
  'editattr',
  'addlistproduct',
  'updatelistproduct',
  'linkselling',
  'addlist',
  'listTranslate',
  'mousetracking',
  'manageUserTracking',
  'stock',
  'proDiscount',
  'manageDiscount',
  'updateProDiscount',
  'manageCollect',
  'updateCollect'

];
var routerNameMember=[
  'profile',
  'editprofile',
  'reward',
  'member',
  'dailyPopup',
  'confirmorder',
  'confirmorder1',
  'confirmorder2',
  'payment',
  'listQuizz'

];
var routerCheckout=['checkout'];
Router.before(IR_BeforeHooks.isAdmin, {only:routerNameAdmin});
Router.before(IR_BeforeHooks.isAdminOrMember, {only:routerNameMember});//for member
Router.onAfterAction(IR_BeforeHooks.trackingRouter);
//Router.onBeforeAction(IR_BeforeHooks.MySubscription);
//Router.onBeforeAction(IR_BeforeHooks.checkoutNotLogin,{only:routerCheckout});


