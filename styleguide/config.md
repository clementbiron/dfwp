# Styleguide options

### Head

    link(rel="stylesheet" href="../wp-content/themes/dfwp_child/dist/css/index.css")
    link(rel="stylesheet" href="../wp-content/themes/dfwp_child/dist/css/styleguide.css")
    link(rel='stylesheet' href='https://cdn.rawgit.com/styledown/styledown/v1.0.2/data/styledown.css')
    script(src='https://cdn.rawgit.com/styledown/styledown/v1.0.2/data/styledown.js')
    script(src='../wp-content/themes/dfwp_child/dist/js/index.js')
    script(type='text/javascript') Bootstrap.init();
    meta(name="viewport" content="width=device-width, initial-scale=1.0")
    link(href="https://fonts.googleapis.com/css?family=..." rel="stylesheet")

### Body

    h1(id="dfwp_TitleStyleGuide") Styleguide
    
    div(style="margin:20px;" id="dfwp_MenuComposant")
     p
      strong Composants
     a(href="?components=header") Header
     br
     a(href="?components=footer") Footer
     br
     a(href="?components=exemple") Exemple
    div(style="margin:20px;" id="dfwp_MenuElement")
     p
      strong Elements
     a(href="#colors") Colors
     br
     a(href="#fonts") Fonts
     br
     a(href="#icons") Icons
     br
     a(href="#inline-style") Inline
     br
     a(href="#links") Links
     br
     a(href="#title") Title
     br
     a(href="#buttons") Buttons
     br
     a(href="#form") Form elements
                    
    div#styleguides(sg-content)