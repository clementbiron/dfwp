<?php

/**
 * @author Clément Biron
 * Config
 */
class Config
{
	private static $_instance;
	private static $_properties = Array();
	private static $_included = Array();
	private static $_appModes = Array(
		'debug',
		'test',
		'prod'
	);							
	private static $_debug = '';

	
	private function __construct()
	{
		//On configure en debug 0 par défaut
		if(self::$_debug == ''){
			self::$_debug = self::$_appModes[0];
			self::activeDebug();
		}		
	}
	
	public static function getInstance()
	{
		if(!isset(self::$_instance)){
			self::$_instance = new Config();
		}
		return self::$_instance;
	}
	
	/**
	 * Set a propertie
	 * @param string $pPropertie
	 * @param string $pValue
	 */
	public static function set($pPropertie,$pValue)
	{
		self::$_properties[$pPropertie] = $pValue;
	}
	
	/**
	 * GET a propertie
	 * @param string $pPropertie
	 */
	public static function get($pPropertie)
	{
		if(isset(self::$_properties[$pPropertie])){
			return self::$_properties[$pPropertie];
		}else{
			throw new Exception($pPropertie .' is not defined');
		}
	}
	
	/*
	 * Retourne toute les propriétés
	 */
	public static function getAll()
	{
		return self::$_properties;
	}

	/**
	 * setDebugLevel
	 * Parametrer le niveau de debug.
	 * @param integer $pDebugLevel
	 */
	public static function setMode($pDebugLevel)
	{
		//Si le mode est dans ceux possible
		if(in_array($pDebugLevel,self::$_appModes))
		{
			//On stocke
			self::$_debug = $pDebugLevel;
			
			//On active en debug
			if(self::$_debug == 'debug'){				
				self::activeDebug();
			}
			
			//Ou on active en prod
			if(self::$_debug == 'prod'){
				self::activeProd();
			}
		}
	}
	
	/**
	 * getDebugLevel
	 * @return integer
	 */
	public static function getMode()
	{
		return self::$_debug;
	}

	/**
	 * Include files from an array and memorized which are included
	 * @param array $pArrayToInclude
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
	 * @return array $_included
	 */
	public static function getIncluded()
	{
		return self::$_included;
	}
	
	/**
	 * Afficher les constantes Wordpress disponibles
	 */
	public static function getWpConstants()
	{
		Debug::add(get_defined_constants());	
	}
}
?>