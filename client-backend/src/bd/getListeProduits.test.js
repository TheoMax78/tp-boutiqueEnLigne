import { MongoClient } from 'mongodb';
import 'regenerator-runtime/runtime';

import { getListeProduitsDB } from './getListeProduits';

describe('get', () => {
    let connection, db;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        db = await connection.db("BoutiqueEnLigne"); 
    });

    afterAll(async () => {
        await connection.close();
    });

    test('Devrait retourner tous les produits', async () => {
        const produits = await getListeProduitsDB(db);

        expect(produits.length).toEqual(65);
        expect(produits.length).not.toEqual(40);
    });

    test('Devrait retourner 12 produits', async () => {
        const produits = await getListeProduitsDB(db);
        const quantiteParPage = 12;
        const pageActive = 1;

        const decalage = (pageActive - 1) * quantiteParPage;
        const finPage = decalage + quantiteParPage;
        const produitsTrier = produits.slice(decalage, finPage);
        
        expect(produitsTrier.length).toEqual(12);
        expect(produitsTrier.length).not.toEqual(40);
    });

    test('Devrait retourner 24 produits', async () => {
        const produits = await getListeProduitsDB(db);
        const quantiteParPage = 24;
        const pageActive = 1;

        const decalage = (pageActive - 1) * quantiteParPage;
        const finPage = decalage + quantiteParPage;
        const produitsTrier = produits.slice(decalage, finPage);

        expect(produitsTrier.length).toEqual(24);
        expect(produitsTrier.length).not.toEqual(40);
    });

    test('Devrait retourner 48 produits', async () => {
        const produits = await getListeProduitsDB(db);
        const quantiteParPage = 48;
        const pageActive = 1;

        const decalage = (pageActive - 1) * quantiteParPage;
        const finPage = decalage + quantiteParPage;
        const produitsTrier = produits.slice(decalage, finPage);
        
        expect(produitsTrier.length).toEqual(48);
        expect(produitsTrier.length).not.toEqual(40);
    });

    test('Devrait retourner un tableau vide', async () => {
        const produits = await getListeProduitsDB(db);
        const quantiteParPage = "aaa";
        const pageActive = 1;

        const decalage = (pageActive - 1) * quantiteParPage;
        const finPage = decalage + quantiteParPage;
        const produitsTrier = produits.slice(decalage, finPage);

        expect(produitsTrier.length).toBe(0);        
        
    });

    test('Devrait retourner un erreur', async () => {
        const produits = await getListeProduitsDB(db);
        const quantiteParPage = undefined;
        const pageActive = 1;

        const decalage = (pageActive - 1) * quantiteParPage;
        const finPage = decalage + quantiteParPage;
        const produitsTrier = produits.slice(decalage, finPage);
        
        expect(produitsTrier.length).toBe(0);
        expect(quantiteParPage).toBeUndefined();
    });
});