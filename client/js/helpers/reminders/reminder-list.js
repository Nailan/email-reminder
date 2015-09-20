Template.reminderList.helpers({
	reminders: function() {
	  return Reminders.find();
	},

	emailLink: function(emailId) {
		return Constants.Routes.EMAILS + '/' + emailId;
	}
});