'use strict';
wfms.controller("ClientRegistrationController", function($scope, $modalInstance,$rootScope,DataService,$window,$http) {

	console.log("M I in this!");
	$scope.states= [
	                  { name: 'ALABAMA', abbreviation: 'AL'},
	                  { name: 'ALASKA', abbreviation: 'AK'},
	                  { name: 'AMERICAN SAMOA', abbreviation: 'AS'},
	                  { name: 'ARIZONA', abbreviation: 'AZ'},
	                  { name: 'ARKANSAS', abbreviation: 'AR'},
	                  { name: 'CALIFORNIA', abbreviation: 'CA'},
	                  { name: 'COLORADO', abbreviation: 'CO'},
	                  { name: 'CONNECTICUT', abbreviation: 'CT'},
	                  { name: 'DELAWARE', abbreviation: 'DE'},
	                  { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC'},
	                  { name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM'},
	                  { name: 'FLORIDA', abbreviation: 'FL'},
	                  { name: 'GEORGIA', abbreviation: 'GA'},
	                  { name: 'GUAM', abbreviation: 'GU'},
	                  { name: 'HAWAII', abbreviation: 'HI'},
	                  { name: 'IDAHO', abbreviation: 'ID'},
	                  { name: 'ILLINOIS', abbreviation: 'IL'},
	                  { name: 'INDIANA', abbreviation: 'IN'},
	                  { name: 'IOWA', abbreviation: 'IA'},
	                  { name: 'KANSAS', abbreviation: 'KS'},
	                  { name: 'KENTUCKY', abbreviation: 'KY'},
	                  { name: 'LOUISIANA', abbreviation: 'LA'},
	                  { name: 'MAINE', abbreviation: 'ME'},
	                  { name: 'MARSHALL ISLANDS', abbreviation: 'MH'},
	                  { name: 'MARYLAND', abbreviation: 'MD'},
	                  { name: 'MASSACHUSETTS', abbreviation: 'MA'},
	                  { name: 'MICHIGAN', abbreviation: 'MI'},
	                  { name: 'MINNESOTA', abbreviation: 'MN'},
	                  { name: 'MISSISSIPPI', abbreviation: 'MS'},
	                  { name: 'MISSOURI', abbreviation: 'MO'},
	                  { name: 'MONTANA', abbreviation: 'MT'},
	                  { name: 'NEBRASKA', abbreviation: 'NE'},
	                  { name: 'NEVADA', abbreviation: 'NV'},
	                  { name: 'NEW HAMPSHIRE', abbreviation: 'NH'},
	                  { name: 'NEW JERSEY', abbreviation: 'NJ'},
	                  { name: 'NEW MEXICO', abbreviation: 'NM'},
	                  { name: 'NEW YORK', abbreviation: 'NY'},
	                  { name: 'NORTH CAROLINA', abbreviation: 'NC'},
	                  { name: 'NORTH DAKOTA', abbreviation: 'ND'},
	                  { name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP'},
	                  { name: 'OHIO', abbreviation: 'OH'},
	                  { name: 'OKLAHOMA', abbreviation: 'OK'},
	                  { name: 'OREGON', abbreviation: 'OR'},
	                  { name: 'PALAU', abbreviation: 'PW'},
	                  { name: 'PENNSYLVANIA', abbreviation: 'PA'},
	                  { name: 'PUERTO RICO', abbreviation: 'PR'},
	                  { name: 'RHODE ISLAND', abbreviation: 'RI'},
	                  { name: 'SOUTH CAROLINA', abbreviation: 'SC'},
	                  { name: 'SOUTH DAKOTA', abbreviation: 'SD'},
	                  { name: 'TENNESSEE', abbreviation: 'TN'},
	                  { name: 'TEXAS', abbreviation: 'TX'},
	                  { name: 'UTAH', abbreviation: 'UT'},
	                  { name: 'VERMONT', abbreviation: 'VT'},
	                  { name: 'VIRGIN ISLANDS', abbreviation: 'VI'},
	                  { name: 'VIRGINIA', abbreviation: 'VA'},
	                  { name: 'WASHINGTON', abbreviation: 'WA'},
	                  { name: 'WEST VIRGINIA', abbreviation: 'WV'},
	                  { name: 'WISCONSIN', abbreviation: 'WI'},
	                  { name: 'WYOMING', abbreviation: 'WY' }
	              ];
	
	 $scope.getLocation = function(val) {
		    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
		      params: {
		        address: val,
		        sensor: false
		      }
		    }).then(function(response){
		      return response.data.results.map(function(item){
		        return {
		          location: item.geometry.location,
		          formatted_address: item.formatted_address
		        }
		      });
		    });
		  };
	$scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
	  };

		function isValidPostalCode(postalCode) {
			console.log("inside postal check");
	        var postalCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;
	        return postalCodeRegex.test(postalCode);
	    }
		
		function isSSN(ssn) {

	        var ssnRegex =  /^(?!000)(?!666)(?!9)\d{3}[- ]?(?!00)\d{2}[- ]?(?!0000)\d{4}$/;

	        return ssnRegex.test(ssn);

	     }
		function isValidPhone(phone)
		{
			var phoneRegex = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;
			return phoneRegex.test(phone);
		}
		function isValidateEmail(email) {
		    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		    return re.test(email);
		}
	
	  
$scope.register = function() {

	
		   if(!(isValidPostalCode($scope.zipcode))){
				console.log("inside invalid zip");
				$scope.formError = "Invalid Zipcode !!!";
			}
		  /* else if(!(isValidPhone($scope.phone)))
			   {
			   $scope.formError = "Invalid Phone Number!!!";
			   }*/
		   else if(!(isValidateEmail($scope.email)))
			   {
			   $scope.formError = "Invalid Email-Id!!!";
			   }
			else if(!(isSSN($scope.ssn))){
				console.log($scope.ssn);
				$scope.formError = "Invalid SSN Format !!!";
			}


			else {
				console.log("Inside register Funct"+$scope.firstname);
				console.log($scope.ssn + $scope.firstname + $scope.lastname + $scope.address.formatted_address + $scope.city + $scope.zipcode + $scope.email + $scope.number +  $scope.password +$scope.state);

		    if($scope.ssn &&
		    $scope.firstname &&
		    $scope.lastname && 
		    $scope.address.formatted_address &&
		    $scope.city &&
		    $scope.zipcode && 
		    $scope.email &&  $scope.number && 
		    $scope.password &&
		    $scope.state){
               
					console.log("Inside query");
				var params={
					
					fname : $scope.firstname,
					lname:  $scope.lastname,
					address : $scope.address.formatted_address,
					city : $scope.city,
					zipcode : $scope.zipcode,
					email : $scope.email,
					phonenumber : $scope.number,
					password : $scope.password,
					ssn : $scope.ssn,
					state : $scope.state,
					usertype: "CLNT"
						
				};
				console.log("Params value:" + JSON.stringify(params));
			DataService.postData("/api/register",params).success(function(response){
				console.log("email id exits"+response);
				$scope.formError=response.message;
				//$modalInstance.close(true);
			}).error(function(err){
				$modalInstance.dismiss(false);
			});
		

		
	}
		else{
			$scope.formError = "Form Invalid !!!";
				
			}
		};
	}

$scope.cancel = function() {
	$modalInstance.dismiss(false);
};
});

