import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { loadState, saveState} from './reducers/localStorage';

const persistedState = loadState();
const store = createStore(
    reducers,
    persistedState
);
store.subscribe(() => {
    saveState({
        selectedTask: store.getState().selectedTask,
        login: store.getState().login,
    });
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));