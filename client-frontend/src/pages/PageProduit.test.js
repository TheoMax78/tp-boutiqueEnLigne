import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import PageProduit from './PageProduit';
//import { MongoClient, ObjectId } from 'mongodb';

describe('get', () => { 
    let connection, db;
    
    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        db = await connection.db("BoutiqueEnLigne"); 
    });

    beforeEach(async () => {
    await db.collection('produits').find([]).toArray();
    });    

    afterAll(async () => {
        await connection.close();
    });

    test('Affiche sans exception', async () => {
    
        const nomProduit = "Ice Age"; 
        const produits = await db.collection('produits').findOne({nom: nomProduit}).toArray();   
        const [ getByText ]  = render(<PageProduit produits={produits} />);    
        const message = getByText(nomProduit);
        expect(message).toBeInTheDocument();
});
})