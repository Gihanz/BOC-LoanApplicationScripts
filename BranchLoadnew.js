console.log(this.name,": ",payload);

require(["icm/base/Constants", "icm/model/properties/controller/ControllerManager"], function(Constants, ControllerManager) {
  
   var solutionPrefix = payload.caseType.getSolution().getPrefix();
   var coordination = payload.coordination;
   var editable = payload.caseEditable;

   var theProperty = solutionPrefix + "_CaseStage";

 
   coordination.participate(Constants.CoordTopic.BEFORELOADWIDGET, function(context, complete, abort) {
	   
	   var serverBase = window.location.protocol + "\/\/" + window.location.host;
	   var feedURL = serverBase + "/RestWS/getBranchByUserId?ntId="+userId;            
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
	                       alert ("branchDetails query failed due to " + error);            
	                   }            
	               
	   		};            
	      dojo.xhrGet(xhrArgs);
	   if(branchDetails !=null && branchDetails != undefined){
      var collectionController = ControllerManager.bind(editable);
      collectionController.beginChangeSet();
      collectionController.getPropertyController("BOC_BranchName").set("value", branchDetails.branchName);
      collectionController.getPropertyController("BOC_BranchName").set("readOnly", true);
      collectionController.getPropertyController("BOC_BranchCode").set("value", branchDetails.branchCode);
      collectionController.getPropertyController("BOC_BranchCode").set("readOnly", true);
      collectionController.endChangeSet();
      complete();
      
   		}
   });

   coordination.participate(Constants.CoordTopic.AFTERLOADWIDGET, function(context, complete, abort) {
      ControllerManager.unbind(editable);
      complete();
   });
});

	Virus-free. www.avast.com
