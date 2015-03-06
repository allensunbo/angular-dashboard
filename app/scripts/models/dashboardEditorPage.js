function DashboardEditorPage() {
  this.widgets = [];
}

DashboardEditorPage.prototype.addWidget = function (widget) {
  this.widgets.push(widget);
};

DashboardEditorPage.prototype.removeWidget = function (widget) {
  this.widgets.splice(0, 1);
}

