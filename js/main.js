$(document).ready(function () {
  const hotelSlider = new Swiper(".hotel-slider", {
    // Optional parameters
    loop: true,

    // Navigation arrows
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
    // Optional parameters
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: ".reviews-slider__button--next",
      prevEl: ".reviews-slider__button--prev",
    },
    // keyboard: {
    //   enabled: true,
    //   onlyInViewport: false,
    // },
  });

  ymaps.ready(init);
  function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [7.838124988912487, 98.2988759307281],

        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 15,
      }),
      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),
      myPlacemark = new ymaps.Placemark(
        myMap.getCenter(),
        {
          hintContent: "Собственный значок метки",
          balloonContent: "This is your hotel",
        },
        {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: "default#image",
          // Своё изображение иконки метки.
          iconImageHref: "../img/map-icon.jpg",
          // Размеры метки.
          iconImageSize: [40, 40],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-23, -28],
        }
      );
    myMap.geoObjects.add(myPlacemark);
  }

  var menuButton = document.querySelector(".menu-button"); //ищем этот класс
  menuButton.addEventListener("click", function () {
    //прослушиватель событий
    document
      .querySelector(".navbar-bottom")
      .classList.toggle("navbar-bottom_visible");
  });



  var modalButton = $("[data-toggle=modal]"); //переменная - кнопка, с нее выходит модальное окно
  var closeModalButton = $(".modal__close"); //привязка перем к "крестику"
  modalButton.on("click", openModal); //при клике на кнопку выполнение ф-и openModal
  closeModalButton.on("click", closeModal); //при клике на "крестик" выполнение ф-и closeModal

  //добавляем класс visible
  function openModal() { //открыть окно - применить класс visible к нашему фону и форме
    var modalOverlay = $(".modal__overlay");
    var modalDialog = $(".modal__dialog");
     document.body.style.overflow = "hidden";
    // let scrollX = window.scrollX;
    // let scrollY = window.scrollY;
    // window.onscroll = function () {
    //   window.scrollTo(scrollX, scrollY);
    // };
    modalOverlay.addClass("modal__overlay--visible");
    modalDialog.addClass("modal__dialog--visible");
  }

  //удаляем класс visible
  function closeModal(event) { //закрыть окно - удалить класс visible
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

  $(document).mouseup(function (e) { // событие клика по веб-документу
    var div = $('.modal__dialog'); // тут указываем класс элемента
    if (!div.is(e.target) // если клик был не по нашему блоку
      && div.has(e.target).length === 0) { // и не по его дочерним элементам
      document.body.style.overflow = "auto";
      var modalDialog = $(".modal__dialog");
      modalDialog.removeClass("modal__dialog--visible");
      var modalOverlay = $(".modal__overlay");
      modalOverlay.removeClass("modal__overlay--visible");
    }
  });




  // $(document) .mouseup(function (e) {
  //   var container = $(".modal__dialog");
  //   if (container.has(e.target).length === 0)
  //     var modalDialog = $(".modal__dialog");
  //   var modalOverlay = $(".modal__overlay");
  //   modalDialog.removeClass("modal__dialog--visible");
  //   modalOverlay.removeClass("modal__overlay--visible");
  // });


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
          email: "Email address must be in the format of name@domain.com",
          minlength: "Minimum value 4 characters",
        },
        phone: {
          required: "You need to specify phone",
          minlength: "Phone at least 10 digits",
        },
        //
      },
    });
  })

  $(".search").each(function () {
    $(this).validate({
      errorClass: "invalid-searches",
      messages: {
        search: {
          required: "Enter your request",
        },
      },
    });

  })

    $(".subscribe").each(function () {
      $(this).validate({
        errorClass: "invalid-subscribe",
        messages: {
          email: {
            required: "Enter your email",
            minlength: "Minimum value 4 characters",
            email:
              "Email address must be in the format of name@domain.com",
          },
        },
      });
    });
  
  $(document).ready(function () {
    $("input[type='tel']").mask('+7 (999) 999-99-99');
  });
  
  AOS.init();


  document.body.classList.add("article");

});

