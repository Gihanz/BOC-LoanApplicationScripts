try {
var self = this;
var userName = ecm.model.desktop.userDisplayName;
var userId = ecm.model.desktop.userId;
var role = ecm.model.desktop.currentRole.name;
var solution = this.solution;
var prefix = solution.getPrefix();


/*if (payload.eventName === "icm.SendEventPayload") {
Retrieve and cache the editable object and other props from this and payload
self.editable = payload.workItemEditable;
self.pageId = self.page.id;
self.coordination = payload.coordination;
self.solutionPrefix = self.solution.prefix;
self.scope = "F_CaseFolder";
self.payload = payload;

var coordination = payload.coordination;

require(["icm/base/Constants", "icm/model/properties/controller/ControllerManager"], function(Constants, ControllerManager) {

coordination.participate(Constants.CoordTopic.AFTERLOADWIDGET, function(context, complete, abort) {
 Obtain the controller binding for the editable. 
if(!self.hasOwnProperty('propsController')){
self.propsController = ControllerManager.bind(self.editable);
}
 Call the coordination completion method. 
complete();
});

// Callbacks to clean up when the user completes or cancels the task creation
coordination.participate(Constants.CoordTopic.TODO_BEFORESAVE, function(context, complete, abort) {
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

coordination.participate(Constants.CoordTopic.TODO_COMMIT, function(context, complete, abort) {
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

}else*/ if (payload.eventName === "icm.ToDoTaskAdded") {
	
	  require(["icm/base/Constants","icm/model/properties/controller/ControllerManager"], function(Constants, ControllerManager){
		  require(["dojo/_base/declare", "dojo/_base/lang", "icm/base/Constants","icm/dialog/addcommentdialog/AddCommentDialog","icm/action/case/CaseAction"],
                  function(declare, lang,Constants, AddCommentDialog, CaseAction) {
			 
			  
		  })
		  
	  });
	case
	var todoList = icm.pgwidget.todolist.ToDoList().getCfgOfTaskTypeList(a);
	
	if(!self.hasOwnProperty('todoeditable')){
		self.todoeditable=[]
	}else {
	self.todoeditable = payload.ToDoTaskEditable;
	alert("To Do task Added")
	}
}
}
catch (Error) {
alert ("Source Module: " + self.name + "\r\n\r\n"+Error.name+" - "+Error.description+"\r\n"+Error.message);
}