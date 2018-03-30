$(document).on('click', '.js-clear-btn', e => {
  var target = $(e.currentTarget);
  var input = target.closest('.js-clear').find('.js-clear-input');

  input.val('0');
});

$(document).on('click', '.js-clear-all', e => {
  var input = $('.js-clear-input');

  input.val('0');
});

$(document).on('focus', '.js-clear-input', e => {
  $(e.currentTarget).select();
});
