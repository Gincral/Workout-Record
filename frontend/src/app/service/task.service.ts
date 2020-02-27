import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpService: HttpService) { }

  getTasks(id: String): Observable<any>{
    const url = "http://localhost:5000/task";
    const params = { _id: "5e57daabbb1d4905fc89cb16" }
    return this.httpService.get(url, params);
  }
}
