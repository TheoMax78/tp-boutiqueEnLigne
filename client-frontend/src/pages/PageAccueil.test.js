import React from 'react';
import ReactDOM from 'react-dom';
import PageAccueil from './PageAccueil';

test('Affiche sans exception', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PageAccueil />, div);
});