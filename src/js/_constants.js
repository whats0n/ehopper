//active classes
export const OPEN = 'is-open';
export const ACTIVE = 'is-active';
export const touchClass = 'is-touch';

//jQuery dom elements
export const $DOCUMENT = $(document);
export const $BODY = $('body');

//functions helpers
export const isTouch = () => 'ontouchend' in window;