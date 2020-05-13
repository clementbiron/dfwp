# Styleguide options

### Head

    meta(name="viewport" content="width=device-width, initial-scale=1.0")
    link(rel='stylesheet' href='https://cdn.rawgit.com/styledown/styledown/v1.0.2/data/styledown.css')
    script(src='https://cdn.rawgit.com/styledown/styledown/v1.0.2/data/styledown.js')
    link(rel="stylesheet" href="../wp-content/themes/dfwp/dist/css/index.css")
    link(rel="stylesheet" href="../wp-content/themes/dfwp/dist/css/styleguide.min.css")
    script(defer src='../wp-content/themes/dfwp/dist/js/bundle.js')
    script(defer src='../wp-content/themes/dfwp/src/utils/Styleguide.js')
    script(async src="../wp-content/themes/dfwp/build/node_modules/svgxuse/svgxuse.min.js")

### Body

    div(class="dfwp_styleguide_sidebar")
        h1 Styleguide
        
        div(class="dfwp_styleguide_menu")
            h2 Elements
            ul
                li
                    a(href="#colors") Colors
                li
                    a(href="#fonts") Fonts
                li
                    a(href="#icons") Icons
                li
                    a(href="#inline") Inline
                li
                    a(href="#links") Links
                li
                    a(href="#title") Title
                li
                    a(href="#buttons") Buttons
                li
                    a(href="#form") Form elements

        div(class="dfwp_styleguide_menu")
            h2 Composants
            ul
                li
                    a(href="?components=header") Header
                li
                    a(href="?components=footer") Footer
                li
                    a(href="?components=exemple") Exemple
                li
                    a(href="?components=header,exemple,footer&bodyclass=home") Exemple avec multiple chargement de components + body class
            
    div#dfwp_styleguide_content(sg-content)