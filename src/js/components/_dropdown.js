import {$DOCUMENT, $BODY, OPEN, ACTIVE} from '../_constants';

export default (function() {
	const addClass = 'addClass';
	const removeClass = 'removeClass';

	const getDropdownComponents = (name) => {
		const $menu = $(`[data-dropdown-menu="${name}"]`);
		const $overlay = $(`[data-dropdown-overlay="${name}"]`);

		return {
			menu: $menu,
			overlay: $overlay
		};
	};

	const toggleDropdown = (components, actionType) => {
		components
			.menu
			.add(components.overlay)
			[actionType](OPEN);
	};

	$DOCUMENT.on('click', '[data-dropdown-open]', function(e) { 
		e.preventDefault();
		const $this = $(this);
		const target = $this.data('dropdown-open');
		const $components = getDropdownComponents(target); 
		if ($components.menu.hasClass(OPEN)) {
			toggleDropdown($components, removeClass);
		} else {
			toggleDropdown($components, addClass);
		}
	});

	$DOCUMENT.on('click', function(e) { 
		const $target = $(e.target);
		if ($target.closest('[data-dropdown-open]').length) return;
		if ($target.closest('[data-dropdown-menu]').length) return;
		const $overlay = $('[data-dropdown-overlay]');
		const $menu = $('[data-dropdown-menu]');
		$overlay
			.add($menu)
			.removeClass(OPEN);
	});

	$DOCUMENT.on('click', '[data-dropdown-item]', function(e) {
		e.preventDefault();
		const $this = $(this); 
		const target = $this.data('dropdown-item');
		const value = $this.data('value');

		const $components = getDropdownComponents(target);
		const $dropdownValue = $(`[data-dropdown-value="${target}"]`);
		const $items = $(`[data-dropdown-item="${target}"]`);

		//set value
		$dropdownValue.text(value);

		//change active item
		$items.removeClass(ACTIVE);
		$this.addClass(ACTIVE);

		toggleDropdown($components, removeClass);
	});
})();