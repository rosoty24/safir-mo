ServiceConfiguration.configurations.remove({
	service: 'twitter'
});
ServiceConfiguration.configurations.insert({
	service: "twitter",
	consumerKey: "6G1u7JE3ycr18pqYOMrr5kp28",
	secret: "KfKJvKF3wNuWTRv1FLPMv8mj4QSdt1oMBetlIOL5sjG0mXM5km"
});
 // for facebook login
ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1546488668995009',
    secret: '80b8fda10a3d1c096227016efc487af3'
});
// for google
ServiceConfiguration.configurations.remove({
  service: "google"
});
ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "413876591312-2gq5v1gc5cjua8u2cp989sek2nikkiev.apps.googleusercontent.com",
  secret: "OyJaFYslWNMkPCpOxODDagEI"
});

Meteor.startup(function () {
    // code to run on server at startup
    Accounts.loginServiceConfiguration.remove({
      service: 'instagram'
    });

    Accounts.loginServiceConfiguration.insert({
      service: 'instagram',
      clientId: 'ef3d917d69fe47a88b321bc96674203e',
      secret: 'b387ae32c1994c1cbe54a005dcdeb72f'
    });
  });


