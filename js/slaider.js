let images = [
    {
      url: "../images/60%discount.png",
    },
    {
      url: "../images/top10.png",
    },
    {
      url: "../images/checkout.png",
    },
  ];

  function initSlider(options) {
    if (!images || !images.length) return;
  
    options = options || {
      dots: true,
      links: true,
      info: true,
      autoplay: true
    };
  
    let sliderImages = document.querySelector(".slaider__images");
    let sliderArrows = document.querySelector(".slaider__arrows");
    let sliderDots = document.querySelector(".slaider__dots");
  
    initImages();
    initArrows();
  
    if (options.dots) {
      initDots();
    }

    if (options.autoplay) {
      initAutoplay();
    }
  
    function initImages() {
      images.forEach((image, index) => {
        let imageDiv = `<div class="image n${index} ${
          index === 0 ? "active" : ""
        }" style="background-image:url(${
          images[index].url
        });" data-index="${index}"></div>`;
        sliderImages.innerHTML += imageDiv;
      });
    }
  
    function initArrows() {
      sliderArrows.querySelectorAll(".slaider__arrow").forEach((arrow) => {
        arrow.addEventListener("click", function () {
          let curNumber = +sliderImages.querySelector(".active").dataset.index;
          let nextNumber;
          if (arrow.classList.contains("left")) {
            nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
          } else {
            nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
          }
          moveSlider(nextNumber);
        });
      });
    }
  
    function initDots() {
      images.forEach((image, index) => {
        let dot = `<div class="slaider__dots-item n${index} ${
          index === 0 ? "active" : ""
        }" data-index="${index}"></div>`;
        sliderDots.innerHTML += dot;
      });
      sliderDots.querySelectorAll(".slaider__dots-item").forEach((dot) => {
        dot.addEventListener("click", function () {
          moveSlider(this.dataset.index);
        });
      });
    }
  
    function moveSlider(num) {
      sliderImages.querySelector(".active").classList.remove("active");
      sliderImages.querySelector(".n" + num).classList.add("active");
      if (options.dots) {
        sliderDots.querySelector(".active").classList.remove("active");
        sliderDots.querySelector(".n" + num).classList.add("active");
      }
    }
  
    function initAutoplay() {
      setInterval(() => {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
        moveSlider(nextNumber);
      }, options.autoplayInterval);
    }
  }
  
  let sliderOptions = {
    dots: true,
    info: true,
    links: true,
    autoplay: true,
    autoplayInterval: 5000,
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    initSlider(sliderOptions);
  });
  