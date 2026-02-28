(function ($) {
    "use strict";

    // 2. Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // 3. Scroll Smoothing (Enable smooth scrolling for desktop devices)
    var device_width = window.screen.width;

    if (device_width > 767) {
        if (document.querySelector("#has_smooth").classList.contains("has-smooth")) {
            const smoother = ScrollSmoother.create({
                smooth: 0.9,
                effects: device_width < 1025 ? false : true,
                smoothTouch: 0.1,
                normalizeScroll: {
                    allowNestedScroll: true,
                },
                ignoreMobileResize: true,
            });
        }
    }

    // 4. Side Info and Offcanvas Logic
    $(".side-info-close,.offcanvas-overlay").on("click", function () {
        $(".side-info").removeClass("info-open");
        $(".offcanvas-overlay").removeClass("overlay-open");
    });
    $(".side-toggle").on("click", function () {
        $(".side-info").addClass("info-open");
        $(".offcanvas-overlay").addClass("overlay-open");
    });

    $(window).scroll(function () {
        if ($("body").scrollTop() > 0 || $("html").scrollTop() > 0) {
            $(".side-info").removeClass("info-open");
            $(".offcanvas-overlay").removeClass("overlay-open");
        }
    });

    // 5. MeanMenu Activation (Responsive menu for mobile devices)
    $('.main-menu').meanmenu({
        meanScreenWidth: "1199",
        meanMenuContainer: '.mobile-menu',
        meanMenuCloseSize: '28px',
    });

    // 6. Preloader Animation
    $(document).ready(function () {
        setTimeout(function () {
            $('#container').addClass('loaded');
        }, 500);

        setTimeout(function () {
            $('.loader-wrap').fadeOut(1000, function () {
                $(this).remove();
            });
        }, 3000);
    });

    const svg = document.getElementById("svg");
    const tl = gsap.timeline();
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    tl.to(".loader-wrap-heading .load-text , .loader-wrap-heading .cont", {
        delay: 1.5,
        y: -100,
        opacity: 0,
    });
    tl.to(svg, {
        duration: 0.5,
        attr: {
            d: curve
        },
        ease: "power2.easeIn",
    }).to(svg, {
        duration: 0.5,
        attr: {
            d: flat
        },
        ease: "power2.easeOut",
    });
    tl.to(".loader-wrap", {
        y: -1500,
    });
    tl.to(".loader-wrap", {
        zIndex: -1,
        display: "none",
    });
    tl.from(
        "main", {
        y: 100,
        opacity: 0,
        delay: 0.3,
    },
        "-=1.5"
    );

    // 7. WOW.js Initialization (Scroll animations)
    new WOW().init();

    // 8. Before-After Image Comparison
    $('.beforeAfter').beforeAfter({
        movable: true,
        clickMove: true,
        position: 50,
        opacity: 1,
        activeOpacity: 1,
        hoverOpacity: 1,
        separatorColor: '#ffffff',
        bulletColor: '#ffffff',
        arrowColor: '#11111',
    });

    // 9. GSAP Shape Animations
    if (document.querySelectorAll(".features").length > 0) {
        gsap.from(".shape-1", {
            rotate: -90,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".shape-1",
                start: "top bottom",
                end: "top center",
                scrub: 3,
            }
        });
    }

    if (document.querySelectorAll(".features").length > 0) {
        gsap.from(".shape-2", {
            y: 100,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".shape-2",
                start: "top bottom",
                end: "top center",
                scrub: 3,
            }
        });
    }

    if (document.querySelectorAll(".features").length > 0) {
        gsap.from(".shape-3", {
            rotate: -90,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".shape-3",
                start: "top bottom",
                end: "top center",
                scrub: 3,
            }
        });
    }

    // 10. Builder Features Shape Animation
    if (document.querySelectorAll(".builder-features__media").length > 0 && window.innerWidth > 768) {
        gsap.to(".shape-1", {
            y: -200,
            duration: 1.5,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".builder-features__media",
                start: "top center",
                end: "bottom center",
                scrub: 3,
            }
        });
    }

    if (document.querySelectorAll(".builder-features__media").length > 0 && window.innerWidth > 768) {
        gsap.to(".shape-2", {
            x: -200,
            duration: 1.5,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".builder-features__media",
                start: "top center",
                end: "bottom center",
                scrub: 3,
            }
        });
    }

    // 11. FAQ Accordion Logic
    $(document).ready(function () {
        $(".faq-accordion-button").click(function () {
            $(this).find(".pluse-icon").toggleClass("pluse-icon-rotate");
        });
    });

    // 12. Title Animation with GSAP
    if (document.querySelectorAll(".rr-title-anim").length > 0) {

        let titles = document.querySelectorAll(".rr-title-anim");

        titles.forEach(title => {
            let split = new SplitText(title, { type: "chars, words" });

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: title,
                    start: "top bottom",
                    toggleActions: "play none none reverse",
                    onEnter: () => tl.timeScale(2.3),
                    onLeaveBack: () => tl.timeScale(2.3).reverse()
                }
            });

            tl.from(split.chars, {
                opacity: 0,
                y: 50,
                rotation: 1,
                duration: 2,
                ease: "back",
                stagger: 0.06
            });
        });
    }

    // 13. Image Preview on Menu Hover
    document.addEventListener("DOMContentLoaded", function () {
        const menuItems = document.querySelectorAll(".dp-menu a[data-image]");
        const previewImg = document.querySelector(".dp-menu .preview-image img");

        menuItems.forEach(item => {
            item.addEventListener("mouseenter", function () {
                const newImg = this.getAttribute("data-image");

                if (previewImg.src.includes(newImg)) return;

                menuItems.forEach(i => i.classList.remove("active"));

                this.classList.add("active");

                previewImg.style.opacity = 0;
                setTimeout(() => {
                    previewImg.setAttribute("src", newImg);
                    previewImg.style.opacity = 1;
                }, 200);
            });

        });
    });



})(jQuery);