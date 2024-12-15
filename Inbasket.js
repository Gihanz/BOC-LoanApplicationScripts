
try {
	
var solutionPrefix = this.solution.getPrefix();
var role = ecm.model.desktop.currentRole.name;
var userName = ecm.model.desktop.userDisplayName;
var userId = ecm.model.desktop.userId;
var serverBase = window.location.protocol + "\/\/" + window.location.host;
var feedURL = serverBase + "/RestWS/getBranchWorklistByUserId?userId=" + userId;            
var filterData= "";            
            
   var xhrArgs = {            
		url: feedURL,                        
		handleAs: "json",
		sync: true,
		headers: { "Content-Type": "application/json"},            
                load: function(data){    
					filterData = data;
                } ,            
                error: function(error)            
                {            
                    alert ("Filter query failed due to " + error);            
                }            
            
		};            
   dojo.xhrGet(xhrArgs);



if(role === "Approval")     {
	
	var filter = "(";	
	if(filterData.branchCode != null && filterData.branchCode != undefined && filterData.branchCode.length > 0){
		
		filter=filter+"(";
		for(var i =0;i<filterData.branchCode.length;i++){
			
			if(filterData.branchCode[i+1] != undefined && filterData.branchCode[i+1] != ""){
				filter= filter+"BOC_BranchCode =:A"+ " OR ";	
			}else if(filterData.branchCode[i] != undefined && filterData.branchCode[i] != ""){
				filter= filter+"BOC_BranchCode =:A ";
			}
			
			
		}
		
		filter=filter+")";
	}
	if(filterData.productCategoryId != null && filterData.productCategoryId != undefined && filterData.productCategoryId.length > 0){
		filter=filter+" AND ( ";
		for(var i =0;i<filterData.productCategoryId.length;i++){
			if(filterData.productCategoryId[i+1] != undefined && filterData.productCategoryId[i+1] != ""){
				filter= filter+"BOC_ProductCategory =:A "+ " OR ";	
			}else if(filterData.productCategoryId[i] != undefined && filterData.productCategoryId[i] != ""){
				filter= filter+"BOC_ProductCategory =:A ";
			}
			
		}
		
		filter=filter+")";
	}

	if(filterData.roleName != null && filterData.roleName != undefined && filterData.roleName.length > 0 ){
		filter=filter+" AND ( ";
		
		for(var i =0;i<filterData.roleName.length;i++){	
			if(filterData.roleName[i+1] != undefined && filterData.roleName[i+1] != ""){
				filter= filter+"BOC_CurrentApprover =:A "+ " OR ";	
			}else if(filterData.roleName[i] != undefined && filterData.roleName[i] != ""){
				filter= filter+"BOC_CurrentApprover =:A ";
			}
			
		}
		
		filter=filter+")";
	}	

	filter=filter+")";
	
if(filter.length >2){
	
var managerFilterQuery = {
"queueName": solutionPrefix+"_"+"Approval",
"inbasketName":"Approval",
"hideFilterUI":false,
"queryFilter": filter,
"queryFields": [
     {
        "name": "BOC_BranchCode",
        "type": "xs:string",
        "value":filterData.branchCode
      },
	  
	  {
        "name": "BOC_ProductCategory",
        "type": "xs:string",
        "value": filterData.productCategoryId
      },
	  
	  {
        "name": "BOC_CurrentApprover",
        "type": "xs:string",
        "value": filterData.roleName
      }
],
"hideLockedByOther":false
};

var model1 = icm.model.InbasketDynamicFilter.fromJSON(managerFilterQuery);

var modelArray = [];
modelArray.push(model1);
var filterpayload = {"dynamicFilters": modelArray, "cursorLocation": 1,"cleanDynamicFilterByReset":false}; 
return filterpayload;

}else {
	return payload;
	
}


} else {
	
var filter = "(";	
var inbasketName = "";
var queueName ="";
if(filterData.branchCode !=null && filterData.branchCode != undefined && filterData.branchCode.length > 0){
	filter=filter+"(";
		for(var i =0;i<filterData.branchCode.length;i++){
			
			if(filterData.branchCode[i+1] != undefined && filterData.branchCode[i+1] != ""){
				filter= filter+"BOC_BranchCode =:A "+ "OR ";	
			}else if(filterData.branchCode[i] != undefined && filterData.branchCode[i] != ""){
				filter= filter+"BOC_BranchCode =:A ";
			}
			
			
		}
		filter=filter+")";
	}
	if(filterData.productCategoryId !=null && filterData.productCategoryId != undefined && filterData.productCategoryId.length > 0){
		filter=filter+" AND ( ";
		for(var i =0;i<filterData.productCategoryId.length;i++){
			if(filterData.productCategoryId[i+1] != undefined && filterData.productCategoryId[i+1] != ""){
				filter= filter+"BOC_ProductCategory =:A "+ "OR ";	
			}else if(filterData.productCategoryId[i] != undefined && filterData.productCategoryId[i] != ""){
				filter= filter+"BOC_ProductCategory =:A ";
			}
			
		}
		
		filter=filter+")";
}	

	filter=filter+")";
	
	//alert(filter);
	if(role === "Credit Officer"){
		inbasketName= "Credit Officer";
		queueName = solutionPrefix+"_"+"CreditOfficer";
	}else if(role === "Internal Control Officer"){
		inbasketName= "Internal Control Officer";
		queueName = solutionPrefix+"_"+"InternalControlOfficer";
	}else if(role === "Legal"){
		inbasketName= "Legal";
		queueName = solutionPrefix+"_"+"Legal";
	}else if(role === "Credit Assistance" ){
		inbasketName= "Credit Assistance";
		queueName = solutionPrefix+"_"+"CreditAssistance";
	}
	
	if(filter.length > 2 && inbasketName!== "" && queueName !== ""){	
	
		
	var COFilterQuery = {
		
		"queueName": queueName,
		"inbasketName":inbasketName,
		"hideFilterUI":false,
		"queryFilter":filter,
		"queryFields": [
		     {
		        "name": "BOC_BranchCode",
		        "type": "xs:string",
		        "value": filterData.branchCode
		      },
			  
			  {
		        "name": "BOC_ProductCategory",
		        "type": "xs:string",
		        "value": filterData.productCategoryId
		      }
		],
		"hideLockedByOther":false
		};
		
		/*var COFilterQuery = {
				
				"queueName": queueName,
				"inbasketName":inbasketName,
				"hideFilterUI":false,
				"filterFields": [
				     {
				        "name": "BOC_BranchCode",
				        "type": "xs:string",
				        "value": filterData.branchCode
				      },
					  
					  {
				        "name": "BOC_ProductCategory",
				        "type": "xs:string",
				        "value": filterData.productCategoryId
				      }
				],
				"hideLockedByOther":true
				};*/
		
		
		var model1 = icm.model.InbasketDynamicFilter.fromJSON(COFilterQuery);
		
		var modelArray = [];
		modelArray.push(model1);
		var filterpayload = {"dynamicFilters": modelArray, "cursorLocation": 1,"cleanDynamicFilterByReset":false}; 
		return filterpayload;
	} else{
		return payload;
	  }
	}
}catch (Error) {
	alert ("Source Module: " + self.name + "\r\n\r\n"+Error.name+" - "+Error.description+"\r\n"+Error.message);
	}
