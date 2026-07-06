/* Basic open/close with focus management and Escape handling */
const menu = document.getElementById('mobile-menu');
const backdrop = document.getElementById('menu-backdrop');
const toggleBtn = document.querySelector('.menu-toggle');
let lastFocused = null;

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  speed: 600,
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
  
 //autoplay: {
 //  delay: 5000,
 //},

  // Navigation arrows
  navigation: {

  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

function openMobileMenu(){
  lastFocused = document.activeElement;
  menu.removeAttribute('hidden');
  backdrop.removeAttribute('hidden');
  // small delay to allow CSS transitions
  requestAnimationFrame(()=> {
    menu.classList.add('show');
    backdrop.classList.add('show');
  });
  toggleBtn.setAttribute('aria-expanded','true');
  // focus first link
  const firstLink = menu.querySelector('.mobile-nav a');
  if(firstLink) firstLink.focus();
  document.addEventListener('keydown', handleKeyDown);
  // prevent body scroll while menu open
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu(){
  menu.classList.remove('show');
  backdrop.classList.remove('show');
  toggleBtn.setAttribute('aria-expanded','false');
  document.removeEventListener('keydown', handleKeyDown);
  document.body.style.overflow = '';
  // wait for transition then hide attributes
  setTimeout(()=> {
    menu.setAttribute('hidden','');
    backdrop.setAttribute('hidden','');
    if(lastFocused) lastFocused.focus();
  }, 200);
}

function handleKeyDown(e){
  if(e.key === 'Escape') closeMobileMenu();
  // simple focus trap: keep Tab inside menu
  if(e.key === 'Tab'){
    const focusable = Array.from(menu.querySelectorAll('a,button')).filter(el => !el.hasAttribute('disabled'));
    if(focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }
}

/* Close if user resizes to desktop (optional) */
window.addEventListener('resize', ()=> {
  if(window.innerWidth > 880 && !menu.hasAttribute('hidden')){
    closeMobileMenu();
  }
});