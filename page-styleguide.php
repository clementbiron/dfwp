<?php
	/*
	Template Name: Styleguide template
	*/
	
	//Le chemin vers le fichier du styleguide généré
	$htmlPath = __DIR__.'/styleguide/styleguide.html';

	//Si on veut afficher un composant, on change le chemin du fichier
	$queryComponents =  get_query_var('components');
	if($queryComponents){
		$htmlPath = __DIR__.'/styleguide/components/'.$queryComponents.'.html';
	}

	//On désactive les erreurs DomDocument pour le chargement HTML 5
	$internalErrors = libxml_use_internal_errors(true);

	//On récuère le contenu généré du styleguide et on le charge
	$html = file_get_contents($htmlPath);

	//On charg(e le svg et on l'insère tout de suite après <body>
	$svgpath = __DIR__.'/src/sprite/sprite.svg';
	if(is_file($svgpath))
	{
		$svg = file_get_contents($svgpath);
		if($svg != false)
		{
			//On ajoute le svg au html après la balise body
			$html = str_replace("<body class=\"sg\">", "<body class=\"sg\">".$svg, $html); 
		}
	}

	//Dom document
	$doc = new DOMDocument();
	$doc->loadHTML($html);

	//On réactive les erreurs
	libxml_use_internal_errors($internalErrors);

	//On cible <body>
	$body = $doc->getElementsByTagName('body')->item(0);

	//Pour l'affichage d'un composant
	if($queryComponents)
	{
		//On vire les menus et le titre
		$dfwpMenuComposantt = $doc->getElementById('dfwp_MenuComposant');
		$dfwpMenuElement = $doc->getElementById('dfwp_MenuElement');
		$dfwpTitleStyleGuide = $doc->getElementById('dfwp_TitleStyleGuide');
		$body->setAttribute('class', 'dfwp_StyleGuide-isComposant');

		//Si on veut simuler le comportement sur une page en particulier
		// == avec une class sur le body
		$queryBodyClass = get_query_var('bodyclass');
		if($queryBodyClass){
			$body->setAttribute('class', $body->getAttribute('class').' '.$queryBodyClass);
		}
	}

	//Output
	echo $doc->saveHTML();
?>