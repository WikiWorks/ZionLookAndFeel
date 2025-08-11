( function() {
    // console.log('loading menus data');
    const regr = /GR$/;
    var isGR = regr.test(document.location.pathname);
    var lang = mw.config.get('wgContentLanguage');
    var variant = 'MapMenu.js';
    if (isGR) {
        variant = 'MapMenu-GR.js';
    }
    mw.loader.load('/' + lang + '/wiki/index.php?title=MediaWiki:' + variant + '&action=raw&ctype=text/javascript');

    /**
     * Attach a click handler to our buttons to show the "countries" menus
     */
    $('[id$=_button]').click(function () {
        // show the menu in case it's hidden
        $("#menu").show();
        var position = this.id.indexOf('_button');
        var name = this.id.substring(0, position);
        name += "_countries";
        // console.log ("showing list for " + name);
        if (name == 'all_countries_countries') {
            showAllCountries();
        } else {
            showList(name);
        }
    });

    /**
     * Attach a click handler to "links" (spans with class .menulink) in the menus.
     * Because the menus are dynamic, we use a "delegated" event handler
     * with jQuery's .on()
     * https://api.jquery.com/on/
     */
    $("#menu").on("click", ".menulink", function () {
        // console.log( $( this ).text() );
        // find out what menu to show
        var menu = $(this).attr("id").toLowerCase();
        // replace all the blanks
        menu = menu.replace(/ /g, "_");
        menu = menu + "_states";
        // console.log("showing menu for " + menu);
        showList(menu);
    });

    /**
     * Add an event listener to state and country menus
     * so that clicking the red [x] will close the menu.
     */
    $("#menu").on("click", ".exit", function () {
        var menu = $(".exit").parent().attr("parent");
        if (menu) {
            showList(menu);
        } else {
            //showAllCountries();
            $("#menu").hide();
        }
    });
} )();
