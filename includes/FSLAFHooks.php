<?php

class FSLAFHooks {

	public static function addModules( OutputPage $out, Skin $skin ) {
		if ( $GLOBALS['wgDefaultSkin'] === 'vector-2022' ) {
			$out->addModules( [ 'ext.fslookandfeel.scripts' ] );
			$out->addModuleStyles( [ 'ext.fslookandfeel.styles' ] );
			return true;
		}
	}

}
