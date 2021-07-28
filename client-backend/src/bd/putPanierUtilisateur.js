import { utiliserDB } from './connectionBd';
import { getPanierUtilisateurDB } from './getPanierUtlisateur';
import { postPanierUtilisateurDB } from './postPanierUtilisateur';


export function putPanierUtilisateur(requete, reponse) {

    const {nomUtilisateur, produits} = requete.body;

    if (nomUtilisateur !== undefined && produits !== undefined) {

        utiliserDB(async (db) => {
            let paniers = await getPanierUtilisateurDB(db, nomUtilisateur);
            
            
            if (paniers.length === 0) { 
                await putPanierUtilisateurDB(db, nomUtilisateur, produits);
            }
            else {
                 
                await postPanierUtilisateurDB(db, nomUtilisateur, produits);
            }
            reponse.status(200).json(paniers.panier);
            
        }, reponse).catch(
            () => reponse.status(500).send("Le produit n'a pas été ajouté")
        );
    }
    else {
        reponse.status(500).send(`Paramètre incorrect`)
    }
} 

export async function putPanierUtilisateurDB(db, nomUtilisateur, produits) {
    return await db.collection('panier').insertOne({
        nomUtilisateur: nomUtilisateur,
        panier: [produits]
    });
}