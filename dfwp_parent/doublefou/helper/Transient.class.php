<?php
/*
 * Transient helper
 */
Class Transient extends Singleton
{
	/*
	 * deleteAll
	 * delete all transient 
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