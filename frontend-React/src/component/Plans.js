import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { selectingTask } from '../actions';
import history from '../history';
import Badge from 'react-bootstrap/Badge'
import ListAltIcon from '@material-ui/icons/ListAlt';
import Drawer from "@material-ui/core/Drawer";
import List from '@material-ui/core/List';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import EditIcon from '@material-ui/icons/Edit';
import '../styles/plans.css';

class Plans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDrawer: false
        }
    }

    selectTask = (task) => {
        const { dispatch } = this.props;
        dispatch(selectingTask(task));
        history.push("/edit-plans");
        window.location.reload();
    }

    toggleDrawer = (bool) => {
        this.setState({ openDrawer: bool });
    };

    render() {
        const { tasksList } = this.props;
        const { openDrawer } = this.state;
        return (
            <div>
                <div className='plans-top-bar'>
                    <br />
                    <h6 className='plans-top-bar-title'> All Plans </h6>
                    <ListAltIcon className='plans-top-bar-icon' fontSize="large" onClick={() => { this.toggleDrawer(true) }} />
                </div>
                <div className='plans-body'>
                    {tasksList.map(task => (
                        <Card className="plans-cards" key={task._id} onClick={() => { this.selectTask(task) }} >
                            <CardContent>
                                <div className="plans-cards-description"> {task.description.toLocaleUpperCase()} </div>
                                <div className="plans-cards-name"> {task.name} </div>
                                <div>
                                    {task.days[0] && <Badge className="plans-cards-pill" pill variant="success" style={{fontWeight:'100', width:'30px'}}><div style={{marginLeft:'-1px'}}>Mo</div></Badge>}
                                    {task.days[1] && <Badge className="plans-cards-pill" pill variant="info" style={{fontWeight:'100', width:'30px'}}><div style={{marginLeft:'-1px'}}>Tu</div></Badge>}
                                    {task.days[2] && <Badge className="plans-cards-pill" pill variant="dark" style={{fontWeight:'100', width:'30px'}}><div style={{marginLeft:'-1px'}}>We</div></Badge>}
                                    {task.days[3] && <Badge className="plans-cards-pill" pill variant="secondary" style={{fontWeight:'100', width:'30px'}}><div style={{marginLeft:'-1px'}}>Th</div></Badge>}
                                    {task.days[4] && <Badge className="plans-cards-pill" pill variant="light" style={{fontWeight:'100', width:'30px'}}><div style={{marginLeft:'-1px'}}>Fr</div></Badge>}
                                    {task.days[5] && <Badge className="plans-cards-pill" pill variant="danger" style={{fontWeight:'100', width:'30px'}}><div style={{marginLeft:'-1px'}}>Sa</div></Badge>}
                                    {task.days[6] && <Badge className="plans-cards-pill" pill variant="warning" style={{fontWeight:'100', width:'30px'}}><div style={{marginLeft:'-1px'}}>Su</div></Badge>}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className='plans-drawer'>
                    <React.Fragment key={"bottom"}>
                        <Drawer anchor={"bottom"} open={openDrawer} onClose={() => { this.toggleDrawer(false) }}>
                            <div role="presentation" onClick={() => { this.toggleDrawer(false) }} onKeyDown={() => { this.toggleDrawer(false) }} >
                                <List>
                                    <hr className="plans-drawer-hr" />
                                    <p className="plans-drawer-options"><PlaylistAddIcon className='plans-drawer-icon' />Create New Plan</p>
                                    <p className="plans-drawer-options"><EditIcon className='plans-drawer-icon' />Edit Plans</p>
                                </List>
                            </div>
                        </Drawer>
                    </React.Fragment>
                </div>
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