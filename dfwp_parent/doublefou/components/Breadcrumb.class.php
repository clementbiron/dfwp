<?php
/**
 * A FINIR
 * @author Clément Biron
 *
 */
Class Breadcrumb extends Singleton
{

	/**
	 * 
	 */
	public static function getBreadCrumb()
	{
		//Pour stocker tous les liens
		$breadCrumbLinks = Array();
		
		//Le lien de la home page
		$homeLink = new BreadcrumbLink(get_bloginfo('url'), 'Accueil');
		array_push($breadCrumbLinks, $homeLink);
		
		//Si on est pas en page d'accueil
		if (!is_front_page()) {
			
			//Global wordpress vars
			global $post, $cat;
			
			//Single
			if (is_single()) { 
				$category = get_the_category();
				$num_cat = count($category);
				
				if($num_cat > 1){
					
				}else{
					
				}
			}
		}
	}
	
}

Class BreadcrumbLink
{
	private $link = "";
	private $title = "";
	
	public function __construct($pLink, $ptitle){
		$this->link = $pLink;
		$this->title = $ptitle;
	}
	
	public function __get($pPropertie){
		if(property_exists($this, $pPropertie)){
			return $this->$pPropertie;
		}
		else return;
	}
}

?>