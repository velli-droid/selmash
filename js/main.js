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

// ABOUT TABS
tabs('.about-tabs');

// ABOUT TABS SWIPERS

const aboutSwiper = new Swiper('.about-tabs__swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: '.about-tabs-next',
        prevEl: '.about-tabs-prev',
    },
});
