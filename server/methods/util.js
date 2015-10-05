Util = {
	checkRecordOwner: function(collection, id) {
		if (id && collection.findOne({_id: id}).owner !== Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		return true;
	}
};