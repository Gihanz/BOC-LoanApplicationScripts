var newPayload = {};
newPayload.workItemEditable = payload.workItemEditable;
newPayload.coordination = payload.coordination;
newPayload.propertyFilter = "([CmAcmIsToDo] = true AND BOC_LoanStatus ='4')";
newPayload.resultDisplay = {
	sortBy : "TaskState",
	sortAsc : true
};
newPayload.gridStructure = {
	"cells" : [ [ {
		"width" : "4.6em",
		"sortable" : true,
		"field" : "TaskState",
		"name" : "Task State "
	}, {
		"width" : "15em",
		"sortable" : true,
		"field" : "CmAcmTaskName",
		"name" : "To Do Task"
	}, {
		"width" : "15em",
		"sortable" : true,
		"field" : "DateLastModified",
		"name" : "Last Modified Time"
	}, {
		"width" : "15em",
		"sortable" : true,
		"field" : "BOC_LoanStatus",
		"name" : " Status"
	}, {
		"width" : "25em",
		"sortable" : true,
		"field" : "BOC_LastComment",
		"name" : " Last Comment"
	} ] ]
};
return newPayload;