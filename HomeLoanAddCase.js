var coord = payload.coordination;
var caseEdit = payload.caseEditable;
var solution = this.solution;
var prefix = solution.getPrefix();
var userId = ecm.model.desktop.userId;

require(["icm/base/Constants", "icm/model/properties/controller/ControllerManager"], function(Constants, ControllerManager){

if(coord){

coord.participate(Constants.CoordTopic.BEFORELOADWIDGET, function(context, complete, abort) {
		/* Obtain the controller binding for the editable. */
	if(userId !=null ){
		var theController  = ControllerManager.bind(caseEdit);
		var branchCode = prefix +'_BranchCode';
		var branchName = prefix +'_BranchName';
		
		var rlc = prefix +'_RLC';
		var rlcCode = prefix +'_RLCCode';
		var branchContactNumber = prefix +'_BranchContactNumber';
		
		var branchCodeprop = theController.getPropertyController(branchCode);
		var branchNameprop = theController.getPropertyController(branchName);
		
		var rlcprop = theController.getPropertyController(rlc);
		var rlcCodeprop = theController.getPropertyController(rlcCode);
		var branchContactNumberprop = theController.getPropertyController(branchContactNumber);
	
		
		if(branchCodeprop.get("value") === null || branchCodeprop.get("value") === "" || branchCodeprop.get("value") === null || branchCodeprop.get("value") === "" ){
		var serverBase = window.location.protocol + "\/\/" + window.location.host;
		var feedURL = serverBase + "/RestWS/getRLCBranchDetailsByUserId?userId="+userId; 
		var branch = "";
			
			var xhrArgs = {            
		   		url: feedURL,                        
		   		handleAs: "json",
		   		sync: true,
		   		preventCache: true,
		   		headers: { "Content-Type": "application/json"},            
		                   load: function(data){    
		                	   branch = data;
		                   } ,            
		                   error: function(error)            
		                   {            
		                       alert ("Filter query failed due to " + error);            
		                   }            
		               
		   		};            
		      dojo.xhrGet(xhrArgs);
		      
		      if(branch.branchCode != null && branch.branchCode != undefined && branch.branchCode != ""){   
		    	  branchCodeprop.set("value",branch.branchCode);
		      }
		      if(branch.branchName != null && branch.branchName != undefined && branch.branchName != ""){   
		    	  branchNameprop.set("value",branch.branchName);
		      }
			  if(branch.rlcName != null && branch.rlcName != undefined && branch.rlcName != ""){   
		    	  rlcprop.set("value",branch.rlcName);
		      }
			  if(branch.rlcCode != null && branch.rlcCode != undefined && branch.rlcCode != ""){   
		    	  rlcCodeprop.set("value",branch.rlcCode);
		      }
			  if(branch.branchContactNo != null && branch.branchContactNo != undefined && branch.branchContactNo != ""){   
		    	  branchContactNumberprop.set("value",branch.branchContactNo);
		      }
		}	 
		/* Call the coordination completion method. */
		 ControllerManager.unbind(caseEdit);
		complete();
	}
});

coord.participate(Constants.CoordTopic.BEFORESAVE, function(context, complete, abort){
	if(context[Constants.CoordContext.CASE]){
	   var theController = ControllerManager.bind(caseEdit);   
	   var branchCode = theController.getPropertyController("BOC_BranchCode").get("value");
	   var productCode = theController.getPropertyController("BOC_Product").get("value");
	   var referenceProp=theController.getPropertyController("BOC_ReferenceNumber");

	  if((branchCode != null && branchCode != undefined && branchCode != "") && (productCode != null && productCode != undefined && productCode != "")){

		if(referenceProp.get("value") === null || referenceProp.get("value") === undefined && referenceProp.get("value") === ""){
	    var serverBase = window.location.protocol + "\/\/" + window.location.host;
		   var feedURL = serverBase + "/RestWS/getReferenceNoByProductBranch?branchCode=" + branchCode+"&productName="+productCode;            
		   var referenceNumber= "";            
		               
		      var xhrArgs = {            
		   		url: feedURL,                        
		   		handleAs: "text",
		   		sync: true,
		   		preventCache: true,
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
				   
				   referenceProp.set("value",referenceNumber); 
				   
				   var messageDialog = new ecm.widget.dialog.MessageDialog({
					    text: "<b>Case Added Successfully</b>- Please refer Application Number : <font size='3' color='blue'> "+ referenceNumber+"<font>"
					});
					messageDialog.show();
		    	 
					
		      }    
		}
		
		complete();
	   }else{
		   
		   abort({"message":"Please check branchCode and productCode before adding the case."});
	   }
	  
	  ControllerManager.unbind(caseEdit);
	 
	  
	 }else{
		
	    complete();
	 }
	
	 });

}
});