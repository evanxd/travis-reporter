<<<<<<< HEAD
var Travis = require('travis-ci');
var travis = new Travis({
    version: '2.0.0'
});
var owner = 'mozilla-b2g',
    reponame = 'gaia';
travis.repos({
    owner_name: owner,
    name: reponame
}, function (err, res) {
    console.log(owner+"/"+reponame);
    console.log("repo id: "+res.repo.id);
    var BUILD_ID = res.repo.last_build_id;
    travis.builds({
        id: BUILD_ID
    }, function(err, res){
        console.log("last build id: "+res.build.id);
        for(var i in res.build.job_ids){
            var JOB_ID = res.build.job_ids[i];
            travis.jobs({
                id: JOB_ID
            }, function(err, res){
                var LOG_ID = res.job.log_id;
                travis.logs({
                    id: LOG_ID
              }, function(err, res){
                    console.log("job id: "+res.log.job_id+" ; log id: "+res.log.id);
                });
            });
        }
    });
=======
var Travis = require('travis-ci');
var travis = new Travis({
    version: '2.0.0'
});
var owner = 'mozilla-b2g',
    reponame = 'gaia';
travis.repos({
    owner_name: owner,
    name: reponame
}, function (err, res) {
    console.log(owner+"/"+reponame);
    console.log("repo id: "+res.repo.id);
    var BUILD_ID = res.repo.last_build_id;
    travis.builds({
        id: BUILD_ID
    }, function(err, res){
        console.log("last build id: "+res.build.id);
        for(var i in res.build.job_ids){
            var JOB_ID = res.build.job_ids[i];
            travis.jobs({
                id: JOB_ID
            }, function(err, res){
                var LOG_ID = res.job.log_id;
                travis.logs({
                    id: LOG_ID
              }, function(err, res){
                    console.log("job id: "+res.log.job_id+" ; log id: "+res.log.id);
                });
            });
        }
    });
>>>>>>> a42e9e31473fa6a3c24795ff29e6bf0604fa680e
});