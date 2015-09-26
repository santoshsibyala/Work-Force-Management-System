/**
 * Database Configurations
 */
exports.db = {
		// Local
		// "host" : "localhost",
		// "port" : 3306,
		// "user" : "root",
		// "password" : "rohan",
		// "database" : "cmpe_273",
		
		//AWS
		/*"host" : "team01wfms.ckpp00lq5on0.us-west-2.rds.amazonaws.com",
        "port" : 3306,
		"user" : "team01",
		"password" : "finalproject",
		//"database" : "jd_wfms",
		"database" : "wfms",

		"connectionLimit" : 100*/
		    "host" : "cmpe280.chahgomyx0ne.us-west-1.rds.amazonaws.com",
        "port" : 3306,
        "user" : "root",
        "password" : "qweasd123",
        "database" : "wfms",
};

/**
 * Database Pooling Configurations
 */
exports.dbPool = {
	"maxSize" : 50
};

/*
* AWS configurations
*/
exports.awsConfig = {
	accessKeyId: '',
	secretAccessKey: '',
	region: 'us-west-2'
};

/*
* Redis config
 */
exports.redisConfig = {
	host : 'localhost',
	port : '6379'
}