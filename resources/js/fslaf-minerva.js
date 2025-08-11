( function() {
	if (mw.config.get('wgUserName') === null) {
		$('.page-actions-menu').toggle( false );
	}
} )();
