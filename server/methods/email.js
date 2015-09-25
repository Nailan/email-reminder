Meteor.methods({
  addOrUpdateEmail: function(email) {
    Emails.update({
      _id: email._id
    },
    { $set: {
        name: email.name,
        subject: email.subject,
        body: email.body
      }
    },
    {
      upsert: true
    });
  },

  deleteEmail: function(emailId) {
    Emails.remove(emailId);
  }
});