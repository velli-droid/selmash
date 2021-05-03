// MOBILE MENU

const burgerBtn = document.querySelector('.burger-menu');
const jumpMenu = document.querySelector('.jump-menu');
const jumpMenuWrapper = jumpMenu.querySelector('.jump-menu__wrapper');
const jumpMenuCloseBtn = jumpMenu.querySelector('.jump-menu__close');
const navLinks = jumpMenu.querySelectorAll('a');

function mobileMenu() {
    burgerBtn.addEventListener('click', function() {
        showEl(jumpMenu);
        window.addEventListener('click', function(event) {
            if(event.target === jumpMenu) {
                hideEl(jumpMenu);
            }
        });
    });
    jumpMenuCloseBtn.addEventListener('click', function() {
        hideEl(jumpMenu);
    });
    navLinks.forEach(el => {
        el.onclick = function() {
            hideEl(jumpMenu);
        }
    })
}
function showEl(el) {
    setElFade(el);
    setTimeout(setElActive, 0, el);
}
function hideEl(el) {
    removeElActive(el);
    setTimeout(removeElFade, 300, el);
}
function setElFade(el) {
    el.classList.add('fade');
}
function removeElFade(el) {
    el.classList.remove('fade');
}
function setElActive(el) {
    el.classList.add('active');
}
function removeElActive(el) {
    el.classList.remove('active');
}
mobileMenu();

// SMOOTH SCROLL

const anchors = document.querySelectorAll('a[href*="#"]')
for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const sectionId = anchor.getAttribute('href').substr(1);
        if (sectionId) {
            document.getElementById(sectionId).scrollIntoView( {
                behavior: 'smooth',
                block: 'start'
            });
        }
  });
}

// INTRO TABS
function tabs(el) {
    const tabsEl = document.querySelector(el);
    const tabsLinks = tabsEl.querySelectorAll('.tabs__link');
    const tabsPanes = tabsEl.querySelectorAll('.tabs__pane');

    function setPaneFade(el) {
        el.classList.add('tabs__pane_fade');
    }
    function setPaneShow(el) {
        el.classList.add('tabs__pane_show');
    }
    function removePaneShow(el) {
        el.classList.remove('tabs__pane_show');
    }
    function removePaneFade(el) {
        el.classList.remove('tabs__pane_fade');
    }
    function showPane(el) {
        setPaneFade(el);
        setTimeout(setPaneShow, 0, el)
    }
    function hidePane(el) {
        removePaneShow(el);
        removePaneFade(el);
    }

    for(let i = 0; i < tabsLinks.length; i++) {
        tabsLinks[i].onclick = function(event) {
            tabsLinks.forEach(element => {
                element.classList.remove('tabs__link_active');
            });
            tabsPanes.forEach(element => {
                hidePane(element);
            });
            event.preventDefault();
            const tabsLinkHref = tabsLinks[i].getAttribute('href').slice(1);
            const activePane = document.getElementById(tabsLinkHref);
            showPane(activePane);
            tabsLinks[i].classList.add('tabs__link_active');
        }
    }
}
tabs('.intro-tabs');

// INTRO TABS SWIPER
const introSwiper = new Swiper('.intro-tabs__header-swiper', {
    direction: 'vertical',
    initialSlide: 0,
    slidesPerView: 3,
    spaceBetween: 23,
    navigation: {
        nextEl: '.intro-tabs-next',
        prevEl: '.intro-tabs-prev',
    },
});


// ABOUT TABS NAV SWIPER 

const aboutSwiper = new Swiper('.about-tabs__swiper-container', {
    slidesPerView: 3,
    navigation: {
        nextEl: '.about-btn-next',
        prevEl: '.about-btn-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        600: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
    },
});

// ABOUT TABS SWIPERS

const aboutSwiper1 = new Swiper('.about-tabs__swiper-1', {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: '.about-tabs-next-1',
        prevEl: '.about-tabs-prev-1',
    },
});

const aboutSwiper2 = new Swiper('.about-tabs__swiper-2', {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: '.about-tabs-next-2',
        prevEl: '.about-tabs-prev-2',
    },
});

const aboutSwiper3 = new Swiper('.about-tabs__swiper-3', {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: '.about-tabs-next-3',
        prevEl: '.about-tabs-prev-3',
    },
});

// ABOUT TABS
tabs('.about-tabs');

function swiperInit(el) {
    let linkHref = el.getAttribute('href').slice(1);
    let activePane = document.getElementById(linkHref);
    let swiper = activePane.querySelector('.about-tabs__swiper');
    let swiperNum = swiper.dataset.swiperNum;
    switch (swiperNum) {
        case '1':
            aboutSwiper1.init();
            aboutSwiper1.update();
            aboutSwiper1.updateSlides();
            break;
        case '2':
            aboutSwiper2.init();
            aboutSwiper2.update();
            aboutSwiper2.updateSlides();
            break;
        case '3':
            aboutSwiper3.init();
            aboutSwiper3.update();
            aboutSwiper3.updateSlides();
            break;
    }
    
}
const aboutTabsLink = [...document.querySelectorAll('.about-tabs__link')];

for(let i = 0; i < aboutTabsLink.length; i++) {
    aboutTabsLink[i].addEventListener('click', function() {
        setTimeout(swiperInit, 0, aboutTabsLink[i]);
    }) 
}

// APARTMENTS SWIPER

let apartmentsSwiper = new Swiper('.apartments__swiper', {
    slidesPerView: 1.5,
    scrollbar: {
        el: ".swiper-scrollbar",
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        480: {
            slidesPerView: 1,
            spaceBetween: 30
        },
        1024: {
            slidesPerView: 1.3,
            spaceBetween: 30
        },
        1201: {
            slidesPerView: 1.5,
            spaceBetween: 0
        },
    }
});

// APARTMENTS FILTERS

const apartmentsCards = [...document.querySelectorAll('.apartments-card')];
const apartmentsBtns = document.querySelector('.apartments-btns');
const apartmentsRadios = document.querySelector('.apartments-radios');

function filterOne(el, arr) {
    let currentValue = el.dataset.value;
    let filteredCards = arr.filter(item => item.dataset.filterOne === currentValue);
    return filteredCards;
}
function filterTwo(el, arr) {
    let currentRadio = el.value;
    let filteredCards = arr.filter(item => item.dataset.filterTwo === currentRadio);
    return filteredCards;
}
function setSlideActive(el) {
    el.classList.add('slide_show');
}
function setSlideFade(el) {
    el.classList.add('slide_fade');
}
function removeSlideActive(el) {
    el.classList.remove('slide_show');
}
function removeSlideFade(el) {
    el.classList.remove('slide_fade');
}

function showSlide(el) {
    setSlideFade(el);
    setTimeout(setSlideActive, 0, el);
}
function hideSlide(el) {
    removeSlideActive(el);
    removeSlideFade(el);
}

function controlBtns() {
    const apartmentsBtnsItems = [...apartmentsBtns.querySelectorAll('.apartments-btns__link')];
    apartmentsBtnsItems.forEach(el => {
        el.onclick = function(ev) {
            ev.preventDefault();
            for(let i = 0; i < apartmentsBtnsItems.length; i++) {
                apartmentsBtnsItems[i].classList.remove('apartments-btns__link_active') 
            }
            el.classList.add('apartments-btns__link_active');
            showCards(apartmentsCards);
        }
    })
}
function radioBtns() {
    const radioLabels = apartmentsRadios.querySelectorAll('.radio-input');
    radioLabels.forEach(el => {
        el.onfocus = function() {
            setTimeout(showCards, 0, apartmentsCards)
        }
    })
}

function showCards(arr) {
    const apartmentsActiveLink = apartmentsBtns.querySelector('.apartments-btns__link_active');
    const apartmentsRadiosInputs = [...apartmentsRadios.querySelectorAll('.radio-input')];
    let currentRadio;
    apartmentsRadiosInputs.forEach(el => {
        if(el.checked) {
            currentRadio = el;
        }
    })
    let firstFilteredCards = filterOne(apartmentsActiveLink, arr);
    let secondFilteredCards = filterTwo(currentRadio, firstFilteredCards);

    apartmentsCards.forEach(el => {
        let cardParent = el.parentNode;
        hideSlide(cardParent);
    });

    secondFilteredCards.forEach(el => {
        let cardParent = el.parentNode;
        showSlide(cardParent);
    });
    apartmentsSwiper.update();
    apartmentsSwiper.scrollbar.updateSize();
}

controlBtns();
radioBtns();
showCards(apartmentsCards);


// GALLERY SWIPER
const gallerySwiper = new Swiper('.gallery-swiper', {
    slidesPerView: 2,
    loop: true,
    loopAdditionalSlides: 5,
    spaceBetween: 30,
    navigation: {
        nextEl: '.gallery-swiper-next',
        prevEl: '.gallery-swiper-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        767: {
            slidesPerView: 2,
            spaceBetween: 30
        },
    },
});

// BUILDING SWIPER

const buildingSwiper = new Swiper('.building__tabs-nav', {
    slidesPerView: 6,
    spaceBetween: 40,
    navigation: {
        nextEl: '.building-btn-next',
        prevEl: '.building-btn-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        600: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 30
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 30
        },
        1201: {
            slidesPerView: 6,
            spaceBetween: 40
        },
    },
});

// BUILDING TABS

tabs('.building__tabs');

// CUSTOM SELECTS

const customSelects = [...document.querySelectorAll('.custom-select')];

function openSelect(el) {
    el.addEventListener('focus', function() {
        let selectEl = el.querySelector('.select-selected');
        document.addEventListener('keydown', function(ev) {
            if(ev.key === 'Enter') {
                selectEl.click();
            }
        });
    });
}
function chooseOption(arr) {
    for(let i = 0; i < arr.length; i++) {
        arr[i].addEventListener('focus', function() {
            document.addEventListener('keydown', function(ev) {
                if(ev.key === 'Enter') {
                    arr[i].click();
                }
            });
        });
    }
    arr[0].focus();

}
function selectKeyboardControl(el) {
    let optionsList = el.querySelector('.select-items');
    let optionsListItems = [...optionsList.querySelectorAll('div')];
    openSelect(el);
    chooseOption(optionsListItems);
}

for(let i = 0; i < customSelects.length; i++) {
    selectKeyboardControl(customSelects[i]);
}



// PARTNERS SWIPER

const partnersSwiper = new Swiper('.partners-swiper', {
    slidesPerView: 6,
    spaceBetween: 6,
    navigation: {
        nextEl: '.partners-swiper-next',
        prevEl: '.partners-swiper-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        480: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 20,
        },
        1201: {
            slidesPerView: 6,
            spaceBetween: 6,
        },
    },
});

// POPUP

function popup() {
    const pagePopup = document.querySelector('.page-popup');
    const popupLinks = [...document.querySelectorAll('.popup__link')];
    const popupCloseBtn = pagePopup.querySelector('.page-popup__close');
    const body = document.querySelector('body');

    popupLinks.forEach(element => {
        element.onclick = function(ev) {
            ev.preventDefault();
            showEl(pagePopup);
            body.classList.add('no-scroll');
            window.addEventListener('click', function(event) {
                if(event.target === pagePopup) {
                    hideEl(pagePopup);
                    body.classList.remove('no-scroll');
                }
            });

        }
    });
    popupCloseBtn.onclick = function() {
        hideEl(pagePopup);
        body.classList.remove('no-scroll');
    }
}
popup();

