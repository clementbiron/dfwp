<?php
	/**
	 * Add a video short code
	 * [video]
	 * @author Clément Biron
	 */
	Class VideoShortCode 
	{
		public function __construct()
		{
			//Extract code function
			function extractCode($params = array())
			{
				//Extract params
				extract(shortcode_atts(array(  
			        'src' => '',  
			        'poster' => '',  
			        'width' => '645',
					'height' => '359'
			    ), $params)); 
			    
			    //Retourner toussa
			    if(!empty($src)){
			    	return '<video class="videoScreen" width="'.$width.'" height="'.$height.'" poster="'.$poster.'"><source src="'.$src.'" /></video>';	
			    }else{
			    	return '';
			    }
			}
			
			//Add short code
			add_shortcode('video','extractCode');  			
		}
	}
?>