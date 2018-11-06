export class Todo {
	completed: Boolean;
	editing: Boolean;
	private _date: Date=null;
	private _title: String;
	private _priority:number;
	get title() {
		return this._title;
	}
	set title(value: String) {
		this._title = value.trim();
	}
	get priority() {
		return this._priority;
	}
	set priority(value: number) {
		this._priority= value;
	}

	get date() {
		return this._date;
	}

	set date(value: Date) {
		this._date = value;
	}

	constructor(title: String,date:Date,priority:number) {
		this.completed = false;
		this.editing = false;
		this.title = title.trim();
		this._date=date;
		this._priority=priority;
	}
}

export class TodoStore {
	todos: Array<Todo>;

	constructor() {
		let persistedTodos = JSON.parse(localStorage.getItem('angular2-todos') || '[]');
		// Normalize back into classes
		this.todos = persistedTodos.map( (todo: {_title: String,_date:Date,_priority:number, completed: Boolean}) => {
			let ret = new Todo(todo._title,todo._date,todo._priority);
			ret.completed = todo.completed;
			return ret;
		});
	}

	private updateStore() {
		localStorage.setItem('angular2-todos', JSON.stringify(this.todos));
	}

	private getWithCompleted(completed: Boolean) {
		return this.todos.filter((todo: Todo) => todo.completed === completed);
	}

	allCompleted() {
		return this.todos.length === this.getCompleted().length;
	}

	setAllTo(completed: Boolean) {
		this.todos.forEach((t: Todo) => t.completed = completed);
		this.updateStore();
	}

	removeCompleted() {
		this.todos = this.getWithCompleted(false);
		this.updateStore();
	}

	getRemaining() {
		return this.getWithCompleted(false);
	}

	getCompleted() {
		return this.getWithCompleted(true);
	}

	toggleCompletion(todo: Todo) {
		todo.completed = !todo.completed;
		this.updateStore();
	}

	remove(todo: Todo) {
		this.todos.splice(this.todos.indexOf(todo), 1);
		this.updateStore();
	}

	add(title: String,date: Date,priority:number) {
		this.todos.push(new Todo(title,date,priority));
		this.updateStore();
	}
}
