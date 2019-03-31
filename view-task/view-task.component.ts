import { Component, OnInit } from '@angular/core';
import {task} from '../add-task/add-task.model';
import {AddTaskComponent} from '../add-task/add-task.component'
import { FormBuilder,Validators} from '@angular/forms';
import { AddTaskService } from '../add-task/add-task.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  
  
  tasks: task[];
  taskModel
  example = {taskId:null,task: null, priority: null, parentTask: null,startDate: null,endDate:null };

    constructor( private fb: FormBuilder,private _addTaskService: AddTaskService,private _router: Router) {
        
    }
    addTaskForm = this.fb.group({
      taskId: [],
      task: ['', Validators.required],
      priority: ['', Validators.required],
      parentTask: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    ngOnInit() {
       this._addTaskService.getTask()
         .subscribe( data => {
           this.tasks = data;
         });
    };
  

  // editButtonClick(taskId: number) {
  //   this._router.navigate(['/task', taskId])
  // }


  updateTask(task){
    console.log("hi");
    this.taskModel =task;
    
    
     this.example = {taskId:this.taskModel.taskId,task: this.taskModel.task, priority: this.taskModel.priority, parentTask: this.taskModel.parentTask,startDate: this.taskModel.startDate,endDate:this.taskModel.endDate };
    
  }
  

  onSubmit() {
    console.log(this.addTaskForm.value);
    this._addTaskService.addTask(this.addTaskForm.value)
      .subscribe(
      response => console.log('success', response),
      error => console.error('Error!', error)
      );
  }
  
}
