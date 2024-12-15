var userId = ecm.model.desktop.userId;

require([
"icm/model/properties/controller/ControllerManager",
"icm/base/Constants"
], function(ControllerManager, Constants) {

var coordination = payload.coordination;
var editable = payload.caseEditable;
var model;
payload.coordination.participate(Constants.CoordTopic.BEFORELOADWIDGET,function(context, complete, abort) {

	 /*var serverBase = window.location.protocol + "\/\/" + window.location.host;
	   var feedURL = serverBase + "/RestWS/getReferenceNoByProductBranch?ntId="+userId;            
	   var branchDetails= "";            
	               
	      var xhrArgs = {            
	   		url: feedURL,                        
	   		handleAs: "json",
	   		sync: true,
	   		headers: { "Content-Type": "application/json"},            
	                   load: function(data){    
	                	  referenceNumber = data;
	                   } ,            
	                   error: function(error)            
	                   {            
	                       alert ("Filter query failed due to " + error);            
	                   }            
	               
	   		};            
	      dojo.xhrGet(xhrArgs);
	*/
model = {
properties: {
"BOC_BranchName": {
id: "BOC_BranchName",
name: "Branch Name",
type: "string",
cardinality: "single",
value: "BH035"
}, 

} };
var collectionController = ControllerManager.bind(editable);
collectionController.bind("External", "External", model);
complete();
});
// Participate in the AFTERLOADWIDGET topic to release the controller
binding.
payload.coordination.participate(Constants.CoordTopic.AFTERLOADWIDGE
T,
function(context, complete, abort) {
ControllerManager.unbind(editable);
complete();
});
});