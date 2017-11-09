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