var dateutil = require('../util/dateutil'),
	moment = require('moment');
var mq_client = require('../rpc/client');


editPerson = function(req,res){
console.log(JSON.stringify(req.body));
	if(!req.body.idperson ){
		res.status(400).json({status : 400, message : "Bad Request"});
	}else{
		
		var msgPayload = {
			operation : "editPerson",
			message : req.body
		};

		mq_client.make_request('admin_queue',msgPayload,function(err,results){
			if(err){
				res.status(err.status).json(err);
			}else{
				res.status(results.status).json(results);
			}
		});

	}

};
createAlert = function(req,res){
	console.log(JSON.stringify(req.body));
	if(!req.body.idalert || !req.body.heading || !req.body.description ){
		res.status(400).json({status : 400, message : "Bad Request"});
	}else{
		
		// var queryParam = {
		// 		idalert : req.body.idalert,
		// 		heading : req.body.heading,
		// 		description : req.body.description
				
		// }

		// mysql.queryDb("INSERT INTO alert SET ?", queryParam, function(err, response) {
		// 	if (err) {
		// 		console.log("Error while perfoming query !!!");
		// 		res.status(500).json({ status : 500, message : "Please try again later" });
		// 	} else {
		// 		res.status(200).json({ status : 200, message : "Alert has been added Succesfully" });
		// 	}
		// });


		var msgPayload = {
			operation : "createAlert",
			message : req.body
		};

		mq_client.make_request('admin_queue',msgPayload,function(err,results){
			if(err){
				res.status(err.status).json(err);
			}else{
				res.status(results.status).json(results);
			}
		});

	}
};

publishAlert = function(req,res){
	console.log(JSON.stringify(req.body));
	if(!req.body.idguard || !req.body.idalert || !req.severity || !req.body.date){
		res.status(400).json({status : 400, message : "Bad Request"});
	}else{
		
		// var queryParam = {
		// 		idguard : req.body.idguard,
		// 		idalert : req.body.idalert,
		// 		severity : req.body.severity,
		// 		date : req.body.date
				
		// }

		// mysql.queryDb("INSERT INTO alertinfo SET ?", queryParam, function(err, response) {
		// 	if (err) {
		// 		console.log("Error while perfoming query !!!");
		// 		res.status(500).json({ status : 500, message : "Please try again later" });
		// 	} else {
		// 		res.status(200).json({ status : 200, message : "Alert has been added Succesfully" });
		// 	}
		// });

		var msgPayload = {
			operation : "publishAlert",
			message : req.body
		};

		mq_client.make_request('admin_queue',msgPayload,function(err,results){
			if(err){
				res.status(err.status).json(err);
			}else{
				res.status(results.status).json(results);
			}
		});

	}
};


/*alertByBuilding = function(req,res){
	console.log(JSON.stringify(req.body));
	if(!req.body.idalert || !req.body.heading || !req.body.description ){
		res.status(400).json({status : 400, message : "Bad Request"});
	}else{
		
		var queryParam = {
				idalert : req.body.idalert,
				heading : req.body.heading,
				description : req.body.description
				
		}

		mysql.queryDb("INSERT INTO alert SET ?", queryParam, function(err, response) {
			if (err) {
				console.log("Error while perfoming query !!!");
				res.status(500).json({ status : 500, message : "Please try again later" });
			} else {
				res.status(200).json({ status : 200, message : "Alert has been added Succesfully" });
			}
		});
	}
};*/

addPatrol = function(req,res){
	console.log(JSON.stringify(req.body));
	if(!req.body.date || !req.body.description|| !req.body.idgaurd || !req.body.idbuilding || !req.body.idreport){
		
		res.status(400).json({status : 400, message : "Bad Request"});
	}else{
		
		// var queryParam = {
		// 		date    : req.body.date,
		// 		description : req.body.description,
		// 		idgaurd   : req.body.idgaurd,
		// 		idbuilding : req.body.idgaurd,
		// 		idreport : req.body.idreport
				
				
		// }

		// mysql.queryDb("INSERT INTO patrol SET ?", queryParam, function(err, response) {
		// 	if (err) {
		// 		console.log("Error while perfoming query !!!");
		// 		res.status(500).json({ status : 500, message : "Please try again later" });
		// 	} else {
		// 		res.status(200).json({ status : 200, message : "Patrol record has been added Succesfully" });
		// 	}
		// });

		var msgPayload = {
			operation : "addPatrolRecord",
			message : req.body
		};

		mq_client.make_request('admin_queue',msgPayload,function(err,results){
			if(err){
				res.status(err.status).json(err);
			}else{
				res.status(results.status).json(results);
			}
		});

	}
};

//find the guards who can be assigned to a building based on the schedule.
getGuardsForAssignments=function(req,res){
	
	var msgPayload = {
		operation : "getGuardsForAssignments",
		message : {}
	};

	mq_client.make_request('admin_queue',msgPayload,function(err,results){
		if(err){
			res.status(err.status).json(err);
		}else{
			res.status(results.status).json(results);
		}
	});
};

//Get the client details for which the guards are not assigned to their building
getPendingClients = function(req,res){
	var msgPayload = {
		operation : "getPendingClients",
		message :{
			idperson : req.params.idperson
		}
	};

	mq_client.make_request('admin_queue',msgPayload,function(err,results){
		if(err){
			res.status(err.status).json(err);
		}else{
			res.status(results.status).json(results);
		}
	});
};

//Get the client details for which the guards are not assigned to their building
assignGuards = function(req,res){
	var msgPayload = {
		operation : "assignGuards",
		message :req.body
	};

	mq_client.make_request('admin_queue',msgPayload,function(err,results){
		if(err){
			res.status(err.status).json(err);
		}else{
			res.status(results.status).json(results);
		}
	});
};
exports.editPerson = editPerson;
exports.createAlert=createAlert;
exports.addPatrol=addPatrol;
exports.publishAlert=publishAlert;

exports.getGuardsForAssignments=getGuardsForAssignments;
exports.getPendingClients=getPendingClients;
exports.assignGuards=assignGuards;

