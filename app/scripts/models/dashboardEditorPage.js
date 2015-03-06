function DashboardEditorPage(name) {
  this.name = name;
  this.widgetRows = [];
}

DashboardEditorPage.prototype.addWidgetRow = function (widgetRow) {
  this.widgetRows.push(widgetRow);
};

DashboardEditorPage.prototype.removeWidgetRow = function (widgetRow) {
  this.widgetRows.splice(0, 1);
}

