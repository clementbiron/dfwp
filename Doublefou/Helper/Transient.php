<?php
	/*
	 * Transient
	 */
	namespace Doublefou\Helper;
	use Doublefou\Core\Singleton;
	Class Transient extends Singleton
	{
		/*
		 * Delete all transient 
		 */
		public static function deleteAll()
		{
			global $wpdb;
			$tableName = $wpdb->prefix.'options';
			$query = "DELETE FROM ".$tableName."  WHERE option_name LIKE ('_transient_%')";
			$wpdb->query($query);
		}
	}
?>