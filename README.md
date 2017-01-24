### DFWP 
WordPress theme framework

#### INSTALL
cd build && composer install

#### PHP COMPONENTS

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
