Template.newReminderForm.helpers({
	emailOptions: function() {
		var emails = Emails.find().fetch();
		var options = [];
		for (var i = 0; i < emails.length; i ++) {
			options.push({name: emails[i].name, value: emails[i]._id});
		}
		return options;
	}
});