# travis-reporter
A reporter to show the unstable Travis actions.

## Prototype
![travis-reporter prototype](./travis-reporter-prototype.png)

Makefile
===============================================
This is a documentation about the supported target and its usage.
* You need to install npm first.
* It support the Ubuntu System
* It will use port 3000 and 27017 for server.

Run Server
-------------------------------------------------
`make run` - We would set all the enviorment and establish the database server and  travis-reporter server.

Setup db
------------------------------------------------
You should close your init mongodb service if you have installed mongodb.

`make db` - We would setup mongodb and link to our database of travis-reporter.


Clean all stuff
--------------------------------------------------
`make clean` - This command can close the db server and travis-reporter server if it has been establish.