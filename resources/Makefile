ROOTDIR=./
DATADIR=./database
DBDIR=/usr/bin/mongod
run: clean db service

db: $(DBDIR)
	mongod --dbpath=database &

service:
	cd $(ROOTDIR) && npm install && npm start &

$(DBDIR):
	sudo apt-get update \
	sudo apt-get install mongodb

clean:
	-killall node
	-mongod --dbpath=database --shutdown
	-cd $(DATADIR) && rm -f mongod.lock 