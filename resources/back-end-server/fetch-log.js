var parser = require('./parser.js');
var Travis = require('travis-ci');
var travis = new Travis({
  version: '2.0.0'
});
var owner = 'mozilla-b2g',
  reponame = 'gaia';
module.exports ={
    lastBuildLog : function(){
        travis.repos({
         owner_name: owner,
         name: reponame
        }, function (err, res) {
          console.log(owner+"/"+reponame);
         console.log("repo id: "+res.repo.id);
            var BUILD_ID = 24691575/*res.repo.last_build_id*/;
         travis.builds({
             id: BUILD_ID
          }, function(err, res){
            console.log("last build id: "+res.build.id);
            console.log("last build start at: "+res.build.started_at.split("T",1));
                for(var i in res.build.job_ids){
                  var JOB_ID = res.build.job_ids[i];
                 travis.jobs({
                        id: JOB_ID
                   }, function(err, res){
                      var JOB_ID = res.job.id;
                      var LOG_ID = res.job.log_id;
                      var JOB_TIME = res.job.started_at.split("T",1);
                      travis.logs({
                          id: LOG_ID
                    }, function(err, res){
                      console.log("job id: "+JOB_ID+" ; log id: "+LOG_ID + " ; Start at :"+JOB_TIME);
                               logbody = res.log.body;
                               var errfilename = parser.findErrFile(res.log.body);
                              if(errfilename==null){
                                console.log("No error file");
                              }
                              else{
                                var result = {
                                  "Date" : JOB_TIME,
                                  "errFile" : errfilename
                                }
                                console.log(result);
                              }
                        });
                    });
                }
            });
        });
    }
};