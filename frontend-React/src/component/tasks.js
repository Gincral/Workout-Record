import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import '../styles/Tasks.css';

class Task extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { todaysTaskList } = this.props;
        return (
            <div>
                {todaysTaskList.map(task => (
                    <Card className="tasks-card">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom> {task.description} </Typography>
                            <Typography variant="h5" component="h2"> {task.name} </Typography>
                        </CardContent>
                    </Card>))}
            </div>
        );
    }
}

Task.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    todaysTaskList: state.todaysTaskList,
});

export default connect(mapStateToProps)(Task);