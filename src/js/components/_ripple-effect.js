import {$DOCUMENT} from '../_constants';

export default (function() {

  const animation = e => {
  	const target = e.currentTarget;
    const width = target.offsetWidth;
    const height = target.offsetHeight;
    const size = width >= height ? width : height;
    const offset = target.getBoundingClientRect();
    const x = e.pageX - offset.left;
    const y = e.pageY - offset.top;
    
    const circle = document.createElement('span');
    circle.classList.add('ripple-circle');
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.addEventListener('animationend', e => circle.remove(), false);
    circle.addEventListener('webkitAnimationEnd', e => circle.remove(), false);
    
    target.appendChild(circle);
  };

  $DOCUMENT.on('click', '[data-animation="ripple"]', animation);

})();