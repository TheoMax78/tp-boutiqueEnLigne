import express from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import { getListeProduits } from './bd/getListeProduits';
import { getPanierUtilisateur } from './bd/getPanierUtlisateur';
import { putPanierUtilisateur } from './bd/putPanierUtilisateur';
import { postPanierUtilisateur } from './bd/postPanierUtilisateur';

const app = express();

app.use(express.json());

app.get('/api/produits', getListeProduits);

app.get('/api/panier', getPanierUtilisateur);

app.put('/api/produits/ajouterPanier', putPanierUtilisateur);

app.listen(8000, () => console.log("backend démarré"));