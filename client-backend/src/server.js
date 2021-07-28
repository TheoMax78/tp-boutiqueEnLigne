import express from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import { getListeProduits } from './bd/getListeProduits';

const app = express();

app.use(express.json());

app.get('/api/produits', getListeProduits);

app.get('/api/produits/categorie', (requete,reponse) => {
    const categorie = requete.params.categorie;

    if (categorie !== undefined) {
        utiliserDB(async (db) => {
            const listeProduit = await db.collection('produits').find({categorie: categorie}).toArray();
            reponse.status(200).json(listeProduit); 
        }, reponse).catch(
            () => reponse.status(404).send("Produit non trouvé")
        );  
    } 
    else {
        reponse.status(500).send("catégorie non définie")
    }       
});

app.get('/api/panier/:nomUtilisateur', (requete, reponse) => {
    const nomUtilisateur = requete.params.nomUtilisateur;
    if (nomUtilisateur !== undefined) { 
        utiliserDB(async (db) => {
            const panierUtilisateur = await db.collection('panier').find({nomUtilisateur: nomUtilisateur}).toArray();
           
            reponse.status(200).json(panierUtilisateur);
        }, reponse).catch(
            () => reponse.status(404).send("Panier non trouvé")
        );
    }
    else {
        reponse.status(404).send("Utilisateur non trouvé")
    }
});

app.put('/api/produits/ajouterPanier', (requete, reponse) => {
    // A Ajouter : update si utilisateur existe deja dans la bd Panier 
    
    const {produits, nomUtilisateur} = requete.body;

    if (nomUtilisateur !== undefined && produits !== undefined) {

        utiliserDB(async (db) => {
                
            await db.collection('panier').insertOne({ 
                nomUtilisateur: nomUtilisateur,                    
                panier: [{
                    nom: produits.nom, 
                    description: produits.description, 
                    prix: produits.prix, 
                    rabais: produits.rabais, 
                    nouveauPrix: parseFloat((produits.prix - (produits.prix * produits.rabais /100))).toFixed(2),
                    quantite: 1
                }]
            });
            reponse.status(200).send('Produit ajouté !');
            
        }, reponse).catch(
            () => reponse.status(500).send("Le produit n'a pas été ajouté")
        );
    }
    else {
        reponse.status(500).send(`Paramètre incorrect`)
    }
});

app.listen(8000, () => console.log("backend démarré"))