Template.reminderList.events({
  'click .add-reminder-btn': function () {
  	Router.go(Constants.Routes.NEW_REMINDER);
  },

  'click .remove-btn': function () {
  	Meteor.call('deleteReminder', this._id);
  },

  'click .disable-btn': function () {
    Meteor.call('switchReminderActivity', this._id, this.active);
  },

  'click .edit-btn': function () {
    Router.go(Constants.Routes.REMINDERS + '/' + this._id);
  }

});