try {
    var responseself = this;
    console.log("***** responseself *****");
    console.log(responseself);
    var coordination = payload.coordination;
        responseself.editable = payload.workItemEditable;
        var solution = responseself.solution;
        var prefix = solution.getPrefix();
        var userName = ecm.model.desktop.userDisplayName;
        var userId = ecm.model.desktop.userId;
        var role = ecm.model.desktop.currentRole.name;
        
        require(["icm/base/Constants","icm/model/properties/controller/ControllerManager"], function(Constants, ControllerManager){
        	
        	
        	coordination.participate(Constants.CoordTopic.AFTERLOADWIDGET, function(context, complete, abort) {
        		/* Obtain the controller binding for the editable. */
        		if(!responseself.hasOwnProperty('propsController')){
        		responseself.propsController = ControllerManager.bind(responseself.editable);
        		}
        		/* Call the coordination completion method. */
        		complete();
        		});
        	// Callbacks to clean up when the user completes or cancels the task creation
        	coordination.participate(Constants.CoordTopic.AFTERCANCEL, function(context, complete, abort) {
        	if (responseself.editable) {
        	ControllerManager.unbind(responseself.editable);
        	delete responseself.editable;
        	delete responseself.propsController;
        	}
        	complete();
        	});

        	coordination.participate(Constants.CoordTopic.AFTERCOMPLETE, function(context, complete, abort) {
        	if (responseself.taskEditable) {
        	ControllerManager.unbind(responseself.editable);
        	delete responseself.editable;
        	delete responseself.propsController;
        	}
        	complete();
        	});
        	coordination.participate(Constants.CoordTopic.VALIDATE, function(context, complete, abort) {
        		
        		var theController = responseself.propsController;
        		
        		if(role === "Credit Officer"){
        			if(context[Constants.CoordContext.WKITEMRESPONSE] === "SEND FOR CRIB APPROVAL"){
        				
        				   var propId = prefix + '_CRIBApproved';
        				   var cribpropId = prefix + '_CRIBFinalManager';
        				   var cribgrouppropId = prefix + '_CRIBManagerGroup';
        				   var value = theController.getPropertyController(propId).get("value");
        				   var cribprop = theController.getPropertyController(cribpropId).get("value");
        				//   var cribgroupprop = theController.getPropertyController(cribgrouppropId).get("value");
        				
        				   if(cribprop === null || cribprop === undefined || cribprop === ""){  
        					   abort({"message":"Please complete CRIB Approval path before sending it for CRIB APPROVAL"});		   
        				   }else if(value !== null && value !== undefined  && value !== false){
        					   abort({"message":"Crib Approval is already completed for this Loan Case"});
        				   }else{
        					   theController.endChangeSet();
        				      complete();
        				   }
        				   
        				 }else if (context[Constants.CoordContext.WKITEMRESPONSE] === "SEND FOR APPROVAL"){
        						
        					   var propId = prefix + '_ManagerApproved';
        					   var mgrpropId = prefix + '_FinalManager';
        					   var mgrgrouppropId = prefix + '_ManagerGroup';
        					   var value = theController.getPropertyController(propId).get("value");
        					   var mgrprop = theController.getPropertyController(mgrpropId).get("value");
        					 //  var mgrgroupprop = theController.getPropertyController(mgrgrouppropId).get("value");
        					
        					   if(mgrprop === null || mgrprop === undefined || mgrprop === ""){ 
        						   
        						   abort({"message":"Please complete Loan Approval path before sending it for LOAN APPROVAL"});		   
        					   }else if(value !== null && value !== undefined  && value !== false){
        						   abort({"message":"Loan Approval is already completed for this Loan Case"});
        					   }else{
        						   theController.endChangeSet();
        					      complete();
        					   }
        					   
        					 } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "SEND FOR VALUATION COMMENT"){
        							
        						   var propId = prefix + '_ValuationCommentApproved';
        						   var valuepropId = prefix + '_ValuationFinalManager';
        						   var valuegrouppropId = prefix + '_ValuationManagerGroup';
        						   var value = theController.getPropertyController(propId).get("value");
        						   var valueprop = theController.getPropertyController(valuepropId).get("value");
        						  // var valuegroupprop = theController.getPropertyController(valuegrouppropId).get("value");
        						
        						   if(valueprop === null || valueprop === undefined || valueprop === "" ){  
        							   abort({"message":"Please complete VALUATION COMMENT Approval path before sending it for VALUATION COMMENT"});		   
        						   }else if(value !== null && value !== undefined  && value !== false){
        							   abort({"message":"VALUATION COMMENT is already completed for this Loan Case"});
        						   }else{
        							   theController.endChangeSet();
        						      complete();
        						   }
        						   
        					 }else if (context[Constants.CoordContext.WKITEMRESPONSE] === "SEND FOR LEGAL"){
        						 var propId = prefix + '_LegalApproved';
        						 var value = theController.getPropertyController(propId).get("value");
        						 if(value !== null && value !== undefined  && value !== false){
        							abort({"message":"LEGAL is already completed for this Loan Case"});
        						 }else{
        							 theController.endChangeSet();
        							 complete();
        						 }
        			
        					 } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "REJECT"){
        						 theController.endChangeSet();
        						 complete();
        					 }
        					 else if (context[Constants.CoordContext.WKITEMRESPONSE] === "TERMINATE"){
        						 theController.endChangeSet();
        						 complete();
        					 }  else{
        				 
        				    complete();
        				 }
        			
        		}else if(role === "Approval"){
        			 if (context[Constants.CoordContext.WKITEMRESPONSE] === "RECOMMEND"){
        				 var cribpropId = prefix + '_CRIBFinalManager';
        				 var managerpropId = prefix + '_FinalManager';
        				 var valuationpropId = prefix + '_ValuationFinalManager';
        				 var currentpropId = prefix + '_CurrentApprover';
        				 var loanStatusId = prefix + '_LoanStatus';
        				 var crib = theController.getPropertyController(cribpropId).get("value");
        				 var manager = theController.getPropertyController(managerpropId).get("value");
        				 var valuation = theController.getPropertyController(valuationpropId).get("value");
        				 var current = theController.getPropertyController(currentpropId).get("value");
        				 var loanStatus = theController.getPropertyController(loanStatusId).get("value");
        				   if(crib === current && (loanStatus!==null && loanStatus.indexOf("CRIB") !== -1 )){  
        				      abort({"message":"Loan Case is in Final Approver step ,RECOMMEND not available"});
        				   }else if(manager === current && (loanStatus!==null && loanStatus.indexOf("Manager Approval") !== -1 )){
        					   abort({"message":"Loan Case is in Final Approver step ,RECOMMEND not available"});
        				   }else if(valuation === current && (loanStatus!==null && loanStatus.indexOf("Valuation") !== -1)){
        					   abort({"message":"Loan Case is in Final Approver step ,RECOMMEND not available"});  
        				   }
        				   else{
        				      complete();
        				   }
        			 }else if (context[Constants.CoordContext.WKITEMRESPONSE] === "APPROVE"){
        				 var cribpropId = prefix + '_CRIBFinalManager';
        				 var managerpropId = prefix + '_FinalManager';
        				 var valuationpropId = prefix + '_ValuationFinalManager';
        				 var currentpropId = prefix + '_CurrentApprover';
        				 var loanStatusId = prefix + '_LoanStatus';
        				 var crib = theController.getPropertyController(cribpropId).get("value");
        				 var manager = theController.getPropertyController(managerpropId).get("value");
        				 var valuation = theController.getPropertyController(valuationpropId).get("value");
        				 var current = theController.getPropertyController(currentpropId).get("value");
        				 var loanStatus = theController.getPropertyController(loanStatusId).get("value");
        				   if(crib !== current && (loanStatus!==null && loanStatus.indexOf("CRIB") !== -1 )){  
        				      abort({"message":"Loan Case is not in Final Approver step ,APPROVE not available"});
        				   }else if(manager !== current && (loanStatus!==null && loanStatus.indexOf("Manager Approval") !== -1 )){
        					   abort({"message":"Loan Case is not in Final Approver step ,APPROVE not available"});
        				   }else if(valuation !== current && (loanStatus!==null && loanStatus.indexOf("Valuation") !== -1)){
        					   abort({"message":"Loan Case is not in Final Approver step ,APPROVE not available"});  
        				   }
        				   else{
        				      complete();
        				   }
        			 } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "REJECT"){
        				 complete();
        			 }else{
        				 complete();
        			 }
        		}else{
        			complete();
        		}
        		
        	});		 
        		
        	
	
        });
 
        return payload;
 
}
catch (exception) {
    alert(exception);
}