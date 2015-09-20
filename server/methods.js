Meteor.methods({

  processReminders: function() {
    var activeReminders = Reminders.find({executed: true}).fetch();
    for (var i = 0; i < activeReminders.length; i ++) {
      var reminder = activeReminders[i];
      var nextRun = reminder.nextRun;
      if (moment(reminder.nextRun).isBefore(new Date())) {
        if (reminder.periodicity == Constants.Periodicity.DAILY) {
          nextRun = moment(reminder.nextRun).add(1, 'days').toDate();
        }
        if (reminder.periodicity == Constants.Periodicity.WEEKLY) {
          nextRun = moment(reminder.nextRun).add(1, 'weeks').toDate();
        }
        if (reminder.periodicity == Constants.Periodicity.MONTHLY) {
          nextRun = moment(reminder.nextRun).add(1, 'months').toDate();
        }
        Meteor.call('updateReminderRunSettings', reminder._id, nextRun, false);
      }
    }
  },

  sendReminderEmails: function() {
    var remindersToSend = Reminders.find({active: true, executed: false, nextRun: {$lt: new Date()}}).fetch();
    for (var i = 0; i < remindersToSend.length; i ++) {
      var reminder = remindersToSend[i];
      var email = Emails.findOne({_id: reminder.email.id});
      Meteor.call('sendEmail', reminder.to, Meteor.settings.fromEmail, email.subject, email.body );
      Meteor.call('updateReminderRunSettings', reminder._id, reminder.nextRun, true);
    }
  },

  sendEmail: function (to, from, subject, html) {
    check([to, from, subject, html], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      html: html
    });
  },

  addOrUpdateReminder: function(reminder) {
    var startDateTime = moment(reminder.startDate + 'T' + reminder.startTime).toDate();
    Reminders.update({
      _id: reminder._id
    },
    { $set: {
        active: reminder.active,
        name: reminder.name, 
        email: {
          id: reminder.emailId,
          name: reminder.emailName
        },
        to: reminder.to, 
        startDateTime: startDateTime, 
        periodicity: reminder.periodicity,
        executed: false,
        nextRun: startDateTime
      }
    },
    {
      upsert: true
    }
    );
  },

  deleteReminder: function(reminderId) {
    Reminders.remove(reminderId);
  },

  switchReminderActivity: function(reminderId, isActive) {
    Reminders.update(reminderId, {$set: {active: !isActive}});
  },

  updateReminderRunSettings: function(id, nextRun, executed) {
    Reminders.update({_id: id}, {
      $set: {
        executed: executed,
        nextRun: nextRun
      }
    });
  },

  addOrUpdateEmail: function(email) {
    Emails.update({
      _id: email._id
    },
    { $set: {
        name: email.name,
        subject: email.subject,
        body: email.body
      }
    },
    {
      upsert: true
    });
  },

  deleteEmail: function(emailId) {
    Emails.remove(emailId);
  }
});