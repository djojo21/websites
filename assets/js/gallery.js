/**
 * DRZ Studio – Lightbox für die Referenzen-Galerie
 * Öffnet ein Projekt groß in einem <dialog>, Blättern per Button oder Pfeiltasten.
 */
(function () {
  "use strict";

  var dialog = document.getElementById("lightbox");
  var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));

  if (!dialog || !triggers.length || typeof dialog.showModal !== "function") return;

  var img = dialog.querySelector(".lightbox__figure img");
  var title = dialog.querySelector(".lightbox__text h2");
  var desc = dialog.querySelector(".lightbox__text p");
  var current = 0;
  var lastTrigger = null;

  function show(index) {
    current = (index + triggers.length) % triggers.length;
    var trigger = triggers[current];
    var thumb = trigger.querySelector("img");

    img.src = thumb.getAttribute("src");
    img.alt = thumb.getAttribute("alt");
    title.textContent = trigger.getAttribute("data-title");
    desc.textContent = trigger.getAttribute("data-desc");
  }

  triggers.forEach(function (trigger, index) {
    trigger.addEventListener("click", function () {
      lastTrigger = trigger;
      show(index);
      dialog.showModal();
      document.body.classList.add("nav-open");
    });
  });

  dialog.querySelector("[data-prev]").addEventListener("click", function () {
    show(current - 1);
  });

  dialog.querySelector("[data-next]").addEventListener("click", function () {
    show(current + 1);
  });

  dialog.querySelector("[data-close]").addEventListener("click", function () {
    dialog.close();
  });

  // Klick auf den abgedunkelten Hintergrund schließt die Lightbox
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });

  dialog.addEventListener("close", function () {
    document.body.classList.remove("nav-open");
    if (lastTrigger) lastTrigger.focus();
  });
})();
