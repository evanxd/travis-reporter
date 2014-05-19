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
    var BUILD_IDS = res.builds;
    for(i in BUILD_IDS){
      var finishTime = BUILD_IDS[i].finished_at;
      if(finishTime > time || (time==null&&finishTime!=null)){
        if(finishTime>timeTemp){
          timeTemp = finishTime;
        }
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
    for(var i in res.build.job_ids){
      var JOB_ID = res.build.job_ids[i];
      var time = res.build.finished_at.slice(0,10);
      var errorname = doJob(JOB_ID,time);
    }
  });
}

function doJob(JOB_ID,time){
  travis.jobs({
    id: JOB_ID
  }, function(err, res){
    var LOG_ID = res.job.log_id;
    doLog(LOG_ID,time);
  });
}

function doLog(LOG_ID,time){
  travis.logs({
    id :LOG_ID
  }, function(err,res){
    var result = parser.findErrFile(res.log.body);
    if(result!=null){
      doJson(result.sort(),time);
    }
  });
}

function doJson(errfile,time){
  var error=errfile[0],counts=0;
  var length=errfile.length;
  for(i=0;i<=length;i++){
    if(error!=errfile[i]){
      var result = {
        "errDate" : time, 
        "errName" : error, 
        "errCount" : counts
      }
      outJson(result);
      error=errfile[i];
      counts=1;
    }
    else{
      counts++;
    }
  }
}
function outJson(result){
  console.log(result);
}