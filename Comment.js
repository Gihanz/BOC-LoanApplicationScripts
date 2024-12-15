try {
    var self = this;
    console.log("***** self *****");
    console.log(self);
    self.commentAdded = false;
 
    if (payload.eventName === "icm.SendWorkItem") {
        var coord = payload.coordination;
        self.workitemEdit = payload.workItemEditable;
        var solution = self.solution;
        var prefix = solution.getPrefix();
 
        require(["icm/base/Constants","icm/model/properties/controller/ControllerManager"], function(Constants, ControllerManager){
 
                require(["dojo/_base/declare", "dojo/_base/lang", "icm/base/Constants","icm/dialog/addcommentdialog/AddCommentDialog","icm/action/case/CaseAction"],
                    function(declare, lang,Constants, AddCommentDialog, CaseAction) {
                        console.log("Prompt add work item comment dialog throughscript adaptor.");
                        payload.coordination.participate(Constants.CoordTopic.COMMIT, function(context, complete, abort) {
                            try {
                                var myStepName =self.workitemEdit.getStepName();
                                var myCase = self.workitemEdit.getCase();
 
                                if(context[Constants.CoordContext.WKITEMRESPONSE] ==="REFER" || context[Constants.CoordContext.WKITEMRESPONSE] ==="REJECT" ||
                                    context[Constants.CoordContext.WKITEMRESPONSE] ==="TERMINATE"){
                                    if (self.commentAdded) {
                                        complete();
                                    }
                                    else {
                                        var addCommentDialog = new AddCommentDialog({
                                            artifactType : "WorkItem",
                                            artifactLabel : myStepName,
                                            commentContext :Constants.CommentContext.WORK_ITEM_COMPLETE,
                                            caseModel : myCase,
                                            workItem :self.workitemEdit.icmWorkItem,
                                            onClickClose : function() {
                                                if (self.commentAdded) {
                                                    complete();
                                                }
                                                else {
                                                    alert ("No comment has been added so you cannot REJECT/TERMINATE the LOAN CASE");
                                                    abort({silent:true});
                                                }
                                                AddCommentDialog.prototype.onClickClose.apply(this,arguments);
                                            }
                                        });
 
                                        dojo.connect(addCommentDialog.commentContentPane, "afterAddComment",lang.hitch(this,function() {
                                            self.commentAdded = true;
                                        }));
 
                                        addCommentDialog.show();
                                    }
                                }
                                else
                                {
                                    complete();
                                }
                            }
                            catch (exception) {
                                alert(exception);
                                abort();
                            }
                        });
                    })
        });
 
        return payload;
    }
    else if (payload.eventName === "icm.custom.AddComment") {
        require(["dojo/_base/declare", "dojo/_base/lang", "icm/base/Constants","icm/dialog/addcommentdialog/dijit/CommentContentPane","icm/dialog/addcommentdialog/AddCommentDialog","icm/action/case/CaseAction"],
            function(declare, lang,Constants, AddCommentDialog, CaseAction) {
                try {
                    console.log(" Comments Event Handler.");
                    var myStepName =self.workitemEdit.getStepName();
                    var myCase = self.workitemEdit.getCase();
 
                    var addCommentDialog = new AddCommentDialog({
                        artifactType : "WorkItem",
                        artifactLabel : myStepName,
                        commentContext :Constants.CommentContext.WORK_ITEM_COMPLETE,
                        caseModel : myCase,
                        workItem :self.workitemEdit.icmWorkItem
                    });
 
                    dojo.connect(addCommentDialog.commentContentPane, "afterAddComment",lang.hitch(this,function() {
                        self.commentAdded = true;
                    }));
 
                    addCommentDialog.show();
                }
                catch (exception) {
                    alert(exception);
                }
            })
 
    }
 
}
catch (exception) {
    alert(exception);
}