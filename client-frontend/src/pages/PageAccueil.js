import React from 'react';
import { useTranslation  } from "react-i18next";

function PageAccueil() {
   const { t } = useTranslation();
   return ( 
      <>          
        <h1>{t('Accueil')}</h1>
        <p> {t("Bienvenue sur la page d'accueil")}</p>            
      </>
   );        
}
export default PageAccueil;