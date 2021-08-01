import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import ListeProduits from '../composant/ListeProduits';
import PageListeProduit from './PageListeProduit';

import produits from '../../../client-backend/produits.json';


    test('Affiche la liste de produits', () => {
        const {queryByText} = render(<ListeProduits listeProduits={produits} />);
        const produitsAbsent = queryByText(/Bambii/);
        expect(screen.getByText("Claritin")).toBeInTheDocument();
        expect(produitsAbsent).not.toBeInTheDocument();
    });    

    test('Affiche sans exception', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PageListeProduit />, div);
    });


