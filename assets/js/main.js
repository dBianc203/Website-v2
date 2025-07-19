/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400});
sr.reveal('.home__social-icon',{ interval: 200});
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200});

const blog = [
  {
    img: 'assets/img/CiscoLive.jpg',
    title: 'Cisco LIVE 2025 In San Diego',
    desc: 'Attended Cisco LIVE 2025 in San Diego, CA. It was an amazing experience to learn about the latest technologies and network with industry professionals.'
  },
  {
    img: 'assets/img/LMelevate.jpg',
    title: 'Guest Speaker for LogicMonitor at Elevate Coference 2025',
    desc: 'Was a guest speaker for LogicMonitor at their Elevate Conference 2025. Discussed the importance of LM Envision and how it can help organizations achieve their IT goals.'
  },
  {
    img: 'assets/img/Quinn.png',
    title: 'Began Masters in Cybersecurity at Quinnipiac University',
    desc: 'Fill in info about this'
  }
];

let currentProject = 0;

const imgEl = document.querySelector('.carousel__img');
const titleEl = document.querySelector('.carousel__desc h3');
const descEl = document.querySelector('.carousel__desc p');
const leftBtn = document.querySelector('.carousel__arrow--left');
const rightBtn = document.querySelector('.carousel__arrow--right');

function showProject(index, direction = 'right') {
  // Remove any previous animation classes
  imgEl.classList.remove('slide-right', 'slide-in');

  // Animate out
  if (direction === 'right') {
    imgEl.classList.add('slide-right');
  } else {
    imgEl.classList.add('slide-in');
  }

  setTimeout(() => {
    // Change content after slide out
    imgEl.src = blog[index].img;
    imgEl.alt = blog[index].title;
    titleEl.textContent = blog[index].title;
    descEl.textContent = blog[index].desc;

    // Reset position and animate in
    imgEl.classList.remove('slide-right', 'slide-in');
    imgEl.style.transform = direction === 'right' ? 'translateX(-100%)' : 'translateX(100%)';
    imgEl.style.opacity = '0';

    setTimeout(() => {
      imgEl.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s';
      imgEl.style.transform = 'translateX(0)';
      imgEl.style.opacity = '1';
    }, 20);
  }, 500);
}

// Update event listeners to pass direction
leftBtn.addEventListener('click', () => {
  currentProject = (currentProject - 1 + blog.length) % blog.length;
  showProject(currentProject, 'left');
});

rightBtn.addEventListener('click', () => {
  currentProject = (currentProject + 1) % blog.length;
  showProject(currentProject, 'right');
});

// Initialize
showProject(currentProject);