
# changelog v3.0.0 (09/11/2017)
- fusion de DFWP et DFWP_CHILD : le framework est intégré dans le thème.
- le dossier 'vendor' de composer est maintenant dans 'src'
- ajouter du dossier 'src/assets'
- dump de l'autoload
- les groupes de champs ACF sont sauvegardés dans le dossier 'functions/admin/acf-json', cela accelère le chargement et permet le versionning
- l'activation de la maintenance passe maintenant par la page d'options gérée avec ACF
- l'activiation du mode debug passe maintenant par la page d'options gérée avec ACF
- refactoring de Debug::addToConsole();
- mise à jour du readme et du semblant de doc
- les node modules sont maintenant versionnés
- possibilité d'afficher plusieurs composants en passant les noms en urls : 'components=exemple,footer'
- possibilité d'utiliser plusieurs class sur le body en passant urls : 'bodyclass=red,blue'
- mise en place de yarn
- mise en place de browsersync
- mise en place de svgSprite
- mise en place de gulp-uglify-es
- mise en place de babel (babel-polyfill n'est chargé à cause de son poids : 100 ko)
- mise en place de svg4everybody (le sprite svg est maintenant externe)
- suppression de bower
- supression de la gestion des sprite png
- suppresion de gulp-uglify
- suppression du template matcher
- refacto des fichiers JS
- refacto du fichier gulpfile
- mise en plage des sourcemaps pour fichiers css et js

# changelog v2.6.0 (31 août 2016)
- nombres modifications mineurs sur les fichiers php
- gestion des composants dans le styleguide 
- amélioration du fichier gulp

# changelog v2.4.0 (23 nov 2016)

- mise à jour de package.json && readme.md
- ajout de gulp styledown pour générer le styleguide
- changement du nom de template 'pattern' pour 'styleguide'

# changelog v2.3.0 (8 nov 2016)

- mise à jour de .gitignore et package.json
- ajout du dossier static/favicon

# changelog v2.2.0 (08 juin 2016)

- passage à SASS
- utilisation de Bower et configuration pour l'installation de KNACSS
- suppression du message pour les vieux navigateurs (qu'ils se démmerdent) 
- modification du .gitignore
- modification du readme
- simplification des tâches Gullp
- divers changements de noms de fichiers et dossiers

# changelog v2.1.0 (20 novembre 2015)

- ajout de la gestion de la génération des sprites automatiquement
- git ignore style.css

# changelog v2.0.2 (19 novembre 2015)

- ajout du package Plumber et Notify dans Gulp
- namespace par défaut à Knacss : 'k', utilisation exemple : .kmod;

# changelog v2.0.1 (21 octobre 2015)

- Ne plus cacher l'admin bar en front pour l'admin par défaut
- Suprresion du background:blue sur le body qui trainait
- Numérotation des changelog = tag
- Changement de l'adresse du changelog dans le readme pour qu'il pointe sur le changelog de la branche master et non pas sur celui de la branche develop

# changelog v2.0.0 (26 août 2015)

- Désactivation des emoji par défaut

# changelog v1.9.1 (7 juillet 2015)

- Changement du Javascript Task Runner de Grunt vers Gulp
- Modifications importantes de l'arbo
- Changement du fonctionnement de la page de maintenance
- Chargement intelligent des styles et scripts
- Mise en place d'un changelog
- Utilisation de la dernière version de KNACSS (v4.3.1)