import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AddTaskService } from './add-task.service';
import { ActivatedRoute } from '@angular/router';
import { task } from './add-task.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  private task: task;

  constructor(private _router: Router, private fb: FormBuilder, private _addTaskService: AddTaskService, private route: ActivatedRoute) { }
  addTaskForm = this.fb.group({
    task: ['', Validators.required],
    priority: ['', Validators.required],
    parentTask: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required]
  });






  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    //   const taskId = +params.get('taskId');
    //   if (taskId) {
    //     this.getTaskId(taskId);
    //   }
    // });
    this.task = this._addTaskService.getter();
  }
  getTaskId(taskId: number) {
    this._addTaskService.getTaskId(taskId).subscribe(
      (taskObj: task) => this.editTask(taskObj),
      (err: any) => console.log(err)
    );

  }
  editTask(taskObj: task) {
    console.log(taskObj);
    this.addTaskForm.patchValue({
      task: taskObj.task,
      priority: taskObj.priority,
      parentTask: taskObj.parentTask,

      startDate: taskObj.startDate,
      endDate: taskObj.endDate,

    });
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
