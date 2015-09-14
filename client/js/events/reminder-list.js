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