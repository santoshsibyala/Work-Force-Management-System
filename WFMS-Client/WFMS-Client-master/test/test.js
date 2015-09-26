var assert = require("assert"); // node.js core module
var should = require('should'); 
var request = require("supertest");

// describe('Array', function(){
//   describe('#indexOf()', function(){
//     it('should return -1 when the value is not present', function(){
//       assert.equal(-1, [1,2,3].indexOf(4)); // 4 is not present in this array so indexOf returns -1
//     })
//   })
// });

describe('Clients', function() {
	var url = 'http://localhost:3000';
	describe('List all',function(){
		it('should return success after fetching all client list', function(done) {
      
	    // once we have specified the info we want to send to the server via POST verb,
	    // we need to actually perform the action on the resource, in this case we want to 
	    // POST on /api/profiles and we want to send some info
	    // We do this using the request object, requiring supertest!
	    request(url)
		.get('/api/listAllClients')
		.expect(200)
		.expect('Content-Type', /json/)
		
	    // end handles the response
		.end(function(err, res) {
	          if (err) {
	            throw err;
	          }
	          // this is should.js syntax, very clear
	         
	         	res.body.status.should.equal(200);
	          done();
	        });
	    });
		});
	describe('Create',function(){
		it('should return success after Create client', function(done) {
      
	    // once we have specified the info we want to send to the server via POST verb,
	    // we need to actually perform the action on the resource, in this case we want to 
	    // POST on /api/profiles and we want to send some info
	    // We do this using the request object, requiring supertest!
	    request(url)
		.get('/api/listAllClients')
		.expect(200)
		.expect('Content-Type', /json/)
		
	    // end handles the response
		.end(function(err, res) {
	          if (err) {
	            throw err;
	          }
	          // this is should.js syntax, very clear
	         
	         	res.body.status.should.equal(200);
	          done();
	        });
	    });
		});
	describe('Update',function(){
		it('should return success after updating the client of client', function(done) {
      	var profile = {
        	idperson : '89',
			start_date : "2015-12-12",
			end_date : "2016-12-12",
			idclient : '89'
      };
	    // once we have specified the info we want to send to the server via POST verb,
	    // we need to actually perform the action on the resource, in this case we want to 
	    // POST on /api/profiles and we want to send some info
	    // We do this using the request object, requiring supertest!
	    request(url)
		.put('/api/updateClient')
		.send(profile)
		.expect(200)
		
		
	    // end handles the response
		.end(function(err, res) {
	          if (err) {
	            throw err;
	          }
	          // this is should.js syntax, very clear
	         
	         	res.body.status.should.equal(200);

	          done();
	        });
	    });
		});
	describe('Delete Client',function(){
		it('should return success after deletion of client', function(done) {
      	var profile = {
        	idperson : 1
			
      	};
	    // once we have specified the info we want to send to the server via POST verb,
	    // we need to actually perform the action on the resource, in this case we want to 
	    // POST on /api/profiles and we want to send some info
	    // We do this using the request object, requiring supertest!
	    request(url)
	    
		.delete('/api/deleteClient/91')
		.expect(200)
		
		
	    // end handles the response
		.end(function(err, res) {
	          if (err) {
	            throw err;
	          }
	          // this is should.js syntax, very clear
	         
	         	res.body.status.should.equal(200);
	         	res.body.message.should.not.equal(null);
	          done();
	        });
	    });
		})
    
});

describe('Guard', function() {
	var url = 'http://localhost:3000';
	describe('List all',function(){
		it('should return success after fetching all Guard list', function(done) {
      
	    // once we have specified the info we want to send to the server via POST verb,
	    // we need to actually perform the action on the resource, in this case we want to 
	    // POST on /api/profiles and we want to send some info
	    // We do this using the request object, requiring supertest!
	    request(url)
		.get('/api/listAllGuards')
		.expect(200)
		.expect('Content-Type', /json/)
		
	    // end handles the response
		.end(function(err, res) {
	          if (err) {
	            throw err;
	          }
	          // this is should.js syntax, very clear
	         
	         	res.body.status.should.equal(200);
	          done();
	        });
	    });
		});
	describe('Create',function(){
		it('should return success after creating of Guard', function(done) {
      
	    // once we have specified the info we want to send to the server via POST verb,
	    // we need to actually perform the action on the resource, in this case we want to 
	    // POST on /api/profiles and we want to send some info
	    // We do this using the request object, requiring supertest!
	    request(url)
		.get('/api/listAllGuards')
		.expect(200)
		.expect('Content-Type', /json/)
		
	    // end handles the response
		.end(function(err, res) {
	          if (err) {
	            throw err;
	          }
	          // this is should.js syntax, very clear
	         
	         	res.body.status.should.equal(200);
	          done();
	        });
	    });
		});
	describe('Update',function(){
		it('should return success after updating the client of client', function(done) {
      	var profile = {
        	weekly_working_set : 20,
			bgstatus: 'in progress',
			start_date :'2015-12-12', 
			end_date : '2015-12-12'
      };
	    // once we have specified the info we want to send to the server via POST verb,
	    // we need to actually perform the action on the resource, in this case we want to 
	    // POST on /api/profiles and we want to send some info
	    // We do this using the request object, requiring supertest!
	    request(url)
		.put('/api/updateGuard/111-11-1111')
		.send(profile)
		.expect(200)
		
		
	    // end handles the response
		.end(function(err, res) {
	          if (err) {
	            throw err;
	          }
	          // this is should.js syntax, very clear
	         
	         	res.body.status.should.equal(200);

	          done();
	        });
	    });
		});
	// describe('Delete Guard',function(){
	// 	it('should return success after deletion of guard', function(done) {
 //      	var profile = {
 //        	idperson : 1001
			
 //      	};
	//     // once we have specified the info we want to send to the server via POST verb,
	//     // we need to actually perform the action on the resource, in this case we want to 
	//     // POST on /api/profiles and we want to send some info
	//     // We do this using the request object, requiring supertest!
	//     request(url)
	    
	// 	.delete('/api/deleteGuard/10')
	// 	.expect(200)
		
		
	//     // end handles the response
	// 	.end(function(err, res) {
	//           if (err) {
	//             throw err;
	//           }
	//           // this is should.js syntax, very clear
	         
	//          	res.body.status.should.equal(500);
	         	
	//           done();
	//         });
	//     });
	// 	})
    
});