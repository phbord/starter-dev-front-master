'use strict';

class Code {
    private bodyElt: any            = document.querySelector('body');
    private notifId: string         = 'notification-code';
    private notifCls: string        = 'notification-slider';
    private notifShowCls: string    = 'notification-slider--show';
    private closeCls: string        = 'notification__btn-close';

    public constructor() {}

    public clickToCopyClipboard(wrapperCls: string, btnCls: string, langCls: string): void {

        if (document.querySelectorAll(wrapperCls)[0]
            && document.querySelectorAll(wrapperCls)[0].querySelector(btnCls)
            && document.querySelectorAll(wrapperCls)[0].querySelector(langCls)) {
            const wrapperElt        = document.querySelectorAll(wrapperCls);

            this.createNotificationSlider();
            this.clickButtonToHideNotificationSlider(this.closeCls);

            for (let i = 0; i < wrapperElt.length; i++) {
                let btnElt      = wrapperElt[i].querySelector(btnCls);
                let langElt     = wrapperElt[i].querySelector(langCls);
                let langSplit   = langCls.split('language-')[1];
                let langData    = langElt.getAttribute('data-lang');
                let self        = this;

                btnElt.addEventListener('click', (e: any): void => {
                    e.preventDefault();
                    
                    self.copyClipboard(langElt);
                    self.showNotificationSlider();
                });
            }
        }
    }

    private copyClipboard(langElt: any): void {
        let range       = document.createRange();
        let selection   = window.getSelection();

        range.selectNode(langElt);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection = window.getSelection();

        if (typeof selection.removeRange === 'function') {
            selection.removeRange(range);
        } 
        else if (typeof selection.removeAllRanges === 'function') {
            selection.removeAllRanges();
        }
    }

    private createNotificationSlider(): void {
        if (!document.getElementById(`${this.notifId}`)) {
            let div = document.createElement('div');
            let btn = document.createElement('button');

            btn.classList.add(this.closeCls);
            btn.setAttribute('type', 'button');

            div.classList.add(this.notifCls);
            div.setAttribute('id', this.notifId);
            div.textContent = 'Copy !';
            div.appendChild(btn);

            this.bodyElt.appendChild(div);
        }
    }

    private showNotificationSlider(): void {
        if (document.getElementById(`${this.notifId}`)) {
            let notifElt = document.getElementById(`${this.notifId}`);
            let nofifCls = this.notifShowCls;

            notifElt.classList.add(nofifCls);
            setTimeout(function() {
                notifElt.classList.remove(nofifCls);
            }, 3000);
        }
    }

    public clickButtonToHideNotificationSlider(btnCls: string): void {
        if (document.getElementById(`${this.notifId}`) 
            && document.querySelector(`.${btnCls}`)) {
            let notifElt    = document.getElementById(`${this.notifId}`);
            let btnElt      = document.querySelector(`.${btnCls}`);

            btnElt.addEventListener('click', (e: any): void => {
                e.preventDefault();
                
                notifElt.classList.remove(this.notifShowCls);
            });
        }
    }
}