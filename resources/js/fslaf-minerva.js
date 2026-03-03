(function () {
	if (mw.config.get('wgUserName') === null) {
		$('.page-actions-menu').toggle(false);
	}

	// fix search bar
	mw.loader.using('mediawiki.router').then(function () {
		const router = require('mediawiki.router');
		router.on('route', function (route) {
			if (route.path === '/search') {
				$('body').css('overflow', 'hidden');
			} else if (!route.path) {
				$('body').css('overflow', 'visible');
			}
		});
	});
})();
