# changelog  (27/07/2018)
- les easing functions (easing-sass-function) et le reset (reset-css) sont maintenant des dépendances
- mise à jour de base.scss

# changelog  (17/07/2018)
- /vendor/Doublefou est maintenant un dépôt git à part entière
- c'est une dépendance qui s'installe à l'initialisation du projet avec `composer install` 

# changelog  (12/05/2018)
- readme update
- fix du fichier .po par défaut
- new cpt.php, fields.php files 
- minor fix and folders 

# changelog  (05/03/2018)
- acf google map keys update setting 
- readme update
- ajout du reset css de Eric Meyer
- ajout d'un fichier base.scss
- amélioration de CustomPostColumnsManager.php
- amélioration de page-styleguide.php
- minor fix

# changelog  (18/12/2017)
- désactivation de la compression JPEG par défaut

# changelog v3.1.0 (06/12/2017)
**Gulpfile**
Mise en place des modules js avec Browserify et Babelify
- uninstall gulp-babel
- uninstall gulp-minify
- install babelify
- install browserify
- install vinyl-buffer
- install vinyl-source-stream

# changelog v3.0.0 (20/11/2017)
**ACF :**
- les groupes de champs sont sauvegardés dans le dossier `functions/admin/acf-json`, cela accelère le chargement et permet le versionning
- l'activation de la maintenance et du mode debug passe maintenant par la page d'options gérée avec ACF

**Structure :**
- dossier `vendor` déplacé `src`
- ajout du dossier `src/assets`
- dossier `build/node_modules` maintenant versionné
- plusieurs autres déplacements de dossier...

**Svg :**
- en ajoutant un fichier SVG dans le dossier `src/assets/svg/src` un sprite est généré ici `/src/assets/svg/generated/sprite.svg` ainsi qu'un fichier scss ici `src/assets/svg/generated/sprite.scss`

**Framework :**
- fusion de DFWP et DFWP_CHILD : le framework est intégré dans le thème
- refactoring de `Debug::addToConsole()`
- suppression de `TemplateMatcher.js`
- suppression de `CommonGUI.js`
- chargement de la lib `svg4everybody` par défaut
- `wp_deregister_script('jquery')` par défaut
- `wp_deregister_script('wp-embed')` par défaut
- refacto des fichiers JavaScript
- un exemple de fichier `wp-config.php` multi-environnements ici https://gist.github.com/posykrat/1d8123075b2820085a0f7aa5ab99c2c5
- ajout de la class Helper `CustomPostColumnsManager` qui permet de gérer des colonnes de champs ACF dans le listing de CPT en admin

**Styleguide :**
- afficher plusieurs composants en passant les noms en url : `?components=exemple,footer`
- utiliser plusieurs `class` sur le body en passant url : `?bodyclass=red,blue`

**Gulpfile :**
- ajout de browsersync
- ajout de svgSprite
- ajout de gulp-uglify-es
- ajout de babel (babel-polyfill n'est chargé à cause de son poids : 100 ko)
- ajout de svg4everybody (le sprite svg est maintenant externe)
- supression de la gestion des sprite png
- suppresion de gulp-uglify
- mise en plage des sourcemaps pour fichiers css et js

**Divers :**
- dump de l'autoload
- mise à jour du readme et du semblant de doc
- ajout de Yarn
- suppression de bower

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