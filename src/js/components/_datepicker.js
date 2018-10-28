import datepickerFactory from 'jquery-datepicker';
import { OPEN } from '../_constants';

const $ = window.jQuery;

datepickerFactory($);

$(function() {
  $('.js-datepicker').each((i, datepicker) => {
    datepicker = $(datepicker);
    const control = datepicker.find('.js-datepicker-control');
    const calendar = datepicker.find('.js-datepicker-calendar');
    const field = datepicker.find('.js-datepicker-field');
    const overlay = $(`[data-dropdown-overlay="${datepicker.data('dropdown')}"]`);
    calendar.datepicker({
      prevText: '&lsaquo;',
      nextText: '&rsaquo;',
      onSelect(value, event) {
        field.text(value);
        overlay.trigger('click');
      }
    });
  });
});
