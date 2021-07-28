import React, {useState, useEffect} from 'react';

function PageProduit({match}) {      
   const [produits, setProduits] = useState({nom:"", description:"", categorie:"", prix:0.0});   
   useEffect(() => {
         const chercherDonnees = async () => {
         const resultat = await fetch(`/api/produits/produit/${match.params.nom}`);
         const body = await resultat.json();
         setProduits(body);
      }
      chercherDonnees();
  }, [match.params.nom]);
      
   return ( 
      <>              
         <h1>{produits.nom}</h1>            
         <p>{produits.description}</p> 
         <p>Catégorie: {produits.categorie}</p> 
         <p>Prix: {produits.prix.toFixed(2)} $ /ch</p>
      </>
   );   
}

export default PageProduit;