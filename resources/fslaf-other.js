( function() {
	if (mw.config.get('wgUserName') === null) {
		$('.vector-user-links').toggle( false );
		$('.mw-article-toolbar-container').toggle( false );
		$('#right-navigation').toggle( false );
		$('.mw-editsection').toggle( false );
	}

	if ( mw.config.get('wgIsMainPage') ) {
		// $('#p-search').html('').toggle(true);
		$('#catlinks').toggle( false );
		$('#footer-info').toggle( false );
	}
	
	$('#footer').appendTo('.mw-content-container');

	( function fixHamburgerMenu() {	
		const oldLabel = document.getElementById('mw-sidebar-button');
		const targetId = oldLabel?.getAttribute('for');
		const target = targetId ? document.getElementById(targetId) : null;

		if (oldLabel && target) {
			const btn = document.createElement('button');

			for (const attr of oldLabel.attributes) {
				if (attr.name !== 'for' ) {
					btn.setAttribute(attr.name, attr.value);
				}
			}

			btn.type = 'button';
			btn.innerHTML = oldLabel.innerHTML;

			oldLabel.replaceWith(btn);
		}
	} )();

	( function appendLanguageBar() {
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

} )();
