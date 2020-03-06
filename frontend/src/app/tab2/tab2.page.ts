import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
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
  public taskList = [];

  ngOnInit() {
    //get the date
    const today = new Date();
    this.date = this.datePipe.transform(today, 'LLLL dd, yyyy');
    this.day = this.datePipe.transform(today, 'EEEE').toUpperCase();
    //get the task belongs to today
    this.sortTaskList(this.taskService.TASKLIST, this.day.toLocaleLowerCase());
  }

  constructor(public datePipe: DatePipe, private taskService: TaskService) {
  }


  sortTaskList(list: any[], day: String) {
    this.taskService.TASKLIST.forEach((task: any) => {
      if (task.days[this.dayToNumber(day) - 1]){
        this.taskList.push(task);
      }
    });
  }

  dayToNumber(day: String): number {
    switch (day) {
      case "monday":
        return 1;
      case "tuesday":
        return 2;
      case "wensday":
        return 3;
      case "thursday":
        return 4;
      case "friday":
        return 5;
      case "saturday":
        return 6;
      case "sunday":
        return 7;
    }
  }


}
