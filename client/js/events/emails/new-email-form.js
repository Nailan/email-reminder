Template.newEmailForm.events({
  'submit': function (event) {
    var name = event.target.name.value;
    var subject = event.target.subject.value;
    var body = event.target.body.value;

    Meteor.call('addEmail', {
      name: name, 
      subject: subject, 
      body: body
    });

    $('.new-email-form-input').val("");

    return false;
  }
});