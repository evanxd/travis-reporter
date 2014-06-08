var parser = require('./parser.js');
var Travis = require('travis-ci');
var request = require("request");
var update = require('./updateBase.js');
var travis = new Travis({
  version: '2.0.0'
});
var owner = 'mozilla-b2g',
  reponame = 'gaia';
var timeTemp;
var IDsTemp,count;
var oldTemp;
module.exports ={
    doThing : function(time,IDs,callback){ 
    IDsTemp={},count=0,oldTemp=null;
    var newTime=time;
    var newIDs;
    if(IDs!=null){
      if(IDs[0]!=null){
        var number=0;
        for(x in IDs){
          number++;
        }
        IDs=sortBuild(IDs,number);
        oldTemp=IDs[0].id;
      }
    }
    doRepo(time,IDs,function(timeEnd,IDEnd){
      newTime=timeEnd;
      if(IDEnd=={}){
        newIDs=null;
      }
      else{
        newIDs=IDEnd;
      }
      callback(newTime,newIDs);
    });
  }
};
function doRepo(time,IDs,callback){
  travis.repos.builds({
    owner_name: owner,
    name: reponame
  }, function (err, res) {
    if(err==null){
      var BUILD_IDS = res.builds;
      for(i in BUILD_IDS){
        if(BUILD_IDS[i].id>oldTemp||oldTemp==null){
          doBuild(time,BUILD_IDS[i].id,function(newtime,ids){
            callback(newtime,ids);
          });
        }
      }
      if(IDs!=null){
        for(i in IDs){
          doBuild(time,IDs[i].id,function(newtime,ids){
            callback(newtime,ids);
          });
        }
      }
    }
  });
}

function doBuild(time,BUILD_ID,callback){
  travis.builds({
    id: BUILD_ID
  }, function(err, res){
    if(err==null){
      var finishTime = res.build.finished_at;
      if(finishTime!=null&&(finishTime > time || (time==null&&finishTime!=null))){
        if(finishTime>timeTemp||timeTemp==null){
          timeTemp = finishTime;
        }
        for(var i in res.build.job_ids){
          var JOB_ID = res.build.job_ids[i];
          finishTime = finishTime.slice(0,10);
          doJob(JOB_ID,finishTime);
        }
      }
      else if(finishTime ==null){
        IDsTemp[count]=res.build;
        count++;
      }
    callback(timeTemp,IDsTemp);
    }
  });
}

function doJob(JOB_ID,time){
  travis.jobs({
    id: JOB_ID
  }, function(err, res){
    if(err==null){
      var action = res.job.config.env;
      if(action=="CI_ACTION=marionette_js"){
        var build = res.job.build_id;
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
    //console.log(result);
    outJson(result);
  }
}

//send out the result json to the database
function outJson(result){
  update.insertData(result);
}

function sortBuild(ids,number){
  for(var x=0;x<number;x++){
    for(var y=0;y<number-1;y++){
      if(ids[y].id<ids[y+1].id){
        var temp = ids[y];
        ids[y] = ids[y+1];
        ids[y+1] = temp;
      }
    }
  }
  return ids;
}