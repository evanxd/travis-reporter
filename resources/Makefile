FRONTDIR=./front-end-server
BACKDIR=./back-end-server
DBDIR=/usr/bin/mongod
db:$(DBDIR)
	mongod --dbpath=database
front-end:
	cd $(FRONTDIR) && npm install && npm start
portal:package
	cd $(BACKDIR) && node runServer.js
package:
	npm install travis-ci
	npm install mongoose
db.show:
	mongo database 
$(DBDIR):
	sudo apt-get update \
	sudo apt-get install mongodb