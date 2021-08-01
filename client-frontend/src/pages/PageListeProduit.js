import React, {useState, useEffect} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import { useTranslation } from 'react-i18next';

import ListeProduits from '../composant/ListeProduits';
import AfficherEnteteProduit from '../composant/AfficherEnteteProduit';

function PageListeProduit() {
  const { t } = useTranslation();
  let tableauPage = [];
  const [listeProduits, setListeProduits] = useState([]);
  const [quantiteParPage, setQuantiteParPage] = useState(24);
  
  const [pageActive, setPageActive] = useState(1);
  const [categorie, setCategorie] = useState(["Tous"]);

  const nomUtilisateur = "Flanders15@typ.biz"

  /*useEffect(() => {
    const chercherDonnees = async () => {
        const resultat = await fetch(`/api/produits`);
        const body = await resultat.json();
        setListeProduits(body);
      }        
        chercherDonnees();
  }, []); */

 
  useEffect(() => {
    const chercherDonnees = async () => {
        const resultat = await fetch(`/api/produits?quantiteParPage=${quantiteParPage}&pageActive=${pageActive}&categorie=${categorie}`);
        const body = await resultat.json();        
        setListeProduits(body);
      }        
        chercherDonnees();
  }, [quantiteParPage, pageActive, categorie]); 

  for (let nombreDePage = 1; nombreDePage <= 5; nombreDePage++) {
    tableauPage.push(
      <Pagination.Item  activeLabel='' key={nombreDePage} active={nombreDePage === pageActive}>
        {nombreDePage}
      </Pagination.Item>,
    );
  }

  

  return ( 
    <> 
      <p>{t("Filtrer")} </p>
      <Form>
        <Form.Check onChange={() => setCategorie("DVD")} inline label={`DVD`} name="group1" type="checkbox" id={`inline-checkbox-1`} />
        <Form.Check onChange={() => setCategorie("Medicament")} inline label="Médicament" name="group1" type="checkbox" id={`inline-checkbox-2`} />
        <Form.Check onChange={() => setCategorie("Cosmetique")} inline label="Cosmétique" name="group1" type="checkbox" id={`inline-checkbox-3`} />
        <Form.Check onChange={() => setCategorie("Tous")} defaultChecked inline label="Tous" name="group1" type="checkbox" id={`inline-checkbox-4`} />
      </Form>
 
      <Dropdown align="right">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {t("Produits par page")} {quantiteParPage}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setQuantiteParPage(12)}>12</Dropdown.Item>
            <Dropdown.Item onClick={() => setQuantiteParPage(24)}>24</Dropdown.Item>
            <Dropdown.Item onClick={() => setQuantiteParPage(48)}>48</Dropdown.Item>
            <Dropdown.Item onClick={() => setQuantiteParPage(100)}>{t("Tous")}</Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown> 
      <h2 align="center">{t("Produits Disponible")}</h2>
      <br/>

      <Pagination active={pageActive}>
        {pageActive <= 1 ? <Pagination.Prev disabled/>: <Pagination.Prev activeLabel={'Page précédente'} onClick={() => setPageActive(pageActive - 1)} />}
        <Pagination size="lg" onClick={(e) => setPageActive(e.target.text)}>{tableauPage}</Pagination>
        {pageActive >= tableauPage.length ? <Pagination.Next disabled/>: <Pagination.Next onClick={() => setPageActive(pageActive + 1)} />}
      </Pagination>
      <Table striped bordered>
        <thead>
          <tr>
            <AfficherEnteteProduit />            
          </tr>
        </thead>
        
          <ListeProduits listeProduits={listeProduits} nomUtilisateur={nomUtilisateur} /> 
        
      </Table>    
    </>
  );
}

export default PageListeProduit;