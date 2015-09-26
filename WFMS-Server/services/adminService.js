'use strict';
var mysql = require('../util/mysql');
var moment = require('moment');
var dateutil = require('../util/dateutil');

exports.handle_request = function(req,callback){
	var operation = req.operation;
	var message = req.message;
	
	switch(operation){
		
		case "editPerson":
			editPerson(message,callback);
			break;
		case "createAlert" : 
			createAlert(message,callback);
			break;

		case "publishAlert" : 
			publishAlert(message,callback);
			break;
			
		case "addPatrolRecord" :
			addPatrolRecord(message,callback);
			break;
		
		case "getGuardsForAssignments" :
			getGuardsForAssignments(message,callback);
			break;

		case "getPendingClients" :
			getPendingClients(message,callback);
			break;

		case "assignGuards" :
			assignGuards(message,callback);
			break;

		default : 
			callback({status : 400,message : "Bad Request"});
	}
};

// Save alert

function editPerson(msg,callback){
	var newParam ={
		fname: msg.fname,
		lname: msg.lname,
		address: msg.address,
		city: msg.city,
		state:msg.state,
		zipcode: msg.zipcode,
		email: msg.email,
		phonenumber: msg.phonenumber
		
	};
	mysql.queryDb("UPDATE person SET ? WHERE ?? = ?", 
		[newParam,'idperson',msg.idperson], 
		function(err, response) {
		if (err) {
			console.log("Error while perfoming query !!!" + err);
			callback({ status : 500, message : "Please try again later" });
		} else {
			callback({ status : 200, message : "Client has been updated Succesfully" });
		}
	});

}
function createAlert(msg,callback){
	var queryParam = {
			idalert : msg.idalert,
			heading : msg.heading,
			description : msg.description
	}

	mysql.queryDb("INSERT INTO alert SET ?", queryParam, function(err, response) {
		if (err) {
			console.log("Error while perfoming query !!!");
			callback({ status : 500, message : "Please try again later" });
		} else {
			callback({ status : 200, message : "Alert has been added Succesfully" });
		}
	});
	
}

// publish Alert
function publishAlert(msg,callback){
	var queryParam = {
			idguard : msg.idguard,
			idalert : msg.idalert,
			severity : msg.severity,
			date : msg.date
			
	}

	mysql.queryDb("INSERT INTO alertinfo SET ?", queryParam, function(err, response) {
		if (err) {
			console.log("Error while perfoming query !!!");
			callback({ status : 500, message : "Please try again later" });
		} else {
			callback({ status : 200, message : "Alert has been added Succesfully" });
		}
	});
}

//add petrol record
function addPatrolRecord(msg,callback){
	var queryParam = {
			date    : msg.date,
			description : msg.description,
			idgaurd   : msg.idgaurd,
			idbuilding : msg.idgaurd,
			idreport : msg.idreport
	}

	mysql.queryDb("INSERT INTO patrol SET ?", queryParam, function(err, response) {
		if (err) {
			console.log("Error while perfoming query !!!");
			callback({ status : 500, message : "Please try again later" });
		} else {
			callback({ status : 200, message : "Patrol record has been added Successfully" });
		}
	});
}

//find the guards who can be assigned to a building based on the schedule.
function getGuardsForAssignments(msg,callback){

	//TODO: Think whether we need to get from and to date for building to guard assignment
 	// var qry = "select * from guard where idguard "+
		// 	"not in (select s.idguard from gaurdbuildingschedule s, client c "+
		// 	"where s.from <= c.start_date " +
		// 	"and s.to >= c.end_date)";
	
	//As of now we are checking if the building release date after the guard schedule to date
	//then we can assign OTHER guards  
	//
	//If guard's schedule `to` date is after building release date then guard is already assigned
	//so show other guards
	var qry = "select * from guard g "+
			"join person p on g.idperson = p.idperson "+
			"where g.idguard not in (select s.idguard from gaurdbuildingschedule s, building b "+
			"where s.from <= current_date() " +
			"and s.to >= b.release_date) and LOWER(g.bgstatus) = 'done' "

	mysql.queryDb(qry,function(err,rows){
		if (err) {
			console.log("Error while listing all the guard details !!!"  + err);
			callback({ status : 500, message : "Error while listing guard details !!!" });
		} else {
			callback({ status : 200, data : rows});
		}
	});

}

//Get the client details for which the guards are not assigned to their building
function getPendingClients(msg,callback){
	mysql.queryDb("select c.idclient,p.idperson,b.idbuilding, "+
		"CONCAT(p.fname,' ',p.lname) as name,b.buildingname,CONCAT(p.address,' ',p.city) as address,b.no_of_guards,b.release_date "+
		"from building b "+
		"join client c on b.idclient = c.idclient "+
		"join person p on c.idperson = p.idperson "+
		"where b.guard_assign_status='PNDG' and no_of_guards > 0",function(err,rows){
		if (err) {
			console.log("Error while listing the pending client details !!!"  + err);
			callback({ status : 500, message : "Error while listing client details !!!" });
		} else {
			callback({ status : 200, data : rows});
		}
	});
}

function assignGuards(msg,callback){

	var guardDtls = msg.guardDtls;
	guardDtls.forEach(function(guard){

			var queryParam = {	
				from : dateutil.now(),
				to    : moment(msg.end_date).toDate(),
				idbuilding : msg.idbuilding,
				idguard : guard.idguard
			}

			mysql.queryDb("INSERT INTO gaurdbuildingschedule SET ?", queryParam, function(err, response) {
				if (err) {
					console.log("Error while perfoming query !!!" + err);
					callback({ status : 500, message : "Please try again later" });
				} else {
					mysql.queryDb("update building SET guard_assign_status='ASGN' where idbuilding = ?", msg.idbuilding, function(err, response) {
						if (err) {
							console.log("Error while perfoming query !!!" + err);
							callback({ status : 500, message : "Please try again later" });
						} else {
							
						}
					});
				}
			});
		
	});
	callback({ status : 200, message : "gaurdbuildingschedule records has been added Successfully" });
}