import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import PagePanier from './PagePanier';

test('Affiche la page panier', () => {
    const {queryByText} = render(<PagePanier />);
    const texteAbsent = queryByText(/Produits Disponible/);
    
    expect(screen.getByText(/Mon panier/)).toBeInTheDocument();
    expect(screen.getByText(/Utilisateur/)).toBeInTheDocument();
    expect(screen.getByText(/vide/)).toBeInTheDocument();
    expect(texteAbsent).not.toBeInTheDocument();
});

test('Affiche sans exception', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PagePanier />, div);
});