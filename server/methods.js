Meteor.methods({

  processReminders: function() {
    var activeReminders = Reminders.find({active: true}).fetch();
    var emailIds = [];
    for (var i = 0; i < activeReminders.length; i ++) {
      emailIds.push(activeReminders[i].email);
    }
    var emails = Emails.find({'_id': {$in: emailIds}}).fetch();
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
  },

  addEmail: function(email) {
    Emails.insert({
      name: email.name,
      subject: email.subject,
      body: email.body
    });
  },

  deleteEmail: function(emailId) {
    Emails.remove(emailId);
  }
});