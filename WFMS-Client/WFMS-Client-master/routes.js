var loginController = require('./controllers/login');
var clientController = require('./controllers/client');
var adminController = require('./controllers/admin');
var reportController = require('./controllers/report');
var alertController = require('./controllers/alert');
var guardController = require('./controllers/guard');
var buildingController = require('./controllers/building');
var cache = require('./controllers/cache');

module.exports = function (app, passport) {

    // Home
    app.get('/', function(req,res){ res.render("index"); });
    app.get(['/home','/logout'], ensureAuthenticated, function(req,res){ req.session.destroy();res.render("index"); });

    // Auth
    app.post('/api/register', loginController.register);
    app.get('/api/login', function(req,res){ res.render("index"); });
    app.post('/api/login', loginController.checkLogin);
    app.get('/api/loggedin',loginController.loggedin);
    app.get('/api/logout', loginController.logout);
    
    // Client
    app.get('/api/getClient/:idperson', ensureAuthenticated, clientController.getClient);
    app.get('/api/listAllClients', ensureAuthenticated, checkCache,clientController.listAllClients);
    app.put('/api/updateClient', ensureAuthenticated, clientController.updateClient);
    app.post('/api/createClient', ensureAuthenticated, clientController.createClient);
    app.delete('/api/deleteClient/:idperson', ensureAuthenticated, clientController.deleteClient);
    app.post('/api/updateClientBillingInfo', ensureAuthenticated, clientController.updateClientBillingInfo);
    app.get('/api/getClientInfo/:idperson', ensureAuthenticated, clientController.getClientInfo);
    

    // Admin
    //app.post('/api/createAlert' ,adminController.createAlert);
    app.post('/api/publishAlert',adminController.publishAlert);
    app.post('/api/addPatrol',adminController.addPatrol);
    
    //app.put('/api/createReport',reportController.createReport);
    app.get('/api/getPendingClients', ensureAuthenticated, adminController.getPendingClients);
    app.get('/api/getGuardsForAssignments',ensureAuthenticated, adminController.getGuardsForAssignments);
    app.post('/api/assignGuards',ensureAuthenticated, adminController.assignGuards);
    
    //Rishabh
    app.post('/api/createReport', ensureAuthenticated, reportController.createReport);
    app.get('/api/reportPerBuilding/:idbuilding', ensureAuthenticated, reportController.reportPerBuilding);
    app.post('/api/reportPerClientPerBuilding/', ensureAuthenticated, checkCache ,reportController.reportPerClientPerBuilding);
    app.get('/api/reportPerClient/:idclient', ensureAuthenticated, reportController.reportPerClient);
    app.get('/api/reportPerDay/:date', ensureAuthenticated, reportController.reportPerDay);
    app.get('/api/reportPerGuard/:idguard', ensureAuthenticated, reportController.reportPerGuard);
    app.get('/api/alertByidalertInfo/:idalertInfo', ensureAuthenticated, reportController.alertByidalertInfo);
    app.post('/api/createAlert', ensureAuthenticated, alertController.createAlert);
    app.get('/api/alertPerBuilding/:idbuilding', ensureAuthenticated, alertController.alertPerBuilding);
    app.get('/api/alertPerClient/:idclient', ensureAuthenticated, alertController.alertPerClient);
    app.get('/api/alertPerDay/:date', ensureAuthenticated, alertController.alertPerDay);
    

    app.put('/api/alert/seenByClient', ensureAuthenticated, alertController.seenByClient);
    app.put('/api/alert/seenByAdmin', ensureAuthenticated, alertController.seenByAdmin);
    app.get('/api/reportDataPerClient', ensureAuthenticated, checkCache,reportController.reportDataPerClient);
    app.get('/api/reportDataPerClientClient/:idclient', ensureAuthenticated, reportController.reportDataPerClientClient);
    app.get('/api/activeAdminAlerts', ensureAuthenticated, alertController.activeAdminAlerts);
    app.put('/api/editPerson', ensureAuthenticated, adminController.editPerson);
    
    //Guard
  //tested with rabbit mq
    app.post('/api/createGuard', ensureAuthenticated, guardController.createGuard);
  //tested with rabbit mq
    app.put('/api/updateGuard/:idguard', ensureAuthenticated, guardController.updateGuard);
    //tested with rabbit mq
    app.delete('/api/deleteGuard/:idguard', ensureAuthenticated, guardController.deleteGuard);
    //tested with rabbit mq
    
    //without cache
    app.get('/api/listAllGuards', ensureAuthenticated,guardController.listAllGuards);
 //With cache
 //   app.get('/api/listAllGuards', ensureAuthenticated, checkCache,guardController.listAllGuards);
   //tested with rabbit mq
    app.get('/api/getGuard/:idguard', ensureAuthenticated, guardController.getGuard);
   //tested with rabbit mq
    app.get('/api/searchGuard',ensureAuthenticated, guardController.searchGuard);

    
    app.get('/api/getGuardSchedule/:idguard', guardController.getGuardSchedule);
    app.get('/api/getGuardBuilding/:idguard', guardController.getGuardSchedule);
    //Guard
    app.get('/api/getGuardInfo/:idperson', ensureAuthenticated, guardController.getGuardInfo);
    //Building 
    app.post('/api/addPatrolRecord', ensureAuthenticated, guardController.addPatrolRecord);
   // app.post('/api/createAlertGuard', ensureAuthenticated, guardController.createAlert);


    //app.get(('/api/getBuildingClientReport/:idperson', buildingController.getBuildingClientReport);

    app.get('/api/getBuildingClientReport/:idperson', buildingController.getBuildingClientReport);

    app.get('/api/listBuilding/:idperson', buildingController.getBuilding);
    app.post('/api/createBuilding', buildingController.createBuilding);
    app.put('/api/editBuilding', buildingController.editBuilding);
    app.delete('/api/deleteBuilding/:buildingid', buildingController.deleteBuilding);

    
    //Get person Info
    
    app.get('/api/getPersonInfo/:idperson', ensureAuthenticated, clientController.getPersonInfo);

    
    //Elastick beanstalk healthcheck
    app.get('/health',function(req,res){ res.send(200); });
    
    app.get('/templates/:file',function(req,res){
        var file = req.params.file;
        res.render('templates/' + file);
    });

    //For Admin templates
    app.get('/templates/admin/:file',function(req,res){
        var file = req.params.file;
        res.render('templates/admin/' + file);
    });

    //For Index templates
    app.get('/templates/index/:file',function(req,res){
        var file = req.params.file;
        res.render('templates/index/' + file);
    });

    //Auth Middleware
    function ensureAuthenticated(req, res, next) {
       //if (req.isAuthenticated()) 
    	//{ 
            return next(); 

            //Rishabh Sanghvi
//        } else {
//          res.redirect('/login');
//          res.status(401).json({message : "Unauthorized access !!"}); 
//
//       } 
       }

    function checkCache(req,res,next){
        console.log("checkCache");
        cache.getCachedData(req.originalUrl,function(err,data){
            if(err){
                console.log(err);
                next();
            } else {
                if(data){
                    console.log("CACHE HIT");
                    res.status(data.status).json(data);
                } else {
                    console.log("CACHE MISSED");
                    next();
                }
            }
        });
    }
};
