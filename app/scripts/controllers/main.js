'use strict';
var app = angular.module('angularDashboardApp');

app.controller('MyCtrl', function ($scope, TestData) {

  $scope.addWidget = function (event) {
    console.log('widget added');
    console.log(event.target.innerText);
    var idx = 0;
    switch (event.target.innerText) {
      case 'Summary':
        idx = 0;
        break;
      case 'Risk':
        idx = 1;
        break;
      case 'Returns':
        idx = 2;
        break;
      default:
        idx = 0;
        break;

    }

  }

  $scope.addPortfolio = function () {
    var widget1 = new DashboardWidget('Summary', 'SUMMARY', {});
    var widget2 = new DashboardWidget('Risk', 'RISK', {});
    var widget3 = new DashboardWidget('Return', 'RETURN', {});
    var page1 = new DashboardEditorPage();
    page1.addWidget(widget1);
    page1.addWidget(widget2);

    var page2 = new DashboardEditorPage();
    page2.addWidget(widget2);
    page2.addWidget(widget3);

    var editor = new DashboardEditor();
    editor.addPage(page1);
    editor.addPage(page2);

    var editors = new DashboardEditors();
    editors.addEditor(editor);
    console.log(editors);

  }

  $scope.removeRow = function (row) {

  }


});

app.factory('TestData', function () {
  function randomData() {
    var data = [];
    for (var i = 0; i < 5; i++) {
      data.push(Math.ceil(Math.random() * 20));
    }
    return data;
  }

  // data is widget-based, each widget has multiple rows, in general
  return [{
    header: {
      name: 'Summary',
      template: '<div>Summary</div>'
    },
    value: {
      type: 'text',
      data: '4'
    }
  }, {
    name: "Risk",
    value: {
      type: 'bar',
      options: {
        chart: {
          type: 'bar'
        }
      },
      plotOptions: {
        bar: {
          size: '100%'
        }
      },
      series: [{
        data: randomData()
      }],
      /* title: {
       text: 'Risk'
       },*/
      loading: false,
      xAxis: {
        labels: {
          formatter: function () {
            return ['Size', 'Momentum', 'Growth', 'Country', 'Currency'][this.value];
          }
        }
      }
    }
  }, {
    name: "Returns",
    value: {
      type: 'pie',
      options: {
        chart: {
          type: 'pie',
          margin: [-30, 30, 30, 30]
        }
      },
      plotOptions: {
        pie: {
          size: '100%'
        }
      },
      series: [{
        data: randomData()
      }],
      title: {
        text: 'Returns',
        style: {
          display: 'none',
        },
      },
      loading: false
    }
  }];

});
