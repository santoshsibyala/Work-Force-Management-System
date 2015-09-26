'use strict';
wfms.controller("AddGuardCtrl", function($scope, $modalInstance,
		 isEdit, $rootScope, DataService) {
	
	

	
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
	




	$scope.okay = function() {
		var ssn = $scope.idguard;
		console.log(ssn);
		var weeklyworkinghours = $scope.weekly_working_set;
		var first = $scope.start_date ;
		var second = $scope.end_date ;
		var phone = $scope.phonenumber;
		if(!(isSSN(ssn))){
			$scope.formError = "Invalid SSN Format !!!";
			}
		else if(!(checkWeeklyWorkingHours(weeklyworkinghours)))
			{
			$scope.formError = "Working hours should be number between 20-80!!!";
			}
		else if((compareDate(second,first))){
			$scope.formError = "start date cannot be greater then end date!!!";
			}
		else if(!(isValidPostalCode($scope.zipcode))){
			$scope.formError = "Invalid Zipcode!!!";
		}
		 else if(!(isValidateEmail($scope.email)))
		   {
		   $scope.formError = "Invalid Email-Id!!!";
		   }
		 else if(!(isValidPhone(phone)))
		   {
		   $scope.formError = "Invalid phonenumber !!!";
		   }
		else
			{
			$scope.formError ="";																																				
	if($scope.start_date && $scope.end_date && 
			$scope.fname && $scope.lname && $scope.bgstatus && $scope.weekly_working_set &&
			$scope.address && $scope.state && $scope.city && $scope.zipcode &&
			$scope.email && $scope.phonenumber){
			
		
	
			var params = {
					
					//idclient : $rootScope.userId,
					//idperson : isEdit.idperson,
					idguard : $scope.idguard,
					fname : $scope.fname,
					lname : $scope.lname,
					bgstatus : $scope.bgstatus,
					weekly_working_set : $scope.weekly_working_set,
					start_date : $scope.start_date,
					end_date : $scope.end_date,
					address : $scope.address,
					zipcode : $scope.zipcode,
					state : $scope.state,
					city : $scope.city,
					email : $scope.email,
					phonenumber : $scope.phonenumber,
					password : $scope.fname+$scope.lname,
					usertype : "Guard"
				};
			DataService.postData("/api/createGuard",params).success(function(response){
				$modalInstance.close(true);
			}).error(function(err){
				$scope.formError="Invalid Username/Password";
				console.log(formError+"response"+response.message);
				$modalInstance.dismiss(false);
			});
		}
			
	
	
	else{
		
		$scope.formError = "Required field missing";
	}
			}

};

$scope.cancel = function() {
	$modalInstance.dismiss(false);
};

function isSSN(ssn) {

    var ssnRegex = /^(?!000)(?!666)(?!9)\d{3}[- ]?(?!00)\d{2}[- ]?(?!0000)\d{4}$/;

    return ssnRegex.test(ssn);

 }

function checkWeeklyWorkingHours(weeklyworkinghours){

	 

	  return (!isNaN(weeklyworkinghours) && weeklyworkinghours > 20 && weeklyworkinghours <= 80)

	  }

function compareDate(first,second) {

    if(first>second){return false;}

    else{return true;}

}

function isValidPostalCode(postalCode) {
	console.log("inside postal check");
    var postalCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;
    return postalCodeRegex.test(postalCode);
}

function isValidateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function isValidPhone(phone)
{	if(phone>0)
	{
	var phoneRegex = /^\d{10}$/;
	return phoneRegex.test(phone);
	}
	return false;
}

});





