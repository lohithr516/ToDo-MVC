import {Component} from 'angular2/core';
import {TodoStore, Todo} from './services/store';


@Component({
	selector: 'todo-app',
	templateUrl: 'app/app.html',
	styleUrl:'app/app.css',

})
export default class TodoApp {
	todoStore: TodoStore;
	newTodoText:String='';
	newTodoDate:Date=null;
	priority:number;
	constructor(todoStore: TodoStore) {
		this.todoStore = todoStore;
		this.sort();
	}
	sort() {
		if (this.todoStore.todos.length > 0) {
			this.todoStore.todos.sort(function(a, b){
				if(a.priority>b.priority)
					return 1;
				else if(a.priority<b.priority)
					return -1;
				else
				return a.priority- b.priority});
		}
	}
	stopEditing(todo: Todo, editedTitle: string) {
		todo.title = editedTitle;
		todo.editing = false;
	}

	cancelEditingTodo(todo: Todo) {
		todo.editing = false;
	}

	updateEditingTodo(todo: Todo, editedTitle: string) {
		editedTitle = editedTitle.trim();
		todo.editing = false;

		if (editedTitle.length === 0) {
			return this.todoStore.remove(todo);
		}

		todo.title = editedTitle;
		this.todoStore.remove(todo);
		this.newTodoDate=todo.date;
		this.newTodoText=todo.title;
		this.priority=todo.priority;
		this.addTodo();
	}

	editTodo(todo: Todo) {
		todo.editing = true;
	}

	removeCompleted() {
		this.todoStore.removeCompleted();
	}

	toggleCompletion(todo: Todo) {
		this.todoStore.toggleCompletion(todo);
	}

	remove(todo: Todo){
		this.todoStore.remove(todo);
	}

	addTodo() {
		let flag:boolean;
		flag=this.newTodoText.trim().length>0&&this.newTodoDate.toString()!=""&&this.newTodoDate!=null?true:false;
		if (flag) {

			this.todoStore.add(this.newTodoText,this.newTodoDate,this.priority);
			this.newTodoText = '';
			this.newTodoDate=null;

		}

	}
	getColor(date:any){

		const parts=date.split('-');
		const date1=new Date(parts[0],parts[1]-1,parts[2]);
		if(date1.getDate()<new Date().getDate()){
			return "red";
		}else if(new Date().getDate()+1==date1.getDate()) {
			return "orange";
		}else{
			return "green";
		}

	}
	getAlert(date:any){
		const parts=date.split('-');
		const date1=new Date(parts[0],parts[1]-1,parts[2]);
		if(date1.getDate()<new Date().getDate()){
			const days=new Date().getDate()-date1.getDate();
			return 'overdue by '+days+' day/days';
		}else if(new Date().getDate()+1==date1.getDate()) {
			return 'due date is soon ['+date+']';
		}else{
			return 'due date is ['+date+']';
		}

	}
}
