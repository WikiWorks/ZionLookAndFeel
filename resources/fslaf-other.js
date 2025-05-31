( function() {
	if (mw.config.get('wgUserName') === null) {
		$('.vector-user-links').toggle( false );
		$('.vector-menu-content').toggle( false );
		$('#right-navigation').toggle( false );
		$('.mw-editsection').toggle( false );
	}
	// $('.mw-logo').replaceWith($('#google_translate_element'));
} )();
