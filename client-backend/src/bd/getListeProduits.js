import { utiliserDB } from './connectionBd';

export function getListeProduits(requete, reponse) {
    const quantiteParPage = parseInt(requete.query.quantiteParPage);
    const pageActive = parseInt(requete.query.pageActive);
    const categorie = String(requete.query.categorie);
    
    let listeProduit = [];

    if (quantiteParPage !== undefined && pageActive !== undefined) { 
        const decalage = (pageActive - 1) * quantiteParPage;
        
        const finPage = decalage + quantiteParPage;       
        
        utiliserDB(async (db) => {

            listeProduit = await getListeProduitsDB(db);

            if (categorie !== undefined) {
               listeProduit.filter(produit => produit.categorie === categorie); 
            }
            
            const listeProduitTrier = listeProduit.slice(decalage, finPage);
            reponse.status(200).json(listeProduitTrier);
            
        }, reponse).catch(
            () => reponse.status(404).send("Produit non trouvé")
        );
        
    }
    else {
        reponse.status(500).send("Paramètre manquant")
    }
}  

export async function getListeProduitsDB(db) {
    return await db.collection('produits').find({}).toArray();
}