/*
 * @file
 * @author thomas-topway-it for WikiWorks
 */

class SidePanelMenu {
	constructor(options = {}) {
		this.panelWidth = options.panelWidth || 280;
		this.panelId = 'sidePanel';
		this.isVisible = false;
		this.currentMenu = null;
		this.currentSide = 'right';
		this.transitionDelay = 350;
		this.animationDelay = 10;

		// Bind methods to ensure correct context
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	show(menuName) {
		const menuData = window.fsJsonMenu[menuName];

		if (!menuData) {
			console.warn(`Menu "${menuName}" not found`);
			return;
		}

		// Prevent reopening same menu
		if (this.isVisible && this.currentMenu === menuName) {
			return;
		}

		this.currentMenu = menuName;
		this.currentSide = this.getMenuSide(menuName);

		// console.log('Menu side:', this.currentSide);

		const $existingPanel = $(`#${this.panelId}`);

		// Update existing panel
		if ($existingPanel.length) {
			this.updatePanelContent($existingPanel, menuData);
			this.updatePanelPosition($existingPanel);
			this.updateLayoutSide();
			this.isVisible = true;
			return;
		}

		// Create new panel
		this.createAndShowPanel(menuData);
	}

	hide() {
		const $panel = $(`#${this.panelId}`);

		if (!$panel.length) return;

		$panel.removeClass('visible');

		setTimeout(() => {
			$('.image-map').css('order', '');
			$panel.remove();
			this.resetState();
		}, this.transitionDelay);
	}

	toggle(menuName) {
		if (this.isVisible && this.currentMenu === menuName) {
			this.hide();
		} else {
			this.show(menuName);
		}
	}

	remove() {
		const $existing = $(`#${this.panelId}`);

		if ($existing.length) {
			$('.image-map').css('order', '');
			$existing.remove();
			this.resetState();
		}
	}

	resetState() {
		this.isVisible = false;
		this.currentMenu = null;
	}

	updatePanelContent($panel, menuData) {
		$panel.empty();
		$panel.append(this.createTitle(menuData.title));
		$panel.append(this.createMenuList(menuData.list));
	}

	createAndShowPanel(menuData) {
		const $panel = this.createPanel(menuData);
		$('.container').append($panel);

		this.updatePanelPosition($panel);
		this.updateLayoutSide();

		// Trigger CSS transition
		setTimeout(() => {
			$panel.addClass('visible');
			this.isVisible = true;
		}, this.animationDelay);
	}

	getMenuSide(menuName) {
		const leftSideMenus = [
			'north_america',
			'south_america',
			'europe',
			'africa',
			'full_map',
		];

		return leftSideMenus.includes(menuName) ? 'left' : 'right';
	}

	updatePanelPosition($panel) {
		const isLeft = this.currentSide === 'left';

		$panel.css({
			order: isLeft ? 0 : 2,
			borderLeft: isLeft ? 'none' : '1px solid #ccc',
			borderRight: isLeft ? '1px solid #ccc' : 'none',
		});
	}

	updateLayoutSide() {
		const $imageMap = $('.image-map');
		const isLeft = this.currentSide === 'left';

		// Panel left, map right (order 1) OR Map left, panel right (order 0)
		$imageMap.css('order', isLeft ? 1 : 0);
	}

	// DOM Creation Methods

	createPanel(menuData) {
		const $panel = $(`<div id="${this.panelId}"></div>`);

		$panel.append(this.createTitle(menuData.title));
		$panel.append(this.createMenuList(menuData.list));

		return $panel;
	}

	createTitle(title) {
		return $('<div class="sidepanel-title"></div>')
			.css({
				fontWeight: 'bold',
				marginBottom: '8px',
				paddingBottom: '5px',
				borderBottom: '1px solid #ddd',
				fontSize: '1.1em',
			})
			.text(title);
	}

	createMenuList(items, level = 0) {
		const $ul = $('<ul></ul>').css({
			paddingLeft: level === 0 ? '0' : '15px',
			marginTop: level === 0 ? '0' : '5px',
			listStyleType: 'none',
		});

		items.forEach((item) => this.createMenuItem(item, level, $ul));

		return $ul;
	}

	createMenuItem(item, level, $ul) {
		// Nested object menu
		if (this.isNestedMenu(item)) {
			const key = Object.keys(item)[0];
			const nestedMenu = item[key];
			const $li = this.createNestedMenuItem(key, nestedMenu, level);
			$ul.append($li);
		}
		// Array link
		else if (Array.isArray(item)) {
			const [pageName, label] = item;
			const $li = this.createLinkItem(pageName, label, level);
			$ul.append($li);
		}
		// String link
		else if (typeof item === 'string') {
			const $li = this.createLinkItem(item, item, level);
			$ul.append($li);
		}
	}

	isNestedMenu(item) {
		return typeof item === 'object' && !Array.isArray(item) && item !== null;
	}

	createNestedMenuItem(key, nestedMenu, level) {
		const isParent = level === 0;
		const $li = $('<li></li>').css({
			marginBottom: '5px',
			fontWeight: isParent ? 'bold' : 'normal',
			listStyle: 'none',
		});

		$li.addClass('toggle-item');

		const $toggle = $('<span class="sidepanel-toggle">▶</span>').css({
			cursor: 'pointer',
			display: 'inline-block',
			marginRight: '5px',
			fontSize: '12px',
			fontWeight: 'normal',
		});

		let isExpanded = false;

		// Create a SPAN instead of a link (non-clickable for parent items)
		const $parentText = $('<a></a>')
			.css({
				color: '#0645ad',
				fontSize: level === 0 ? '1em' : '0.9em',
				fontWeight: 'inherit',
				cursor: 'default',
			})
			.text(nestedMenu.title);

		$parentText.on('click', (e) => {
			e.stopPropagation();

			if (isExpanded) {
				$nestedContainer.slideUp(200);
				$toggle.text('▶');
			} else {
				$nestedContainer.slideDown(200);
				$toggle.text('▼');
			}

			isExpanded = !isExpanded;
		});

		const $nestedContainer = $('<div></div>')
			.css({ marginLeft: '15px', display: 'none' })
			.append(this.createMenuList(nestedMenu.list, level + 1));

		$toggle.on('click', (e) => {
			e.stopPropagation();

			if (isExpanded) {
				$nestedContainer.slideUp(200);
				$toggle.text('▶');
			} else {
				$nestedContainer.slideDown(200);
				$toggle.text('▼');
			}

			isExpanded = !isExpanded;
		});

		$li.append($toggle, $parentText, $nestedContainer);

		return $li;
	}

	createLinkItem(pageName, label, level) {
		const $li = $('<li></li>').css({
			marginBottom: '3px',
			listStyle: 'none',
			fontWeight: 'normal',
		});

		$li.append(
			$('<span>').css({ color: '#0645ad', marginRight: '8px' }).text('•'),
		);

		$li.append(this.createLink(pageName, label, level + 1));

		return $li;
	}

	createLink(pageName, label, level = 0) {
		const fontSize = level === 0 ? '1em' : '0.9em';
		const url = mw.config.get('wgArticlePath').replace('$1', pageName);

		return $(`<a href="${url}" target="_blank"></a>`)
			.css({
				color: '#0645ad',
				textDecoration: 'none',
				fontSize,
				fontWeight: 'inherit',
			})
			.text(label || pageName)
			.on('mouseenter', function () {
				$(this).css({ textDecoration: 'underline' });
			})
			.on('mouseleave', function () {
				$(this).css({ textDecoration: 'none' });
			});
	}

	// Event Handlers

	handleToggleClick(e) {
		e.stopPropagation();
		const menuKey = e.currentTarget.getAttribute('data-key');

		if (menuKey && window.fsJsonMenu?.[menuKey]) {
			this.show(menuKey);
		}
	}
}

// Initialize

const sidePanelMenu = new SidePanelMenu({ panelWidth: 280 });

$(document).ready(() => {
	document.querySelectorAll('.anchor-btn, .anchor-btn-blue').forEach((button) => {
		button.addEventListener('click', (e) => {
			e.stopPropagation();
			const menuKey = button.getAttribute('data-key');

			if (menuKey && window.fsJsonMenu?.[menuKey]) {
				sidePanelMenu.show(menuKey);
			}
		});
	});
});

// Close when clicking outside
$(document).on('click', (e) => {
	if (!sidePanelMenu.isVisible) return;

	const $panel = $(`#${sidePanelMenu.panelId}`);
	const $target = $(e.target);

	const isOutsidePanel = !$panel.is($target) && !$panel.has($target).length;
	const isNotOnButton = !$target.closest('.anchor-btn, .anchor-btn-blue').length;

	if (isOutsidePanel && isNotOnButton) {
		sidePanelMenu.hide();
	}
});

// Close with ESC key
$(document).on('keydown', (e) => {
	if (e.key === 'Escape' && sidePanelMenu.isVisible) {
		sidePanelMenu.hide();
	}
});

// Prevent panel clicks from bubbling
$(document).on('click', `#${sidePanelMenu.panelId}`, (e) => {
	e.stopPropagation();
});

