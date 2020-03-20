import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { selectingTask } from '../actions';

class Plans extends React.Component {
    constructor(props) {
        super(props);
    }

    selectTask = (task) => {
        const { dispatch } = this.props;
        dispatch(selectingTask(task));
    }

    render() {
        const { tasksList } = this.props;
        return (
            <div>
                <Link href="/edit-plans">
                    {tasksList.map(task => (
                        <Card className="edit-plans-card" key={task._id} onClick={() => { this.selectTask(task) }} >
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom> {task.description} </Typography>
                                <Typography variant="h5" component="h2"> {task.name} </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Link>
            </div>
        );
    }
}

Plans.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    tasksList: state.tasksList,
});

export default connect(mapStateToProps)(Plans);