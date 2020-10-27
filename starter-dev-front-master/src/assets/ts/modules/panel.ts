'use strict';

class Panel {
    private btnCloseCls: string = 'panel__btn-close';
    private overlayCls: string  = 'panel-backdrop';
    private showCls: string     = 'show';
    private hideCls: string     = 'd-none';
    private delay: number       = 300;

    public constructor() {}
    
    public managePanel():void {
        if (document.querySelectorAll('[data-toggle="panel"]')[0]
            && document.querySelectorAll('.panel')[0]) {
            const btnElt = document.querySelectorAll('[data-toggle="panel"]');

            //CREATE Overlay
            this.addOverlay();

            for (let i =0; i < btnElt.length; i++) {
                let btn = btnElt[i];

                //CLICK on Button
                btn.addEventListener('click', (e: any): void => {
                    e.preventDefault();

                    this.clickButtonPanel(btn);
                    this.showOverlay();
                });
                
                //CLICK on Close button OR Overlay
                this.clickToClosePanel(btn, `.${this.overlayCls}`);
            }
        }
    }
    
    private clickToClosePanel(btnElt: any, triggerCls: string):void {
        let panelId = btnElt.getAttribute('data-target');

        if (document.querySelector(panelId) 
            && document.querySelector(panelId).querySelector(`.${this.btnCloseCls}`)
            && document.querySelector(triggerCls) ) {
            let panelElt    = document.querySelector(panelId);
            let closeBtnElt = panelElt.querySelector(`.${this.btnCloseCls}`);
            let triggerElt  = document.querySelector(triggerCls);

            closeBtnElt.addEventListener('click', (e: any): void => {
                e.preventDefault();
                this.closePanel(panelElt);
            });
            triggerElt.addEventListener('click', (e: any): void => {
                e.preventDefault();
                this.closePanel(panelElt);
            });
        }
    }
    
    private closePanel(panelElt: any):void {
        panelElt.classList.remove(this.showCls);
        this.hideOverlay();
    }
    
    private clickButtonPanel(btnElt: any):void {
        let panelId = btnElt.getAttribute('data-target');

        if (document.querySelector(panelId)) {
            let panelElt = document.querySelector(panelId);

            panelElt.classList.add('show');
        }
    }

    private addOverlay():void {
        if (!document.querySelector(`.${this.overlayCls}`)) {
            let bodyElt     = document.querySelector('body');
            let div         = document.createElement('div');

            div.setAttribute('class', `${this.overlayCls} d-none fade`);
            bodyElt.appendChild(div); //add element
        }
    }
    
    public showOverlay():void {
        if (document.querySelector(`.${this.overlayCls}`) 
            && !document.querySelector(`.${this.overlayCls}`).classList.contains(this.showCls)
            && document.querySelector(`.${this.overlayCls}`).classList.contains(this.hideCls)) {
            let overlayElt  = document.querySelector(`.${this.overlayCls}`);

            overlayElt.classList.remove(this.hideCls);
            setTimeout(() => {
                overlayElt.classList.add(this.showCls);
            }, this.delay);
        }
    }
    
    private hideOverlay():void {
        if (document.querySelector(`.${this.overlayCls}`) 
            && document.querySelector(`.${this.overlayCls}`).classList.contains(this.showCls)
            && !document.querySelector(`.${this.overlayCls}`).classList.contains(this.hideCls)) {
            let overlayElt  = document.querySelector(`.${this.overlayCls}`);

            overlayElt.classList.remove(this.showCls);
            setTimeout(() => {
                overlayElt.classList.add(this.hideCls);
            }, this.delay);
        }
    }
}