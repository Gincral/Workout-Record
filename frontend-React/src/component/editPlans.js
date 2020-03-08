import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { selectingTask } from '../actions';

class EditPlans extends React.Component {
    constructor(props) {
        super(props);
    }

    selectTask(task) {
        console.log("click");
        // const { dispatch } = this.props;
        // dispatch(selectingTask(task));
        // console.log(task);
    }

    render() {
        const { tasksList } = this.props;


        return (
            <div>
                {tasksList.map(task => (
                    <Card className="edit-plans-card" onClick={this.selectTask(task)}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom> {task.description} </Typography>
                            <Typography variant="h5" component="h2"> {task.name} </Typography>
                        </CardContent>
                    </Card>))}
            </div>
        );
    }
}

EditPlans.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    tasksList: state.tasksList,
});

export default connect(mapStateToProps)(EditPlans);