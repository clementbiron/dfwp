<?php


/**
 * @author Clément Biron
 * CssMinifer
 */
class CssMinifer
{
	
	public static function min($pCss)
	{
		//Formater
		$css = preg_replace( '#\s+#', ' ', $pCss );
		$css = preg_replace( '#/\*.*?\*/#s', '', $css );
		$css = str_replace( '; ', ';', $css );
		$css = str_replace( ': ', ':', $css );
		$css = str_replace( ' {', '{', $css );
		$css = str_replace( '{ ', '{', $css );
		$css = str_replace( ', ', ',', $css );
		$css = str_replace( '} ', '}', $css );
		$css = str_replace( ';}', '}', $css );
		
		//Et retourner
		return trim($css);
	}
}

?>