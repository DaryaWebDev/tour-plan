$(document).ready(function () {
  const hotelSlider = new Swiper(".hotel-slider", {
    loop: true,

    navigation: {
      nextEl: ".hotel-slider__button--next",
      prevEl: ".hotel-slider__button--prev",
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
  });

  const reviewsSlider = new Swiper(".reviews-slider", {
    loop: true, autoHeight: true,

    navigation: {
      nextEl: ".reviews-slider__button--next",
      prevEl: ".reviews-slider__button--prev",
    },
  });



  var menuButton = document.querySelector(".menu-button"); //ищем этот класс
  menuButton.addEventListener("click", function () {
    document
      .querySelector(".navbar-bottom")
      .classList.toggle("navbar-bottom_visible");
      body.classList.toggle("no-scroll");
  });

  var modalButton = $("[data-toggle=modal]"); //переменная - кнопка, с нее выходит модальное окно
  var closeModalButton = $(".modal__close"); //привязка перем к "крестику"
  modalButton.on("click", openModal); //при клике на кнопку выполнение ф-и openModal
  closeModalButton.on("click", closeModal); //при клике на "крестик" выполнение ф-и closeModal

  //добавляем класс visible
  function openModal() {
    //открыть окно - применить класс visible к нашему фону и форме
    var modalOverlay = $(".modal__overlay");
    var modalDialog = $(".modal__dialog");
    document.body.style.overflow = "hidden";
    modalOverlay.addClass("modal__overlay--visible");
    modalDialog.addClass("modal__dialog--visible");
  }

  //удаляем класс visible
  function closeModal(event) {
    //закрыть окно - удалить класс visible
    event.preventDefault();
    var modalOverlay = $(".modal__overlay");
    var modalDialog = $(".modal__dialog");
    document.body.style.overflow = "auto";
    modalOverlay.removeClass("modal__overlay--visible");
    modalDialog.removeClass("modal__dialog--visible");
  }

  //закрытие окна кнопкой esc
  $(document).on("keydown", function (e) {
    if (e.keyCode == 27) var modalOverlay = $(".modal__overlay");
    var modalDialog = $(".modal__dialog");
    document.body.style.overflow = "auto";
    modalOverlay.removeClass("modal__overlay--visible");
    modalDialog.removeClass("modal__dialog--visible");
  });

  $(document).mouseup(function (e) {
    // событие клика по веб-документу
    var div = $(".modal__dialog"); // тут указываем класс элемента
    if (
      !div.is(e.target) && // если клик был не по нашему блоку
      div.has(e.target).length === 0
    ) {
      // и не по его дочерним элементам
      document.body.style.overflow = "auto";
      var modalDialog = $(".modal__dialog");
      modalDialog.removeClass("modal__dialog--visible");
      var modalOverlay = $(".modal__overlay");
      modalOverlay.removeClass("modal__overlay--visible");
    }
  });

  //Обработка форм
  $(".form").each(function () {
    $(this).validate({
      errorClass: "invalid",
      messages: {
        name: {
          required: "Please specify your name",
          minlength: "Name consists of at least 2 letters",
          maxlength: "Maximum length 25 letters",
        },
        email: {
          required: "We need your email address to contact you",
          email: "Use this format: name@domain.com",
          minlength: "Minimum value 4 characters",
        },
        phone: {
          required: "You need to specify phone",
          minlength: "Phone at least 10 digits",
        },
      },
    });
  });

  $(".search").each(function () {
    $(this).validate({
      errorClass: "invalid-searches",
      messages: {
        search: {
          required: "Enter your request",
        },
      },
    });
  });

  $(".subscribe").each(function () {
    $(this).validate({
      errorClass: "invalid-subscribe",
      messages: {
        email: {
          required: "Enter your email",
          minlength: "Minimum value 4 characters",
          email: "Use this format: name@domain.com",
        },
      },
    });
  });

  $(document).ready(function () {
    $("input[type='tel']").mask("+7 (999) 999-99-99");
  });

  AOS.init();
});