<?php
	/**
	 * Gestion d'un lien de fil d'ariane
	 * @author Clément Biron
	 */
	namespace Doublefou\Components;

	Class BreadcrumbLink
	{
		/**
		 * Le lien
		 * @var string
		 */
		private $link = "";

		/**
		 * Le titre
		 * @var string
		 */
		private $title = "";
		
		/**
		 * Constructeur
		 * @param string $pLink  Lien
		 * @param string $ptitle Titre
		 */
		public function __construct($pLink, $ptitle){
			$this->link = $pLink;
			$this->title = $ptitle;
		}
		
		/**
		 * Get
		 */
		public function __get($pPropertie){
			if(property_exists($this, $pPropertie)){
				return $this->$pPropertie;
			}
			else return;
		}
	}
?>