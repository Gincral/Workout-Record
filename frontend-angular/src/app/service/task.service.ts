import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public TASKLIST: any;
  public SELECTED_TASK: any;
  constructor(private httpService: HttpService) { }

  getTasks(id: String){
    const url = "http://localhost:5000/task";
    const params = { _id: id}
    this.httpService.get(url, params).subscribe((data)=>{
      this.TASKLIST = data;
    });
  }

  setSelectedTask(task: any) {
    this.SELECTED_TASK = task;
  }
}
