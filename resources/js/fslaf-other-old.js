/* Any JavaScript here will be loaded for all users on every page load. */

// Initialize Tooltips from Bootstrap
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

/**
 * Display the 'Additional online resources' using jQuery
 */
$(document).ready(function(){
  $("#mw-customcollapsible-Additional_online_resources").css({"display": "block"});
});

/* Add Adobe Launch 2020-11-12 (Updated 2023-03-20)
* There is a corresponding section in override.php to load the library */
/* Section to read cookie to get the translation languages */
function readCookie() {
    var c = document.cookie.split('; '),
    cookies = {}, i, C;
    for (i = c.length - 1; i >= 0; i--) {
        C = c[i].split('=');
        cookies[C[0]] = C[1];
     }
    if (typeof cookies.googtrans !== "undefined") {
        return '/' + mw.config.get('wgContentLanguage') + '/' + cookies.googtrans.split('/')[2];
    } else {
        return '/' + mw.config.get('wgContentLanguage');
    }
}
/* Section to write to Adobe Analytics */
$(document).ready(function(){
  // information to record
  var config = {
        'site_id': 'FamilySearch',
        'site_language': readCookie(), // from function above, e.g. '/en/es' or '/en'
        'page_channel': 'Wiki',
        'page_detail': document.location.pathname + document.location.search, //'Home' for the homepage or a unique page title for other pages; including querystring
        'page_type': 'wiki',
        'visitor_state': 'lo'
    };
    // send it
    try {
        _satellite.track('page_view', config);
    } catch (e) {
        // ignore
    }
    console.log("recorded page view for " + config.page_detail);
});
/* End Adobe Launch code */

function getCookie(name) {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value !== null) ? unescape(value[1]) : null;
}
setTimeout(function() {
    var templeCookie = getCookie('fs-highconf') || getCookie('fs-templeinfo');
    if (templeCookie && templeCookie.indexOf('true') > -1) {
        var body = document.querySelector('body');
        body.classList.add('templeMember');
    }
}, 2000);

/**
 * Test if an element has a certain class
 * @deprecated:  Use $(element).hasClass() instead.
 */
mw.log.deprecate( window, 'hasClass', function ( element, className ) {
    return $( element ).hasClass( className );
}, 'Use jQuery.hasClass() instead' );

/* Added for Accordion button */
(function() {
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    }
}
})();

/* end Accordion button */
