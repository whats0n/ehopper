import {$DOCUMENT, OPEN, ACTIVE} from '../_constants';

export default (function() {

	const state = {
		active: 'active',
		default: 'default'
	};

	$DOCUMENT.on('click', '[data-fullinfo-open]', function(e) {

		const $this = $(this);
		const $target = $(e.target);
		const $container = $('[data-fullinfo-container]');
		const $items = $('[data-fullinfo-open]');
		const $tabTarget = $target.closest('[data-fullinfo-target]');
		const currentTab = $tabTarget.length ? $tabTarget.data('fullinfo-target') : null;

		const $tabOpen = $container.find(`[data-tab-open]`);
		const $tabContainer = $container.find(`[data-tab-container]`);

		const $tabOpenFiltered = currentTab 
			? $tabOpen.filter(`[data-tab-open="${currentTab}"]`)
			: $tabOpen.eq(0);

		const $tabContainerFiltered = currentTab 
			? $tabContainer.filter(`[data-tab-container="${currentTab}"]`)
			: $tabContainer.eq(0);

		if (!$tabOpenFiltered.hasClass(ACTIVE) && !$tabContainerFiltered.hasClass(OPEN)) {
			$tabOpen.removeClass(ACTIVE);
			$tabContainer.removeClass(OPEN);

			$tabOpenFiltered.addClass(ACTIVE);
			$tabContainerFiltered.addClass(OPEN);
		}

		if ($this.attr('data-state') === state.active) return;

		$items.attr('data-state', state.default);
		$this.attr('data-state', state.active);

		if ($container.hasClass(OPEN)) return;

		$container.addClass(OPEN);

	});

	$DOCUMENT.on('click', '[data-fullinfo-close]', function(e) {
		e.preventDefault();
		const $container = $('[data-fullinfo-container]');
		const $items = $('[data-fullinfo-open]');

		if ($container.hasClass(OPEN)) {
			$container.removeClass(OPEN);
			$items.attr('data-state', state.default);
		}

	});

})();