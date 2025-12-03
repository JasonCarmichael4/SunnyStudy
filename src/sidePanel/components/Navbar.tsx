import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import styles from "./navbar.module.css";
import backgroundImg from '../../assets/images/6.png'

import * as Icon from 'react-bootstrap-icons';

interface NavStyles {

    readonly section: string;
    readonly sectionActive: string;
    readonly navBarItems: string;
    readonly navBarWrapper: string;
    readonly navBar: string;

}

const getSectionClasses = (currentPath: string, linkPath: string, elementStyle: NavStyles) => {

    const isActive = currentPath === linkPath;
    return isActive ? `${elementStyle.section} ${elementStyle.sectionActive}` : `${elementStyle.section}`

}

const SideNavbar: React.FC = () => {

    const location = useLocation();
    const currentPath = location.pathname;

    const typedStyles = styles as unknown as NavStyles;
    
    return (

    <Navbar className={styles.navBarWrapper}>
        <Nav className={styles.navBar}>
            <div className={getSectionClasses(currentPath, '/flashcard', typedStyles)}>
                <Nav.Link as={NavLink} to="/flashcard" className={typedStyles.navBarItems}
                active={currentPath === '/flashcard'}>
                <Icon.CardText/>
                </Nav.Link>
                <img src={backgroundImg} alt="Active link background image"></img>
            </div>

            <div className={getSectionClasses(currentPath, '/citation', typedStyles)}>
                <Nav.Link as={NavLink} to="/citation" className={typedStyles.navBarItems}
                active={currentPath === '/citation'}>
                <Icon.Pencil/>
                </Nav.Link>
                <img src={backgroundImg} alt="Active link background image"></img>
            </div>

            <div className={getSectionClasses(currentPath, '/quiz', typedStyles)}>
                <Nav.Link as={NavLink} to="/quiz" className={typedStyles.navBarItems}
                active={currentPath === '/quiz'}>
                <Icon.PatchQuestion/>
                </Nav.Link>
                <img src={backgroundImg} alt="Active link background image"></img>
            </div>

            <div className={getSectionClasses(currentPath, '/summary', typedStyles)}>
                <Nav.Link as={NavLink} to="/summary" className={typedStyles.navBarItems}
                active={currentPath === '/summary'}>
                <Icon.Quote/>
                </Nav.Link>
                <img src={backgroundImg} alt="Active link background image"></img>
            </div>

            <div className={getSectionClasses(currentPath, '/info', typedStyles)}>
                <Nav.Link as={NavLink} to="/info" className={typedStyles.navBarItems}
                active={currentPath === '/info'}>
                <Icon.InfoCircle />
                </Nav.Link>
                <img src={backgroundImg} alt="Active link background image"></img>
            </div>
        </Nav>
    </Navbar>
    )
};

export default SideNavbar;