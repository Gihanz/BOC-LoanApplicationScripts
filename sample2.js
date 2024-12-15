try {
var self = this;
var solution = this.solution;
var prefix = solution.getPrefix();


if (payload.eventName === "icm.SendWorkItem") {
	self.editable = payload.toDoTaskEditable;
	
}
else if (payload.eventName === "icm.UpdateFields") {
	
	alert("updated field");
}
}
catch (Error) {
alert ("Source Module: " + self.name + "\r\n\r\n"+Error.name+" - "+Error.description+"\r\n"+Error.message);
}