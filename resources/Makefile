ROOTDIR=./server
DATADIR=./database
DBDIR=/usr/bin/mongod
run: clean db server

db: $(DBDIR)
	mongod --dbpath=database &

server:
	cd $(ROOTDIR) && sudo npm install && npm start &

$(DBDIR):
	sudo apt-get update \
	sudo apt-get install mongodb

clean:
	-killall node
	-mongod --dbpath=database --shutdown
	-cd $(DATADIR) && rm -f mongod.lock 