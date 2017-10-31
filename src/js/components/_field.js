import {ACTIVE, $DOCUMENT} from '../_constants';

export default (function() {

	$DOCUMENT.on('focus', '.js-field-input', e => {
		const $input = $(e.currentTarget);
		const $field = $input.closest('.js-field');
		if (!$input.val().length) $field.addClass(ACTIVE);
	});

	$DOCUMENT.on('blur', '.js-field-input', e => {
		const $input = $(e.currentTarget);
		const $field = $input.closest('.js-field');
		if (!$input.val().length) $field.removeClass(ACTIVE);
	});

	$DOCUMENT.on('change', '.js-field-select', e => {
		const $select = $(e.currentTarget);
		const $field = $select.closest('.js-field');
		console.log($select.val());
		if ($select.val().length) $field.addClass(ACTIVE);
		else $field.removeClass(ACTIVE);
	});

})();