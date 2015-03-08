'use strict';
var app = angular.module('angularDashboardApp');

app.controller('MyCtrl', function ($scope) {

  $scope.addWidget = function (event) {
    console.log(event.target.innerText + ' clicked');
    var idx = 0;
    switch (event.target.innerText) {
      case 'Summary':
        idx = 0;
        break;
      case 'Risk':
        idx = 1;
        addRiskWidget($scope);
        break;
      case 'Returns':
        idx = 2;
        addReturnWidget($scope);
        break;
      default:
        idx = 0;
        break;
    }

  }

  $scope.showDemo = function () {
    var editor = getSampleEditor();
    var editors = new DashboardEditors();
    editors.addEditor(editor);

    var editorCopy = getSampleEditor();
    editorCopy.name = 'Another Dashboard!';
    editorCopy.pages[0].name = 'Portfolio Summary';
    editorCopy.pages[1].name = 'Risk Decomposition';

    editors.addEditor(editorCopy);

    console.log(editors);
    $scope.editors = editors;

  };

  $scope.addPortfolio = function () {
    var page = getActiveEditorPage($scope);
    addPortfolioToPage(page);
  };

  $scope.removeRow = function (row) {

  }

  $scope.newPage = function () {
    var page1 = new DashboardEditorPage('Page 1');
    setPageFlatRows(page1);
    console.log(page1);

    var editor = new DashboardEditor('First Dashboard');
    editor.addPage(page1);

    var editors = new DashboardEditors();
    editors.addEditor(editor);

    $scope.editors = editors;
  };

  $scope.configPortfolio = function (column) {
    console.log(column);
  }

  $scope.removePortfolio = function (column) {
    console.log(column);
  }

  $scope.configWidget = function (row) {
    console.log(row);
  }

  $scope.removeWidget = function (row) {
    console.log(row);
  }

});


