# DFWP 
WordPress theme starter ([Changelog](https://github.com/posykrat/dfwp/blob/master/changelog.md))

**Requirements**
- Yarn (https://yarnpkg.com/fr/)
- Composer (https://getcomposer.org/)
- Advanced Custom Fileds Pro (https://www.advancedcustomfields.com)

**Installation**
```
cd build
composer install
yarn install
```

**Configuration**
- Sass : `src/config/config.scss`
- Sass import : `src/config/loader.scss`
- Styleguide : `styleguide/config.md`
- Build : `build/gulpfile.js`
- Javascript build entrie point : `src/config/main.js` 
```
git remote set-url origin git://new.url.here
```

**Gulp tasks**
- `gulp styles-project`
- `gulp styles-styleguide`
- `gulp styles-maintenance`
- `gulp scripts` 
- `gulp svg-sprite` 
- `gulp styleguide` 
- `gulp browser-sync` 
- `gulp` 

**ACF**

Les champs sont sauvegarder sous forme de fichiers `json` dans le dossier `functions/admin/acf-json`, cela permet de les ré-importer au besoin. Il est recommandé d'exporter les champs en PHP et de copier le code généré dans le fichier `functions/admin/settings.php` lorsque les champs sont stabilisés.


**Maintenance**

Le fichier page-maintenance.php est utilisé pour les utilisateurs non loggé si l'option de maintenance est activée dans DFWP options en administration. Le fichier maintenance.css est chargé uniquement pour cette page.

**Styleguide**

En administration, créer une page nommée styleguide et l'associé au template styleguide. Le styleguide est accessible via www.exemple.com/styleguide. Le fichier styleguide.css est chargé uniquement pour cette page. Variables disponibles dans les fichiers .md de composants : 

```
{svg-path}
```

**PHP components**

##### ****Breadcrumb****

```php
use Doublefou\Components\Breadcrumb;
use Doublefou\Components\BreadcrumbLink;
$breadcrumb = new Breadcrumb();
$newLink = new BreadcrumbLink(
	'http://www.google.fr', //Link target
	'Link name', //Link name
	false //Is current ?
);
$breadcrumb->addLink(
	$newLink, //Link to add
	null //Link position 
);
$breadcrumbLinks = $breadcrumb->getBreadCrumb();
foreach ($breadcrumbLinks as $breadcrumbLink) {
	echo $breadcrumbLink->link;
	echo $breadcrumbLink->current;
	echo $breadcrumbLink->title;
}
```

****CustomMenuCollection****

```php
use Doublefou\Components\CustomMenuCollection;
use Doublefou\Components\CustomMenuItem;
$menuCollection = new CustomMenuCollection(
	'menu-header' //Menu slug
);
$menuItems = $menuCollection->getItems();
foreach($menuItems as $menuItem){
	echo $menuItem->getPermalink().'<br>';
	echo $menuItem->getTitle().'<br>';
	echo $menuItem->getParentID().'<br>';
	echo $menuItem->getID().'<br>';
	echo '<hr>';
	if($menuItem->hasChildren()){
		$submenuItems = $menuItem->getCustomMenuCollection()->getItems();
		foreach($submenuItems as $submenuItem){
			echo $submenuItem->getPermalink().'<br>';
			echo $submenuItem->getTitle().'<br>';
			echo $submenuItem->getParentID().'<br>';
			echo $submenuItem->getID().'<br>';
			echo '<hr>';
		}
	}
}
```

****Summary****

Construction d'un sommaire automatique à partir des titres <hx> d'un post content
```php
use Doublefou\Components\Summary;
$summaryBuilder = new Summary(
	'2-4', //Title levels, exemple : 1-5
	null //By default watching current post content, you can setup other content like acf fields
);
$summaryItems = $summaryBuilder->getSummary();
if(count($summaryItems) > 0)
{
	foreach($summaryItems as $summaryItem){
		echo $summaryItem->getLevel();
		echo $summaryItem->getID();
		echo $summaryItem->getTitle();
	}
}
```

**PHP Helpers**

****CustomPostColumnsManager****

Gestion des colonnes de la liste d'un CPT en administration. 
```php
use Doublefou\Helper\CustomPostColumnsManager;
$test = new CustomPostColumnsManager('recette');
$test->addACFColumn('Type','taxonomy','recette_type',true,'15%');
$test->addACFColumn('Note','select','recette_stars',true,'10%');
$test->addACFColumn('Date de parution','default','recette_date',true,'10%');
$test->addACFColumn('Miniature','image','recette_miniature',false,'15%');
$test->removeColumn('date');
```