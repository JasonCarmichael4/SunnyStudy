import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const SideNavbar: React.FC = () => (
    <Navbar>
        <Nav>
            <Nav.Link as={NavLink} to="/info">Info</Nav.Link>
            <Nav.Link as={NavLink} to="/citation">Citation</Nav.Link>
            <Nav.Link as={NavLink} to="/flashcard">Flashcard</Nav.Link>
            <Nav.Link as={NavLink} to="/quiz">Quiz</Nav.Link>
            <Nav.Link as={NavLink} to="/summary">Summary</Nav.Link>
        </Nav>
    </Navbar>
);

export default SideNavbar;