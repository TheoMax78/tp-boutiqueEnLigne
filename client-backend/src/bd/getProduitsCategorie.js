import { utiliserDB } from './connectionBd';
import { getListeProduitsDB } from './getListeProduits';

export function getProduitsCategorie(requete, reponse) {
    const categorie = requete.params.categorie;

    if (categorie !== undefined) {
        utiliserDB(async (db) => {
            let listeProduit = await getListeProduitsDB(db);
            const listeProduitTrier =  listeProduit.filter(produit => produit.categorie === categorie);
            listeProduit.unshift(listeProduitTrier); 
            reponse.status(200).json(listeProduit); 
        }, reponse).catch(
            () => reponse.status(404).send("Produit non trouvé")
        );  
    } 
    else {
        reponse.status(500).send("catégorie non définie");
    } 
}  

export async function getProduitsCategorieDB(db) {
    return await db.collection('produits').find({}).toArray();
}