import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import Langages from './composant/Langages';

import BarreNavigation from './composant/BarreNavigation';
import PageListeProduit from './pages/PageListeProduit';

import PageAccueil from './pages/PageAccueil';
import PagePanier from './pages/PagePanier';

function App() {
  return (
    <> 
      <Router>
          <Container>
            <Langages />
            <Row>
              <Col>
                <Alert variant={"success"}  className="mt-1">
                  <h1 align="center">Boutique en ligne</h1>
                  <br/> 
                  <BarreNavigation />
                </Alert> 
                <br/>           
                <Container>
                  <Switch>
                    <Route path="/" component={PageAccueil} exact />              
                    <Route path="/produits" component={PageListeProduit}  exact />                                  
                    <Route path="/panier" component={PagePanier} exact />
                  </Switch>
                </Container>                    
              </Col>
            </Row>
          </Container>  
      </Router> 
    </>  
  );
}

export default App;