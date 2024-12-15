try {
var self = this;
if (payload.eventName === "icm.FieldUpdated") {
/*Retrieve and cache the editable object and other props from this and payload*/
self.editable = payload.change;
self.pageId = self.page.id;
self.coordination = payload.coordination;
self.solutionPrefix = self.solution.prefix;
self.scope = "F_CaseFolder";
self.payload = payload;
var coordination = payload.coordination;
require(["icm/base/Constants", "icm/model/properties/controller/ControllerManager"], function(Constants, ControllerManager) {

/* Obtain the controller binding for the editable. */
if(!self.hasOwnProperty('propsController')){
self.propsController = ControllerManager.bind(self.editable);

var propId = prefix + '_FinalManager';
var changedProperty = payload.change.id;

if (changedProperty === propId) {
	var managerProp= 'BOC_ManagerGroup';
	var propController=self.propsController;
	var propController = theController.getPropertyController(managerProp);
	alert(propController);
	if (propController){
	    propController.set("readOnly", true);
	}
	
}

}
else{
	
	alert("failed to get it");
}

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
/*else if (payload.eventName === "icm.FieldUpdated") {
 Reference self.editable, sefl.propsController, etc. from here 
 Do some stuff, like apply some additional field behaviour / validation 
}*/
}
catch (Error) {
alert ("Source Module: " + self.name + "\r\n\r\n"+Error.name+" - "+Error.description+"\r\n"+Error.message);
}