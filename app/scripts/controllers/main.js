'use strict';
var app = angular.module('angularDashboardApp');

app.controller('MyCtrl', function ($scope) {

  // turn off animation for all charts!
  Highcharts.setOptions({
    plotOptions: {
      series: {
        animation: false
      }
    }
  });

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
    alert('Not supported yet!');
  }

  $scope.removePortfolio = function (column) {
    console.log(column);
    var page = getActiveEditorPage($scope);
    console.log(page);
    for (var i = 0; i < page.columnData.length; i++) {
      if (column.id === page.columnData[i].id) {
        page.columnData.splice(i, 1);
        for (var j = 0; j < page.widgetRows.length; j++) {
          var widget = page.widgetRows[j].widgets[0];
          for (var p = 0; p < widget.rows.length; p++) {
            var row = widget.rows[p];
            row.data.splice(i + 1, 1);
          }

        }
        setPageFlatRows(page);
      }
    }

  }

  $scope.configWidget = function (row) {
    console.log(row);
    alert('Not supported yet!');
  }

  $scope.removeWidget = function (row) {
    console.log(row);
    if (!$scope.editors) {
      return;
    }

    var id = row.widgetRow.id;
    var page = getActiveEditorPage($scope);
    for (var i = 0; i < page.widgetRows.length; i++) {
      var r = page.widgetRows[i];
      if (r.id === id) {
        page.widgetRows.splice(i, 1);
        setPageFlatRows(page);
        return;
      }
    }
  }

  $scope.moveRight = function (column) {
    console.log('move right');
    var page = getActiveEditorPage($scope);
    console.log(page);
    console.log(column);
    for (var i = 0; i < page.columnData.length; i++) {
      if (column.id === page.columnData[i].id) {
        console.log('column - ' + i);
        if (i === page.columnData.length - 1) return;
        moveRight(page.columnData, i);
        for (var j = 0; j < page.widgetRows.length; j++) {
          var widget = page.widgetRows[j].widgets[0];
          for (var p = 0; p < widget.rows.length; p++) {
            var row = widget.rows[p];
            if (row.type === 'header') {
              //do nothing
            } else {
              moveRight(row.data, i + 1);
            }
          }
        }
        setPageFlatRows(page);
        return;
      }
    }
  }

  $scope.moveLeft = function (column) {
    console.log('move left');
    var page = getActiveEditorPage($scope);
    console.log(page);
    for (var i = 0; i < page.columnData.length; i++) {
      if (column.id === page.columnData[i].id) {
        console.log('column - ' + i);
        if (i === 0) return;
        moveLeft(page.columnData, i);
        for (var j = 0; j < page.widgetRows.length; j++) {
          var widget = page.widgetRows[j].widgets[0];
          for (var p = 0; p < widget.rows.length; p++) {
            var row = widget.rows[p];
            if (row.type === 'header') {
              //do nothing
            } else {
              moveLeft(row.data, i + 1);
            }
          }
        }
        setPageFlatRows(page);
        return;
      }
    }

  }

});



