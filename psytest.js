if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  // See: http://stackoverflow.com/questions/15959501/how-to-add-cors-headers-to-a-meteor-app/19952565#19952565

  // attach connect-style middleware for response header injection
  // OrionJS GitHub issue: https://github.com/orionjs/orion/issues/205
  var connectHandlers = WebApp.connectHandlers; // get meteor-core's connect-implementation
  Meteor.startup(function () {
    console.log("connectHandlers", connectHandlers);
    connectHandlers.use(function (req, res, next) {
      res.setHeader('Strict-Transport-Security', 'max-age=2592000; includeSubDomains'); // 2592000s / 30 days
      res.setHeader('Access-Control-Allow-Origin', '*');
      return next();
    });
  });
}
