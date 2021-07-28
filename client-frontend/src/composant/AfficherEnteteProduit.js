import React from 'react';
import { useTranslation } from 'react-i18next';

function AfficherEnteteProduit() {
    const { t } = useTranslation();
    return (
      <>
        <th>{t("Nom de l'article")}</th>
        <th>{t("Description")}</th>
        <th>{t("Catégorie")}</th>
        <th>{t("Prix unitaire")}</th>
        <th>{t("Rabais (si applicable)")}</th>
        <th>{t("Nouveau prix unitaire")}</th>
        <th>{t("Quantité")}</th>
      </>
    );
  }

  export default AfficherEnteteProduit;