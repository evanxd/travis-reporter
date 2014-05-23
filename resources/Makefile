FRONTDIR=./front-end-server
BACKDIR=./back-end-server
DATADIR=./database
DBDIR=/usr/bin/mongod
run:clean db portal front-end
db:$(DBDIR)
	mongod --dbpath=database &
front-end:
	cd $(FRONTDIR) && npm install && npm start &
portal:
	cd $(BACKDIR) && npm install && npm start &
$(DBDIR):
	sudo apt-get update \
	sudo apt-get install mongodb
clean:
	-killall node
	-mongod --dbpath=database --shutdown
	-cd $(DATADIR) && rm -f mongod.lock 
