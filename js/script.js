var app = angular.module("myApp", []);

app.directive("creatEvent", function() {
    return {
        restrict : "E",
        templateUrl : 'creating.html'
    };
});

app.directive("editEvent", function() {
    return {
        restrict : "E",
        templateUrl : 'editing.html'
    };
});
 
app.controller("MyController", ['$scope', '$http', function($scope, $http) {

  $scope.saved = localStorage.getItem('todos');
  $scope.todos = (localStorage.getItem('todos') !== null) ? JSON.parse($scope.saved) : [
  {
    text: 'lorem',
    details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam maxime blanditiis placeat exercitationem, tenetur minus ex sed officiis magni, pariatur officia ratione eaque voluptas.',
    done: false
  },
  {
    text: 'lorem1',
    details: '1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam maxime blanditiis placeat exercitationem, tenetur minus ex sed officiis magni, pariatur officia ratione eaque voluptas.',
    done: false
  },
  {
    text: 'lorem2',
    details: '2Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam maxime blanditiis placeat exercitationem, tenetur minus ex sed officiis magni, pariatur officia ratione eaque voluptas.',
    done: false
  },
  {
    text: 'lorem3',
    details: '3Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam maxime blanditiis placeat exercitationem, tenetur minus ex sed officiis magni, pariatur officia ratione eaque voluptas.',
    done: false
  },
  {
    text: 'lorem4',
    details: '4Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam maxime blanditiis placeat exercitationem, tenetur minus ex sed officiis magni, pariatur officia ratione eaque voluptas. ',
    done: false
  }];

  localStorage.setItem('todos', JSON.stringify($scope.todos));

  //Show Content
  $scope.selectedItem = $scope.todos[0];

  $scope.showDetails = function(item) {
    $scope.selectedItem = item;
  };

  $scope.editableTodo = {};

  //Add new Event
  $scope.addItem = function() {
    if ($scope.todoText && $scope.todoDetails) {
      $scope.todos.push({
        text: $scope.todoText,
        details: $scope.todoDetails,
        done: false
      });
      $scope.todoText = '';
      $scope.todoDetails = '';

      localStorage.setItem('todos', JSON.stringify($scope.todos));
      $scope.cancelCreating();
    }
  };
  $scope.cancelAdd = function() {
    $scope.todoText = '';
    $scope.todoDetails = '';
  };
  
  //Edit
  $scope.editItem = function(x) {
    $scope.isEditing = true;
    Object.assign($scope.editableTodo, $scope.todos[x], {
      index: x
    });
  };

  $scope.updateItem = function(x) {
    if ($scope.editableTodo.text && $scope.editableTodo.details) {
      
      var index = $scope.editableTodo.index;
      delete $scope.editableTodo.index;

      Object.assign($scope.todos[index], $scope.editableTodo);

      $scope.isEditing = false;
      $scope.editableTodo = {};
    }
    localStorage.setItem('todos', JSON.stringify($scope.todos));
  };

  // Remove Single Item
  $scope.removeSingleItem = function(x) {
    $scope.todos.splice(x, 1);
    localStorage.setItem('todos', JSON.stringify($scope.todos));
  };
  // Create Item
  $scope.isCreating = false;
  $scope.isEditing = false;

  $scope.startCreating = function() {
    $scope.isCreating = true;
    $scope.isEditing = false;
  };

  $scope.cancelCreating = function() {
    $scope.isCreating = false;
    $scope.cancelAdd();
  };
  // Edit Item
  $scope.startEditing = function() {
    $scope.isCreating = false;
    $scope.isEditing = true;
  };
  $scope.cancelEditing = function() {
    $scope.isEditing = false;
    $scope.editableTodo = {};
  };
  //next/prev page
  $scope.currentPage = 0;
  $scope.prevPage = function() {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }
    var next = $scope.currentPage;
    $scope.selectedItem = $scope.todos[next];
  };
  $scope.nextPage = function() {
    if ($scope.currentPage < $scope.todos.length - 1) {
      $scope.currentPage++;
    }
    var next = $scope.currentPage;
    $scope.selectedItem = $scope.todos[next];
  };

$scope.editorEnabled = true;
  
  $scope.enableEditor = function() {
    $scope.editorEnabled = false;
    $scope.editableDetails = $scope.selectedItem.details;
    $scope.editableText = $scope.selectedItem.text;
  };
  
  $scope.disableEditor = function() {
    $scope.editorEnabled = true;
  };
  
  $scope.save = function() {
    $scope.selectedItem.details = $scope.editableDetails;
    $scope.selectedItem.text = $scope.editableText;
    $scope.disableEditor();
    localStorage.setItem('todos', JSON.stringify($scope.todos));
  };
  
}]);