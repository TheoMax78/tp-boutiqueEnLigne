import React from 'react';
import ReactDOM from 'react-dom';
import PagePanier from './PagePanier';

test('Affiche sans exception', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PagePanier />, div);
});