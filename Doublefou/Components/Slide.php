<?php
	
	namespace Doublefou\Components;

	//Exit si accès direct
	if (!defined('ABSPATH')) exit; 

	/**
	 * Définition d'un slide
	 * @author Clément Biron
	 */
	class Slide
	{
		/**
		 * Lien
		 * @var string
		 */
		var $_link = null;

		/**
		 * Chemin de l'image
		 * @var string
		 */
		var $_imagePath = null;

		/**
		 * Nom de l'image
		 * @var string
		 */
		var $_image = null;
		
		/**
		 * Constructeur 
		 * @param string $pImage Chemin de l'image
		 * @param string $pLink  Lien de l'image
		 */
		public function __construct($pImage,$pLink = null)
		{
			$this->_imagePath = $pImage;
			$this->_image = basename($pImage);
			if($pLink != null){
				$this->_link = $pLink;
			}
		}
		
		/**
		 * Retourne le chemin de l'image
		 * @return string
		 */
		public function getImagePath()
		{
			return $this->_imagePath;
		}
		
		/**
		 * Retourne le nom de l'imaga
		 * @return string
		 */
		public function getImage()
		{
			return $this->_image;
		}
		
		/**
		 * Retourne le lien de l'image
		 * @return string
		 */
		public function getLink()
		{
			return $this->_link;
		}
	}

?>