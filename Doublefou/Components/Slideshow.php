<?php

	namespace Doublefou\Components;

	//Exit si accès direct
	if (!defined('ABSPATH')) exit; 

	/**
	 * Gestion d'un slideshow static à partir d'un dossier
	 * @author Clément Biron
	 */
	class Slideshow
	{
		/**
		 * Répertoire cible des images
		 * @var string
		 */
		private $_directory = '';

		/**
		 * Tableau des slides
		 * @var array
		 */
		private $_slides = Array();
		
		/**
		 * Constructeur
		 * @param string $pDirectory Répertoire cible contenant les images du slideshow
		 */
		public function __construct($pDirectory)
		{
			if(is_dir($pDirectory)){
				$this->_directory = $pDirectory;
				$this->buildSlides();
			}else{
				throw new Exception($pDirectory.' is not a directory');
			}	
		}
		
		/**
		 * Créer les slides à partir d'un repertoire. 
		 * Les image doivent être au format png. 
		 * Un fichier .txt du même nom que l'image peut contenir un lien qui sera utilisé. 
		 */
		private function buildSlides()
		{	
			//Parcourir les images
			foreach(glob($this->_directory.'*.png') as $filename)
			{
				//Init var
				$name = explode('.',basename($filename));
				$linkLine = null;
				
				//Si il y a un fichier txt
				if(file_exists($this->_directory.$name[0].'.txt')){
					
					//On récupere le lien dans le fichier txt
					$linkFile = fopen($this->_directory.$name[0].'.txt', 'r') or die("Can't open file : ".$this->_directory.$name[0].'.txt');
					$linkLine = fgets($linkFile);				
					fclose($linkFile);
				}
				
				//Construre l'objet slides
				$currentSlide = new Slide($filename,$linkLine);
				
				//Et le stocker
				array_push($this->_slides, $currentSlide);
			}
		}
		
		/**
		 * Récupérer la liste des slides
		 */
		public function getSlides()
		{
			return $this->_slides;
		}
	}

?>