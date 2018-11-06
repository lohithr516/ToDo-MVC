"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Todo = /** @class */ (function () {
    function Todo(title, date, priority) {
        this._date = null;
        this.completed = false;
        this.editing = false;
        this.title = title.trim();
        this._date = date;
        this._priority = priority;
    }
    Object.defineProperty(Todo.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value.trim();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Todo.prototype, "priority", {
        get: function () {
            return this._priority;
        },
        set: function (value) {
            this._priority = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Todo.prototype, "date", {
        get: function () {
            return this._date;
        },
        set: function (value) {
            this._date = value;
        },
        enumerable: true,
        configurable: true
    });
    return Todo;
}());
exports.Todo = Todo;
var TodoStore = /** @class */ (function () {
    function TodoStore() {
        var persistedTodos = JSON.parse(localStorage.getItem('angular2-todos') || '[]');
        // Normalize back into classes
        this.todos = persistedTodos.map(function (todo) {
            var ret = new Todo(todo._title, todo._date, todo._priority);
            ret.completed = todo.completed;
            return ret;
        });
    }
    TodoStore.prototype.updateStore = function () {
        localStorage.setItem('angular2-todos', JSON.stringify(this.todos));
    };
    TodoStore.prototype.getWithCompleted = function (completed) {
        return this.todos.filter(function (todo) { return todo.completed === completed; });
    };
    TodoStore.prototype.allCompleted = function () {
        return this.todos.length === this.getCompleted().length;
    };
    TodoStore.prototype.setAllTo = function (completed) {
        this.todos.forEach(function (t) { return t.completed = completed; });
        this.updateStore();
    };
    TodoStore.prototype.removeCompleted = function () {
        this.todos = this.getWithCompleted(false);
        this.updateStore();
    };
    TodoStore.prototype.getRemaining = function () {
        return this.getWithCompleted(false);
    };
    TodoStore.prototype.getCompleted = function () {
        return this.getWithCompleted(true);
    };
    TodoStore.prototype.toggleCompletion = function (todo) {
        todo.completed = !todo.completed;
        this.updateStore();
    };
    TodoStore.prototype.remove = function (todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
        this.updateStore();
    };
    TodoStore.prototype.add = function (title, date, priority) {
        this.todos.push(new Todo(title, date, priority));
        this.updateStore();
    };
    return TodoStore;
}());
exports.TodoStore = TodoStore;
//# sourceMappingURL=store.js.map