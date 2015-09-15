Meteor.startup(function () {

  process.env.MAIL_URL = Meteor.settings.gmailUrl;

  SyncedCron.add({
    name: 'Send email task',
    schedule: function(parser) {
      return parser.text(Meteor.settings.sendEmailTimeout);
    },
    job: function() {
      Meteor.call('sendReminderEmails');
    }
  },
  {
    name: 'Process reminder next run task',
    schedule: function(parser) {
      return parser.text(Meteor.settings.processRemindersTimeout);
    },
    job: function() {
      Meteor.call('processReminders');
    }
  }
  );
  SyncedCron.start();

});