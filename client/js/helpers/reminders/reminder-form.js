Template.reminderForm.helpers({
	emailOptions: function() {
		var emails = Emails.find().fetch();
		var options = [];
		for (var i = 0; i < emails.length; i ++) {
			options.push({
				name: emails[i].name,
				value: emails[i]._id + Constants.Util.SEPARATOR + emails[i].name
			});
		}
		return options;
	},

	periodicityOptions: function() {
		var options = [];
		for (var property in Constants.Periodicity) {
		    if (Constants.Periodicity.hasOwnProperty(property)) {
		        options.push({name: property, value: Constants.Periodicity[property]});
		    }
		}
		return options;
	},

	reminder: function() {
		return Reminders.findOne({_id: Router.current().params.id});
	},

	isSelectedEmail: function(option, reminderEmail) {
		return option == reminderEmail
	},

	startTime: function(dateTime) {
		return moment(dateTime).format(Constants.DateTimeFormats.TIME);
	},

	startDate: function(dateTime) {
		return moment(dateTime).format(Constants.DateTimeFormats.DATE);
	}
});