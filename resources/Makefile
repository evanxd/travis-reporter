FRONTDIR=./front-end-server
BACKDIR=./back-end-server
DATADIR=./database
DBDIR=/usr/bin/mongod
run: db portal front-end
db:$(DBDIR) lock
	mongod --dbpath=database &
front-end:
	cd $(FRONTDIR) && npm install && npm start &
portal:package
	cd $(BACKDIR) && node runServer.js &
package:
	npm install travis-ci
	npm install mongoose
lock:
	cd $(DATADIR) && rm mongod.lock &
$(DBDIR):
	sudo apt-get update \
	sudo apt-get install mongodb