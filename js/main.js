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
    const radioLabels = apartmentsRadios.querySelectorAll('.radio-label');
    radioLabels.forEach(el => {
        el.onclick = function() {
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
    loopAdditionalSlides: 3,
    spaceBetween: 30,
    navigation: {
        nextEl: '.gallery-swiper-next',
        prevEl: '.gallery-swiper-prev',
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
});

// BUILDING TABS

tabs('.building__tabs');

// PARTNERS SWIPER

const partnersSwiper = new Swiper('.partners-swiper', {
    slidesPerView: 6,
    spaceBetween: 6,
    navigation: {
        nextEl: '.partners-swiper-next',
        prevEl: '.partners-swiper-prev',
    },
});