### DFWP 
WordPress theme framework

#### Requirements
Choco (Windows) ou Brew (macOS)
Yarn
Composer
Plugins : Advanced custo fields pro : https://www.advancedcustomfields.com

#### Install
1. `cd build && composer install`
2. `choco install yarn` (Windows) ou `brew install yarn` (macOS)
3. `yarn install`
3. configurer le projet : src/bootstrap/config.scss 
4. configurer le styleguide styleguide/config.md

#### Build

Commandes gulp disponibles :
`gulp styles`
`gulp scripts` 
`gulp sprites` 
`gulp styleguide` 
`gulp` (tâches par défaut + watch de gulp sprites, scripts et styles)

#### MAINTENANCE
Le fichier page-maintenance.php est utilisé pour les utilisateurs non loggé si l'option de maintenance est activée dans DFWP options en administration.
Le fichier maintenance.css est chargé uniquement pour cette page.

#### STYLEGUIDE
En administration, créer une page nommée styleguide et l'associé au template styleguide.
Le styleguide est accessible via www.exemple.com/styleguide.
Le fichier styleguide.css est chargé uniquement pour cette page.

#### PHP components

##### Breadcrumb
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

##### CustomMenuCollection
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

##### Summary
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

#### CHANGELOG
Consultable ici : [Changelog](https://github.com/posykrat/dfwp/blob/master/changelog.md)