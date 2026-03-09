// Scroll reveal sections
const reveals = document.querySelectorAll('.reveal');
window.addEventListener('scroll', () => {
  reveals.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if(top < window.innerHeight - 100){section.classList.add('active');}
  });
});

// Animate skill bars
const skillFills = document.querySelectorAll('.skill-fill');
window.addEventListener('scroll', () => {
  skillFills.forEach(fill => {
    const top = fill.getBoundingClientRect().top;
    if(top < window.innerHeight - 50){fill.style.width = fill.dataset.level;}
  });
});