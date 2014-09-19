<?php
	Class User extends Singleton
	{
		public static function  getCurrentUserRole() {
			global $current_user;
			$user_role = array_shift($current_user->roles);
	        return $user_role;
		}		
		
	}

?>