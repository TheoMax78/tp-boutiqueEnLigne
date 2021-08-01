import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import BarreNavigation from './composant/BarreNavigation';
import { Router } from 'react-router';
import Container from 'react-bootstrap/Container';
import App from './App';

test('Affiche la Barre de navigation', () => {
        
    const {queryByText} = render(<Router><Container><BarreNavigation /></Container></Router>);        
    const texteAbsent = queryByText(/Livraison/);

    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("Produits")).toBeInTheDocument();
    expect(screen.getByText("Panier")).toBeInTheDocument();
    expect(texteAbsent).not.toBeInTheDocument();
});