'use strict';


// POLYFILL ----------------------------------------------------------------------------------------

interface Element {
    msMatchesSelector: any;
}

if (!Element.prototype.matches)
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s: any) {
        let el = this;
        if (!document.documentElement.contains(el)) {
            return null;
        }
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType == 1);
        return null;
    }
};


// ON LOAD -----------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    //Cookie
    let cookie = new Cookie();
    cookie.checkCookie('test');

    //Panel
    let panel = new Panel();
    panel.managePanel();

    //Date + Time
    let datePicker = new DatePicker();
    datePicker.setDatepickerValue();

    //Top scroll page
    let topScrollPage = new ScrollTopPage();
    topScrollPage.toggleBtnOnLoad();
    topScrollPage.toggleBtnOnScroll(topScrollPage.toggleBtnOnLoad);
    topScrollPage.clickScrollBtn();
    topScrollPage.clickScrollAnchor();

    //Dropdown
    let select = new Select();
    select.replaceDropdownButtonValue();

    //Input
    let input = new Input();
    input.setFileNameInLabelInputFileCustom();
    input.setInputLabelValid();

    //Button
    let button = new Button();
    button.useTooltip();
    button.toggleDisabledSubmitButtonByCheckbox('input-submit-1');

    //Form Control
    let formControl = new FormControl();
    formControl.inputControl('form-control--zip-code');
    formControl.inputControl('form-control--email');
    formControl.inputControl('form-control--phone');
    formControl.inputControl('form-control--textarea');
    formControl.inputControl('form-control--cvv');
    formControl.inputControl('form-control--cb');
    formControl.inputControl('form-control--cpam');

    //Carousel
    let carouselHome = new Carousel();
    carouselHome.owlCarousel('owlCarousel-1');

    //Media
    let media = new Media();
    media.setHeightVideo();

    //Progress bar
    let progressBar = new ProgressBar();
    progressBar.changePageProgressBarValue();
    
    //Code
    let code = new Code();
    code.clickToCopyClipboard('.code-group', '.btn-clipboard', '.language');
});


// RESIZE ------------------------------------------------------------------------------------------
window.addEventListener('resize', function() {
    //here...
});
