import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

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
  public roughYear: string;
  public roughMonth: string;
  public roughDay: string;
  
  ngOnInit() {
    this.taskList = [ 
      { task:"testing1", taskDes:"i dont know what to say"},
      { task:"testing2", taskDes:"this is only for testing"},
      { task:"testing3", taskDes:":p"},
      { task:"testing4", taskDes:":p"},
      { task:"testing5", taskDes:":p"},
      { task:"testing6", taskDes:":p"},
      { task:"testing7", taskDes:":p"},
      { task:"testing8", taskDes:":p"},
    ];
  }

  constructor (public datePipe: DatePipe){
    const today = new Date();
    this.date = this.datePipe.transform(today, 'LLLL dd, yyyy');
    this.day = this.datePipe.transform(today, 'EEEE').toUpperCase();
  }

  changeTheme(){
    console.log("change theme, not implement yet");
  }

  learnMore(task: any){

  }

}
