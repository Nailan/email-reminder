Template.emailForm.events({
  'submit': function (event) {
    var name = event.target.name.value;
    var subject = event.target.subject.value;
    var body = event.target.body.value;

    Meteor.call('addOrUpdateEmail', {
      name: name, 
      subject: subject, 
      body: body
    });

    $('.email-form-input').val("");

    return false;
  }
});