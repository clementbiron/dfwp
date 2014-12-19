<?php
	/**
	 * Class de configuration
	 * @author Clément Biron
	 */
	namespace Doublefou\Core;
	use Doublefou\Core\Singleton;
	use Doublefou\Core\Debug as Debug;

	class Config extends Singleton
	{
		/**
		 * Propriétés
		 * @var array
		 */
		private static $_properties = Array();

		/**
		 * Fichiers inclus
		 * @var array
		 */
		private static $_included = Array();

		/**
		 * Modes d'application disponibles
		 * @var array 
		 */
		private static $_appModes = Array(
			'debug',
			'test',
			'prod'
		);

		/**
		 * Le mode d'appli en cours
		 * @var string
		 */
		private static $_debug = '';


		/**
		 * Parametrer le niveau de debug : debug / test / prod
		 * @param integer $pDebugLevel
		 * @todo intégrer le niveau test
		 */
		public static function setMode($pDebugLevel)
		{
			//Si le mode est dans ceux possible
			if(in_array($pDebugLevel,self::$_appModes))
			{
				//On stocke
				self::$_debug = $pDebugLevel;

				if(self::$_debug == 'debug'){
					self::activeDebug();
				}

				if(self::$_debug == 'prod'){
					//self::activeProd();
				}
			}else{
				throw new Exception("Application mode not allowed, please use debug / test / prod");			
			}
		}

		/**
		 * Activer le mode debug
		 * @return [type] [description]
		 */
		private static function activeDebug(){

			//On montre les erreurs
			Debug::showErrors();

			//On affiche les infos WP dans la console
			Debug::getWpInfo();
		}

		/**
		 * Activer le mode prod
		 * @return [type] [description]
		 */
		private static function activeProd(){

			//On cache les erreurs
			Debug::hideErrors();
		}
		
		/**
		 * Récupérer le mode d'application en cours
		 * @return string
		 */
		public static function getMode()
		{
			return self::$_debug;
		}

		/**
		 * Configurer une propriété
		 * @param string $pPropertie
		 * @param string $pValue
		 */
		public static function set($pPropertie,$pValue)
		{
			self::$_properties[$pPropertie] = $pValue;
		}
		
		/**
		 * Récupérer une propriété
		 * @param string $pPropertie
		 */
		public static function get($pPropertie)
		{
			if(isset(self::$_properties[$pPropertie])){
				return self::$_properties[$pPropertie];
			}else{
				throw new \Exception($pPropertie .' is not defined in '.get_class($this));
			}
		}
		
		/**
		 * Retourne toutes les propriétées
		 * @return array 
		 */
		public static function getAll()
		{
			return self::$_properties;
		}

		/**
		 * Include files from an array and memorized which are included
		 * @param array
		 */
		public static function loadClass($pArrayToInclude)
		{
			if(is_array($pArrayToInclude)){
				foreach($pArrayToInclude as $toInclude){
					if(!in_array($toInclude,self::$_included)){
						if(file_exists($toInclude)){
							require_once($toInclude);
							array_push(self::$_included,$toInclude);
						}else{
							throw new \Exception($toInclude." file not exist !");
						}
					}
				}
			}else{
				throw new \Exception("Param should be an array");
			}
		}

		/**
		 * Get the included files
		 * @return array
		 */
		public static function getIncluded()
		{
			return self::$_included;
		}
		
		/**
		 * Afficher les constantes Wordpress disponibles dans la console de debug
		 */
		public static function getWpConstants()
		{
			Debug::add(get_defined_constants());	
		}
	}
?>