# email-reminder
The app sends specified emails to specified people in specific time.
# How to launch
1. Create settings.json with the following properties: 
  * gmailUrl: smtp URL, 
  * fromEmail: email to send notifications from, 
  * sendEmailTimeout: timeout string to execute scheduled job for emails sending, example: 'every 1 minute',
  * processRemindersTimeout: timeout string to execute scheduled job for reminders processing,
  * allowedEmail: email allowed to register, it is temprorary param: I need to remove autopublish and will remove it
2. Execute start.bat or start.sh scripts.
