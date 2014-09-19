<?php

/**
 * @author Clément Biron
 * Slideshow
 */
class Slideshow
{
	//Init var
	private $_directory = '';
	private $_slides = Array();
	
	/*
	 * Constructeur 
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
	 * buildSlides
	 * créer les slides à partir d'un repertoire
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
	 * getSlides
	 */
	public function getSlides()
	{
		return $this->_slides;
	}
}

?>