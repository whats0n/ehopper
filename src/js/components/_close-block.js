import {OPEN, $DOCUMENT} from '../_constants';

export default (function() {
  $DOCUMENT.ready(function() {
    $DOCUMENT.on('click', '[data-error-close]', function(e) {
      e.preventDefault();
      const $this = $(this);
      const target = $this.data('error-close');
      $this.closest(`[data-error="${target}"]`).hide();
    });
  });
})();
