import { Component, DoCheck, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  taskList: Array<TaskList> = JSON.parse(localStorage.getItem("List") || '[]')
  
  ola = ""

  constructor() { }

  ngOnInit(): void {}

  ngDoCheck(){
    this.setLocalStorage()
  }

  deleteOneTask(event: number){
    this.taskList.splice(event, 1)
  }

  deleteAllTaks(){
    const confirm = window.confirm("Are you sure you?")
    if(confirm)
      this.taskList = []
  }

  setEmitTaskList(event: string){
    this.taskList.push({ text: event, checked: false })
  }

  validationInput(event: string, index: number){
    if(!event.length){
      const confirmMessage = window.confirm("Empty task, are you sure you want to delete it?")
      if(confirmMessage){
        this.deleteOneTask(index)
      }
    }
  }

  setLocalStorage(){
    if(this.taskList){
      this.taskList.sort( (first, last) => 
        Number(first.checked) - Number(last.checked)
      )
      localStorage.setItem('List', JSON.stringify(this.taskList))
    }
  }

}
