import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import styles from "./navbar.module.css";
import logo from '../../assets/images/6.png'

import * as Icon from 'react-bootstrap-icons';

const getSectionClasses = (currentPath, linkPath, elementStyle) => {

    const isActive = currentPath === linkPath;
    return isActive ? `${elementStyle.section} ${elementStyle.sectionActive}` : `${elementStyle.section}`

}

const SideNavbar: React.FC = () => {

    const location = useLocation();
    const currentPath = location.pathname;
    
    return (

    <Navbar className={styles.navBarWrapper}>
        <Nav className={styles.navBar}>
            <div className={getSectionClasses(currentPath, '/flashcard', styles)}>
                <Nav.Link id={"bazinga"} as={NavLink} to="/flashcard" className={styles.navBarItems}
                active={currentPath === '/flashcard'}>
                <Icon.CardText/>
                </Nav.Link>
                <img src={logo} alt="Active link background image"></img>
            </div>

            <div className={getSectionClasses(currentPath, '/citation', styles)}>
                <Nav.Link id={"bazinga"} as={NavLink} to="/citation" className={styles.navBarItems}
                active={currentPath === '/citation'}>
                <Icon.Pencil/>
                </Nav.Link>
                <img src={logo} alt="Active link background image"></img>
            </div>

            <div className={getSectionClasses(currentPath, '/quiz', styles)}>
                <Nav.Link id={"bazinga"} as={NavLink} to="/quiz" className={styles.navBarItems}
                active={currentPath === '/quiz'}>
                <Icon.PatchQuestion/>
                </Nav.Link>
                <img src={logo} alt="Active link background image"></img>
            </div>

            <div className={getSectionClasses(currentPath, '/summary', styles)}>
                <Nav.Link id={"bazinga"} as={NavLink} to="/summary" className={styles.navBarItems}
                active={currentPath === '/summary'}>
                <Icon.Quote/>
                </Nav.Link>
                <img src={logo} alt="Active link background image"></img>
            </div>

            <div className={getSectionClasses(currentPath, '/info', styles)}>
                <Nav.Link id={"bazinga"} as={NavLink} to="/info" className={styles.navBarItems}
                active={currentPath === '/info'}>
                <Icon.InfoCircle size={40} />
                </Nav.Link>
                <img src={logo} alt="Active link background image"></img>
            </div>
        </Nav>
    </Navbar>
    )
};

export default SideNavbar;