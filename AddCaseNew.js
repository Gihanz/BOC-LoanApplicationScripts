try {
var self = this;
var userName = ecm.model.desktop.userDisplayName;
var userId = ecm.model.desktop.userId;
var role = ecm.model.desktop.currentRole.name;
var solution = this.solution;
var prefix = solution.getPrefix();


if (payload.eventName === "icm.SendNewCaseInfo") {
/*Retrieve and cache the editable object and other props from this and payload*/
self.editable = payload.caseEditable;
self.pageId = self.page.id;
self.coordination = payload.coordination;
self.solutionPrefix = self.solution.prefix;
self.scope = "F_CaseFolder";
self.payload = payload;

var coordination = payload.coordination;

require(["icm/base/Constants", "icm/model/properties/controller/ControllerManager"], function(Constants, ControllerManager) {

coordination.participate(Constants.CoordTopic.BEFORELOADWIDGET, function(context, complete, abort) {
		/* Obtain the controller binding for the editable. */
		if(!self.hasOwnProperty('propsController')){
		self.propsController = ControllerManager.bind(self.editable);
		
		var uid = self.propsController.getPropertyController("BOC_CreditOfficer").get("value");
		if(uid === null || uid === undefined || uid === "" ){
		self.propsController.getPropertyController("BOC_CreditOfficer").set("value",ecm.model.desktop.userId);
		}
		}
		/* Call the coordination completion method. */
		complete();
		});
	
coordination.participate(Constants.CoordTopic.VALIDATE, function(context, complete, abort){

		if(context[Constants.CoordContext.CASE]){  
		   var branchCode = self.propsController.getPropertyController("BOC_BranchCode").get("value");
		   var productCode = self.propsController.getPropertyController("BOC_Product").get("value");
		  if((branchCode === null || branchCode === undefined || branchCode === "") && (productCode === null || productCode === undefined || productCode === "")){
		      abort({"message":"Please check branchCode and productCode before adding the case."});
		   }else{  
			 var referenceNumber =  self.propsController.getPropertyController("BOC_ReferenceNumber").get("value"); 
			 if(referenceNumber != null || referenceNumber != undefined || referenceNumber != ""){
					   
					   self.propsController.getPropertyController("BOC_ReferenceNumber").set("value",referenceNumber); 
					   
					   var messageDialog = new ecm.widget.dialog.MessageDialog({
						    text: "<b>Case Added Successfully</b>- Please refer Application Number : <font size='3' color='blue'> "+ referenceNumber+"<font>"
						});
						messageDialog.show();
			    	 
						
			      }    
		      complete();
		   }
		 }else{
			
		    complete();
		 }
		 });		

// Callbacks to clean up when the user completes or cancels the task creation
coordination.participate(Constants.CoordTopic.AFTERCANCEL, function(context, complete, abort) {
if (self.editable) {
ControllerManager.unbind(self.editable);
delete self.editable;
delete self.pageId;
delete self.propsController;
delete self.coordination;
delete self.solutionPrefix;
delete self.payload;
}
complete();
});

coordination.participate(Constants.CoordTopic.AFTERCOMPLETE, function(context, complete, abort) {
if (self.taskEditable) {
ControllerManager.unbind(self.editable);
delete self.editable;
delete self.pageId;
delete self.propsController;
delete self.coordination;
delete self.solutionPrefix;
delete self.payload;
}
complete();
});

});
}
else if (payload.eventName === "icm.FieldUpdated") {

	
	var branchCode = prefix +'_BranchCode';
	var productCode = prefix +'_Product';
	var changedProperty = payload.change.id; 
	
	if(changedProperty === branchCode || changedProperty === productCode ) {
		
	var propertyController =  self.propsController;
	var referenceNumber =  propertyController.getPropertyController("BOC_ReferenceNumber").get("value"); 	
	if(referenceNumber === null || referenceNumber === undefined || referenceNumber === "" ){
		 var branch = propertyController.getPropertyController(branchCode).get("value");
		  var product = propertyController.getPropertyController(productCode).get("value");
		  
		 if( (branch != null && branch != undefined && branch != "" ) &&
				 (product != null && product != undefined && product != "" )){
			 
			 var serverBase = window.location.protocol + "\/\/" + window.location.host;
			   var feedURL = serverBase + "/RestWS/getReferenceNoByProductBranch?branchCode=" + branch+"&productName="+product;            
			    referenceNumber= "";            
			               
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
			      
			      if(referenceNumber != null || referenceNumber != undefined || referenceNumber != ""){
			    	  var messageDialog = new ecm.widget.dialog.MessageDialog({
						    text: "product"+product+"branch "+branch+"<b>Case Added Successfully</b>- Please refer Application Number : <font size='3' color='blue'> "+ referenceNumber+"<font>"
						});
						messageDialog.show();
			    	 
					   propertyController.getPropertyController("BOC_ReferenceNumber").set("value",referenceNumber); 
				}
			 }
		}	
	  }
	
}
}
catch (Error) {
alert ("Source Module: " + self.name + "\r\n\r\n"+Error.name+" - "+Error.description+"\r\n"+Error.message);
}