import React from 'react';
import ReactDOM from 'react-dom';
import BarreNavigation from './BarreNavigation';

test('Affiche sans exception', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BarreNavigation />, div);
});