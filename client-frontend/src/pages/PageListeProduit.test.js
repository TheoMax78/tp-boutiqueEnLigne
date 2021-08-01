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
    
    test('Affiche les options de filtre', () => {
        const {queryByText} = render(<PageListeProduit />);
        const texteAbsent = queryByText(/Livraison/);
        
        expect(screen.getByText(/Filtrer/)).toBeInTheDocument();
        expect(screen.getByText(/Produits Disponible/)).toBeInTheDocument();
        expect(screen.getByText("Previous")).toBeInTheDocument();
        expect(screen.getByText("Next")).toBeInTheDocument();
        expect(screen.getByText(/Produits par page/)).toBeInTheDocument();
        expect(texteAbsent).not.toBeInTheDocument();
    });

    test('Affiche sans exception', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PageListeProduit />, div);
    });


