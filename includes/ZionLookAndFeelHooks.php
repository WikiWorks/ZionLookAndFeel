<?php

use MediaWiki\MediaWikiServices;

class ZionLookAndFeelHooks {

	public static function addModules( OutputPage $out, Skin $skin ) {
		$userOptionsManager = MediaWikiServices::getInstance()->getUserOptionsManager();
		$skin = $userOptionsManager->getOption( $skin->getUser(), 'skin' );

		if ( $skin === 'vector-2022' ) {
			$out->addModules( [ 'ext.zionlookandfeel.scripts' ] );
			$out->addModuleStyles( [ 'ext.zionlookandfeel.styles' ] );

			$mainPage = TitleClass::newMainPage();
			if ( $mainPage->getPrefixedDBkey() === $skin->getTitle()->getPrefixedDBkey() ) {
				$out->addModules( [ 'ext.zionlookandfeel.mainpage' ] );
			}

			return true;
		}
	}

}
