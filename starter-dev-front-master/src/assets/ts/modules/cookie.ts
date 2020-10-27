'use strict';

class Cookie {
    private cookieCls: string       = '.panel--cookie';
    private cookieBtnCls: string    = '.btn-add-cookie';

    public constructor() {}

    public checkCookie(name: string): void {
        console.log('>>>>',this.getCookie(name));
        if ((!this.getCookie(name) || this.getCookie(name) == '') 
             && document.querySelectorAll(this.cookieCls)[0]) {
            console.log('>>>> in');
            let cookieElt   = document.querySelectorAll(this.cookieCls);

            for (let i = 0; i < cookieElt.length; i++) {
                if (!cookieElt[i].classList.contains('show') 
                    && cookieElt[i].querySelector(this.cookieBtnCls)) {
                    let btnElt = cookieElt[i].querySelector(this.cookieBtnCls);

                    cookieElt[i].classList.add('show');
                    btnElt.addEventListener('click', function(e) {
                        e.preventDefault();
                        cookieElt[i].classList.remove('show');
                    })
                }
            }
            this.setCookie(name, 'cookie de test', 365);
        }
    }

    private getCookie(cname: string): any {
        let name = cname + "=";
        let ca = document.cookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];

            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    private setCookie(name: string, value: string, exdays: number) {
        let expires = '';

        if (exdays) {
            let d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            expires = `expires= ${d.toUTCString()}`;
        }
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    }

    private deleteCookie(name: string) {
        this.setCookie(name, "", -1);
    }
}