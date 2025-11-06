import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from "./navbar.module.css";

const SideNavbar: React.FC = () => (
    <Navbar className={styles.navBarWrapper}>
        <Nav className={styles.navBar}>
            <Nav.Link as={NavLink} to="/flashcard" style={({isActive}) => ({
                backgroundColor: isActive ? 'white' : 'darkgrey',
                borderBottom: isActive ? 'none' : '',
                color: isActive ? '#582d03' : ''
            })} className={styles.navBarItems}>Flashcard</Nav.Link>
            <Nav.Link as={NavLink} to="/citation" style={({isActive}) => ({
                backgroundColor: isActive ? 'white' : 'darkgrey',
                borderBottom: isActive ? 'none' : '',
                color: isActive ? '#582d03' : ''
            })} className={styles.navBarItems}>Citation</Nav.Link>
            <Nav.Link as={NavLink} to="/quiz" style={({isActive}) => ({
                backgroundColor: isActive ? 'white' : 'darkgrey',
                borderBottom: isActive ? 'none' : '',
                color: isActive ? '#582d03' : ''
            })} className={styles.navBarItems}>Quiz</Nav.Link>
            <Nav.Link as={NavLink} to="/summary" style={({isActive}) => ({
                backgroundColor: isActive ? 'white' : 'darkgrey',
                borderBottom: isActive ? 'none' : '',
                color: isActive ? '#582d03' : ''
            })} className={styles.navBarItems}>Summary</Nav.Link>
            <Nav.Link as={NavLink} to="/info" style={({isActive}) => ({
                backgroundColor: isActive ? 'white' : 'darkgrey',
                borderBottom: isActive ? 'none' : '',
                color: isActive ? '#582d03' : ''
            })} className={styles.navBarItems}>Info</Nav.Link>
        </Nav>
    </Navbar>
);

export default SideNavbar;