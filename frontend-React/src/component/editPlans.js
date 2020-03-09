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

class EditPlans extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            monday: false ? "outlined" : "contained",
            tuesday: false ? "outlined" : "contained",
            wednesday: false ? "outlined" : "contained",
            thursday: false ? "outlined" : "contained",
            friday: false ? "outlined" : "contained",
            saturday: false ? "outlined" : "contained",
            sunday: false ? "outlined" : "contained",
        }
    }

    selectDay = (number, status) => {
        switch (number) {
            case 1:
                status === "contained" ? this.setState({ monday: "outlined" }) : this.setState({ monday: "contained" });
                break;
            case 2:
                status === "contained" ? this.setState({ tuesday: "outlined" }) : this.setState({ tuesday: "contained" });
                break;
            case 3:
                status === "contained" ? this.setState({ wednesday: "outlined" }) : this.setState({ wednesday: "contained" });
                break;
            case 4:
                status === "contained" ? this.setState({ thursday: "outlined" }) : this.setState({ thursday: "contained" });
                break;
            case 5:
                status === "contained" ? this.setState({ friday: "outlined" }) : this.setState({ friday: "contained" });
                break;
            case 6:
                status === "contained" ? this.setState({ saturday: "outlined" }) : this.setState({ saturday: "contained" });
                break;
            case 7:
                status === "contained" ? this.setState({ sunday: "outlined" }) : this.setState({ sunday: "contained" });
                break;
        }

    }

    render() {
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = this.state;
        return (<div>
            <TextField id="standard-basic" label="Name" /><br />
            <TextField id="standard-multiline-static" label="Description" multiline rows="3" />
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Expansion Panel 1</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <Button variant={monday} color="primary" onClick={() => { this.selectDay(1, monday) }} >Mon</Button>
            <Button variant={tuesday} color="primary" onClick={() => { this.selectDay(2, tuesday) }} >Tue</Button>
            <Button variant={wednesday} color="primary" onClick={() => { this.selectDay(3, wednesday) }} >Wed</Button>
            <Button variant={thursday} color="primary" onClick={() => { this.selectDay(4, thursday) }} >Thu</Button>
            <Button variant={friday} color="primary" onClick={() => { this.selectDay(5, friday) }} >Fri</Button>
            <Button variant={saturday} color="primary" onClick={() => { this.selectDay(6, saturday) }} >Sat</Button>
            <Button variant={sunday} color="primary" onClick={() => { this.selectDay(7, sunday) }} >Sun</Button>
        </div>)

    }

}

EditPlans.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    // selectedTask 
});

export default connect(mapStateToProps)(EditPlans);