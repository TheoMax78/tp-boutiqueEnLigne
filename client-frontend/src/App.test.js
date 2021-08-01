import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import App from './App';



/*test('Affiche la Barre de navigation', () => {
        
    const {queryByText} = render(<BarreNavigation />);        
    const texteAbsent = queryByText(/Livraison/);

    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("Produits")).toBeInTheDocument();
    expect(screen.getByText("Panier")).toBeInTheDocument();
    expect(texteAbsent).not.toBeInTheDocument();
});*/

test('Affiche sans exception', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});