# DRZ Studio – Website

Website für **DRZ Studio** (Inhaber: Jonas Drzyzga) – Websites für kleine Unternehmen im Monats-Abo.
Reines HTML, CSS und JavaScript, ohne Framework und ohne Build-Schritt.

## Seiten

| Datei              | Inhalt                                                          |
| ------------------ | --------------------------------------------------------------- |
| `index.html`       | Startseite: Hero, Ablauf, Vorteile, Referenzen- & Preis-Teaser  |
| `referenzen.html`  | Galerie mit 6 Beispielprojekten inkl. Lightbox                  |
| `preise.html`      | Pakete Start / Business / Premium, Zusatzleistungen             |
| `kontakt.html`     | Kontaktformular mit Prüfung im Browser                          |
| `impressum.html`   | Platzhalter („Text folgt“)                                      |
| `datenschutz.html` | Platzhalter („Text folgt“)                                      |

## Ordnerstruktur

```
assets/
  css/style.css            Alle Styles (Farben als CSS-Variablen in :root)
  js/main.js               Burger-Menü, Header beim Scrollen, Scroll-Animationen
  js/gallery.js            Lightbox der Referenzen
  js/form.js               Prüfung des Kontaktformulars
  fonts/poppins/           Poppins (400/500/600/700) lokal, inkl. Lizenz (OFL)
  img/favicon.svg
  img/referenzen/*.svg     Mockups der Beispielprojekte
```

## Lokal ansehen

Die Seiten lassen sich direkt per Doppelklick öffnen. Für ein realistisches Verhalten
(z. B. Schriften vorladen) besser einen kleinen lokalen Server nutzen:

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

## Hinweise

- **Datenschutz:** Es werden keine externen Ressourcen geladen (keine CDNs, kein Google Fonts).
- **Kontaktformular:** Die Eingaben werden nur im Browser geprüft und **nicht versendet**.
  Zum Anbinden eines Backends oder Formular-Dienstes die Stelle mit `TODO` in
  `assets/js/form.js` anpassen.
- **Paket vorauswählen:** `kontakt.html?paket=start|business|premium|beratung`
- **Impressum & Datenschutz** müssen vor dem Livegang mit echten Texten gefüllt werden.
- Header und Footer sind in jeder HTML-Datei enthalten – Änderungen bitte in allen Seiten übernehmen.
