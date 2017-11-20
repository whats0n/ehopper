//active classes
export const OPEN = 'is-open';
export const ACTIVE = 'is-active';
export const touchClass = 'is-touch';
export const noTouchClass = 'no-touch';

//jQuery dom elements
export const $WIN = $(window);
export const $DOCUMENT = $(document);
export const $BODY = $('body');

//functions helpers
export const isTouch = () => 'ontouchend' in window;

export const isIOS = () => {
  const iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ];

  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()) { return true; }
    }
  }

  return false;
};

export const smartClick = (element, callback) => {

  const eventName = isIOS() ? 'tap' : 'click';

  switch(eventName) {
    case 'tap':
      const threshold = 40;
      const x = { start: null, end: null };
      const y = { start: null, end: null };

      $DOCUMENT.on('touchstart', element, function(e) {
        x.start = e.touches[0].clientX;
        x.end = e.touches[0].clientX;

        y.start = e.touches[0].clientY;
        y.end = e.touches[0].clientY;
      });

      $DOCUMENT.on('touchmove', element, function(e) {
        x.end = e.touches[0].clientX;
        y.end = e.touches[0].clientY;
      });

      $DOCUMENT.on('touchend', element, function(e) {
        if (x.start > x.end && x.start > x.end + threshold) return;
        if (x.start < x.end && x.start < x.end - threshold) return;
        if (y.start > y.end && y.start > y.end + threshold) return;
        if (y.start < y.end && y.start > y.end - threshold) return;
        const target = $(e.target).closest(element);
        callback.call(target, e);
      });

      break;
    case 'click': 
      $DOCUMENT.on('click', element, function(e) {
        const target = $(e.target).closest(element);
        callback.call(target, e);
      });
      break;
  }

};
