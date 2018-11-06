"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("angular2/core");
var store_1 = require("./services/store");
var TodoApp = /** @class */ (function () {
    function TodoApp(todoStore) {
        this.newTodoText = '';
        this.newTodoDate = null;
        this.todoStore = todoStore;
        this.sort();
    }
    TodoApp.prototype.sort = function () {
        if (this.todoStore.todos.length > 0) {
            this.todoStore.todos.sort(function (a, b) {
                if (a.priority > b.priority)
                    return 1;
                else if (a.priority < b.priority)
                    return -1;
                else
                    return a.priority - b.priority;
            });
        }
    };
    TodoApp.prototype.stopEditing = function (todo, editedTitle) {
        todo.title = editedTitle;
        todo.editing = false;
    };
    TodoApp.prototype.cancelEditingTodo = function (todo) {
        todo.editing = false;
    };
    TodoApp.prototype.updateEditingTodo = function (todo, editedTitle) {
        editedTitle = editedTitle.trim();
        todo.editing = false;
        if (editedTitle.length === 0) {
            return this.todoStore.remove(todo);
        }
        todo.title = editedTitle;
        this.todoStore.remove(todo);
        this.newTodoDate = todo.date;
        this.newTodoText = todo.title;
        this.priority = todo.priority;
        this.addTodo();
    };
    TodoApp.prototype.editTodo = function (todo) {
        todo.editing = true;
    };
    TodoApp.prototype.removeCompleted = function () {
        this.todoStore.removeCompleted();
    };
    TodoApp.prototype.toggleCompletion = function (todo) {
        this.todoStore.toggleCompletion(todo);
    };
    TodoApp.prototype.remove = function (todo) {
        this.todoStore.remove(todo);
    };
    TodoApp.prototype.addTodo = function () {
        var flag;
        flag = this.newTodoText.trim().length > 0 && this.newTodoDate.toString() != "" && this.newTodoDate != null ? true : false;
        if (flag) {
            this.todoStore.add(this.newTodoText, this.newTodoDate, this.priority);
            this.newTodoText = '';
            this.newTodoDate = null;
        }
    };
    TodoApp.prototype.getColor = function (date) {
        var parts = date.split('-');
        var date1 = new Date(parts[0], parts[1] - 1, parts[2]);
        if (date1.getDate() < new Date().getDate()) {
            return "red";
        }
        else if (new Date().getDate() + 1 == date1.getDate()) {
            return "orange";
        }
        else {
            return "green";
        }
    };
    TodoApp.prototype.getAlert = function (date) {
        var parts = date.split('-');
        var date1 = new Date(parts[0], parts[1] - 1, parts[2]);
        if (date1.getDate() < new Date().getDate()) {
            var days = new Date().getDate() - date1.getDate();
            return 'overdue by ' + days + ' day/days';
        }
        else if (new Date().getDate() + 1 == date1.getDate()) {
            return 'due date is soon [' + date + ']';
        }
        else {
            return 'due date is [' + date + ']';
        }
    };
    TodoApp = __decorate([
        core_1.Component({
            selector: 'todo-app',
            templateUrl: 'app/app.html',
            styleUrl: 'app/app.css',
        }),
        __metadata("design:paramtypes", [store_1.TodoStore])
    ], TodoApp);
    return TodoApp;
}());
exports.default = TodoApp;
//# sourceMappingURL=app.js.map