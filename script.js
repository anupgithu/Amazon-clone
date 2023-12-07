var timeOut;

const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from(".navbar",{
        y:-60,
        duration:1,
        delay:.5,
        ease:"easeInOut",
    })
        .to(".boundingElem",{
            y:-6,
            duration:1.1,
            delay:.5,
            ease:"easeInOut",
            stagger:.2
        })
        .from(".heroFooter", {
            y:-10,
            opacity:0,
            duration:1,
            delay:.1,
            ease:"easeInOut"
        })
}

function mouseResizer(){
    // normal scale of mouse
    var xscale = 1;
    var yscale = 1;
    // previous values
    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeOut);

        
        xscale = gsap.utils.clamp(.8,1.2,dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8,1.2,dets.clientY - yprev);
        
        xprev = dets.clientX;
        yprev = dets.clientY;

        mouseFollower(xscale, yscale);
        
        timeOut = setTimeout(function() {
            document.querySelector(".miniCircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`
        }, 100)
    })

}

function mouseFollower(xscale, yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector(".miniCircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}
mouseResizer();
mouseFollower();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
          opacity: 0,
          ease: Power3,
          duration: 0.5,
        });
      });

    elem.addEventListener("mousemove", function(dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        
        gsap.to(elem.querySelector("img"), {
            opacity:1,
            ease: "easeInOut",
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    })
})