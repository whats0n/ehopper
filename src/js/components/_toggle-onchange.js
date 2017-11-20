import { $DOCUMENT, OPEN } from '../_constants';

export default (function() {

  $DOCUMENT.on('change', '[data-toggle-onchange-checkbox]', function(e) {
    e.preventDefault();
    const $checkbox = $(this);
    const target = $checkbox.data('toggle-onchange-checkbox');
    const $container = $(`[data-toggle-onchange-container*="${target}"]`);
    const state = $checkbox.prop('checked');

    if (state && $container.length) $container.addClass(OPEN);
    if (!state && $container.length) $container.removeClass(OPEN);
  });

})();
