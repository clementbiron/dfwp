<?php

/**
 * @author Clément Biron
 * JsMinifer
 * TODO : mettre le cache en place
 */
class JsMinifer
{
	
	public static function min($pJs)
	{
		JSMIN::minify($pJs);
	}
}

?>