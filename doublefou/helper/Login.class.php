<?php
	
Class Login extends Singleton
{

	/**
	 * [isLoginPage description]
	 * @return boolean 
	 */
	public static function isLoginPage()
	{
		return in_array($GLOBALS['pagenow'], array('wp-login.php', 'wp-register.php'));
	}

}

?>