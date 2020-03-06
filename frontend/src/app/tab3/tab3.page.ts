import { Component } from '@angular/core'; 
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public taskList: any[];
  
  ngOnInit() {
  }
  
  constructor( private taskservice: TaskService ) {
    this.taskList = this.taskservice.TASKLIST;
  }

  setSelectedTask(task){
    this.taskservice.setSelectedTask(task);
  }

}
