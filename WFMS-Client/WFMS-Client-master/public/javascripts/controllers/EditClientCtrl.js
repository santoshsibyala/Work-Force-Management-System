'use strict';
wfms.controller("EditClientCtrl", function($scope, $modalInstance,
                 isEdit, $rootScope, DataService,$http) {




                var country= [

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




        if (isEdit) {
                console.log("isEdit for the idperson: "+isEdit.idperson);
                //$scope.idperson = isEdit.idperson;
                $scope.firstname =isEdit.fname;
                $scope.lastname =isEdit.lname;
                $scope.start_date=isEdit.start_date;
                $scope.end_date = isEdit.end_date;
                $scope.address = isEdit.address;
                $scope.city=isEdit.city;
                $scope.zipcode=isEdit.zipcode;
                $scope.email=isEdit.email;
                $scope.phonenumber=isEdit.phonenumber;
                $scope.idperson = isEdit.idperson;

        } else {
                $scope.firstname ="";
                $scope.lastname = "";
                $scope.start_date="";
                $scope.end_date = "";
                $scope.address = "";
                $scope.city="",
                $scope.zipcode="",
                $scope.email="",
                $scope.phonenumber="",
                $scope.idperson=""
        };



        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
          };



$scope.okay = function() {
        if($scope.firstname &&
        $scope.lastname &&
        $scope.start_date &&
        $scope.end_date &&
        $scope.address &&
        $scope.city &&
        $scope.zipcode &&
        $scope.email &&
        $scope.phonenumber){

                if (isEdit) {
                        console.log(isEdit);


                        var paramsPerson = {
                                        fname: $scope.firstname,
                                        lname: $scope.lastname,
                                        address: $scope.address,
                                        city:  $scope.city,
                                        zipcode: $scope.zipcode,
                                        email: $scope.email,
                                        state : $scope.state,
                                        phonenumber: $scope.phonenumber,
                                        idperson: $scope.idperson

                                };
                        DataService.putData("/api/editPerson",paramsPerson).success(
                                function(response) {
                                        console.log("Login Successful");

                                        var params = {
                                        idperson: $scope.idperson,
                                        start_date:$scope.start_date,
                                        end_date : $scope.end_date
                                        };

                                        DataService.putData('api/updateClient', params)
                                        .success(function(response) {
                                                console.log($scope.start_date+" "+$scope.end_date);
                                                $modalInstance.close(true);
                                        }).error(function(err) {
                                                $modalInstance.close(false);
                                        });

                                                }).error(function(err) {
                                        console.log("Error while fetching data");

                        });
}

                else {

                        var params = {

                                        //idclient : $rootScope.userId,
                                        idclient : 1,
                                        start_date:$scope.start_date,
                                        end_date : $scope.end_date,
                                        buildingname:  $scope.buildingname,
                                        address : $scope.address,
                                        no_of_guards: $scope.no_of_guards,
                                        checkpoint : $scope.checkpoint

                                };
                        DataService.postData("/api/updateClient",params).success(function(response){
                                $modalInstance.close(true);
                        }).error(function(err){
                                $modalInstance.dismiss(false);
                        });
                }
        }

        else{

                $scope.formError = "Form Invalid !!!";
        }

};

$scope.cancel = function() {
        $modalInstance.dismiss(false);
};


});