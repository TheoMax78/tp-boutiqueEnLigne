import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import PageAccueil from './PageAccueil';

test('Affiche la page accueil', () => {
    const {queryByText} = render(<PageAccueil />);
    const texteAbsent = queryByText(/Produits Disponible/);
    
    expect(screen.getByText(/Bienvenue sur la page/)).toBeInTheDocument();
    expect(texteAbsent).not.toBeInTheDocument();
});

test('Affiche sans exception', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PageAccueil />, div);
});