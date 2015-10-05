Meteor.methods({
  addOrUpdateEmail: function(email) {
    Util.checkRecordOwner(Emails, email._id);
    Emails.update({
      _id: email._id
    },
    { $set: {
        name: email.name,
        subject: email.subject,
        body: email.body,
        owner: this.userId
      }
    },
    {
      upsert: true
    });
  },

  deleteEmail: function(emailId) {
    Util.checkRecordOwner(Emails, emailId);
    Emails.remove(emailId);
  }
});