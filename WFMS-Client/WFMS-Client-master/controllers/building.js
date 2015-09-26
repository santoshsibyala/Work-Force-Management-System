var dateutil = require('../util/dateutil'),
	moment = require('moment');
var mq_client = require('../rpc/client');

createBuilding = function(req,res){
	console.log("in create building");
	console.log(req.body.idclient);
	console.log(JSON.stringify(req.body));
	if(!req.body.idclient){
		res.status(400).json({status : 400, message : "Bad Request"});
	}else{
		// var releaseDate = moment(req.body.release_date,'DD-MM-YYYY').toDate();
		
		// var queryParam = {
		// 		idclient : req.body.idclient,
		// 		buildingname: req.body.buildingname,
		// 		start_date : moment(req.body.start_date,'DD-MM-YYYY').toDate(),
		// 		release_date : moment(req.body.release_date,'DD-MM-YYYY').toDate(),
		// 		address : req.body.address,
		// 		checkpoint : req.body.checkpoint,
		// 		no_of_guards: req.body.no_of_guards,
		// 		buildingstatus:"Active"
		// }

		// mysql.queryDb("INSERT INTO building SET ?", queryParam, function(err, response) {
		// 	if (err) {
		// 		console.log("Error while perfoming query !!!");
		// 		res.status(500).json({ status : 500, message : "Please try again later" });
		// 	} else {
		// 		res.status(200).json({ status : 200, message : "building has been added Succesfully" });
		// 	}
		// });
		
	    req.checkBody('buildingname', 'Please enter a valid name of building.').notEmpty();
	    req.checkBody('start_date', 'Please enter a valid startdate.').notEmpty().isDate();
	    req.checkBody('release_date', 'Please enter a valid release date.').notEmpty().isDate();
	    req.checkBody('address', 'Please enter a valid address.').notEmpty();
	    req.checkBody('checkpoint', 'Please enter a valid checkpoints.').notEmpty();
	    req.checkBody('no_of_guards', 'Please enter a valid number of guards.').notEmpty().isInt();

	    var errors = req.validationErrors();
	    if (errors) {
	        console.log(errors);
	        var msg = errors[0].msg;
	        res.status(400).json({
	            status : 400,
	            message : msg
	        });
	    }

		var msgPayload = {
			operation : "createBuilding",
			message : req.body
		};

		mq_client.make_request('building_queue',msgPayload,function(err,results){
			if(err){
				res.status(err.status).json(err);
			}else{
				res.status(results.status).json(results);
			}
		});

	}
};

getBuildingClientReport = function(req,res){

	if(!req.params.idperson){
		res.status(400).json({ status : 400, message : "Bad Request" });
	}else{ 


//		mysql.queryDb('SELECT buildingname, address FROM building WHERE ? and buildingstatus = "Active"',[{idclient:req.params.idperson}],function(err,rows){

//		mysql.queryDb('SELECT buildingname FROM building WHERE ? and buildingstatus = "Active"',[{idclient:req.params.idperson}],function(err,rows){

		// 	if (err) {
		// 		res.status(500).json({ status : 500, message : "Error while retrieving data" });
		// 	} else {
		// 		res.status(200).json({ status : 200, data : rows });
		// 	}
		// });

		var msgPayload = {
			operation : "getBuildingClientReport",
			message : {
				idperson:req.params.idperson
			}
		};

		mq_client.make_request('building_queue',msgPayload,function(err,results){
			if(err){
				res.status(err.status).json(err);
			}else{
				res.status(results.status).json(results);
			}
		});
	}
};


getBuilding=function(req,res){
	
	if(!req.params.idperson){
		res.status(400).json({ status : 400, message : "Bad Request" });
	}else{ 
		// mysql.queryDb('SELECT * FROM building WHERE ? and buildingstatus = "Active"',[{idclient:req.params.idperson}],function(err,rows){

		// 	if (err) {
		// 		res.status(500).json({ status : 500, message : "Error while retrieving data" });
		// 	} else {
		// 		res.status(200).json({ status : 200, data : rows });
		// 	}
		// });
		
		var msgPayload = {
			operation : "getBuilding",
			message : {
				idperson:req.params.idperson
			}
		};

		mq_client.make_request('building_queue',msgPayload,function(err,results){
			if(err){
				res.status(err.status).json(err);
			}else{
				res.status(results.status).json(results);
			}
		});

	}
};

editBuilding = function(req,res){
	
	if(!req.body.idbuilding){
		res.status(400).json({ status : 400, message : "Bad Request" });
	}else{
		// var newParam ={
		// 		buildingname : req.body.buildingname,
		// 		start_date : moment(req.body.start_date,'YYYY-MM-DD').toDate(),
		// 		release_date : moment(req.body.release_date,'YYYY-MM-DD').toDate(),
		// 		address : req.body.address,
		// 		checkpoint : req.body.checkpoint,
		// 		no_of_guards: req.body.no_of_guards,
		// 		};
		// //and ?? = ? and ?? = ?
		// //'start_date',old.start_date,'end_date',old.end_date
		// mysql.queryDb("UPDATE building SET ? WHERE ?? = ?", 
		// 	[newParam,'idbuilding',req.body.idbuilding], 
		// 	function(err, response) {
		// 	if (err) {
		// 		console.log("Error while perfoming query !!!" + err);
		// 		res.status(500).json({ status : 500, message : "Please try again later" });
		// 	} else {
		// 		res.status(200).json({ status : 200, message : "building has been updated Succesfully" });
		// 	}
		// });

		var msgPayload = {
			operation : "editBuilding",
			message : req.body
		};

		mq_client.make_request('building_queue',msgPayload,function(err,results){
			if(err){
				res.status(err.status).json(err);
			}else{
				res.status(results.status).json(results);
			}
		});

	}
};


deleteBuilding=function(req,res){
	console.log(JSON.stringify(req.body));
	if(!req.params.buildingid){
		res.status(400).json({ status : 400, message : "Bad Request" });
	}else{
		// var buildingid = req.params.buildingid;
		// var newParam ={
		// 		buildingstatus : "Disable"
		// 		};
		// mysql.queryDb('UPDATE building SET ? WHERE ?? = ?',[newParam,'idbuilding',req.params.buildingid],function(err,response){
		// 	if (err) {
		// 		console.log("Error while deleting building details !!!");
		// 		console.log(err);
		// 		res.status(500).json({ status : 500, message : "Error while deleting building details !!!" });
		// 	} else {
		// 		res.status(200).json({ status : 200, message : "building details has been deleted Succesfully" });
		// 	}
		// });
		
		var msgPayload = {
			operation : "deleteBuilding",
			message : {
				buildingid:req.params.buildingid
			}
		};

		mq_client.make_request('building_queue',msgPayload,function(err,results){
			if(err){
				res.status(err.status).json(err);
			}else{
				res.status(results.status).json(results);
			}
		});

	}
};

exports.getBuildingClientReport = getBuildingClientReport;
exports.getBuilding = getBuilding;
exports.createBuilding = createBuilding;
exports.editBuilding = editBuilding;
exports.deleteBuilding = deleteBuilding;

