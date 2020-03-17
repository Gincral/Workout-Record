import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import '../styles/Tasks.css';
import { setFinishedTasksList } from '../actions';

class Task extends React.Component {

    constructor(props) {
        super(props);

    }

    generateTime() {
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
            case 7:
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
        const date = month + " " + DATE.getDate() + ", " + DATE.getFullYear();
        return [day.toLocaleUpperCase(), date];

    }

    finishTask(task) {
        const { unfinishedTasksList, finishedTasksList, dispatch } = this.props;
        let array = [];
        array.concat(unfinishedTasksList);
        console.log(unfinishedTasksList[0]);
        // const index = array.findIndex(task);
        // console.log(index);
        // dispatch(setFinishedTasksList(finishedTasksList.push(unfinishedTasksList[index])));
    }

    undoTask(task) {

    }

    render() {
        const { list } = this.props;
        const { unfinishedTasksList, finishedTasksList } = this.props;
        const data = this.generateTime();
        return (
            <div>
                <a className="task-day">{data[0]}</a><br />
                <a className="task-date">{data[1]}</a>

                <br /><br /><a>tasks for today</a>
                <hr />
                {unfinishedTasksList.map(task => (
                    <Card className="tasks-card" onClick={() => { this.finishTask(task) }} >
                        <CardContent>
                            <Typography variant="h5" component="h2"> {task.name} </Typography>
                            <Typography color="textSecondary"> {task.description} </Typography>
                        </CardContent>
                    </Card>))}
                <br /><a>tasks done</a>
                <hr />
                {finishedTasksList.map(task => (
                    <Card className="tasks-card">
                        <CardContent>
                            <Typography variant="h5" component="h2"> {task.name} </Typography>
                            <Typography color="textSecondary"> {task.description} </Typography>
                        </CardContent>
                    </Card>))}
            </div>
        );
    }
}

Task.propTypes = {
    dispatch: PropTypes.func.isRequired,
    // unfinishedTasksList: PropTypes.array.isRequired,
    unfinishedTasksList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
    unfinishedTasksList: state.unfinishedTasksList,
    finishedTasksList: state.finishedTasksList,
});

export default connect(mapStateToProps)(Task);