try {
var self = this;
var userName = ecm.model.desktop.userDisplayName;
var userId = ecm.model.desktop.userId;
var role = ecm.model.desktop.currentRole.name;
var solution = this.solution;
var prefix = solution.getPrefix();

/*Retrieve and cache the editable object and other props from this and payload*/
if (payload.eventName === "icm.SendEventPayload") {
self.editable = payload.workItemEditable;
self.pageId = self.page.id;
self.coordination = payload.coordination;
self.solutionPrefix = self.solution.prefix;
self.scope = "F_CaseFolder";
self.payload = payload;

var coordination = payload.coordination;

require(["icm/base/Constants", "icm/model/properties/controller/ControllerManager"], function(Constants, ControllerManager) {

coordination.participate(Constants.CoordTopic.AFTERLOADWIDGET, function(context, complete, abort) {
/* Obtain the controller binding for the editable. */
if(!self.hasOwnProperty('propsController')){
self.propsController = ControllerManager.bind(self.editable);
}
/* Call the coordination completion method. */
complete();
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

}else if (payload.eventName === "icm.FieldUpdated") {

	var propId="";
	var changedProperty = payload.change.id;
	var managerProp="";
	if(changedProperty.indexOf("CRIB") !== -1){
		propId = prefix + '_CRIBFinalManager';
		managerProp= prefix + '_CRIBManagerGroup';
	}else if (changedProperty.indexOf("Valuation") !== -1){
		propId = prefix + '_ValuationFinalManager';
		managerProp= prefix + '_ValuationManagerGroup';
	}else if(changedProperty.indexOf("Manager") !== -1){
		propId = prefix + '_FinalManager';
		managerProp= prefix + '_ManagerGroup';
	}
	if (changedProperty === propId) {
		if(!self.hasOwnProperty('propId') || (self.propId !== null && self.propId !== undefined && self.propId === false)){
			self.propId = true;
			}	
		var propController=self.propsController;
		var prop = propController.getPropertyController(managerProp);
		
		if (prop){
			var sourceprop = propController.getPropertyController(propId);
			var count=0;
			var length=sourceprop.model.choiceList.choices.length;
			var mgrlist= sourceprop.model.choiceList;
			for( var i =0;i<length;i++){
				if(mgrlist.choices[i].value === payload.change.value){
					break;
				}else{
					count=count+1;
				}
			}	
			
			var valueSet= [];
			if (count !== 0){				
				var newChoiceList = [];
				
				for (var j =0 ; j<prop.model.choiceList.choices.length;j++){
					if(j< (count) ){
						valueSet.push(prop.model.choiceList.choices[j].value);
						newChoiceList.push(prop.model.choiceList.choices[j]);
						
					} else{
						
					}
			}				
				propController.beginChangeSet();
				prop.set("value",valueSet);
				propController.endChangeSet();							
				
			}else if(count === 0){
				propController.beginChangeSet();
				prop.set("value",valueSet);
				propController.endChangeSet();	
			}
		}
		
	}

	else if (changedProperty === managerProp){/*
		
		if(self.propId === true){
		var propController=self.propsController;
		var mgrprop = propController.getPropertyController(managerProp);
		if(mgrprop !=null && mgrprop != undefined){
			var sourceprop = propController.getPropertyController(propId);
			var startcount=0;
			var endcount=0;
			var mgrlist= sourceprop.model.choiceList;
			var length=sourceprop.model.choiceList.choices.length;
			for( var i =0;i<length;i++){
				if(mgrlist.choices[i].value === sourceprop.get("value")){
					startcount=i;
					endcount=length;
					break;
				}
			}	
				dojo.forEach (dojo.query("input[type=checkbox]"), function(item){
				var widget = dijit.getEnclosingWidget(item);
				if(startcount !== 0 && endcount !== 0 && startcount < endcount){
					var checkboxid = parseInt(widget.id.slice(-1)) ;
					if(isNaN(checkboxid) === false && checkboxid === startcount){
					widget.set('disabled', true);	
					widget.set('readOnly', true);
					dojo.byId(widget.id).setAttribute("disabled",true);
					dojo.byId(widget.id).set('disabled',true);
					dijit.byId(widget.id).set('disabled',true);
					dijit.byId(widget.id).disable();
					widget.disable();
					widget.isValid();
					startcount= startcount+1;
					}
				}	
				});		
			}
			self.propId = false;
		}
	*/}
  }
}
catch (Error) {
alert ("Source Module: " + self.name + "\r\n\r\n"+Error.name+" - "+Error.description+"\r\n"+Error.message);
}