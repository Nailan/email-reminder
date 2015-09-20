Template.reminderList.helpers({
	reminders: function() {
	  return Reminders.find();
	},

	emailLink: function(emailId) {
		return Constants.Routes.EMAILS + '/' + emailId;
	},

	formatDateTime: function(dateTime) {
		return moment(dateTime).format(Constants.DateTimeFormats.DATE_TIME);
	}
});