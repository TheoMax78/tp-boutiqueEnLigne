import { utiliserDB } from './connectionBd';
import { getPanierUtilisateurDB } from './getPanierUtlisateur';



/*export function postPanierUtilisateur(requete, reponse) {
    
    const {nomUtilisateur, produits} = requete.body;
    

    if (nomUtilisateur !== undefined && produits !== undefined) {

        utiliserDB(async (db) => {
            let paniers = await getPanierUtilisateurDB(db, nomUtilisateur);
            
            
            if (paniers.length === 0) { 
                await putPanierUtilisateurDB(db, nomUtilisateur, produits);
            }
            else { 
                paniers.panier.push(produits)       
                await postPanierUtilisateurDB(db, nomUtilisateur, produits, paniers.panier);
            }
            reponse.status(200).json(paniers);
            
        }, reponse).catch(
            () => reponse.status(500).send("Le produit n'a pas été ajouté")
        );
    }
    else {
        reponse.status(500).send(`Paramètre incorrect`)
    }
} */ 

export async function postPanierUtilisateurDB(db, nomUtilisateur, produits) {
  
    return await db.collection('panier').updateOne({nomUtilisateur: nomUtilisateur}, { 
        '$push': { 
            panier: { 
                _id: produits._id,
                nom: produits.nom,
                description: produits.description,
                categorie: produits.categorie,
                prix: produits.prix,
                rabais: produits.rabais,
                quantite: 1
            }
        }
	});
}

