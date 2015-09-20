Template.emailList.events({
  'click .add-email-btn': function () {
    $('.email-form').show();
  },

  'click .remove-btn': function () {
  	Meteor.call('deleteEmail', this._id);
  }

});