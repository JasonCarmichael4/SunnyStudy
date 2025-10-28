import React from 'react';
import { createRoot } from 'react-dom/client';
import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';

const App: React.FC = () => (
    <Container>
        <h2>Placeholder</h2>
    </Container>
);

createRoot(document.getElementById('root')!).render(<App />);