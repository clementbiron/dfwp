document.ready = () => {
    
    // Styledown FIX
    // Dans tous les sg-canvas
    var elems = document.querySelectorAll(".sg-canvas");
    elems.forEach((elem) => {

        //on supprime les multiple espace
        let newHTML = elem.innerHTML.replace(/  +/g, '');

        //Et les line breaks
        newHTML = newHTML.replace(/\r?\n|\r/g, '');

        //On remplace
        elem.innerHTML = newHTML;
    });
};