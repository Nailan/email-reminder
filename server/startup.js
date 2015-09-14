Meteor.startup(function () {

  process.env.MAIL_URL = Meteor.settings.GMAIL_URL;

  SyncedCron.add({
    name: 'Send email scheduled task',
    schedule: function(parser) {
      return parser.text('every 10 minutes');
    },
    job: function() {
      Meteor.call('processReminders');
    }
  });
  SyncedCron.start();

});