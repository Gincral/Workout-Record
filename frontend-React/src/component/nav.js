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
                <BottomNavigation showLabels className="nav-buttom"
                    // onChange={(event, newValue) => {
                    //     setValue(newValue);
                    // }}
                >
                    <BottomNavigationAction href="/calender" icon={<EventNoteIcon />}/>
                    <BottomNavigationAction href="/" icon={<FitnessCenterIcon />} />
                    <BottomNavigationAction href="/Plans" icon={<ImportContactsIcon />} />
                </BottomNavigation>
            </div>
        );
    }
}

export default Nav;

