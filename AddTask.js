var caseEditable = this.getActionContext("Case")[0];
var prefix = "MIT";
var theCaseID = caseEditable.getCaseTitle();
/* Must match the task type name in your solution that appears in the task
list of the Add Task page */
var taskType = prefix + "_FraudCheck";
callback=function(taskEditable){
/* Provide a task name that shows in the list after you add the task */
taskEditable.setTaskName(" FraudCheck " + theCaseID);
var addTaskPagePayload = {
"taskEditable": taskEditable,
"coordination": new icm.util.Coordination()
};
this.broadcastEvent("icm.AddTask", addTaskPagePayload);
};
caseEditable.getCase().createNewTaskEditable(taskType,
dojo.hitch(this,callback));


this.getActionContext("Case")[0]	[object (Anonymous function)]