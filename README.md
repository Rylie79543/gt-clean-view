GT SFW Mode

Eine Browser-Erweiterung für Galactic Tycoons (GT), die ausgewählte Spielgrafiken ausblendet und dadurch eine neutralere, weniger spieltypische Darstellung ermöglicht.

Features
Blendet Ressourcen- und Material-Icons aus.
Erkennt die Icons automatisch anhand des verwendeten SVG-Sprites.
Keine manuelle Liste einzelner Ressourcen wie Water, Coal, Iron etc. erforderlich.
Funktioniert auch mit dynamisch nachgeladenen Inhalten.
Verändert nicht die Spielmechanik oder Spieldaten.
Greift nur auf die Darstellung der Webseite zu.
Funktionsweise

Galactic Tycoons verwendet SVG-Sprites für verschiedene Icons.

Beispielsweise:

Die Erweiterung erkennt Referenzen auf solche Sprite-Dateien automatisch:

/assets/sprite-*.svg#...

und blendet das zugehörige SVG-Element aus.

Dadurch müssen einzelne Ressourcen nicht explizit aufgelistet werden. Neue Ressourcen, die dasselbe Sprite-System verwenden, werden automatisch berücksichtigt.

Andere SVG-Dateien, beispielsweise UI-Elemente aus:

/assets/atlas-*.svg#sort-up

werden nicht verändert.

Installation für Entwickler
1. Repository herunterladen

Repository klonen oder als ZIP herunterladen und entpacken.

2. Chrome öffnen

In Chrome folgende Adresse öffnen:

chrome://extensions/
3. Entwicklermodus aktivieren

Oben rechts Entwicklermodus aktivieren.

4. Erweiterung laden

Auf „Entpackte Erweiterung laden“ klicken und den Projektordner auswählen.

Die Erweiterung sollte anschließend in der Liste erscheinen.

5. Galactic Tycoons öffnen

Das Spiel neu laden.

Die entsprechenden Sprite-basierten Icons sollten nun ausgeblendet werden.

Projektstruktur
gt-sfw-mode/
├── manifest.json
├── content.js
└── README.md
manifest.json

Enthält die Metadaten der Browser-Erweiterung und legt fest, auf welchen Seiten das Content Script ausgeführt wird.

content.js

Enthält die eigentliche Logik zum Erkennen und Ausblenden der Sprite-basierten Icons.

Technischer Ansatz

Die Erweiterung verwendet einen MutationObserver, damit auch Elemente erkannt werden, die nach dem initialen Laden der Seite dynamisch erzeugt werden.

Vereinfacht funktioniert die Erkennung so:

<use href="/assets/sprite-XYZ.svg#Water">
                  │
                  └── Sprite erkannt
                           │
                           ▼
                    zugehöriges SVG
                           │
                           ▼
                       ausblenden

Dabei werden nur Referenzen auf sprite-*.svg berücksichtigt.

Datenschutz

Die Erweiterung:

sammelt keine personenbezogenen Daten,
überträgt keine Daten an externe Server,
verändert keine Spieldaten,
benötigt keine Kommunikation mit einem Backend,
arbeitet ausschließlich lokal im Browser.
Einschränkungen

Die Erweiterung ist auf die aktuelle HTML-/SVG-Struktur von Galactic Tycoons angewiesen.

Sollte das Spiel seine Darstellung oder die Benennung der Sprite-Dateien ändern, kann es notwendig sein, die Erkennung anzupassen.

Hinweis

GT SFW Mode ist ein inoffizielles Community-Projekt und steht nicht in Verbindung mit den Entwicklern oder Betreibern von Galactic Tycoons.
