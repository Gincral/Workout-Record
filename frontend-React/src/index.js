import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { loadState, saveState} from './reducers/localStorage';
import 'bootstrap/dist/css/bootstrap.min.css';

const persistedState = loadState();
const store = createStore(
    reducers,
    persistedState
);
store.subscribe(() => {
    saveState({
        tasksList: store.getState().tasksList,
        todaysTasksList: store.getState().todaysTasksList,
        selectedTask: store.getState().selectedTask,
        unfinishedTasksList: store.getState().unfinishedTasksList,
        finishedTasksList: store.getState().finishedTasksList,
        login: store.getState().login,
        userID: store.getState().userID,
        userName: store.getState().userName,
        day: store.getState().day,
        deleteTasksList: store.getState().deleteTasksList,
    });
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));