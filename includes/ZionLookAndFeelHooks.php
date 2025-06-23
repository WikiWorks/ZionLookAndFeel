<?php

use MediaWiki\MediaWikiServices;

class ZionLookAndFeelHooks {

	public static function addModules( OutputPage $out, Skin $skin ) {
		$userOptionsManager = MediaWikiServices::getInstance()->getUserOptionsManager();
		$skinName = $userOptionsManager->getOption( $skin->getUser(), 'skin' );

		if ( $skinName === 'vector-2022' ) {
			$out->addModules( [ 'ext.zionlookandfeel.scripts' ] );
			$out->addModuleStyles( [ 'ext.zionlookandfeel.styles' ] );

			$mainPage = Title::newMainPage();
			if ( $mainPage->getPrefixedDBkey() === $skin->getTitle()->getPrefixedDBkey() ) {
				$out->addModules( [ 'ext.zionlookandfeel.mainpage' ] );
			}

			global $wgGoogleTranslatorOriginal, $wgGoogleTranslatorLanguages;
			$out->addJsConfigVars( [
				'wgGoogleTranslatorOriginal' => $wgGoogleTranslatorOriginal,
				'wgGoogleTranslatorLanguages' => $wgGoogleTranslatorLanguages
			] );
		}

		if ( $skin->getSkinName() === 'minerva' ) {
			$out->addModules( [ 'ext.zionlookandfeel.minerva' ] );
		}
	}

}
