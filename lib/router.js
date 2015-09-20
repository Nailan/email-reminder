Router.configure({
    layoutTemplate: 'layout'
});

Router.route(Constants.Routes.ROOT, {
    action: function() {
        this.render('reminderList');
    }
});

Router.route(Constants.Routes.REMINDERS + '/:id', {
    action: function() {
        this.render('reminderForm');
    }
});


Router.route(Constants.Routes.EMAILS, {
    action: function() {
        this.render('emailList');
    }
});

Router.route(Constants.Routes.EMAILS + '/:id', {
    action: function() {
        this.render('emailForm');
    }
});

