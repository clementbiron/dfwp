<?php
	
class Autoloader
{
	/**
	* Fichiers inclus
	* @var array
	*/
	private $_included = Array();

	public function __construct(){
		spl_autoload_register(array($this, 'loader'));
	}

	private function loader($class){

		//Si ce n'est pas déjà chargé
		if(!in_array($class,$this->_included)){

			//Si le nom de la classe contient la chaine 'doublefou'
			if(false !== stripos($class, 'doublefou')){

				//On recréer le chemin du fichier
				$class = dirname(__FILE__).__NAMESPACE__.DIRECTORY_SEPARATOR.str_replace('\\',DIRECTORY_SEPARATOR, $class).'.php';
				
				//Si il n'existe pas on balance une erreur
				if(!file_exists($class)){
					throw new \Exception("File path : '{$class}' not found");
				}

				array_push($this->_included,$class);

				//Et sinon on inclut
				require_once $class;
			}
		}
	}

	/**
	 * Get the included files
	 * @return array
	 */
	public function getIncluded()
	{
		return $this->_included;
	}
}
?>