function DashboardEditorPage(name) {
  this.name = name;
  this.widgetRows = [];
  this.flatRows = [];
  this.id = uuid();
  this.columnData = [];
  this.active = false;
}

DashboardEditorPage.prototype.addWidgetRow = function (widgetRow) {
  this.widgetRows.push(widgetRow);
};

DashboardEditorPage.prototype.removeWidgetRow = function (widgetRow) {
  this.widgetRows.splice(0, 1);
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
