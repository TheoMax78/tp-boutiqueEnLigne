import React, {useState, useEffect} from 'react';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';

import { useTranslation } from 'react-i18next';
import AfficherEnteteProduit from '../composant/AfficherEnteteProduit';

function PagePanier() {
    const { t } = useTranslation();
    const [panier, setPanier] = useState([]);
    const nomUtilisateur = "Flanders15@typ.biz"

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/panier?nomUtilisateur=${nomUtilisateur}`);
            const body = await resultat.json();
            setPanier(body);
        }
        chercherDonnees();
    }, [nomUtilisateur]);

    if (panier.length !== 0) {

        return ( 
            <> 
                <h3>Utilisateur: {nomUtilisateur}</h3>
                <p>Mon panier : </p>
                <Table>                    
                    <AfficherEnteteProduit />
                {
                    Object.keys(panier).map((index) =>  { 
                    return (                      
                            <>  
                            <tbody>               
                                <tr key={panier[index].panier[index]._id}>
                                    <td >{panier[index].panier[index].nom}</td>
                                    <td>{panier[index].panier[index].description.substring(0,50)} ... </td>
                                    <td>{panier[index].panier[index].categorie}</td>
                                    <td>{(panier[index].panier[index].prix)} $</td>
                                    <td>{panier[index].panier[index].rabais} %</td>
                                    {panier[index].panier[index].rabais !== 0 ?
                                    <td>
                                        {   
                                            (panier[index].panier[index].prix - (panier[index].panier[index].prix * (panier[index].panier[index].rabais / 100))).toFixed(2)
                                        } $</td> : <td>{t("Rabais non applicable")}</td>
                                    }
                                    <td>{panier[index].panier[index].quantite}</td>
                                </tr> 
                                </tbody>                  
                            </>
                        )  
                    })
                } 
                 
                </Table>  
            </>
        );
    } 
    else {
        return (  
            <>
                <h3>Utilisateur: {nomUtilisateur}</h3>
                <p>Mon panier : VIDE</p>
                <Alert variant={"info"} >Panier vide ! Remplissez le maintenant :)</Alert>
            </>
        );
    }  
}

export default PagePanier;