import {$DOCUMENT, isTouch} from '../_constants';

export default (function() {

  const animation = (e, $item) => {
    const width = $item.outerWidth();
    const height = $item.outerHeight();
    const size = width >= height ? width : height;
    const offset = $item.offset();
    const x = e.pageX - offset.left;
    const y = e.pageY - offset.top;
    
    const circle = document.createElement('span');
    circle.classList.add('ripple-circle');
    circle.style.top = `${y - size/2}px`;
    circle.style.left = `${x - size/2}px`;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.addEventListener('animationend', e => circle.remove(), false);
    circle.addEventListener('webkitAnimationEnd', e => circle.remove(), false);
    
    $item.append(circle);
  };

  $DOCUMENT.on('mousedown', '[data-animation="ripple"]', function(e) { 
    animation(e, $(this));
  });

})();