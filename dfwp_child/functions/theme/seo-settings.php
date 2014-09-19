<?php
	/***
	 * Custom SEO
	 */
	class SeoCustom extends Seo
	{
		public static function getTitle()
		{
			/*
			* Default value = parent call
			**/
			$r = Seo::getTitle();
			
			/**
			 * Make custom here
			 */
		
			return $r;
		}
		
		public static function getDescription()
		{
			/*
			* Default value = parent call
			**/
			$r = Seo::getDescription();
					
			return $r;
		}
	}
	
	SeoCustom::getInstance();
?>