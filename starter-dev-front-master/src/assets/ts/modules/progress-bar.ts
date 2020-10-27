'use strict';

class ProgressBar {
    private progCls: string     = '.progress--page';
    private progBarCls: string  = '.progress-bar';

    public constructor() {}

    public changePageProgressBarValue(): void {
        let ticking = false;

        if (document.querySelectorAll(this.progCls)[0]
            && document.querySelectorAll(this.progBarCls)[0]) {
            const progElt       = document.querySelectorAll(this.progCls);

            for (let i = 0; i < progElt.length; i++) {
                let self            = this;
                let progBarElt      = progElt[i].querySelector(this.progBarCls);

                //LOAD
                self.setPageProgressBarValue(progBarElt);

                //SCROLL
                window.addEventListener('scroll', () => {
                    if (!ticking ) {
                        window.requestAnimationFrame(function() {
                            progBarElt      = progElt[i].querySelector(self.progBarCls);
                            self.setPageProgressBarValue(progBarElt);
                           
                            ticking = false;
                        });
                    }
                });
            }
        }
    }

    private setPageProgressBarValue(progBarElt: any): void {
        let scrollTop       = window.scrollY || window.pageYOffset;
        let scrollHeight    = (document.documentElement.scrollHeight - document.documentElement.clientHeight) || (document.body.scrollHeight - document.body.clientHeight);
        let scrollPercent   = (scrollTop / scrollHeight) * 100;

        progBarElt.setAttribute('aria-valuenow', scrollPercent.toString());
        progBarElt.setAttribute('style', `width: ${scrollPercent}%`);
    }
}