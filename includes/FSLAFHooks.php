<?php

class FSLAFHooks {

	public static function addModules( OutputPage $out, Skin $skin ) {
		$out->addModules( [ 'ext.fslookandfeel.scripts' ] );
		$out->addModuleStyles( [ 'ext.fslookandfeel.styles' ] );
		return true;
	}

}
