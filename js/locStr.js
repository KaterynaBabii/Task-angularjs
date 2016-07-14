var app = angular.module("myApp", []); 
app.controller("MyController",['$scope', '$http', function($scope, $http) {

	$scope.saved = localStorage.getItem('todos');
	$scope.todos = (localStorage.getItem('todos') !== null) ? JSON.parse($scope.saved) : [ {text: 'lorem', info: 'About Lorem', details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam maxime blanditiis placeat exercitationem, tenetur minus ex sed officiis magni, pariatur officia ratione eaque voluptas.', done: false},
																						   {text: 'lorem1', info: '1About Lorem', details: '1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam maxime blanditiis placeat exercitationem, tenetur minus ex sed officiis magni, pariatur officia ratione eaque voluptas. ', done: false} ];
 
	localStorage.setItem('todos', JSON.stringify($scope.todos));

//Content
	$scope.selectedItem = $scope.todos[0];

	 $scope.showDetails = function(item){
      $scope.selectedItem = item;
    };

	$scope.editableTodo = {};
//Add
	$scope.addItem = function() {
		 if ($scope.todoText && $scope.todoInfo) {
			$scope.todos.push({
				text: $scope.todoText, 
				info: $scope.todoInfo, 
				details: $scope.todoDetails,
				done: false
			});
			$scope.todoText = ''; 
			$scope.todoInfo = ''; 
			$scope.todoDetails = ''; 

			localStorage.setItem('todos', JSON.stringify($scope.todos));
			$scope.cancelCreating();
		}
	};
	$scope.cancelAdd = function() {
		$scope.todoText = '';
		$scope.todoInfo = ''; 
	};
//Edit
	$scope.editItem = function(x) {
		$scope.isEditing = true;
		Object.assign($scope.editableTodo, $scope.todos[x], {index: x});
	};
	$scope.updateItem = function (x) {
		if ($scope.editableTodo.text && $scope.editableTodo.info) {
			var index = $scope.editableTodo.index;
			delete $scope.editableTodo.index;

			Object.assign($scope.todos[index], $scope.editableTodo);

			 $scope.isEditing = false;
			$scope.editableTodo = {};

		}
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	};
	$scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo){
			count+= todo.done ? 1 : 0;
		});
		return count;
	};
	$scope.isCreating = false;
//Remove Item
	$scope.removeMulItem = function() {
		var oldTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(oldTodos, function(todo){
			if (!todo.done)
				$scope.todos.push(todo);
		});
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	};
	$scope.removeSingleItem = function(x) {
		$scope.todos.splice(x, 1);
        localStorage.setItem('todos', JSON.stringify($scope.todos));
	};
// Create Item
	$scope.startCreating = function() {
		$scope.isCreating = true;
	};

	$scope.cancelCreating = function() {
		$scope.isCreating = false;
		$scope.cancelAdd();
	};
	$scope.startEditing = function() {
          $scope.isEditing = true;
      };
    $scope.cancelEditing = function() {
          $scope.isEditing = false;
          $scope.editableTodo = {};         
      };
      //next/prev
      $scope.currentPage = 0;

	  $scope.prevPage = function() {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;    
      }
       var next = $scope.currentPage;
       $scope.selectedItem =  $scope.todos[next];

      };
      $scope.nextPage = function() {
        if ($scope.currentPage < $scope.todos.length-1) {
            $scope.currentPage++;
      }
      var next = $scope.currentPage;
      $scope.selectedItem =  $scope.todos[next];  
    };

  }]);