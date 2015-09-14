Template.reminderList.events({
  'click .add-reminder-btn': function () {
    $('.new-reminder-form').show();
  },

  'click .remove-btn': function () {
  	Meteor.call('deleteReminder', this._id);
  },

  'click .disable-btn': function () {
    Meteor.call('switchReminderActivity', this._id, this.active);
  }


});