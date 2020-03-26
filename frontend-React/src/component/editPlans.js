import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import '../styles/EditPlans.css';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { setTasksList, selectingTask, setTodaysTasksList, setUnfinishedTasksList, setFinishedTasksList } from '../actions';
import history from '../history';

class EditPlans extends React.Component {
    constructor(props) {
        super(props)
        const { task } = this.props;
        this.state = {
            name: task.name,
            groups: task.groups,
            description: task.description,
            days: task.days,
        }
    }

    save = () => {
        const { task, dispatch } = this.props;
        const { name, description, groups, days } = this.state;
        const selectedTask = {
            _id: task._id,
            name: name,
            description: description,
            groups: groups,
            days: days,
            user_id: task.user_id
        }
        dispatch(selectingTask(selectedTask));
        this.updateTasksList(selectedTask);
        this.updateTodaysTasksList(selectedTask);


        // history.push("/plans");
        // window.location.reload();
    }

    updateTasksList(task) {
        const id = task._id;
        const { tasksList, dispatch } = this.props;
        for (let i = 0; i < tasksList.length; i++) {
            if (tasksList[i]._id === id) {
                tasksList[i] = task;
                dispatch(setTasksList(tasksList));
                return;
            }
        }
    }

    updateTodaysTasksList(task) {
        let day = (new Date()).getDay();
        if (day === 0) day = 7;
        if(task.days[day-1]){

        }else{
            
        }

    }

    cancel = () => {
        history.push('/plans');
        window.location.reload();
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handleDescriptionChange = (event) => {
        this.setState({ description: event.target.value });
    }

    handleGroupsNoteChange = (index, event) => {
        const { groups } = this.state;
        groups[index].note = event.target.value;
        this.setState({ groups: groups });
    }

    handleGroupsTimesChange = (index, event) => {
        const { groups } = this.state;
        groups[index].times = event.target.value;
        this.setState({ groups: groups });
    }

    handleGroupsWeightChange = (index, event) => {
        const { groups } = this.state;
        groups[index].weight = event.target.value;
        this.setState({ groups: groups });
    }

    handleGroupsUnitChange = (index, event) => {
        const { groups } = this.state;
        groups[index].unit = event.target.value;
        this.setState({ groups: groups });
    }

    selectDay = (index) => {
        const { days } = this.state;
        days[index - 1] = !days[index - 1];
        this.setState({ days: days });
    }

    render() {
        const { name, description, groups, days } = this.state;
        return (<div>
            <div className="edit-plans-title-bar">
                <Button className="edit-plans-cancel" onClick={this.cancel}>Cancel</Button>
                Edit Task
                <Button className="edit-plans-primary" color="primary" onClick={this.save} >Save</Button>
            </div>
            <TextField id="standard-basic" label="Name" defaultValue={name} onChange={this.handleNameChange} /><br />
            <TextField id="standard-basic" label="Description" defaultValue={description} onChange={this.handleDescriptionChange} />
            <Typography id="discrete-slider" gutterBottom > Groups:  </Typography>
            {groups.map((group, index) => (
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{group.note + ":         " + group.times + "reps - " + group.weight + group.unit}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <TextField id="standard-basic" label="note: " defaultValue={group.note} onChange={(event) => { this.handleGroupsNoteChange(index, event) }} /><br />
                        <TextField id="standard-basic" label="reps: " defaultValue={group.times} onChange={(event) => { this.handleGroupsTimesChange(index, event) }} />
                        <TextField id="standard-basic" label="quantity" defaultValue={group.weight} onChange={(event) => { this.handleGroupsWeightChange(index, event) }} />
                        <TextField id="standard-basic" label="unit" defaultValue={group.unit} onChange={(event) => { this.handleGroupsUnitChange(index, event) }} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
            <Button variant={!days[0] ? "outlined" : "contained"} color="primary" onClick={() => { this.selectDay(1) }} >Mon</Button>
            <Button variant={!days[1] ? "outlined" : "contained"} color="primary" onClick={() => { this.selectDay(2) }} >Tue</Button>
            <Button variant={!days[2] ? "outlined" : "contained"} color="primary" onClick={() => { this.selectDay(3) }} >Wed</Button>
            <Button variant={!days[3] ? "outlined" : "contained"} color="primary" onClick={() => { this.selectDay(4) }} >Thu</Button>
            <Button variant={!days[4] ? "outlined" : "contained"} color="primary" onClick={() => { this.selectDay(5) }} >Fri</Button>
            <Button variant={!days[5] ? "outlined" : "contained"} color="primary" onClick={() => { this.selectDay(6) }} >Sat</Button>
            <Button variant={!days[6] ? "outlined" : "contained"} color="primary" onClick={() => { this.selectDay(7) }} >Sun</Button>
        </div>)

    }

}

EditPlans.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    task: state.selectedTask,
    userID: state.userID,
    tasksList: state.tasksList,
    todaysTasksList: state.todaysTasksList,
    unfinishedTasksList: state.unfinishedTasksList,
    finishedTasksList: state.finishedTasksList,
});

export default connect(mapStateToProps)(EditPlans);