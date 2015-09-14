Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', {
    action: function() {
        this.render('reminders');
    }
});

Router.route('/emails', {
    action: function() {
        this.render('emails');
    }
});

