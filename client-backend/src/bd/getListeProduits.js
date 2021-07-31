import { utiliserDB } from './connectionBd';

export function getListeProduits(requete, reponse) {
    const quantiteParPage = parseInt(requete.query.quantiteParPage);
    const pageActive = parseInt(requete.query.pageActive);
    const categorie = String(requete.query.categorie);
    
    let listeProduit = [];
    let listeProduitTrier = [];
    let listeProduitFiltrer = [];

    
        
        utiliserDB(async (db) => {

            listeProduit = await getListeProduitsDB(db);

            if (categorie !== "Tous" ) {
                listeProduitFiltrer = await FiltrerCategorie(categorie, listeProduit);
                listeProduitTrier = SeparerListeParPage(pageActive, listeProduitFiltrer, quantiteParPage);
            }
            else { 
                listeProduitTrier = SeparerListeParPage(pageActive, listeProduit, quantiteParPage);
            }
            reponse.status(200).json(listeProduitTrier);
            
        }, reponse).catch(
            () => reponse.status(404).send("Produit non trouvé")
        );
        
    
}

export function ValiderParametresDefinis(p_parametre) {

    if(p_parametre === undefined)  {
        return false;
    }
    else {
        return true;
    }
}

export function CalculerDecalage(p_pageActive, p_quantiteParPage) {
    if (ValiderParametresDefinis(p_pageActive) === true &&        
        ValiderParametresDefinis(p_quantiteParPage) === true){
            
            if(isFinite(p_pageActive) && isFinite(p_quantiteParPage)) {
                if(p_pageActive > 0 && p_quantiteParPage > 0) {
                    const decalage = (p_pageActive - 1) * p_quantiteParPage;
                    return decalage;
                }
                else {
                    return String("Les paramètres doivent être supérieurs à zéro");
                }
                
            } 
            else {
                return String("Les paramètres doivent être des nombres");
            }

    }
    else {
        return String("Certains paramètres ne sont pas définis")
    }


    
        
}

export function FiltrerCategorie(p_categorie, p_listeProduit) {
    if (ValiderParametresDefinis(p_categorie) === true &&
        ValiderParametresDefinis(p_listeProduit) === true) {
            if (!isFinite(p_categorie)) {
                
                const listeProduitFiltrer = p_listeProduit.filter(produit => produit.categorie === p_categorie);
                
                return listeProduitFiltrer;
            }
            else {
                return String("La catégorie doit être de type 'Chaine de caractère' !");
            }
            
        }
    else {
        return String("Certains paramètres ne sont pas définis");
    }
}

export function SeparerListeParPage(p_pageActive, p_listeProduit, p_quantiteParPage) {
    if (ValiderParametresDefinis(p_pageActive) === true &&
        ValiderParametresDefinis(p_listeProduit) === true &&
        ValiderParametresDefinis(p_quantiteParPage) === true) {

            if (isFinite(p_pageActive) && isFinite(p_quantiteParPage)) {
                const decalage = CalculerDecalage(p_pageActive, p_quantiteParPage);
                const finPage = decalage + p_quantiteParPage;
                const listeProduitTrier = p_listeProduit.slice(decalage, finPage);
                return listeProduitTrier;
            } 
            else {
                return String("Certains paramètres sont incorrects");
            }  
    }
    else {
        return String("Certains paramètres ne sont pas définis");
    }
     
    
}

export async function getListeProduitsDB(db) {
    return await db.collection('produits').find({}).toArray();
}