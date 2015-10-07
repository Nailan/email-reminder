Template.reminderForm.events({
  'submit': function (event) {
    var active = $(event.target.active).is(':checked');
    var name = event.target.name.value;
    var email = event.target.email.value;
    var emailId = email.split(Constants.Util.SEPARATOR)[0];
    var emailName = email.split(Constants.Util.SEPARATOR)[1];
    var to = event.target.to.value;
    var startTime = event.target.startTime.value;
    var startDate = event.target.startDate.value;
    var periodicity = event.target.periodicity.value;
    var id = event.target.id.value;
    var offset = new Date().getTimezoneOffset();

    Meteor.call('addOrUpdateReminder', {
      _id: id,
      active: active,
      name: name, 
      emailName: emailName,
      emailId: emailId, 
      to: to, 
      startTime: startTime, 
      startDate: startDate, 
      periodicity: periodicity,
      offset: offset
    });
    
    Router.go(Constants.Routes.ROOT);
    return false;
  }
});