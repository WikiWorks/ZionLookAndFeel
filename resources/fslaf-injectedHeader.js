( function() {
	var localHost = ( window.location.hostname === "localhost" ||
		window.location.hostname === "127.0.0.1" ||
		window.location.hostname === "[::1]" // IPv6 localhost
	);

	var injHF = document.createElement('script');
	injHF.async = true;
	injHF.src = 'https://' + ( !localHost ? window.location.host : 'familysearch.org' ) + '/hf/hf.js';
	document.getElementsByTagName('head')[ 0 ].appendChild( injHF );
} )();
