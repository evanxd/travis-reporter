var parser = require('./parser.js');
var Travis = require('travis-ci');
var request = require("request");
var update = require('./updateBase.js');
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
    if(err==null){
      var BUILD_IDS = res.builds;
      for(i in BUILD_IDS){
        var finishTime = BUILD_IDS[i].finished_at;
        if(finishTime > time || (time==null&&finishTime!=null)){
          if(finishTime>timeTemp||timeTemp==null){
            timeTemp = finishTime;
          }
          doBuild(BUILD_IDS[i].id);
        }
      }
    callback(timeTemp);
    }
  });
}

function doBuild(BUILD_ID){
  travis.builds({
    id: BUILD_ID
  }, function(err, res){
    if(err==null){
      for(var i in res.build.job_ids){
        var JOB_ID = res.build.job_ids[i];
        var time = res.build.finished_at.slice(0,10);
          doJob(JOB_ID,time,BUILD_ID);  
      }
    }
  });
}

function doJob(JOB_ID,time,build){
  travis.jobs({
    id: JOB_ID
  }, function(err, res){
    if(err==null){
      var action = res.job.config.env;
      if(action=="CI_ACTION=marionette_js"){
        doLog(time,build,JOB_ID);
      }
    }
  });
}

function doLog(time,build,job){
  var url ="https://s3.amazonaws.com/archive.travis-ci.org/jobs/"+job+"/log.txt";
  request({
    uri:url
  },function(err,response,body){
    if(err==null){
      var result = parser.findErrFile(body);
      if(result!=null){
        doJson(result,time,build,job);
      }
    }
  })
}


function doJson(errfile,time,build,job){
  var length = errfile.length;
  for(i=0;i<length;i++){
    var errPath = errfile[i];
    var result = {
      "buildID" : build,
      "jobID" : job,
      "filePath" : errPath,
      "date" : time
    }
    console.log(result);
    outJson(result);
  }
}

//send out the result json to the database
function outJson(result){
  update.insertData(result);
}