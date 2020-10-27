'use strict';

class Select {
    private mainCls: string      = '.dropdown--custom';
    private btnCls: string       = '.dropdown-toggle';
    private btnTextCls: string   = '.dropdown-toggle__text';
    private menuCls: string      = 'dropdown-menu';

    public constructor() {}
    
    public replaceDropdownButtonValue(): void {
        let mainCls     = this.mainCls;
        let btnCls      = this.btnCls;
        let btnTextCls  = this.btnTextCls;
        let menuCls     = this.menuCls;

        if (document.querySelectorAll(`${mainCls} ${btnCls} ${btnTextCls}`)[0] 
            && document.querySelectorAll(`${mainCls} .${menuCls} .dropdown-li .dropdown-item`)[0]) {
            let btnElt  = document.querySelectorAll(`${mainCls} ${btnCls}`);

            for (let i = 0; i < btnElt.length; i++) {
                if (btnElt[i].nextElementSibling.classList.contains(`${menuCls}`)) {
                    let menuElt     = document.querySelectorAll(`${mainCls} .${menuCls}`)[i];
                    let menuLinkElt = menuElt.querySelectorAll(`.dropdown-item`);
                    
                    for (let j = 0; j < menuLinkElt.length; j++) {
                        this.clickOnDropdownLink( menuLinkElt[j], btnElt[i]);
                    }
                }
            }
        }
    }

    private clickOnDropdownLink( menuLinkElt: any, btnElt: any): void {
        let btnTextCls = this.btnTextCls;

        menuLinkElt.addEventListener('click', (e: any) => {
            e.preventDefault();
            let menuLinkHref = menuLinkElt.getAttribute('href');

            if (!menuLinkHref
                || menuLinkHref === '' 
                || menuLinkHref === '#') {
                let menuLinkVal = menuLinkElt.textContent;
                let btnTextElt  = btnElt.querySelector(`${btnTextCls}`);

                btnTextElt.textContent = menuLinkVal;
            }
        });
    }
}