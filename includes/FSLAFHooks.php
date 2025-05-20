<?php

class FSLAFHooks {

	public static function addModules( OutputPage $out, Skin $skin ) {
		if ( $GLOBALS['wgDefaultSkin'] === 'vector-2022' ) {
			$out->addModules( [ 'ext.zionlookandfeel.scripts' ] );
			$out->addModuleStyles( [ 'ext.zionlookandfeel.styles' ] );
			return true;
		}
	}

}
