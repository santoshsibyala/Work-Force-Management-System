var dateutil = require('../util/dateutil'),
	moment = require('moment');
var mq_client = require('../rpc/client');

createAlert = function(req, res) {
	  console.log(JSON.stringify(req.body));
	  console.log("This Api will be adding the alert");
	  console.log("idbuilding" + req.body.idbuilding);
	  
	
	if(!req.body.idbuilding || !req.body.datemy || !req.body.idguard || !req.body.description || !req.body.timemy){	  
	    res.status(400).json({
	      status : 400,
	      message : "Bad Request Error"
	    });
	  } else {
		/*  
	    var queryParam = {
	      idbuilding : req.body.idbuilding,
	      severity : req.body.severity,
	      datemy : req.body.timemy,
	      idguard : req.body.idguard,
	      status : 'F',
	      seenByClient : 'F',
	      description : req.body.description,
	      time : req.body.timemy
	    };
	    mysql
	        .queryDb(
	            'SELECT idreport FROM wfms.report where ?? = ?',
	            [ 'date',req.body.timemy ],
	            function(err,resultIdReport) {
	              if (err) {
	                console.log("Error while perfoming query  !!!");
	                res.status(500).json({
	                  status : 500,
	                  message : "Please try again later"
	                });
	              } else {
	            	  console.log("resultIdReport"+ resultIdReport);
	                if (resultIdReport.length==0) {
	                  console.log(" first idreport "
	                      + resultIdReport);
	                  var queryParam = {
	                    idbuilding : req.body.idbuilding,
	                    date : req.body.timemy,
	                    idguard : req.body.idguard

	                  };
	                  mysql
	                      .queryDb(
	                          "INSERT INTO `wfms`.`report` SET ?",
	                          queryParam,
	                          function(err, result) {
	                            if (err) {
	                              console
	                                  .log("Error while perfoming query !!!");
	                              res
	                                  .status(500)
	                                  .json(
	                                      {
	                                        status : 500,
	                                        message : "Please try again later"
	                                      });
	                            } else {
	                            	console.log(result);
	                              var reportId = result.insertId;
	                              console.log("reportid on line 62:"+reportId);

	                              var data = {
	                                idbuilding : req.body.idbuilding,
	                                idreport : reportId,
	                                severity : req.body.severity,
	                                date : req.body.datemy,
	                                idguard : req.body.idguard,
	                                status : 'F',
	                                seenByClient : 'F',
	                                description : req.body.description,
	                                time : req.body.timemy
	                              }
	                              mysql
	                                  .queryDb(
	                                      "INSERT INTO `wfms`.`alertinfo` SET ?",
	                                      data,
	                                      function(
	                                          err,
	                                          rest) {
	                                        if (err) {
	                                          console
	                                              .log("Error while perfoming query- cant insert t alertinfo !!!");
	                                          res
	                                              .status(
	                                                  500)
	                                              .json(
	                                                  {
	                                                    status : 500,
	                                                    message : "Please try again later"
	                                                  });
	                                        } else {

	                                          res
	                                              .status(
	                                                  200)
	                                              .json(
	                                                  {
	                                                    status : 200,
	                                                    message : "Alert successfully inserted",
	                                                    resultPatrol : rest
	                                                  });
	                                        }
	                                      });

	                            }
	                          });
	                }

	                else {
	                  //console.log("idreport " + resultIdReport[0].idreport);
	                  var data2 = {
	                    idbuilding : req.body.idbuilding,
	                    idguard : req.body.idguard,
	                    date : req.body.datemy

	                  }
	                  mysql
	                      .queryDb(
	                          "INSERT INTO `wfms`.`report` SET ?",
	                          data2,
	                          function(err, resultAlert) {
	                            if (err) {
	                              console
	                                  .log("Error while perfoming query !!!");
	                              res
	                                  .status(500)
	                                  .json(
	                                      {
	                                        status : 500,
	                                        message : "Please try again later"
	                                      });
	                            } else {
	                              console
	                                  .log("idreport "
	                                      + resultIdReport[0].idreport);
	                              var data3 = {
	                                idbuilding : req.body.idbuilding,
	                                idreport : resultIdReport[0].idreport,
	                                severity : req.body.severity,
	                                date : req.body.datemy,
	                                idguard : req.body.idguard,
	                                status : 'F',
	                                seenByClient : 'F',
	                                description : req.body.description,
	                                time : req.body.timemy
	                              }
	                              mysql
	                                  .queryDb(
	                                      "INSERT INTO `wfms`.`alertinfo` SET ?",
	                                      data3,
	                                      function(
	                                          err,
	                                          resultAlert) {
	                                        if (err) {
	                                          console
	                                              .log("Error while perfoming query !!!");
	                                          res
	                                              .status(
	                                                  500)
	                                              .json(
	                                                  {
	                                                    status : 500,
	                                                    message : "Please try again later"
	                                                  });
	                                        } else {

	                                          res
	                                              .status(
	                                                  200)
	                                              .json(
	                                                  {
	                                                    status : 200,
	                                                    message : "Alert insertedSuccefully",
	                                                    resultAlert : resultAlert
	                                                  });
	                                        }
	                                      });

	                            }
	                            ;

	                          });

	                }
	                ;
	              }
	              ;
	            });*/
		  var msgPayload = {
					operation : "createAlert",
					message : req.body
				};

				mq_client.make_request('alert_queue',msgPayload,function(err,results){
					if(err){
						res.status(err.status).json(err);
					}else{
						res.status(results.status).json(results);
					}
				});
			}
		};


alertPerBuilding = function(req,res){
	console.log(JSON.stringify(req.body));
	console.log("This Api will be for fetching alerts according to buildings");
	console.log(req.params.idbuilding);
	if(!req.params.idbuilding){
		res.status(400).json({status : 400, message : "Bad Request"});
	} else /*{
		mysql.queryDb('SELECT wfms.alertinfo.severity, wfms.alertinfo.date, wfms.alertinfo.idalertInfo FROM wfms.alertinfo where ?? = ?;',['idbuilding',req.params.idbuilding],function(err,resultAlert){
			if (err) {
				res.status(500).json({ status : 500, message : "Error while retrieving data" });
			} else {
				res.status(200).json({ status : 200, resultAlert:resultAlert });
			}
		});
	}
}
*/
		 var msgPayload = {
			operation : "alertPerBuilding",
			message : {
				idbuilding :req.params.idbuilding
		}
	}

		mq_client.make_request('alert_queue',msgPayload,function(err,results){
			if(err){
				res.status(err.status).json(err);
			}else{
				res.status(results.status).json(results);
			}
		});
	};

alertPerClient = function(req,res){
	console.log(JSON.stringify(req.body));
	console.log("This Api will be for fetching alerts according to clients");
	console.log(req.params.idclient);
	if(!req.params.idclient){
		res.status(400).json({status : 400, message : "Bad RequestYes"});
	} else{
		 var msgPayload = {
			operation : "alertPerClient",
			message : {
				idclient: req.params.idclient,
				seenByClient : 'F'
			}
				
		}
	}

		mq_client.make_request('alert_queue',msgPayload,function(err,results){
			if(err){
				res.status(err.status).json(err);
			}else{
				res.status(results.status).json(results);
			}
		});
	};
		
		/*{
		mysql.queryDb('SELECT * FROM wfms.alertinfo left outer join wfms.building on ?? = ?? where ?? = ? AND ?? = ?;',['wfms.building.idbuilding','wfms.alertinfo.idbuilding','idclient',req.params.idclient,'seenByClient','F'],function(err,resultAlert){

			if (err) {
				res.status(500).json({ status : 500, message : "Error while retrieving data" });
			} else {
				res.status(200).json({ status : 200, message : "Report for Alert", resultAlert:resultAlert});
			}
		});
	}
}*/
		

seenByClient = function(req,res){

	console.log(JSON.stringify(req.body));
	console.log("This Api will be for changing the status of seenBy client");
	
	if(!req.body.idalertInfo || !req.body.seenByClient){
		res.status(400).json({status : 400, message : "Bad Request"});
	} else {
		
		 var msgPayload = {
					operation : "seenByClient",
					message : {
						idalertInfo : req.body.idalertInfo,
						seenByClient : 'T'
				}
			}

				mq_client.make_request('alert_queue',msgPayload,function(err,results){
					if(err){
						res.status(err.status).json(err);
					}else{
						res.status(results.status).json(results);
					}
				});
			}
};
		/*mysql.queryDb('UPDATE `wfms`.`alertinfo` SET ??= ? WHERE ?? = ?;',['seenByClient',req.body.seenByClient,'idalertInfo',req.body.idalertInfo],function(err,result){

			if (err) {
				res.status(500).json({ status : 500, message : "Error while retrieving data" });
			} else {
				res.status(200).json({ status : 200, message : "Alert Updated", result:result});
			}
		});
	}


};*/

alertPerDay = function(req,res){
	var date = String(req.params.date);
	var fromDate = date + " 00:00:00";
	var untilDate = String(req.params.date);
	untilDate = untilDate + " 23:59:59";
	

	
	console.log("This Api is for creating report based on date");
	if(!req.params.date){
		res.status(400).json({status : 400, message : "Bad Request"});
	}else{
		
		 var msgPayload = {
					operation : "alertPerDay",
					message : {
						date :date
				}
			}

				mq_client.make_request('alert_queue',msgPayload,function(err,results){
					if(err){
						res.status(err.status).json(err);
					}else{
						res.status(results.status).json(results);
					}
				});
			};
};
		/*var date = String(req.params.date);
		var fromDate = date + " 00:00:00";
		console
		var untilDate = String(req.params.date);
		untilDate = untilDate + " 23:59:59";
		
		mysql.queryDb("SELECT * FROM wfms.alertinfo where ?? LIKE '"+date+"%'",['date'], function(err, resultAlert) {
			if (err) {
				console.log("Error while perfoming query !!!");
				res.status(500).json({ status : 500, message : "Please try again later" });
			} else {
				
				res.status(200).json({ status : 200, message : "Report for Patrol", resultAlert:resultAlert});
			}
		});
	}
	
}*/




activeAdminAlerts= function(req,res){

	
	 var msgPayload = {
				operation : "activeAdminAlerts",
				message : {
					
			}
		}

			mq_client.make_request('alert_queue',msgPayload,function(err,results){
				if(err){
					res.status(err.status).json(err);
				}else{
					res.status(results.status).json(results);
				}
			});
		};
	/*mysql.queryDb('select * from alertinfo where status="F" ',function(err,rows){
=======
	mysql.queryDb('select alertinfo.*, building.buildingname, building.idclient,guard.idperson, client.idperson, personGuard.fname as guard_fname,personGuard.lname as guard_lname, personclient.fname as client_fname, personclient.lname as client_lname from alertinfo left join	building on alertinfo.idbuilding = building.idbuilding left join guard on alertinfo.idguard = guard.idguard	left join person as personGuard on guard.idperson = personGuard.idperson left join client on building.idclient = client.idclient left join person as personclient on client.idperson = personclient.idperson where status="F" ',function(err,rows){
>>>>>>> 94a53cbfc352deb6615f1c00b929aaca9b5c8f95
		if (err) {
			console.log("Error while listing all the guard details !!!"  + err);
			res.status(500).json({ status : 500, message : "Error while listing guard details !!!" });
		} else {
			res.status(200).json({ status : 200, data : rows});
		}
	});
};*/

seenByAdmin = function(req,res){

	console.log("***seen by admin"+JSON.stringify(req.body));
	console.log("This Api will be for changing the status alert when seen by admin");
	
	if(!req.body.idalertInfo){
		console.log("if if");
		res.status(400).json({status : 400, message : "Bad Request"});
	} else {
		console.log("in else");
		 var msgPayload = {
					operation : "seenByAdmin",
					message : {
						idalertInfo :req.body.idalertInfo,
						status : 'T'
				}
			}

				mq_client.make_request('alert_queue',msgPayload,function(err,results){
					if(err){
						res.status(err.status).json(err);
					}else{
						res.status(results.status).json(results);
					}
				});
			}
};
		/*mysql.queryDb('UPDATE `wfms`.`alertinfo` SET ??= ? WHERE ?? = ?;',['status','T','idalertInfo',req.body.idalertInfo],function(err,result){

			if (err) {
				res.status(500).json({ status : 500, message : "Error while retrieving data" });
			} else {
				res.status(200).json({ status : 200, message : "Alert Updated", result:result});
			}
		});
	}


};
*/



exports.alertPerDay = alertPerDay;
exports.alertPerClient = alertPerClient;
exports.alertPerBuilding = alertPerBuilding;
exports.createAlert = createAlert;
exports.activeAdminAlerts = activeAdminAlerts;
exports.seenByAdmin = seenByAdmin;
exports.seenByClient = seenByClient;
