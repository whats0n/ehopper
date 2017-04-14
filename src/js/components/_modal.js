import {OPEN, $DOCUMENT} from '../_constants';

export default (function() {

	$DOCUMENT.ready(() => {

		$DOCUMENT.on('click', '[data-modal-open]', function(e) {
			e.preventDefault();
			const target = $(this).data('modal-open');
			const $modal = $(`[data-modal="${target}"]`);
			$modal.addClass(OPEN);
		});

		$DOCUMENT.on('click', '[data-modal-close]', function(e) {
			e.preventDefault();
			const target = $(this).data('modal-close');
			const $modal = $(`[data-modal="${target}"]`);
			$modal.removeClass(OPEN);
		});

		$DOCUMENT.on('click', function(e) {
			const $target = $(e.target);
			const $modal = $target.closest('[data-modal]');
			if ($target.closest('[data-modal-container]').length || $target.closest('[data-modal-target]').length) return;
			if (!$modal.hasClass(OPEN)) return;
			$modal.removeClass(OPEN);
		});

	});

})();