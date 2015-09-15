Meteor.methods({

  processReminders: function() {
    var activeReminders = Reminders.find({executed: true}).fetch();
    for (var i = 0; i < activeReminders.length; i ++) {
      var reminder = activeReminders[i];
      if (moment(reminder.nextRun).isBefore(new Date())) {
        if (reminder.periodicity == Constants.Periodicity.DAILY) {
          reminder.nextRun = moment(reminder.nextRun).add(1, 'days').toDate();
        }
        if (reminder.periodicity == Constants.Periodicity.WEEKLY) {
          reminder.nextRun = moment(reminder.nextRun).add(1, 'weeks').toDate();
        }
        if (reminder.periodicity == Constants.Periodicity.MONTHLY) {
          reminder.nextRun = moment(reminder.nextRun).add(1, 'months').toDate();
        }
        reminder.executed = false;
        Meteor.call('updateReminder', reminder);
      }
    }
  },

  sendReminderEmails: function() {
    var remindersToSend = Reminders.find({active: true, executed: false, nextRun: {$lt: new Date()}}).fetch();
    for (var i = 0; i < remindersToSend.length; i ++) {
      var reminder = remindersToSend[i];
      var email = Emails.findOne({_id: reminder.email});
      Meteor.call('sendEmail', reminder.to, Meteor.settings.fromEmail, email.subject, email.body );
      reminder.executed = true;
      Meteor.call('updateReminder', reminder);
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
    var startDateTime = moment(reminder.startDate + 'T' + reminder.startTime).toDate();
    Reminders.insert({
      active: reminder.active,
      name: reminder.name, 
      email: reminder.email, 
      to: reminder.to, 
      startDateTime: startDateTime, 
      periodicity: reminder.periodicity,
      executed: false,
      nextRun: startDateTime
    });
  },

  deleteReminder: function(reminderId) {
    Reminders.remove(reminderId);
  },

  switchReminderActivity: function(reminderId, isActive) {
    Reminders.update(reminderId, {$set: {active: !isActive}});
  },

  updateReminder: function(reminder) {
    Reminders.update({_id: reminder._id}, {
      active: reminder.active,
      name: reminder.name, 
      email: reminder.email, 
      to: reminder.to, 
      startDateTime: reminder.startDateTime, 
      periodicity: reminder.periodicity,
      executed: reminder.executed,
      nextRun: reminder.nextRun
    });
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