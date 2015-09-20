Template.emailForm.helpers({
	email: function() {
		return Emails.findOne({_id: Router.current().params.id});
	}
});