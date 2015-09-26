
var config = require("./../conf/config.js");

var redis = require('redis');
//var cacheClient = redis.createClient(config.redisConfig.port,config.redisConfig.host);
//var cacheClient = redis.createClient();
var data=[{
	"name":"rohan",
	"lname":"bhanderi"
},{
	"name":"luke",
	"lname":"skywalker"
}];

exports.cacheData = function(key,data,cb) {
	//Store data on redis
	if(typeof cacheClient !== 'undefined' && cacheClient){
		cacheClient.set(key, JSON.stringify(data),function(err,reply){
			if(err){
				console.log(err);
				if(cb) { cb(err,data); }
			} else {
				console.log("Data cached with Key:" + key);
				cacheClient.expire(key, 5 * 60);
				if(cb) { cb(null,data); }
			}
		});
	}
};

exports.getCachedData = function(key,cb){
	if(typeof cacheClient !== 'undefined' && cacheClient){
		cacheClient.get(key, function(err,data){
			if(err){
				console.log(err);
				cb(err,null);
			} else {
				console.log("Get Cache data.. for Key:"+key);
				cb(null,JSON.parse(data));
			}
		});
	} else {
		cb(null,null);
	}
};

