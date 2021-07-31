
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

