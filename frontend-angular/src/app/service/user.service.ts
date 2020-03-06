import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  test(){
    const url = "http://localhost:5000/user";
    const params = {
    }
    this.httpService.get(url, params).subscribe((data) => {
      console.log(data);
    });
  }

  getUserId(){
    return "5e57daabbb1d4905fc89cb16";
  }
}
