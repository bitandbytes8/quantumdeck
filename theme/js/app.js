 // Hide Navbar
 var didScroll;
 var lastScrollTop = 0;
 var delta = 5;
 var navbarHeight = $('.qd__logo_container, .qd__menu, .qd__navbar').outerHeight();
 $(window).scroll(function (event) {
     didScroll = true;
 });
 setInterval(function () {
     if (didScroll) {
         hasScrolled();
         didScroll = false;
     }
 });

 function hasScrolled() {
     var st = $(this).scrollTop();
     if (Math.abs(lastScrollTop - st) <= delta)
         return;
     if (st > lastScrollTop && st > navbarHeight) {
         $('.qd__navbar').addClass('qd__hide_navbar');
         $('.qd__menu').addClass('qd__hide_navbar');
         $('.qd__logo_container').addClass('qd__hide_navbar');
     } else {
         // Scroll Up
         if (st + $(window).height() < $(document).height()) {
             $('.qd__navbar').removeClass('qd__hide_navbar');
             $('.qd__menu').removeClass('qd__hide_navbar');
             $('.qd__logo-container').removeClass('qd__hide_navbar');
         }
     }
     lastScrollTop = st;
 }

 // Scroll Fade-In

 var rafId = null;
 var delay = 200;
 var lTime = 0;

 function scroll() {
     var scrollTop = $(window).scrollTop();
     var height = $(window).height()
     var visibleTop = scrollTop + height;
     $('.reveal').each(function () {
         var $t = $(this);
         if ($t.hasClass('reveal_visible')) {
             return;
         }
         var top = $t.offset().top;
         if (top <= visibleTop) {
             if (top + $t.height() < scrollTop) {
                 $t.removeClass('reveal_pending').addClass('reveal_visible');
             } else {
                 $t.addClass('reveal_pending');
                 if (!rafId) requestAnimationFrame(reveal);
             }
         }
     });
 }

 function reveal() {
     rafId = null;
     var now = performance.now();

     if (now - lTime > delay) {
         lTime = now;
         var $ts = $('.reveal_pending');
         $($ts.get(0)).removeClass('reveal_pending').addClass('reveal_visible');
     }
     if ($('.reveal_pending').length >= 1) rafId = requestAnimationFrame(reveal);
 }

 $(scroll);
 $(window).scroll(scroll);


 // My Effects


 $(".qd__menu").click(function (e) {
     e.preventDefault();
     $(".qd__bar_top").toggleClass("qd__bar_down qd__bar_hue");
     $(".qd__bar_bottom").toggleClass("qd__bar_up qd__bar_hue");
     $(".qd__hidden_nav").toggleClass("qd__visible_nav");
     $(".qd__menu_nav").toggleClass("qd__menu_nav_show");
     $(".qd__navbar").toggleClass("qd__fix_element");
     $(".qd__menu").toggleClass("qd__fix_element");
     $(".qd__logo_container").toggleClass("qd__fix_element");
     $(".qd__menu_overlay").fadeToggle(250);
 });

 $(".qd__menu_overlay").click(function (e) {
     e.preventDefault();
     $(".qd__bar_top").removeClass("qd__bar_down qd__bar_hue");
     $(".qd__bar_bottom").removeClass("qd__bar_up qd__bar_hue");
     $(".qd__hidden_nav").removeClass("qd__visible_nav");
     $(".qd__menu_nav").removeClass("qd__menu_nav_show");
     $(".qd__navbar").removeClass("qd__fix_element");
     $(".qd__menu").removeClass("qd__fix_element");
     $(".qd__logo_container").removeClass("qd__fix_element");
     $(".qd__menu_overlay").fadeOut(250);
 });


 // Hide Scroll Button

 $(window).scroll(function () {
     if ($(this).scrollTop() > 1) {
         $(".qd__scroll_down_btn").stop().animate({
             opacity: 0
         }, 100);
     } else {
         $(".qd__scroll_dow_btn").stop().animate({
             opacity: 1
         }, 100);
     }
 });


 // Year

 document.getElementById("year").innerHTML = new Date().getFullYear();


 $(document).ready(function () {
     $('a[href^="#"]').click(function (event) {
         var id = $(this).attr("href");
         var offset = 0;
         var target = $(id).offset().top - offset;
         $('html, body').animate({
             scrollTop: target
         }, 1000);
         event.preventDefault();
     });
 });


 function watchForHover() {
     var hasHoverClass = false;
     var container = document.body;
     var lastTouchTime = 0;

     function enableHover() {
         if (new Date() - lastTouchTime < 500) return;
         if (hasHoverClass) return;
         container.className += ' hasHover';
         hasHoverClass = true;
     }

     function disableHover() {
         if (!hasHoverClass) return;
         container.className = container.className.replace(' hasHover', '');
         hasHoverClass = false;
     }

     function updateLastTouchTime() {
         lastTouchTime = new Date();
     }

     document.addEventListener('touchstart', updateLastTouchTime, true);
     document.addEventListener('touchstart', disableHover, true);
     document.addEventListener('mousemove', enableHover, true);
     enableHover();
 }

 watchForHover();