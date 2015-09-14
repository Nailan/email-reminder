Template.emailList.events({
  'click .add-email-btn': function () {
    $('.new-email-form').show();
  },

  'click .remove-btn': function () {
  	Meteor.call('deleteEmail', this._id);
  }

});