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
}

export default TaskService;