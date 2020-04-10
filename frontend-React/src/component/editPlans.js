import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BBadge from 'react-bootstrap/Badge'
import '../styles/EditPlans.css';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { setTasksList, selectingTask, setTodaysTasksList, setUnfinishedTasksList, setFinishedTasksList } from '../actions';
import history from '../history';
import Drawer from "@material-ui/core/Drawer";
import List from '@material-ui/core/List';

class EditPlans extends React.Component {
    constructor(props) {
        super(props)
        const { task } = this.props;
        this.state = {
            name: task.name,
            groups: task.groups,
            description: task.description,
            days: task.days,
            groupNumber: task.groups.length,
            drawerTimes: false,
            drawerDay: false,
        }
    }

    toggleDrawer = (bool, str) => {
        let obj = {};
        obj[str] = bool;
        this.setState(obj);
    };

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
        this.updateUnfinishedTasksList(selectedTask);
        this.updateFinishedTasksList(selectedTask);
        history.push("/plans");
        window.location.reload();
    }

    updateTasksList(task) {
        const id = task._id;
        const { tasksList, dispatch, todaysTasksList } = this.props;
        let list = tasksList;
        let day = (new Date()).getDay();
        if (day === 0) day = 6;
        else day -= 1;
        for (let i = 0; i < list.length; i++) {
            if (list[i]._id === id) {
                list[i] = task;
                // update tasks List
                dispatch(setTasksList(list));
                // update todays tasks List
                const todaysList = [];
                for (let i = 0; i < list.length; i++) {
                    if (list[i].days[day]) todaysList.push(list[i]);
                }
                dispatch(setTodaysTasksList(todaysList));
                return;
            }
        }
        list.push(task);
        dispatch(setTasksList(list));
        if (task.days[day]) {
            todaysTasksList.push(task);
            dispatch(setTodaysTasksList(todaysTasksList));
        }
    }

    updateFinishedTasksList(task) {
        const { finishedTasksList, dispatch } = this.props;
        let day = (new Date()).getDay();
        if (day === 0) day = 6;
        else day -= 1;
        if (task.days[day]) {
            for (let i = 0; i < finishedTasksList.length; i++) {
                if (finishedTasksList[i]._id = task._id) {
                    finishedTasksList[i] = task;
                    dispatch(setFinishedTasksList(finishedTasksList));
                    return;
                }
            }
        } else {
            for (let i = 0; i < finishedTasksList.length; i++) {
                if (finishedTasksList[i]._id = task._id) {
                    finishedTasksList.splice(i, 1);
                    dispatch(setFinishedTasksList(finishedTasksList));
                    return;
                }
            }
        }
    }

    updateUnfinishedTasksList(task) {
        const { unfinishedTasksList, dispatch } = this.props;
        let day = (new Date()).getDay();
        if (day === 0) day = 6;
        else day -= 1;
        if (task.days[day]) {
            for (let i = 0; i < unfinishedTasksList.length; i++) {
                if (unfinishedTasksList[i]._id === task._id) {
                    unfinishedTasksList[i] = task;
                    dispatch(setUnfinishedTasksList(unfinishedTasksList));
                    return;
                }
            }
            unfinishedTasksList.push(task);
            dispatch(setUnfinishedTasksList(unfinishedTasksList));
            return;
        } else {
            for (let i = 0; i < unfinishedTasksList.length; i++) {
                if (unfinishedTasksList[i]._id === task._id) {
                    unfinishedTasksList.splice(i, 1);
                    dispatch(setUnfinishedTasksList(unfinishedTasksList));
                    return;
                }
            }
        }
    }

    deleteTask(task){
        const { tasksList, dispatch, todaysTasksList, finishedTasksList, unfinishedTasksList } = this.props;
        for(let i=0; i< tasksList.length; i++){
            if (task._id === tasksList[i]._id){
                tasksList.splice(i,1);
                dispatch(setTasksList(tasksList));
                break;
            }
        }
        for(let i=0; i< todaysTasksList.length; i++){
            if (task._id === todaysTasksList[i]._id){
                todaysTasksList.splice(i,1);
                dispatch(setTodaysTasksList(tasksList));
                break;
            }
        }
        for(let i=0; i< finishedTasksList.length; i++){
            if (task._id === finishedTasksList[i]._id){
                finishedTasksList.splice(i,1);
                dispatch(setFinishedTasksList(tasksList));
                break;
            }
        }
        for(let i=0; i< unfinishedTasksList.length; i++){
            if (task._id === unfinishedTasksList[i]._id){
                unfinishedTasksList.splice(i,1);
                dispatch(setUnfinishedTasksList(tasksList));
                break;
            }
        }
        history.push('/plans');
        window.location.reload();
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

    ChangeGroupNumber = (number) => {
        const { groups, groupNumber } = this.state;
        if (number === groupNumber) {
            return;
        } else if (number > groupNumber) {
            for (let i = 0; i < number - groupNumber; i++) {
                const group = {
                    times: 0,
                    weight: 0,
                    unit: 'lbs',
                    note: ''
                }
                groups.push(group);
                this.setState({ groups: groups });
            }
        } else {
            groups.splice(number, groupNumber - number);
            this.setState({ groups: groups });
        }
        this.setState({ groupNumber: number });

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

    unselectedStyle = {
        color: '#007bff',
        borderColor: '#007bff',
    }

    selectedStyle = {
        color: 'white',
        backgroundColor: '#007bff',
    }

    render() {
        const { name, description, groups, days, drawerTimes, drawerDay, groupNumber } = this.state;
        const { task } = this.props;
        const NumberList = [];
        for (let i = 1; i <= 20; i++) {
            NumberList.push(i);
        };
        return <div>
            <div className="edit-plans-title-bar">
                <div className='edit-plans-title'><br />
                    <div className="edit-plans-cancel" onClick={this.cancel}>Cancel</div>
                    Edit Task
                    <div className="edit-plans-save" color="primary" onClick={this.save} >Save</div>
                </div>
            </div>

            <div className="edit-plans-body">
                <div className="edit-plans-body-name">
                    <br />
                    <input className='edit-plans-input edit-plans-name-input' defaultValue={name} type="text" id="name" name="name" onChange={this.handleNameChange} />
                </div>
                <div className="edit-plans-body-description">
                    <div className='edit-plans-tag' >Description</div>
                    <input className='edit-plans-input edit-plans-description-input' defaultValue={description} type="text" id="description" name="description" onChange={this.handleDescriptionChange} />
                </div>
                <div className="edit-plans-body-group-number">
                    <div className='edit-plans-tag' >Number of Groups</div>
                    <div className='edit-plans-group-number'>
                        <div style={{ marginTop: '10px' }}>{groupNumber}</div>
                        <div className='edit-plans-change-group-number' onClick={() => { this.toggleDrawer(true, 'drawerTimes') }}> Change Number </div>
                    </div>

                </div>
                <div className="edit-plans-body-group">
                    <div className="edit-plans-body-group-title"> Groups </div>
                    {groups.map((group, index) => (
                        <ExpansionPanel style={{ backgroundColor: '#fafafa', fontSize: '40px' }}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" >
                                <Typography>{group.note + ":         " + group.times + "reps - " + group.weight + group.unit}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div style={{ width: '100%' }}>
                                    <div className="edit-plans-panel">
                                        <div className='edit-plans-tag' >Note</div>
                                        <input className='edit-plans-panel-input' defaultValue={group.note} onChange={(event) => { this.handleGroupsNoteChange(index, event) }} type="text" />
                                    </div>
                                    <div className="edit-plans-panel">
                                        <div className='edit-plans-tag' >Repeat</div>
                                        <input className='edit-plans-panel-input' defaultValue={group.times} onChange={(event) => { this.handleGroupsTimesChange(index, event) }} type="text" />
                                    </div>
                                    <div className="edit-plans-panel">
                                        <div className='edit-plans-tag' >Quantity</div>
                                        <input className='edit-plans-panel-input' defaultValue={group.weight} onChange={(event) => { this.handleGroupsWeightChange(index, event) }} type="text" />
                                    </div>
                                    <div className="edit-plans-panel">
                                        <div className='edit-plans-tag' >Unit</div>
                                        <input className='edit-plans-panel-input' defaultValue={group.unit} onChange={(event) => { this.handleGroupsUnitChange(index, event) }} type="text" />
                                    </div>
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))}
                </div>
                <div className="edit-plans-body-days">
                    <div className="edit-plans-body-days-title"> Days </div>
                    <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }} onClick={() => { this.toggleDrawer(true, 'drawerDay') }}>
                        <BBadge className="plans-cards-pill" pill variant={days[0] ? "primary" : "light"} style={{ fontWeight: '100', width: '30px' }}><div style={{ marginLeft: '-1px' }}>Mo</div></BBadge>
                        <BBadge className="plans-cards-pill" pill variant={days[1] ? "primary" : "light"} style={{ fontWeight: '100', width: '30px' }}><div style={{ marginLeft: '-1px' }}>Tu</div></BBadge>
                        <BBadge className="plans-cards-pill" pill variant={days[2] ? "primary" : "light"} style={{ fontWeight: '100', width: '30px' }}><div style={{ marginLeft: '-1px' }}>We</div></BBadge>
                        <BBadge className="plans-cards-pill" pill variant={days[3] ? "primary" : "light"} style={{ fontWeight: '100', width: '30px' }}><div style={{ marginLeft: '-1px' }}>Th</div></BBadge>
                        <BBadge className="plans-cards-pill" pill variant={days[4] ? "primary" : "light"} style={{ fontWeight: '100', width: '30px' }}><div style={{ marginLeft: '-1px' }}>Fr</div></BBadge>
                        <BBadge className="plans-cards-pill" pill variant={days[5] ? "primary" : "light"} style={{ fontWeight: '100', width: '30px' }}><div style={{ marginLeft: '-1px' }}>Sa</div></BBadge>
                        <BBadge className="plans-cards-pill" pill variant={days[6] ? "primary" : "light"} style={{ fontWeight: '100', width: '30px' }}><div style={{ marginLeft: '-1px' }}>Su</div></BBadge>
                    </div>
                </div>
                <Button variant="outlined" style={{color:'red', borderColor:'red', width:'90%', marginLeft:"5%", marginTop:'30px'}} onClick={()=>this.deleteTask(task)}>DELETE</Button>

            </div>

            <div className='edit-plans-drawer-times'>
                <React.Fragment key={"bottom"}>
                    <Drawer anchor={"bottom"} open={drawerTimes} onClose={() => { this.toggleDrawer(false, 'drawerTimes') }}>
                        <div role="presentation" onClick={() => { this.toggleDrawer(false, 'drawerTimes') }} onKeyDown={() => { this.toggleDrawer(false, 'drawerTimes') }} >
                            <List className='edit-plans-drawer-times-list'>
                                <div className="edit-plans-drawer-times-title"> Number Of Groups</div>
                                <hr className="edit-plans-drawer-times-hr" />
                                <div className="edit-plans-drawer-times-number-list">
                                    {NumberList.map((number) => (
                                        <Button className="edit-plans-drawer-times-btn" onClick={() => { this.ChangeGroupNumber(number) }}>{number}</Button>
                                    ))}
                                </div>
                            </List>
                        </div>
                    </Drawer>
                </React.Fragment>
            </div>

            <div className='edit-plans-drawer-days'>
                <React.Fragment key={"bottom"}>
                    <Drawer anchor={"bottom"} open={drawerDay} onClose={() => { this.toggleDrawer(false, 'drawerDay') }}>
                        <div role="presentation">
                            <List className='edit-plans-drawer-days-list'>
                                <div className="edit-plans-drawer-times-title"> Select Days</div>
                                <hr className="edit-plans-drawer-hr" />
                                <Button className="edit-plans-btn-group-btn" variant="outlined" style={!days[0] ? this.unselectedStyle : this.selectedStyle} onClick={() => { this.selectDay(1) }} >Mon</Button>
                                <Button className="edit-plans-btn-group-btn" variant="outlined" style={!days[1] ? this.unselectedStyle : this.selectedStyle} onClick={() => { this.selectDay(2) }} >Tue</Button>
                                <Button className="edit-plans-btn-group-btn" variant="outlined" style={!days[2] ? this.unselectedStyle : this.selectedStyle} onClick={() => { this.selectDay(3) }} >Wed</Button>
                                <Button className="edit-plans-btn-group-btn" variant="outlined" style={!days[3] ? this.unselectedStyle : this.selectedStyle} onClick={() => { this.selectDay(4) }} >Thu</Button>
                                <Button className="edit-plans-btn-group-btn" variant="outlined" style={!days[4] ? this.unselectedStyle : this.selectedStyle} onClick={() => { this.selectDay(5) }} >Fri</Button>
                                <Button className="edit-plans-btn-group-btn" variant="outlined" style={!days[5] ? this.unselectedStyle : this.selectedStyle} onClick={() => { this.selectDay(6) }} >Sat</Button>
                                <Button className="edit-plans-btn-group-btn" variant="outlined" style={!days[6] ? this.unselectedStyle : this.selectedStyle} onClick={() => { this.selectDay(7) }} >Sun</Button>
                            </List>
                        </div>
                    </Drawer>
                </React.Fragment>
            </div>

        </div>

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