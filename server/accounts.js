Accounts.validateNewUser(function(user) {
	if(user.emails[0].address !== Meteor.settings.allowedEmail) {
		return false;
	} else {
		return true;
	}
});