import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useTranslation  } from "react-i18next";

function BarreNavigation() {
    const { t } = useTranslation();
    return (
    <>
        <Navbar bg="green" expand="sm">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/" exact>
                        <Nav.Link>{t('Accueil')}</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/produits" exact>
                        <Nav.Link>{t('Produits')}</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/panier" exact>
                        <Nav.Link align="right">{t('Panier')}</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/admin" exact>
                        <Nav.Link align="right">{t('Admin')}</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/connection" exact>
                        <Nav.Link align="right">{t('Connection')}</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        
        </>
    );
}

export default BarreNavigation;