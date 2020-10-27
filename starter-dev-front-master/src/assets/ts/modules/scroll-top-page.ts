'use strict';

class ScrollTopPage {
    public btnId: string;
    private anchorCls: string = '.btn-anchor';

    public constructor() {}
    
    public toggleBtnOnScroll(loadFn: any): void {
        let ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    loadFn();
                    ticking = false;
                });
            }

            ticking = true;
        });
    }
    
    public toggleBtnOnLoad(): void {
        let scrollBtnElt = document.getElementById("scroll-top-page");
        let scrollBtnCls = 'scroll-top-page--hidden';

        if (scrollBtnElt) {
            let topPos: Number = 100;

            if (document.body.scrollTop > topPos 
                || document.documentElement.scrollTop > topPos) {
                scrollBtnElt.classList.remove(scrollBtnCls);
            } 
            else {
                scrollBtnElt.classList.add(scrollBtnCls);
            }
        }
    }
    
    public clickScrollBtn(): void {
        let scrollBtnElt = document.getElementById("scroll-top-page");

        if (scrollBtnElt) {
            scrollBtnElt.addEventListener('click', function(e: any) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    public clickScrollAnchor(): void {
        if (document.querySelectorAll(this.anchorCls)[0]
            && document.querySelectorAll('.l-header')[0]) {
            let bodyElt         = document.querySelector('body');
            let anchorElt       = document.querySelectorAll(this.anchorCls);
            let headerElt       = document.querySelector('.l-header');
            let headerHeight    = headerElt.clientHeight;

            for (let i = 0; i < anchorElt.length; i++) {
                if (anchorElt[i].getAttribute('href')
                    && document.querySelector(anchorElt[i].getAttribute('href'))) {
                    let anchorId    = anchorElt[i].getAttribute('href');
                    let tgtElt      = document.querySelector(anchorId);

                    anchorElt[i].addEventListener('click', function(e: any) {
                        e.preventDefault();

                        let rect = tgtElt.getBoundingClientRect();
                        let tgtPos = rect.top;
                        let bodyTop = bodyElt.getBoundingClientRect().top;

                        //window.scrollTo({ top: tgtPos - headerHeight, behavior: 'smooth' });
                        window.scrollTo({ top: tgtPos - bodyTop, behavior: 'smooth' });
                    });
                }
            }
        }
    }
}