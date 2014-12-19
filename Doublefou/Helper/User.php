<?php
	/**
	 * User
	 */
	namespace Doublefou\Helper;
	use Doublefou\Core\Singleton;
	Class User extends Singleton
	{
		/**
		 * Récupérer le rôle de l'utilisateur courant
		 * @return string
		 */
		public static function  getCurrentUserRole() {
			global $current_user;
			$user_role = array_shift($current_user->roles);
	        return $user_role;
		}			
	}

?>