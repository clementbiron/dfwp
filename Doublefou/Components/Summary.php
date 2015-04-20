<?php

	namespace Doublefou\Components;

	//Exit si accès direct
	if (!defined('ABSPATH')) exit; 

	/**
	* Composant de sommaire automatique
	* @author Clément Biron
	* @example $summary = new Summary('2-4');
	* @todo tester l'implémentation en front
	*/
	class Summary{

		private $_pattern = "/<h([2-4])(.*?)>(.*?)<\/h([2-4])>/i";
		private $_summary = array();
		private $_content;

		/**
		 * Constructeur
		 * @param string $pHLevel niveaux des titres à cibler, chaine de type from-to, exemple : '2-4'
		 */
		public function __construct($pHLevel = null, $pContent = null){

			if ($pHLevel != null){
				$this->_pattern = "/<h([".$pHLevel."])(.*?)>(.*?)<\/h([".$pHLevel."])>/i";
			}

			global $post;

			if ($pContent != null){
				$post->post_content = $pContent;
			}
			
			//On cherche dans le contenu avec la regex 
			$post->post_content = preg_replace_callback($this->_pattern,function($pMatches){

				//On créer l'id avec le titre et un nombre aléatoire
				$id = sanitize_title($pMatches[3]).'-'.rand();

				//Pour chaque résultat, on créer un objet SummaryElement et on le stocke
				array_push($this->_summary,new SummaryElement($pMatches[1],$pMatches[3], $id));

				//Et on retourne la chaine modifiée avec l'ancre pour le contenu
				return '<h'.$pMatches[1].$pMatches[2].' id="'.$id.'">'.$pMatches[3].'</h'.$pMatches[4].'>';

			}, $post->post_content);
			
			$this->_content = $post->post_content;			
		}

		/**
		 * Retourne le sommaire
		 * @return array
		 */
		public function getSummary(){
			return $this->_summary;
		}

		public function getContent(){
			return $this->_content;
		}
	}


?>