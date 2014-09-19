<?php


/**
 * @author Clément Biron
 * StringTool
 */
class StringTool
{
	/**
	 * Cut a string with max words allowed
	 * @param string $pStr
	 * @param number $pMaxWords
	 * @param string $pEnd
	 */
	public static function cutByWords($pStr,$pMaxWords,$pEnd = '')
	{
		$strReturn = '';
		$words = self::stringToArray($pStr);
		$nbWords = count($words);
		if($nbWords > $pMaxWords){
			for($i=0;$i<$pMaxWords;$i++){
				$strReturn .= $words[$i]." ";
			}
			$strReturn .= $pEnd;
			return $strReturn;
		}else{
			return $pStr;
		}
	}
	
	/*
	 * cutByLength
	 * @param string $pStr
	 * @param number $pMaxLength
	 * @param string $pEnd
	 * @return string 
	 */
	public static function cutByLength($pStr,$pMaxLength,$pEnd = '')
	{	
		return (strlen($pStr) > $pMaxLength) ? rtrim(substr($pStr,0,$pMaxLength)).$pEnd : $pStr;
	}
	
	/**
	 * Get the word number from a string
	 * @param string
	 * @return number
	 */
	public static function numberOfWords($pStr)
	{
		return count(self::stringToArray($pStr));
	}
	
	/**
	 * Put each word in table cell
	 * @param string $pStr
	 * @return array
	 */
	public static function stringToArray($pStr)
	{
		return explode(" ",$pStr);
	}
}

?>