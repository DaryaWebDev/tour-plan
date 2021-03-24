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
    loop: true,

    navigation: {
      nextEl: ".reviews-slider__button--next",
      prevEl: ".reviews-slider__button--prev",
    },
  });
  
var spinner = $(".ymap-container").children(".loader");
var check_if_load = false;
var myMapTemp, myPlacemarkTemp;
function init() {
  var myMapTemp = new ymaps.Map("map-yandex", {
    center: [7.838124988912487, 98.2988759307281], 
    zoom: 15, 
    controls: ["zoomControl", "fullscreenControl"], 
  });
  var myPlacemarkTemp = new ymaps.Placemark(
    [7.838124988912487, 98.2988759307281],
    {
      balloonContent: "This is your hotel",
    },

  );
  myMapTemp.geoObjects.add(myPlacemarkTemp);
  var layer = myMapTemp.layers.get(0).get(0);
  waitForTilesLoad(layer).then(function () {
    spinner.removeClass("is-active");
  });
  }
  
  function waitForTilesLoad(layer) {
    return new ymaps.vow.Promise(function (resolve, reject) {
      var tc = getTileContainer(layer),
        readyAll = true;
      tc.tiles.each(function (tile, number) {
        if (!tile.isReady()) {
          readyAll = false;
        }
      });
      if (readyAll) {
        resolve();
      } else {
        tc.events.once("ready", function () {
          resolve();
        });
      }
    });
  }

  function getTileContainer(layer) {
    for (var k in layer) {
      if (layer.hasOwnProperty(k)) {
        if (
          layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer ||
          layer[k] instanceof ymaps.layer.tileContainer.DomContainer
        ) {
          return layer[k];
        }
      }
    }
    return null;
  }

  function loadScript(url, callback) {
    var script = document.createElement("script");

    if (script.readyState) {
      // IE
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      // Другие браузеры
      script.onload = function () {
        callback();
      };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }
  var ymap = function () {
    $(".ymap-container").mouseenter(function () {
      if (!check_if_load) {
        // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем
        // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
        check_if_load = true;
        // Показываем индикатор загрузки до тех пор, пока карта не загрузится
        spinner.addClass("is-active");
        // Загружаем API Яндекс.Карт
        loadScript(
          "https://api-maps.yandex.ru/2.1/?apikey=f26e2619-7999-4e0a-8c09-90208062f8da&lang=ru_RU",
          function () {
            // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
            ymaps.load(init);
          }
        );
      }
    });
  };
  $(function () {
    //Запускаем основную функцию
    ymap();
  });
  var menuButton = document.querySelector(".menu-button"); //ищем этот класс
  menuButton.addEventListener("click", function () {
    document
      .querySelector(".navbar-bottom")
      .classList.toggle("navbar-bottom_visible");
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
          email: "Email address must be in the format of name@domain.com",
        },
      },
    });
  });

  $(document).ready(function () {
    $("input[type='tel']").mask("+7 (999) 999-99-99");
  });

  AOS.init();
});