import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import '../styles/EditPlans.css';

class EditPlans extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<div>
            <TextField id="standard-basic" label="Name" /><br />
            <TextField id="standard-multiline-static" label="Description" multiline rows="3" />
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Expansion Panel 1</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>)

    }

}

EditPlans.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(EditPlans);