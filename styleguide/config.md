# Styleguide options

### Head

    meta(name="viewport" content="width=device-width, initial-scale=1.0")
    link(rel="stylesheet" href="../wp-content/themes/dfwp/dist/css/index.css")
    link(rel='stylesheet' href='https://cdn.rawgit.com/styledown/styledown/v1.0.2/data/styledown.css')
    script(src='https://cdn.rawgit.com/styledown/styledown/v1.0.2/data/styledown.js')
    link(rel="stylesheet" href="../wp-content/themes/dfwp/dist/css/styleguide.min.css")
    script(src='../wp-content/themes/dfwp/dist/js/bundle.js')
    script(src='../wp-content/themes/dfwp/src/utils/styleguide.js')
    script(defer src="../wp-content/themes/dfwp/build/node_modules/svgxuse/svgxuse.min.js")

### Body

    h1(id="dfwp_styleguide_title") Styleguide
    
    div(id="dfwp_styleguide_menucomponents")
     p
      strong Composants
     a(href="?components=header") Header
     br
     a(href="?components=footer") Footer
     br
     a(href="?components=header,exemple,footer&bodyclass=home") Exemple avec multiple chargement de components + body class
    div(id="dfwp_styleguide_menuelements")
     p
      strong Elements
     a(href="#colors") Colors
     br
     a(href="#fonts") Fonts
     br
     a(href="#icons") Icons
     br
     a(href="#inline") Inline
     br
     a(href="#links") Links
     br
     a(href="#title") Title
     br
     a(href="#buttons") Buttons
     br
     a(href="#form") Form elements
                    
    div#styleguides(sg-content)