Template.emailForm.events({
  'submit': function (event) {
    var name = event.target.name.value;
    var subject = event.target.subject.value;
    var body = event.target.body.value;
    var id = event.target.id.value;

    Meteor.call('addOrUpdateEmail', {
      _id: id,
      name: name, 
      subject: subject, 
      body: body
    });

    Router.go(Constants.Routes.EMAILS);

    return false;
  }
});