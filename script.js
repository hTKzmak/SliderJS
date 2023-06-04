let thumb = document.querySelector(".thumb")
let slider = document.querySelector("#slider");
let value = document.querySelector(".value");

thumb.onmousedown = function (event) {
    event.preventDefault();

    var shiftX = event.clientX - thumb.getBoundingClientRect().left;

    document.addEventListener("mousemove", moveThumb);
    document.addEventListener("mouseup", stopMoveThumb);

    function moveThumb(event) {
        var sliderCoords = slider.getBoundingClientRect();
        var newLeft = event.clientX - shiftX - sliderCoords.left;

        if (newLeft < 0) {
            newLeft = 0;
        }
        else if (newLeft > slider.offsetWidth - thumb.offsetWidth) {
            newLeft = slider.offsetWidth - thumb.offsetWidth;
        }

        thumb.style.left = newLeft + "px";
        slider.value = Math.round(newLeft / (slider.offsetWidth - thumb.offsetWidth) * 100);
        slider.dispatchEvent(new Event("input"));
        value.textContent = slider.value;
    }

    function stopMoveThumb() {
        document.removeEventListener("mousemove", moveThumb);
        document.removeEventListener("mouseup", stopMoveThumb);
    }
}

// Добавляем обработчик события input для обновления значения слайдера
slider.oninput = function () {
    var newLeft = (slider.value / 100) * (slider.offsetWidth - thumb.offsetWidth);
    thumb.style.left = newLeft + "px";
    value.textContent = slider.value;
} 