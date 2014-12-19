<?php

	/**
	 * Login
	 */
	namespace Doublefou\Helper;
	use Doublefou\Core\Singleton;
	Class Login extends Singleton
	{

		/**
		 * Savoir si on est sur la page de login
		 * @return boolean 
		 */
		public static function isLoginPage()
		{
			return in_array($GLOBALS['pagenow'], array('wp-login.php', 'wp-register.php'));
		}
	}

?>