try {

var userName = ecm.model.desktop.userDisplayName;
var userId = ecm.model.desktop.userId;
var role = ecm.model.desktop.currentRole.name;
var solution = this.solution;
var prefix = solution.getPrefix();


require(["icm/base/Constants", "icm/model/properties/controller/ControllerManager"], function(Constants, ControllerManager){

if (payload.eventName === "icm.FieldUpdated") {
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
	
return {'changes':[{'id': 'BOC_BranchName','value': 'New Branch 36'}]};

}
var messageDialog = new ecm.widget.dialog.MessageDialog({
    text: "<b>Role</b>: " + role + " - " + userName + " - " + userId
});

messageDialog.show();


}

});


/** this.onBroadcastEvent("icm.FieldUpdated", {"change":{"id":id, "collectionId":collectionId, "value":propertyChanges.value}}); **/

}
catch (Error) {
alert ("Source Module: " + self.name + "\r\n\r\n"+Error.name+" - "+Error.description+"\r\n"+Error.message);
}