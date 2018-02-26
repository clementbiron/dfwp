<?php
	/*
	Template Name: Styleguide template
	*/
	
	use Doublefou\Core\Debug;

	//Config
	$styleguidePath = __DIR__.'/styleguide/styleguide.html';
	$componentsPath = __DIR__.'/styleguide/components/';

	//On désactive les erreurs DomDocument pour le chargement HTML 5
	$internalErrors = libxml_use_internal_errors(true);

	//Si on veut afficher des composants
	if(get_query_var('components', false) != false)
	{
		//On récupère un tableau qui les listes
		$queryComponents = explode(',',get_query_var('components', false));	

		$domComponents = array();
		$i = 1;
		$l = count($queryComponents);

		//On parcoure les composants à afficher
		foreach($queryComponents as $queryComponent)
		{
			$componentPath = $componentsPath.$queryComponent.'.html';
			if(is_file($componentPath)){
				$file = file_get_contents($componentPath);
			}else{
				throw new Exception("Impossible de trouver le fichier du composant ".$queryComponent, 1);
			}	
			
			//On le charge
			$dom = new DOMDocument();
			$dom->loadHTML($file);

			//On utilise DomXPath
			$finder = new DomXPath($dom);

			//Pour trouver et récupérer le composant dans la DOM
			$nodes = $finder->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' $queryComponent ')]");
			$componentDom = $nodes->item(0)->ownerDocument->saveHTML( $nodes->item(0));
			array_push($domComponents, $componentDom);
			
			//Si c'est le dernier composant chargé
			if($i == $l)
			{
				//On supprime le contenu du body
				$body = $dom->getElementsByTagName('body')->item(0);
				$body->nodeValue = '';

				//Si on veut ajouter des class sur le body
				$queryBodyClass = explode(',',get_query_var('bodyclass'));	
				if(!empty($queryBodyClass))
				{
					foreach($queryBodyClass as $bodyclass)
					{
						$body->setAttribute('class', $body->getAttribute('class').' '.$bodyclass);
					}
				}

				//On ajoute aussi une class pour dire que c'est un composant
				$body->setAttribute('class', $body->getAttribute('class').' '.'dfwp_styleguide-iscomposant');

				//On parcoure les composants que l'on a stocké
				foreach($domComponents as $component)
				{
					//Et on la ajoute au body
					$fragment = $dom->createDocumentFragment();
                    $fragment->appendXML(htmlspecialchars($component));
                    $body->appendChild($fragment);
				}
			}

			$i++;
		}
	}

	else{
		//Le chemin vers le fichier du styleguide généré
		$dom = new DOMDocument();
		$html = file_get_contents($styleguidePath);
		$dom->loadHTML($html);
		$body= $dom->getElementsByTagName('body')->item(0);
	}

	//On réactive les erreurs
	libxml_use_internal_errors($internalErrors);

	echo html_entity_decode($dom->saveHTML());
?>