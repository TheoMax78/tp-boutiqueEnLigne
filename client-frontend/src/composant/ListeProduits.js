import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { useTranslation } from 'react-i18next';



function ListeProduits(props) {
    const { t } = useTranslation();
    let listeProduits = props.listeProduits;
    let nomUtilisateur = props.nomUtilisateur;

    function AjouterPanier(produits, nomUtilisateur) { 
        const envoyerDonnees = async (requete, reponse) => {
            await fetch(`/api/produits/ajouterPanier`, {
                method: 'put',
                body: JSON.stringify({ produits, nomUtilisateur }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });            
        };
        envoyerDonnees();

        if (envoyerDonnees !== undefined){
            alert("Produit ajouté")
        }
        else {
            alert( "Erreur! produit non ajouté")
        }
    }

    return (
      <>          
        {                      
          Object.keys(listeProduits).map((index) =>  { 
            return (                      
              <>                    
                <tr key={listeProduits[index]._id}>
                  <LinkContainer to={`/produits/produit/${listeProduits[index].nom}`} >
                    <Nav.Link onClick={() => props.setListeProduits(listeProduits)}><td >{listeProduits[index].nom}</td></Nav.Link>
                  </LinkContainer>
                  <td>{listeProduits[index].description.substring(0, 50)} ... </td> 
                  <td>{listeProduits[index].categorie} </td>
                  <td>{(listeProduits[index].prix).toFixed(2)} $</td>
                  <td>{listeProduits[index].rabais} %</td>
                  {
                    listeProduits[index].rabais !== 0 ?
                      <td>
                      {   
                        (listeProduits[index].prix - (listeProduits[index].prix * (listeProduits[index].rabais / 100))).toFixed(2)
                      } $</td> : <td>{t("Rabais non applicable")}</td>
                  }
                  <td>{listeProduits[index].quantite}</td>
                  {
                    listeProduits[index].quantite !== 0 ?<td>
                    <Button variant="warning" onClick={() => AjouterPanier(listeProduits[index], nomUtilisateur)}>
                      {t("Ajouter au panier")}
                    </Button>
                    </td>
                    :<td>
                      <Button variant="secondary" disabled>
                        {t("Non-disponible")}
                      </Button>
                    </td> 
                  }
                </tr>                      
              </>
            )  
          })
        }        
      </>
    )
  }
  export default ListeProduits;