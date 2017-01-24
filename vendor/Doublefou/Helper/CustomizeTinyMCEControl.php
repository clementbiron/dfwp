<?php
    
    namespace Doublefou\Helper;

    //Exit si accès direct
    if (!defined('ABSPATH')) exit; 

    /**
     * CustomizeTinyMCEControl
     * @todo Finir la gestion de l'affichage du tinymce
     * @author Clément Biron
     */
    class CustomizeTinyMCEControl extends WP_Customize_Control 
    {
        public $type = 'tinymce';
     
        /**
         * Render the content on the theme customizer page
         */
        public function render_content() {
            ?>
            <label>
                <span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
                <textarea class="large-text" cols="20" rows="5" <?php $this->link(); ?>>
                    <?php echo esc_textarea( $this->value() ); ?>
                </textarea>
            </label>
            <?php
        }
    }
?>