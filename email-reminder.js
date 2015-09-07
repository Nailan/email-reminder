Reminders = new Mongo.Collection('reminders');

if (Meteor.isClient) {

  Template.reminderList.helpers({
    reminders: function () {
      return Reminders.find();
    }
  });

  Template.reminderList.events({
    'click .add-reminder-btn': function () {
      $('.new-reminder-form').show();
    },

    'click .remove-btn': function () {
      Reminders.remove(this._id);
    },

    'click .disable-btn': function () {
      Reminders.update(this._id, {$set: {active: !this.active}});
    }


  });

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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    SyncedCron.add({
      name: 'Send email scheduled task',
      schedule: function(parser) {
      return parser.text('every 10 seconds');
      },
      job: function() {
        console.log("Running!!!");
        Meteor.call('sendEmail', 'p.demeshchik@datarockets.com', 'p.demeshchik@datarockets.com', 'test meteor', 'testing');
      }
    });
    SyncedCron.start();
  });

  Meteor.methods({
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
}
