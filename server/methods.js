Meteor.methods({

  processReminders: function() {
    var activeReminders = Reminders.find({active: true});
    for (var i = 0; i < activeReminders.length; i ++) {
      var reminder= activeReminders[i];
      // TODO: send emails
    }
  },

  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  },

  addReminder: function(reminder) {
    Reminders.insert({
      active: reminder.active,
      name: reminder.name, 
      email: reminder.email, 
      to: reminder.to, 
      startTime: reminder.startTime, 
      startDate: reminder.startDate, 
      periodicity: reminder.periodicity
    });
  },

  deleteReminder: function(reminderId) {
    Reminders.remove(reminderId);
  },

  switchReminderActivity: function(reminderId, isActive) {
    Reminders.update(reminderId, {$set: {active: !isActive}});
  }
});