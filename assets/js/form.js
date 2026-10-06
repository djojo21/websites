/**
 * DRZ Studio – Kontaktformular
 * Prüft die Eingaben im Browser und zeigt verständliche Fehlermeldungen.
 * Hinweis: Es gibt (noch) kein Backend – die Daten werden nicht versendet.
 */
(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  if (!form) return;

  var success = document.getElementById("form-success");
  var packageSelect = form.elements.paket;
  var submitted = false;

  /* Paket aus der URL vorauswählen, z. B. kontakt.html?paket=business ---- */
  var params = new URLSearchParams(window.location.search);
  var preset = params.get("paket");
  if (preset && packageSelect.querySelector('option[value="' + CSS.escape(preset) + '"]')) {
    packageSelect.value = preset;
  }

  /* Prüfregeln ------------------------------------------------------------ */
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var phonePattern = /^\+?[0-9\s()\/-]{6,}$/;

  var rules = {
    name: function (value) {
      if (!value) return "Bitte gib deinen Namen an.";
      if (value.length < 2) return "Der Name ist etwas kurz – bitte prüfen.";
      return "";
    },
    email: function (value) {
      if (!value) return "Bitte gib deine E-Mail-Adresse an.";
      if (!emailPattern.test(value)) return "Bitte gib eine gültige E-Mail-Adresse an, z. B. name@firma.de.";
      return "";
    },
    telefon: function (value) {
      if (value && !phonePattern.test(value)) return "Bitte nur Ziffern, Leerzeichen und + ( ) / - verwenden.";
      return "";
    },
    unternehmen: function (value) {
      if (!value) return "Bitte gib den Namen deines Unternehmens an.";
      return "";
    },
    paket: function (value) {
      if (!value) return "Bitte wähle ein Paket aus – oder „Noch unsicher“.";
      return "";
    },
    nachricht: function (value) {
      if (!value) return "Bitte schreib mir kurz, worum es geht.";
      if (value.length < 10) return "Bitte beschreibe dein Anliegen in ein paar Worten mehr.";
      return "";
    },
    datenschutz: function (value, field) {
      if (!field.checked) return "Bitte bestätige die Datenschutzerklärung.";
      return "";
    }
  };

  function validateField(field) {
    var rule = rules[field.name];
    if (!rule) return true;

    var message = rule(field.value.trim(), field);
    var wrapper = field.closest(".field");
    var error = wrapper.querySelector(".field__error");

    wrapper.classList.toggle("has-error", Boolean(message));
    field.setAttribute("aria-invalid", message ? "true" : "false");
    error.textContent = message;

    return !message;
  }

  /* Live-Prüfung erst nach dem ersten Absenden bzw. beim Verlassen ------ */
  Object.keys(rules).forEach(function (name) {
    var field = form.elements[name];

    field.addEventListener("blur", function () {
      if (submitted || field.value.trim()) validateField(field);
    });

    field.addEventListener(field.type === "checkbox" || field.tagName === "SELECT" ? "change" : "input", function () {
      if (submitted || field.closest(".field").classList.contains("has-error")) validateField(field);
    });
  });

  /* Absenden -------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    submitted = true;

    var firstInvalid = null;
    Object.keys(rules).forEach(function (name) {
      var field = form.elements[name];
      if (!validateField(field) && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // TODO: Hier später die Daten an ein Backend oder einen Formular-Dienst senden.

    var firstName = form.elements.name.value.trim().split(/\s+/)[0];
    success.querySelector("[data-name]").textContent = firstName;
    form.hidden = true;
    success.hidden = false;
    success.focus();
  });
})();
