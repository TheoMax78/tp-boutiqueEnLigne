import { utiliserDB } from './connectionBd';


export function getPanierUtilisateur(requete, reponse) {
    const nomUtilisateur = requete.query.nomUtilisateur;

    if (nomUtilisateur !== undefined) { 
        utiliserDB(async (db) => {
            const paniers = await getPanierUtilisateurDB(db, nomUtilisateur);
            reponse.status(200).json(paniers);
        }, reponse).catch(
            () => reponse.status(404).send("Panier non trouvé")
        );
    }
    else {
        reponse.status(404).send("Utilisateur non trouvé")
    }
}  

export async function getPanierUtilisateurDB(db, nomUtilisateur) {
    return await db.collection('panier').find({nomUtilisateur: nomUtilisateur}).toArray();
}