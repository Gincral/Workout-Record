import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserService } from '../service/user.service';
import { TaskService } from '../service/task.service';
import 'hammerjs';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [DatePipe],
})
export class Tab2Page {
  public day: string;
  public date: string;
  public taskList: any[];
  
  ngOnInit() {
    this.getTasks();
  }

  constructor (public datePipe: DatePipe, private userService: UserService, private taskService: TaskService){
    const today = new Date();
    this.date = this.datePipe.transform(today, 'LLLL dd, yyyy');
    this.day = this.datePipe.transform(today, 'EEEE').toUpperCase();
  }

  async getTasks(){
    this.taskService.getTasks("").subscribe((data)=>{
      this.taskList = data;
    });
  }
  changeTheme(){
    console.log("change theme, not implement yet");
  }

  learnMore(task: any){
    console.log("this is a swipe");
  }
  

}
