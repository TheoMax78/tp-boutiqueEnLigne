import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import PageListeProduit from './PageListeProduit';

test('Affiche sans exception', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PageListeProduit />, div);
});