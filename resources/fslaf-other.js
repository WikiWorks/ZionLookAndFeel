( function() {
	if (mw.config.get('wgUserName') === null) {
		$('.vector-user-links').toggle( false );
		$('.mw-article-toolbar-container').toggle( false );
		$('#right-navigation').toggle( false );
		$('.mw-editsection').toggle( false );
	}

	// temporary, remove after updating to a recent MW version
	$('header.mw-body-header').addClass('vector-page-titlebar');

	// Create wrapper and container, append after first heading
	var wrapper = $('<div id="p-lang-btn">').addClass(
		'vector-dropdown mw-portlet mw-portlet-lang',
	);
	var container = $('<div>', { id: 'google_translate_element' });
	wrapper.append(container);
	$('#firstHeading').after(wrapper);

	// Define the callback for Google Translate
	window.googleTranslateElementInit = function () {
		new google.translate.TranslateElement(
			{
				pageLanguage: mw.config.get('wgGoogleTranslatorOriginal'),
				includedLanguages: mw.config.get('wgGoogleTranslatorLanguages'),
				layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
			},
			'google_translate_element',
		);
	};

	// load and append the script, it cannot be added server-side
	// since "p-lang-btn" must exist in the DOM when the callback
	// is executed
	var gtScript = document.createElement('script');
	gtScript.type = 'text/javascript';
	gtScript.src =
		'//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
	document.head.appendChild(gtScript);
} )();
