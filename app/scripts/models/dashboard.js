/**
 * Created by bsun on 3/6/15.
 */

function DashboardEditors(editors) {
  this.editors = editors || [];
}

DashboardEditors.prototype.addEditor = function (editor) {
  this.editors.push(editor);
};

DashboardEditors.prototype.removeEditor = function (editor) {
  this.editors.splice(0, 1);
};

DashboardEditors.prototype.getEditors = function () {
  return this.editors;
}
