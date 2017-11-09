var CommonGUI = new (function() 
{
	// Accès à l'objet
	var that = this;

	//Init
	this.init = function() 
	{
		console.log('CommonGUI init() ');
	};
});
var TemplateMatcher = new (function()
{
	// Accès à l'objet
	var that = this;

	//Init
	this.init = function() 
	{
		console.log('TemplateMatcher init() ');

		//Appel d'objets JS en fonction du template hierarchy
		if(document.readyState !== 'loading' ) {
            that.matchTemplate();
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                that.matchTemplate();
            });
        }  
	},
	
	//Appel d'objets JS en fonction du template hierarchy
	this.matchTemplate = function ()
	{
		//On récupéere le noeud dom <body>
		var bodyDom = document.querySelector('body')

		//On récupère les class sur le body
		var htmlClass = bodyDom.className;
		
		//On camelize
		//htmlClass = DFWP_Helper.camelize(htmlClass);
		htmlClass = (htmlClass + "").replace(/-\D/g, function(match) {
			return match.charAt(1).toUpperCase();
		});

		//On coupe au niveau des ' '
		htmlClass = htmlClass.split(' ');
		
		//Pour chaque valeur
		htmlClass.forEach(function(entry)
		{
			//On capitalize la première lettre
			var value = entry.charAt(0).toUpperCase() + entry.slice(1);
			
			//On instancie un objet avec la string
			var currentObject = window[value];
			
			//Si cet objet existe
			if(currentObject != undefined)
			{
				//Alors on l'initialie
				currentObject.init();
			}
		});
	};
});
/**
 * Exemple Js component
 */
var Exemple = new(function() 
{
	// Accès à l'objet
	var that = this;

	//Init
	this.init = function() 
	{
		console.log('Exemple init() ');
	};
});
var Bootstrap = new (function()
{
	// Accès à l'objet
	var that = this;

	//Init
	this.init = function() 
	{
		console.log('Bootstrap init() ');

		//Initialiser les élements d'interface communs
		CommonGUI.init(); 

		//Initialisation du template matcher
		TemplateMatcher.init();
	};
});