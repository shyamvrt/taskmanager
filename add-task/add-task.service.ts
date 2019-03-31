import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { task } from '../add-task/add-task.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {
//   _url='http://localhost:8081/addTask';
//   constructor(private _http: HttpClient) { }
 
private task:task;
//   addTask(taskData){
//     console.log("hi"+taskData)
//     return this._http.post<any>(this._url, taskData);
//   }
// }
private baseUrl = 'http://localhost:8081';

 constructor(private http: HttpClient) { }

 public getTask() {
  return this.http.get<task[]>(this.baseUrl+ `/viewTask`);
}


public getTaskId(taskId: number): Observable<any>  {
  return this.http.get<task>(`${this.baseUrl}/${taskId}`);
}

 addTask(taskData: any): Observable<any> {
   return this.http.post(`${this.baseUrl}` + `/addTask`, taskData);
 }
 

 public editTask() {
  return this.http.get<task[]>(this.baseUrl+ `/`);
}
setter(task:task){
  console.log(task);
  this.task=task;
}
getter(){
  return this.task;
}

}
