Meteor.startup(function () {

  SyncedCron.add({
    name: 'Send email task',
    schedule: function(parser) {
      return parser.text(Meteor.settings.sendEmailTimeout);
    },
    job: function() {
      Meteor.call('sendReminderEmails');
    }
  });
  SyncedCron.add({
    name: 'Process reminder next run task',
    schedule: function(parser) {
      return parser.text(Meteor.settings.processRemindersTimeout);
    },
    job: function() {
      Meteor.call('processReminders');
    }
  });
  SyncedCron.start();

});