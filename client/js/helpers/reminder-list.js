Template.reminderList.helpers({
	reminders: function () {
	  return Reminders.find();
	}
});