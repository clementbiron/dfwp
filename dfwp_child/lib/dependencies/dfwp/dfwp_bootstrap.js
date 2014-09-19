var DFWP_Bootstrap = new (function() 
{
	// Accès à l'objet
	var that = this;

	//Init
	this.init = function() 
	{
		//Appel d'objet dynamic
		that.dynamicClassCall();
	},
	
	this.dynamicClassCall = function ()
	{
		//On récupéere le noeud dom <body>
		var bodyDom = document.getElementsByTagName('body')[0];

		//On récupère les class sur le body
		var htmlClass = bodyDom.className;
		
		//On camelize
		htmlClass = DFWP_Helper.camelize(htmlClass);
		
		//On coupe au niveau des ' '
		htmlClass = htmlClass.split(' ');
		
		//Pour chaque valeur
		htmlClass.forEach(function(entry) {
			
			//On capitalize la première lettre
			value = DFWP_Helper.capitaliseFirstLetter(entry);
			
			//On instancie un objet avec la string
			var currentObject = window[value];
			
			//Si cet objet existe
			if(currentObject != undefined){
				
				//Alors on l'initialie
				currentObject.init();
			}
		});
	};
});