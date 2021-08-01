import { MongoClient } from 'mongodb';
import 'regenerator-runtime/runtime';

import { CalculerDecalage, FiltrerCategorie, getListeProduitsDB, SeparerListeParPage } from './getListeProduits';

describe('get', () => {
    let connection, db, produits;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        db = await connection.db("BoutiqueEnLigne"); 
        produits = await getListeProduitsDB(db);
    });

    afterAll(async () => {
        await connection.close();
    });

    test('Devrait retourner tous les produits', async () => {        

        expect(produits.length).toEqual(65);
        expect(produits.length).not.toEqual(40);
        expect(produits[0].nom).toEqual("Claritin");
        expect(produits[64].nom).toEqual("Star Wars");
    });

    test('Devrait retourner 12 produits, page 1', async () => {
        const decalage = CalculerDecalage(1, 12);
        const produitsTrier = SeparerListeParPage(1, produits, 12);
        
        expect(produitsTrier.length).toEqual(12);
        expect(produitsTrier[0].nom).toMatch("Claritin");
        expect(produitsTrier[11].nom).toMatch(/Aveda/);
        expect(decalage).toEqual(0);
        expect(produitsTrier.length).not.toEqual(40);
    });

    test('Devrait retourner 12 produits, page 3', async () => { 
        const decalage = CalculerDecalage(3, 12);
        const produitsTrier = SeparerListeParPage(3, produits, 12);
        
        expect(produitsTrier.length).toEqual(12);
        expect(produitsTrier.length).not.toEqual(40);
        expect(decalage).toEqual(24);
        expect(produitsTrier[0].nom).toMatch(/Narnia/);
        expect(produitsTrier[11].nom).toMatch(/Godfather/);
    });

    test('Devrait retourner 24 produits, page 1', async () => {        
        const decalage = CalculerDecalage(1, 24);
        const produitsTrier = SeparerListeParPage(1, produits, 24);
        
        expect(produitsTrier.length).toEqual(24);
        expect(produitsTrier.length).not.toEqual(40);
        expect(produitsTrier[0].nom).toMatch("Claritin");
        expect(produitsTrier[23].nom).toMatch(/Octa/);
        expect(decalage).toEqual(0);
    });
    
    test('Devrait retourner 24 produits, page 3', async () => {
        const decalage = CalculerDecalage(3, 24);
        const produitsTrier = SeparerListeParPage(3, produits, 24);
        
        expect(produitsTrier.length).toEqual(17);
        expect(produitsTrier.length).not.toEqual(40);
        expect(produitsTrier[0].nom).toMatch("Shutter Island");
        expect(produitsTrier[16].nom).toMatch(/Star/);
        expect(decalage).toEqual(48);
    });

    test('Devrait retourner 48 produits, page 1', async () => {
        const decalage = CalculerDecalage(1, 48);
        const produitsTrier = SeparerListeParPage(1, produits, 48);
        
        expect(produitsTrier.length).toEqual(48);
        expect(produitsTrier[0].nom).toMatch("Claritin");
        expect(produitsTrier[47].nom).toMatch(/Dory/);
        expect(produitsTrier.length).not.toEqual(40);
        expect(decalage).toEqual(0);
    });

    test('Devrait retourner 48 produits, page 2', async () => {
        const decalage = CalculerDecalage(2, 48);
        const produitsTrier = SeparerListeParPage(2, produits, 48);
        
        expect(produitsTrier.length).toEqual(17);
        expect(produitsTrier[0].nom).toMatch(/Shut/);       
        expect(produitsTrier[16].nom).toMatch(/Wars/);
        expect(produitsTrier.length).not.toEqual(40);
        expect(decalage).toEqual(48);
    });

    test('Devrait retourner les DVD, page 1', async () => {
        const decalage = CalculerDecalage(1, 24);
        let produitsFiltrer = FiltrerCategorie("DVD", produits);
        const produitsTrier = SeparerListeParPage(1, produitsFiltrer, 24);

        expect(produitsTrier.length).toEqual(24);
        expect(produitsTrier[0].nom).toMatch(/Ice/);       
        expect(produitsTrier[23].nom).toMatch(/Tower/);
        expect(produitsTrier.length).not.toEqual(40);
        expect(decalage).toEqual(0);
    });

    test('Devrait retourner les DVD, page 2', async () => {
        const decalage = CalculerDecalage(2, 24);
        let produitsFiltrer = FiltrerCategorie("DVD", produits);
        const produitsTrier = SeparerListeParPage(2, produitsFiltrer, 24);
        
        expect(produitsTrier.length).toEqual(24);
        expect(produitsTrier[0].nom).toMatch(/Conjuring/);       
        expect(produitsTrier[23].nom).toMatch(/Snatch/);
        expect(produitsTrier.length).not.toEqual(40);
        expect(decalage).toEqual(24);
    });

    test('Devrait retourner les DVD, page 3', async () => {
        const decalage = CalculerDecalage(3, 24);
        let produitsFiltrer = FiltrerCategorie("DVD", produits);
        const produitsTrier = SeparerListeParPage(3, produitsFiltrer, 24);
        
        expect(produitsTrier.length).toEqual(2);
        expect(produitsTrier[0].nom).toMatch(/Harry Potter/);       
        expect(produitsTrier[1].nom).toMatch(/Star/);
        expect(produitsTrier.length).not.toEqual(40);
        expect(decalage).toEqual(48);
    });

    test('Devrait retourner les Cosmetiques, page 1', async () => {
        const decalage = CalculerDecalage(1, 24);
        let produitsFiltrer = FiltrerCategorie("Cosmetique", produits);
        const produitsTrier = SeparerListeParPage(1, produitsFiltrer, 24);
        
        expect(produitsTrier.length).toEqual(10);
        expect(produitsTrier[0].nom).toMatch(/Clearasil/);       
        expect(produitsTrier[9].nom).toMatch(/Rimmel/);
        expect(produitsTrier.length).not.toEqual(40);
        expect(decalage).toEqual(0);
    });

    test('Devrait retourner les Medicaments, page 1', async () => {
        const decalage = CalculerDecalage(1, 24);
        let produitsFiltrer = FiltrerCategorie("Medicament", produits);
        const produitsTrier = SeparerListeParPage(1, produitsFiltrer, 24);
        
        expect(produitsTrier.length).toEqual(5);
        expect(produitsTrier[0].nom).toMatch(/Claritin/);       
        expect(produitsTrier[4].nom).toMatch(/Risperdal/);
        expect(produitsTrier.length).not.toEqual(40);
        expect(decalage).toEqual(0);
    });

    test('Devrait tous retourner un erreur', async () => {    

        expect(CalculerDecalage(0, 48)).toMatch(/supérieur/);
        expect(CalculerDecalage(12)).toMatch(/définis/);
        expect(CalculerDecalage("aa", "bb")).toMatch(/nombre/);

        expect(FiltrerCategorie(1, produits)).toMatch(/type/);
        expect(FiltrerCategorie(produits)).toMatch(/définis/);
        expect(FiltrerCategorie(1)).toMatch(/définis/);

        expect(SeparerListeParPage(1, produits, "aaa")).toMatch(/incorrect/);
        expect(SeparerListeParPage()).toMatch(/pas définis/);
        expect(SeparerListeParPage(1, "")).toMatch(/pas définis/);
        expect(SeparerListeParPage(produits, 48)).toMatch(/pas définis/);
    });
});