Template.newReminderForm.helpers({
	emailOptions: function() {
		var emails = Emails.find().fetch();
		var options = [];
		for (var i = 0; i < emails.length; i ++) {
			options.push({name: emails[i].name, value: emails[i]._id});
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
	}
});