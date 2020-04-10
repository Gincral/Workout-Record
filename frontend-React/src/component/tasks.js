import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import '../styles/Tasks.css';
import { setFinishedTasksList, updateLogin, setUnfinishedTasksList, setTodaysTasksList, setDay } from '../actions';
import Drawer from "@material-ui/core/Drawer";
import List from '@material-ui/core/List';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Button from 'react-bootstrap/Button';
import CheckIcon from '@material-ui/icons/Check';
import ReplayIcon from '@material-ui/icons/Replay';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class Task extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            openDrawer: false,
            array1: this.props.unfinishedTasksList,
            array2: this.props.finishedTasksList,
        }
    }

    generateTime = () => {
        const DATE = new Date();
        let day;
        switch (DATE.getDay()) {
            case 1:
                day = "monday";
                break;
            case 2:
                day = "tuesday";
                break;
            case 3:
                day = "wednesday";
                break;
            case 4:
                day = "thursday";
                break;
            case 5:
                day = "friday";
                break;
            case 6:
                day = "saturday";
                break;
            case 0:
                day = "sunday";
                break;
        }
        let month;
        switch (DATE.getMonth() + 1) {
            case 1:
                month = "January";
                break;
            case 2:
                month = "February";
                break;
            case 3:
                month = "March";
                break;
            case 4:
                month = "April";
                break;
            case 5:
                month = "May";
                break;
            case 6:
                month = "June";
                break;
            case 7:
                month = "July";
                break;
            case 8:
                month = "August";
                break;
            case 9:
                month = "September";
                break;
            case 10:
                month = "October";
                break;
            case 11:
                month = "November";
                break;
            case 12:
                month = "December";
                break;
        }
        console.log(day);
        const date = month + " " + DATE.getDate() + ", " + DATE.getFullYear();
        return [day.toLocaleUpperCase(), date];

    }

    finishTask = (task) => {
        const { dispatch } = this.props;
        const { array1, array2 } = this.state;
        for (let i = 0; i < array1.length; i++) {
            if (task._id === array1[i]._id) {
                array2.push(task)
                this.setState({ array2: array2 });
                array1.splice(i, 1);
                this.setState({ array1: array1 });
                dispatch(setFinishedTasksList(array2));
                dispatch(setUnfinishedTasksList(array1));
                return;
            }
        }
    }

    undoTask = (task) => {
        const { dispatch } = this.props;
        const { array1, array2 } = this.state;
        for (let i = 0; i < array2.length; i++) {
            if (task._id === array2[i]._id) {
                array1.push(task)
                this.setState({ array1: array1 });
                array2.splice(i, 1);
                this.setState({ array2: array2 });
                dispatch(setFinishedTasksList(array2));
                dispatch(setUnfinishedTasksList(array1));
                return;
            }
        }
    }

    logout = () => {
        this.props.dispatch(updateLogin(false));
        localStorage.clear();
    }

    setTodaysList() {
        const { dispatch, tasksList } = this.props;
        console.log(tasksList);
        let todaysList = [];
        let index = (new Date()).getDay();
        if (index === 0) {
            index = 6;
        } else {
            index = index - 1;
        }
        console.log(index);
        tasksList.forEach((task) => {
            console.log(task);
            if (task.days[index] === true) {
                todaysList.push(task);
            }
        });
        dispatch(setTodaysTasksList(todaysList));
        dispatch(setUnfinishedTasksList(todaysList));
        dispatch(setFinishedTasksList([]));
    }

    toggleDrawer = (bool) => {
        this.setState({ openDrawer: bool });
    };

    dailyUpdate() {
        const { day, dispatch, tasksList } = this.props;
        let today = (new Date()).getDay();
        if (today === 0) today = 6;
        else today -= 1;
        if (today !== day) {
            dispatch(setDay(today));
            const todaysList = [];
            tasksList.forEach(element => {
                if (element.days[today]) todaysList.push(element);
            });
            dispatch(setTodaysTasksList(todaysList));
            dispatch(setUnfinishedTasksList(todaysList));
            dispatch(setFinishedTasksList([]));
            window.location.reload();
        }
    }

    render() {
        const { array1, array2, openDrawer } = this.state;
        const data = this.generateTime();
        this.dailyUpdate();
        return (
            <div>
                <div className='tasks-top-bar'>
                    <br />
                    <h6 className='tasks-top-bar-title'> Today's Tasks </h6>
                    <PersonOutlineIcon className='tasks-top-bar-icon' fontSize="large" onClick={() => { this.toggleDrawer(true) }} />
                </div>
                <div className='tasks-body'>
                    <div className="task-day">{data[0]}</div>
                    <div className="task-date">{data[1]}</div>
                    <div className="task-title">
                        <PlaylistAddIcon style={{ color: 'rgba(0, 0, 0, 0.6)' }} />
                        UNFINISHED TASKS
                        </div>
                    <hr className="task-title-hr" />
                    {array1.map(task => (
                        <div className="tasks-expansion-panel">
                            <ExpansionPanel >
                                <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header" >
                                    <div>
                                        <div className='tasks-task-description'> {task.description.toLocaleUpperCase()}</div>
                                        <div className='tasks-task-name'> {task.name} </div>
                                        <div style={{ width: "310px", float: 'right' }}>
                                            <Button variant="outline-primary" size="sm" className='tasks-task-done-btn' 
                                            onClick={(e) => {e.stopPropagation(); this.finishTask(task)}}
                                            onFocus={(e) => {e.stopPropagation()}}>
                                                <CheckIcon fontSize='inherit' style={{ marginTop: '-20px', marginLeft: '-6px' }} />
                                            </Button>
                                        </div>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div>
                                        {task.groups.map(group => (
                                            <Typography>{group.note + ": " + group.times + " reps - " + group.weight + group.unit}</Typography>
                                        ))}
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    ))}
                    <div className="task-title">
                        <PlaylistAddCheckIcon style={{ color: 'rgba(0, 0, 0, 0.6)' }} />
                        TASKS DONE
                    </div>
                    <hr className="task-title-hr" />
                    {array2.map(task => (
                        <div className="tasks-expansion-panel">
                            <ExpansionPanel style={{ borderLeft: "transparent" }}>
                                <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header" >
                                    <div>
                                        <div className='tasks-task-description'> {task.description.toLocaleUpperCase()}</div>
                                        <div className='tasks-task-name'> {task.name} </div>
                                        <div style={{ width: "310px", float: 'right' }}>
                                            <Button variant="outline-primary" size="sm" className='tasks-task-done-btn' 
                                            onClick={(e) => {e.stopPropagation(); this.undoTask(task)}}
                                            onFocus={(e) => {e.stopPropagation()}}>
                                                <ReplayIcon fontSize='inherit' style={{ marginTop: '-20px', marginLeft: '-6px' }} />
                                            </Button>
                                        </div>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div>
                                        {task.groups.map(group => (
                                            <Typography>{group.note + ": " + group.times + " reps - " + group.weight + group.unit}</Typography>
                                        ))}
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>))}
                </div>

                <div className='tasks-drawer'>
                    <React.Fragment key={"bottom"}>
                        <Drawer anchor={"bottom"} open={openDrawer} onClose={() => { this.toggleDrawer(false) }}>
                            <div role="presentation" onClick={() => { this.toggleDrawer(false) }} onKeyDown={() => { this.toggleDrawer(false) }} >
                                <List>

                                    <p className="tasks-drawer-user-name">❤️❤️ Nina ❤️❤️</p>
                                    <hr />
                                    <p className="tasks-drawer-options"><AccessibilityIcon className='tasks-drawer-icon' />Change User Name</p>
                                    <p className="tasks-drawer-options" onClick={this.update}><PublishIcon className='tasks-drawer-icon' />Upload Data</p>
                                    <p className="tasks-drawer-options"><GetAppIcon className='tasks-drawer-icon' />Download Data</p>
                                    <p className="tasks-drawer-options" onClick={this.logout}><ExitToAppIcon className='tasks-drawer-icon' />log out</p>
                                </List>
                            </div>
                        </Drawer>
                    </React.Fragment>
                </div>
            </div>
        );
    }
}

Task.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    selectedTask: state.selectedTask,
    unfinishedTasksList: state.unfinishedTasksList,
    finishedTasksList: state.finishedTasksList,
    tasksList: state.tasksList,
    day: state.day,
});

export default connect(mapStateToProps)(Task);