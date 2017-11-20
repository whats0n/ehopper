import {$DOCUMENT, OPEN} from '../_constants';

export default (function() {

  let timer = null;
  const delay = 3000;

  $DOCUMENT.on('click', '[data-snackbar-open]', function(e) {
    e.preventDefault();
    const message = $(this).data('snackbar-message');
    const state = $(this).data('snackbar-state') || 'default';
    if (!!message && message.length) $('[data-snackbar-content]').html(message);
    $('[data-snackbar-container]').addClass(OPEN);
    $('[data-snackbar-container]').attr('data-state', state);

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => $('[data-snackbar-container]').removeClass(OPEN), delay);
  });

  $DOCUMENT.on('click', '[data-snackbar-container]', function(e) {
    e.preventDefault();
    $('[data-snackbar-container]').removeClass(OPEN);
    if (timer) clearTimeout(timer);
  });

})();
