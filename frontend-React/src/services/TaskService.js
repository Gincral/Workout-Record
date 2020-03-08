import HttpService from'./HttpService';

class TaskService{

    constructor() {
        this.httpService = new HttpService();
    }

    getTasks(id){
        const url = process.env.REACT_APP_API + '/task';
        id = "5e57daabbb1d4905fc89cb16";
        const params = { _id: id};
        return this.httpService.getRequest(url, {}, params);
    }
}

export default TaskService;