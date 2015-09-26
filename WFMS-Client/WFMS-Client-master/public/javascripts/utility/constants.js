/**
 * URL Constants
 */
var urlConstants = {
	"LOGIN" : "/login",
	"SIGNUP" : "/api/user",
	"IS_LOGGED_IN" : "/api/user/valid",
	"GET_ALL_USERS" : "/api/user",
	"LOGOUT" : "/logout",
	"GET_USER_DETAILS" : "/api/user/",
	"GET_EMPLOYMENT_DETAILS":"/api/user/experience/",
	"GET_SUMMARY":"/api/user/summary/",
	"GET_EDUCATION_DETAILS":"/api/user/education/",
	"GET_SKILLS_DETAILS":"/api/user/skills/",
	"GET_COMPANIES":"/api/companies",
	"GET_INSTITUTIONS":"/api/institutions",
	"GET_SKILLS":"/api/skills",
	"ADD_EXPERIENCE" : "/api/user/experience",
	"ADD_EDUCATION" : "/api/user/education",
	"ADD_SKILLS" : "/api/user/skills",
	"UPDATE_USER_PROFILE" : "/api/user",
	"UPDATE_EXPERIENCE" : "/api/user/experience",
	"UPDATE_EDUCATION" : "/api/user/education",
	"UPDATE_SKILLS" : "/api/user/skills",
	"UPDATE_SUMMARY" : "/api/user/summary",
	"CHECK_CONNECTION" : "/api/connection/valid/",
	"CONNECT_USERS" : "/api/user/connection",
	"GET_USER_CONNECTION_REQUEST" : "/api/user/connection/requests/",
	"ACCEPT_CONNECTION_REQUEST" : "/api/user/connection/accept",
	"REJECT_CONNECTION_REQUEST" : "/api/user/connection/reject",
	"GET_ALL_CONNECTIONS" : "/api/user/connection/",
	"DELETE_EDUCATION" : "/api/user/education/",
	"DELETE_EMPLOYMENT" : "/api/user/experience/",
	"GET_ALL_GUARDS" : "/api/listAllGuards",
	"DELETE_GUARD":"/api/deleteGuard",
	"GET_ACTIVE_ADMIN_ALERTS":"/api/activeAdminAlerts",
	"DELETE_BUILDING":"/api/deleteBuilding/",
	"GET_ALL_CLIENTS":"/api/listAllClients",
	//Guard
	"GET_GUARD_DETAILS" : "/api/getGuardInfo/",
	"GET_GUARD_SCHEDULE" : "/api/getGuardSchedule/",
    "GET_GUARD_BUILDING" : "/api/getGuardBuilding/",
	"CREATE_ALERT" : "/api/createAlert",
	"ADD_PATROL" : "/api/addPatrolRecord",
	"GET_GUARD_BUILDING" : "/api/getGuardSchedule/",

	"GET_PNDG_CLIENTS":"/api/getPendingClients",
	"GET_GUARDS_ASSIGN":"/api/getGuardsForAssignments",
	"ASSIGN_GUARDS":"/api/assignGuards"

	
};

/**
 * Data Constants
 */
var dataConstants = {
		"MONTH_NAMES" : [ 'January', 'February', 'March', 'April', 'May', 'June',
		         			'July', 'August', 'September', 'October', 'November', 'December'] 
};