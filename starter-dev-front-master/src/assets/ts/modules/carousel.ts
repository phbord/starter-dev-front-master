class Carousel {
    public constructor() {}

    public owlCarousel(id: string): void {
        if (document.getElementById(id)) {
            (<any>$(`#${id}`)).owlCarousel({
                margin: 0,
                loop: true,
                autoplay: true,
                autoplayTimeout: 4000,
                nav: true,
                responsive:{
                    0:{
                        items:1
                    },
                    768:{
                        items:1
                    },
                    992:{
                        items:1
                    }
                }
            });
        }
    }
}