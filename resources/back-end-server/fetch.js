var parser = require('./parser.js');
var Travis = require('travis-ci');
var travis = new Travis({
  version: '2.0.0'
});
var owner = 'mozilla-b2g',
  reponame = 'gaia';
module.exports ={
    doThing : function(time,callback){
    var newTime=time;
      doRepo(time,function(timeEnd){
        newTime=timeEnd;
        callback(newTime);
      });
    }
};

function doRepo(time,callback){
  var timeTemp=time;
  travis.repos.builds({
  owner_name: owner,
  name: reponame
  }, function (err, res) {
    console.log(owner+"/"+reponame);
    var BUILD_IDS = res.builds;
    for(i in BUILD_IDS){
      var finishTime = BUILD_IDS[i].finished_at;
      if(finishTime >= time){
        if(finishTime>timeTemp){
          timeTemp = finishTime;
        }
        console.log(BUILD_IDS[i].id+"  "+BUILD_IDS[i].finished_at);
        doBuild(BUILD_IDS[i].id);
      }
    }
  callback(timeTemp);
  });
}

function doBuild(BUILD_ID){
  travis.builds({
    id: BUILD_ID
  }, function(err, res){
    var allerror;
    console.log("build id: "+res.build.id);
    console.log("build time: "+res.build.finished_at);
    for(var i in res.build.job_ids){
      var JOB_ID = res.build.job_ids[i];
      var errorname = doJob(JOB_ID,res.build.finished_at);
    }
  });
}

function doJob(JOB_ID,time){
  travis.jobs({
    id: JOB_ID
  }, function(err, res){
    var LOG_ID = res.job.log_id;
    var errfile = doLog(LOG_ID,time);
  });
}

function doLog(LOG_ID,time){
  travis.logs({
    id :LOG_ID
  }, function(err,res){
    var result = parser.findErrFile(res.log.body);
    if(result!=null){
      doJson(result,time);
    }
  });
}

function doJson(errfile,time){
  var result = {
    "Date" : time.split("T",1),
   "errFile" : errfile
  }
  console.log(result);
}