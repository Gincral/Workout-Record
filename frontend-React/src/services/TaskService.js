import HttpService from './HttpService';

class TaskService {

    constructor() {
        this.httpService = new HttpService();
    }

    getTasks(id) {
        const url = process.env.REACT_APP_API + '/task';
        const params = { _id: id };
        return this.httpService.getRequest(url, {}, params);
    }

    editTasks(id, name, description, groups, days) {
        const url = process.env.REACT_APP_API + '/task';
        const params = { _id: id };
        const body = {
            name: name,
            description: description,
            groups: groups,
            days: days
        }
        return this.httpService.postRequest(url, {}, params, body);
    }
}

export default TaskService;