$('.js-collapsable').each((i, section) => {
  section = $(section);
  const control = section.find('.js-collapsable-control');
  const container = section.find('.js-collapsable-container');

  control.click(e => {
    e.preventDefault();
    section.toggleClass('is-active');
    container.stop(true, true, true).slideToggle(400);
  });
});
