<?php
	/**
	 * Template
	 */
	namespace Doublefou\Helper;
	use Doublefou\Core\Singleton;
	Class Template extends Singleton
	{
		/**
		 * Utiliser le template d'une categorie ou de son parent. Pour le thème enfant uniquement
		 * @exemple category-id.php
		 * @exemple category-slug.php
		 * @exemple category-parentID.php
		 * @exemple category-parentSlug.php
		 */
		public static function initCategoryTemplate()
		{
			//Activer les template de categorie 
			add_action('category_template', 'child_force_category_template');
			function child_force_category_template($template) 
			{
				//Récupérer la catégorie en cours
			    $cat = get_query_var('cat');
			    $category = get_category($cat);
				
			    //Si il y a un template avec l'id courant
			    if(file_exists(STYLESHEETPATH . '/category-' . $category->cat_ID . '.php')){
			        $cat_template = STYLESHEETPATH . '/category-' . $category ->cat_ID . '.php';
			    }
			     
			    //Sinon avec le slug courant
			    elseif(file_exists(STYLESHEETPATH . '/category-' . $category->slug . '.php')){
			        $cat_template = STYLESHEETPATH . '/category-' . $category ->slug . '.php';
			    } 
			    
			    //Sinon avec l'id parent
			    elseif(file_exists(STYLESHEETPATH . '/category-' . $category->category_parent . '.php')){
			        $cat_template = STYLESHEETPATH . '/category-' . $category->category_parent . '.php';
			    } 
			    
			    //Sinon 
			    else{
			    	
			        // On récupere la catégorie parent
			        $cat_parent = get_category($category->category_parent);
			        
			        //Et on regarde si il y a un template avec le slug du parent
			        if(file_exists(STYLESHEETPATH . '/category-' . $cat_parent->slug . '.php')){
			            $cat_template = STYLESHEETPATH . '/category-' . $cat_parent->slug . '.php';
			        } 
			        
			        else{
			            $cat_template = $template;
			        }	
			    }
			    
			    return $cat_template;
			}
		}
		
		/**
		 * Utiliser un template différent en fonction des single post categorie. Dans le theme enfant uniquement
		 * @exemple single-categogySlug.php 
		 * @exemple single-categoryID.php
		 */
		public static function initSingleCategoryTemplate()
		{
			//Activer les template single par catégorie du post
			add_filter('single_template', 'single_post_template_category');
			function single_post_template_category($single)
			{
		
				/**
				* Checks for single template by category
				* Check by category slug and ID
				*/
				foreach((array)get_the_category() as $cat) :
				
					//Par le slug
					if(file_exists(STYLESHEETPATH . '/single-' . $cat->slug . '.php'))
						return STYLESHEETPATH . '/single-' . $cat->slug . '.php';
					
					//Par l'id
					elseif(file_exists(STYLESHEETPATH . '/single-' . $cat->term_id . '.php'))
						return STYLESHEETPATH . '/single-' . $cat->term_id . '.php';
					
					//Et le default
					else 	
						return STYLESHEETPATH. '/single.php';
						
				endforeach;
			}
		}
	}
?>