import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';

import SideNavbar from './components/Navbar';

import Citation from './routes/Citation';
import Flashcard from './routes/Flashcard';
import Info from './routes/Info';
import Quiz from './routes/Quiz';
import Summary from './routes/Summary';

const root = createRoot(document.getElementById('root')!);

root.render(
    <HashRouter>
        <SideNavbar />
        <Routes>
            <Route path="/" element={<Navigate to="/info" />} />
            <Route path="/info" element={<Info />} />
            <Route path="/citation" element={<Citation />} />
            <Route path="/flashcard" element={<Flashcard />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/summary" element={<Summary />} />
        </Routes>
    </HashRouter>
);
