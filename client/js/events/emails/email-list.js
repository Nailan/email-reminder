Template.emailList.events({
  'click .add-email-btn': function () {
    Router.go(Constants.Routes.NEW_EMAIL);
  },

  'click .remove-btn': function () {
  	Meteor.call('deleteEmail', this._id);
  },

  'click .edit-btn': function () {
  	Router.go(Constants.Routes.EMAILS + '/' + this._id);
  }

});