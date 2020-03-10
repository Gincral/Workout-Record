import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import EventNoteIcon from '@material-ui/icons/EventNote';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import '../styles/nav.css';



class Nav extends React.Component {
    render() {
        return (
            <div className="nav-bar">
                <BottomNavigation showLabels
                    // onChange={(event, newValue) => {
                    //     setValue(newValue);
                    // }}
                >
                    <BottomNavigationAction href="/calender" label="Calendar" icon={<EventNoteIcon />}  />
                    <BottomNavigationAction href="/" label="Workout" icon={<FitnessCenterIcon />} />
                    <BottomNavigationAction href="/Plans" label="Edit Plans" icon={<ImportContactsIcon />} />
                </BottomNavigation>
            </div>
        );
    }
}

export default Nav;

