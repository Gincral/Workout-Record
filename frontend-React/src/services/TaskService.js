import HttpService from'./HttpService';

class TaskService{

    constructor() {
        this.httpService = new HttpService();
    }

    getTasks(id){
        const url = process.env.REACT_APP_API + '/task';
        const params = { _id: id};
        return this.httpService.getRequest(url, {}, params);
    }

    startEditing(task){
        const url = process.env.REACT_APP_API + '/task';
        const params = { _id: task._id };
        task.editing = true;
        return this.httpService.postRequest(url, {}, params, task);
    }

    endEditing(task){
        const url = process.env.REACT_APP_API + '/task';
        const params = { _id: task._id };
        task.editing = false;
        return this.httpService.postRequest(url, {}, params, task);
    }
}

export default TaskService;