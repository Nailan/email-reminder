Meteor.publish('reminders', function() {
	return Reminders.find({'owner': this.userId});
});

Meteor.publish('emails', function() {
	return Emails.find({'owner': this.userId});
});