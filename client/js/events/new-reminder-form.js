Template.newReminderForm.events({
  'submit': function (event) {
    var active = event.target.active.value == "on";
    var name = event.target.name.value;
    var email = event.target.email.value;
    var to = event.target.to.value;
    var startTime = event.target.startTime.value;
    var startDate = event.target.startDate.value;
    var periodicity = event.target.periodicity.value;

    Reminders.insert({
      active: active,
      name: name, 
      email: email, 
      to: to, 
      startTime: startTime, 
      startDate: startDate, 
      periodicity: periodicity
    });

    $('.new-reminder-form-input').val("").removeAttr("checked");

    return false;
  }
});