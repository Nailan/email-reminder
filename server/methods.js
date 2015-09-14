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
  }
});