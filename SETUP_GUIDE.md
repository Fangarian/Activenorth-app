# Activenorth — Komplett oppsettguide

Denne guiden tar deg fra null til et fungerende system. Ingen teknisk erfaring nødvendig. Følg hvert steg i rekkefølge og ikke hopp over noe.

---

## Oversikt — hva du skal gjøre

| Steg | Hva | Tid |
|------|-----|-----|
| 1 | Opprette Supabase-konto (database) | ~10 min |
| 2 | Sette opp databasen | ~5 min |
| 3 | Hente API-nøkler | ~3 min |
| 4 | Redigere filene på din PC | ~10 min |
| 5 | Opprette GitHub-konto og laste opp filer | ~10 min |
| 6 | Opprette Vercel-konto og publisere appen | ~10 min |
| 7 | Teste at alt fungerer | ~5 min |
| 8 | Laste opp første waiver-tekst | ~5 min |
| 9 | Lage QR-kode | ~5 min |
| 10 | Daglig bruk for personalet | Referanse |

---

## Steg 1 — Opprette Supabase-konto

Supabase er databasen der alle gjesteopplysninger lagres. Det er gratis å bruke.

1. Åpne nettleseren din (Chrome, Edge, Firefox — det spiller ingen rolle)
2. Gå til **supabase.com**
3. Klikk på den grønne knappen **"Start your project"**
4. Du ser en påloggingsside. Klikk **"Sign Up"** for å lage en ny konto
5. Skriv inn e-postadressen din og velg et passord
6. Klikk **"Sign Up"**
7. Åpne e-posten din — du har fått en e-post fra Supabase. Klikk på lenken i e-posten for å bekrefte kontoen
8. Du blir sendt tilbake til Supabase og er nå innlogget

**Nå skal du opprette et prosjekt:**

9. Klikk på den grønne knappen **"New project"**
10. Du ser et skjema. Fyll inn slik:
    - **Name:** Skriv `activenorth`
    - **Database Password:** Velg et sterkt passord (f.eks. `Activenorth#DB2024`). **Skriv det ned et sted — du trenger det ikke ofte, men det er lurt å ha det.**
    - **Region:** Klikk på nedtrekksmenyen og velg **"EU (Frankfurt)"** — dette er nærmest Norge
11. Klikk på den grønne knappen **"Create new project"**
12. Du ser en grønn lasteskjerm med teksten "Setting up your project". **Vent — dette tar ca. 1–2 minutter.** Ikke lukk fanen.
13. Når lasteskjermen forsvinner og du ser et dashboard, er prosjektet klart

---

## Steg 2 — Sette opp databasen

Nå skal du kjøre et SQL-skript som oppretter alle tabellene appen trenger.

1. I Supabase, se på menyen til venstre. Klikk på **"SQL Editor"** (det ser ut som en terminal/skjerm-ikon)
2. Du ser en side med en stor tekstboks. Klikk på knappen **"+ New query"** øverst til venstre
3. En tom tekstboks åpnes
4. Nå må du åpne filen `SUPABASE_SETUP.md` på din PC:
    - Gå til mappen `C:\Users\Vegar\OneDrive\Desktop\ClaudeCode\`
    - Høyreklikk på filen `SUPABASE_SETUP.md`
    - Velg **"Åpne med"** → **"Notisblokk"** (eller Notepad)
5. I Notepad, trykk **Ctrl+A** for å markere all teksten, deretter **Ctrl+C** for å kopiere
6. Gå tilbake til Supabase i nettleseren
7. Klikk inne i den tomme tekstboksen i SQL Editor
8. Trykk **Ctrl+A** for å markere eventuell tekst, deretter **Ctrl+V** for å lime inn
9. Klikk på den grønne **"Run"**-knappen (eller trykk **Ctrl+Enter**)
10. Under tekstboksen skal det stå **"Success. No rows returned"** — da har det gått bra

> **Hvis du ser en rød feilmelding:** Sjekk at du kopierte all teksten fra SUPABASE_SETUP.md. Prøv å markere alt (Ctrl+A) i SQL Editor og lime inn på nytt.

---

## Steg 3 — Hente API-nøkler

API-nøklene er som "passord" som lar appen snakke med databasen. Du trenger to nøkler.

1. I Supabase, se på menyen til venstre. Scroll helt ned til bunnen og klikk på **tannhjul-ikonet** (Project Settings)
2. En ny meny åpner seg til venstre. Klikk på **"API"**
3. Du ser siden "Project API keys". Her er det to ting du trenger:

**Nøkkel 1 — Project URL:**
4. Under overskriften **"Project URL"** ser du en adresse som starter med `https://` og slutter på `.supabase.co`
5. Klikk på **kopier-ikonet** til høyre for adressen (to overlappende firkanter)
6. Åpne Notisblokk (søk etter "Notisblokk" i Windows-søkefeltet)
7. Lim inn med **Ctrl+V**. Det skal se omtrent slik ut: `https://abcdefghijk.supabase.co`
8. Skriv foran: `URL: ` — så du vet hva det er

**Nøkkel 2 — Anon public key:**
9. Scroll ned litt på Supabase-siden til du ser **"Project API keys"**
10. Du ser en rad som heter **"anon" / "public"**
11. Under kolonnen "API key" ser du en lang rekke med bokstaver og tall som starter med `eyJ`
12. Klikk på **kopier-ikonet** til høyre
13. Gå til Notisblokk og lim inn på en ny linje med **Ctrl+V**
14. Skriv foran: `ANON KEY: ` — så du vet hva det er

**Lagre Notisblokk-filen** (Ctrl+S) et sted du finner den igjen, f.eks. på Skrivebordet med navn `supabase_keys.txt`.

> **Pass på:** Disse nøklene er sensitive. Del dem ikke offentlig.

---

## Steg 4 — Redigere filene på din PC

Nå skal du lime API-nøklene inn i de to HTML-filene. Du gjør dette i Notisblokk.

### 4a — Redigere guest.html

1. Gå til mappen `C:\Users\Vegar\OneDrive\Desktop\ClaudeCode\`
2. Høyreklikk på **`guest.html`**
3. Velg **"Åpne med"** → **"Notisblokk"**
4. Trykk **Ctrl+H** — dette åpner vinduet "Søk og erstatt"
5. Du ser to felt: "Søk etter" og "Erstatt med"

**Bytt ut URL:**
6. I feltet **"Søk etter"**: skriv `YOUR_SUPABASE_URL`
7. I feltet **"Erstatt med"**: lim inn din Project URL (kopier den fra `supabase_keys.txt`)
8. Klikk **"Erstatt alle"**
9. Det skal stå noe sånt som "1 erstatning utført"

**Bytt ut ANON KEY:**
10. Slett teksten i feltet **"Søk etter"** og skriv: `YOUR_SUPABASE_ANON_KEY`
11. Slett teksten i feltet **"Erstatt med"** og lim inn din Anon public key
12. Klikk **"Erstatt alle"**
13. Klikk **"Avbryt"** for å lukke søk-og-erstatt-vinduet
14. Trykk **Ctrl+S** for å lagre filen

### 4b — Redigere staff.html

1. Gå tilbake til mappen `C:\Users\Vegar\OneDrive\Desktop\ClaudeCode\`
2. Høyreklikk på **`staff.html`**
3. Velg **"Åpne med"** → **"Notisblokk"**
4. Trykk **Ctrl+H** for å åpne søk og erstatt

**Bytt ut URL:**
5. **"Søk etter"**: `YOUR_SUPABASE_URL`
6. **"Erstatt med"**: lim inn din Project URL
7. Klikk **"Erstatt alle"**

**Bytt ut ANON KEY:**
8. **"Søk etter"**: `YOUR_SUPABASE_ANON_KEY`
9. **"Erstatt med"**: lim inn din Anon public key
10. Klikk **"Erstatt alle"**
11. Klikk **"Avbryt"**
12. Trykk **Ctrl+S** for å lagre filen

> **Passordene i staff.html er allerede satt til `Activenorth2024` for begge brukere.** Hvis du vil bytte dem senere, bruker du samme fremgangsmåte: søk etter det gamle passordet og erstatt med det nye.

---

## Steg 5 — Opprette GitHub-konto og laste opp filer

GitHub er stedet der filene lagres og hvorfra appen publiseres.

### 5a — Opprette konto

1. Åpne en ny fane i nettleseren og gå til **github.com**
2. Klikk på **"Sign up"** øverst til høyre
3. Skriv inn e-postadressen din
4. Velg et passord
5. Velg et brukernavn (f.eks. `activenorth` eller ditt eget navn)
6. Følg instruksjonene på skjermen (det kan hende du må løse en liten "bekreft at du er menneske"-oppgave)
7. Klikk **"Create account"**
8. GitHub sender en e-post med en kode — skriv inn koden på GitHub-siden

### 5b — Opprette et repository (mappe på GitHub)

9. Når du er innlogget, klikk på det **+**-ikonet øverst til høyre (ved siden av profilbildet ditt)
10. Velg **"New repository"** fra nedtrekksmenyen
11. Fyll inn skjemaet slik:
    - **Repository name:** Skriv `activenorth-app`
    - **Description:** Kan stå tomt
    - **Public / Private:** Velg **Public** (dette er nødvendig for gratis hosting på Vercel)
    - La resten stå som det er (ikke huk av noen bokser)
12. Klikk på den grønne knappen **"Create repository"**
13. Du ser en side med en del tekst og kommandoer — **ignorer alt dette**. Se etter lenken som sier **"uploading an existing file"** (litt ned på siden, etter teksten "or"). Klikk på den.

### 5c — Laste opp filer

14. Du ser en side med et stort opplastingsområde og teksten "Drag files here to add them to your repository"
15. Åpne Filutforsker (Windows-tasten + E) og gå til mappen `C:\Users\Vegar\OneDrive\Desktop\ClaudeCode\`
16. Velg disse 5 filene (hold inne **Ctrl** mens du klikker for å velge flere):
    - `guest.html`
    - `staff.html`
    - `vercel.json`
    - `SUPABASE_SETUP.md`
    - `SETUP_GUIDE.md`
17. Dra og slipp de 5 filene inn i opplastingsområdet på GitHub
18. Vent til alle filene vises i listen (det kan ta noen sekunder)
19. Scroll ned til du ser **"Commit changes"**
20. I det første tekstfeltet (under "Commit changes") kan du skrive `Første opplasting` — eller la det stå som det er
21. Klikk på den grønne knappen **"Commit changes"**
22. Du ser nå filene dine i GitHub-repositoryet

---

## Steg 6 — Opprette Vercel-konto og publisere appen

Vercel gjør filene om til en faktisk nettside som er tilgjengelig på internett.

### 6a — Opprette konto

1. Gå til **vercel.com** i nettleseren
2. Klikk på **"Sign Up"**
3. Velg **"Continue with GitHub"** — dette kobler Vercel direkte til GitHub-kontoen din
4. GitHub ber deg om å bekrefte — klikk **"Authorize Vercel"**
5. Du er nå inne på Vercel-dashboardet

### 6b — Importere og publisere prosjektet

6. Klikk på knappen **"Add New…"** øverst til høyre
7. Velg **"Project"** fra menyen
8. Du ser en liste over dine GitHub-repositories. Finn **`activenorth-app`** og klikk på **"Import"** til høyre for det
9. Du ser en side med overskriften "Configure Project"
10. **La alle innstillinger stå som de er** — ikke endre noe
11. Klikk på den svarte/mørke knappen **"Deploy"**
12. Vercel jobber nå — du ser animasjoner og loggtekst. **Vent ca. 1 minutt.**
13. Når du ser konfettianimasjon og teksten "Congratulations!" — da er appen live!
14. Du ser din app-URL, f.eks. `https://activenorth-app.vercel.app`
    - Klikk på **"Visit"** eller URL-en for å åpne appen

**Dine to sider er nå:**
- Gjestesigneringsside: `https://activenorth-app.vercel.app/sign`
- Personaldashboard: `https://activenorth-app.vercel.app/staff`

> **Skriv ned URL-en din** — du trenger den i stegene under.

---

## Steg 7 — Teste at alt fungerer

### Test personalinnlogging

1. Gå til `https://din-app.vercel.app/staff` (bruk din faktiske URL)
2. Du ser innloggingssiden med Activenorth-logo
3. Logg inn med:
    - **Brukernavn:** `admin`
    - **Passord:** `Activenorth2024`
4. Klikk **"Log in"**
5. Du skal nå se dashboardet med 4 faner: Camp View, Plan a Day, Archive, Waiver Manager
6. Klikk på **"Plan a Day"** — du skal se 8 grupper (Dogsledding Day 1 osv.)
7. Klikk på **"Log out"** øverst til høyre, og test deretter med:
    - **Brukernavn:** `camp`
    - **Passord:** `Activenorth2024`
8. Du skal se Camp View, men ikke de andre fanene — det er riktig

### Test gjestesigneringsside

9. Gå til `https://din-app.vercel.app/sign`
10. Du skal se en mobilside med Activenorth-logo og en "Laster erklæring..."-melding
11. Siden kan vise en feilmelding om at ingen aktiv waiver er funnet — **det er normalt nå**, du laster opp waiveren i neste steg

---

## Steg 8 — Laste opp første waiver-tekst

Waiveren er erklæringsteksten gjestene leser og signerer. Du må laste opp minst én versjon før gjester kan signere.

1. Gå til `https://din-app.vercel.app/staff`
2. Logg inn som **admin** (`Activenorth2024`)
3. Klikk på fanen **"Waiver Manager"**
4. Du ser seksjonen **"Upload new version"**
5. I feltet **"Version number"**: skriv `1.0`
6. I den store tekstboksen **"Content (HTML)"**: lim inn erklæringsteksten din

**Formattering av waiver-teksten:**  
Teksten må være i HTML-format. Har du teksten som vanlig tekst, kan du formatere den enkelt slik:
- Hvert avsnitt: `<p>Teksten din her.</p>`
- Overskrift: `<h3>Overskrift</h3>`
- Fet tekst: `<strong>dette er fet</strong>`

Eksempel:
```
<h3>Erklæring om deltakelse</h3>
<p>Jeg bekrefter at jeg er innforstått med at aktiviteten innebærer risiko...</p>
<p>Jeg erklærer at jeg er i god fysisk form og...</p>
```

7. Når du har limt inn teksten, klikk på den grønne knappen **"Upload and Activate"**
8. Det dukker opp en bekreftelsesdialog — klikk **"OK"**
9. Du skal se en grønn melding: "Version 1.0 uploaded and activated"
10. Under "Active version" skal det nå stå "1.0"

**Test gjestesiden på nytt:**
11. Gå til `https://din-app.vercel.app/sign`
12. Nå skal erklæringsteksten din vises i trinn 1

---

## Steg 9 — Lage QR-kode

Gjestene skanner en QR-kode på bussen for å komme til signeringssiden.

1. Gå til **qrcode-monkey.com**
2. I feltet som heter **"Your URL"**: lim inn adressen til gjestesiden: `https://din-app.vercel.app/sign`
3. Klikk evt. på **"Colors"** for å endre farger:
    - Sett "Dots color" til `#1D9E75` (grønn Activenorth-farge)
    - La bakgrunnen være hvit
4. Klikk på **"Create QR Code"**
5. Klikk på **"Download PNG"**
6. Filen lastes ned til datamaskinen din (vanligvis i "Nedlastinger"-mappen)
7. Skriv ut QR-koden (anbefalt: A5-størrelse eller større)
8. Laminer gjerne utskriften for holdbarhet
9. Plasser en QR-kode ved inngangsdøren til bussen, eller foran på hver seterad

---

## Steg 10 — Daglig arbeidsflyt for personalet

### Kvelden før en tur (admin gjør dette)

1. Gå til `https://din-app.vercel.app/staff`
2. Logg inn som **admin**
3. Klikk på fanen **"Plan a Day"**
4. Datoen er satt til i morgen som standard — sjekk at det er riktig dato
5. Du ser 8 kort, ett for hver gruppe
6. I hvert kort: skriv inn forventet antall gjester i tallfeltet
    - Eksempel: hvis du forventer 8 gjester på Dogsledding Day 1, skriv `8`
    - La feltet stå tomt (eller skriv `0`) for grupper som ikke kjører denne dagen
7. Klikk på **"Save All"** øverst eller nederst
8. Du ser en grønn bekreftelse: "Saved"

### På dagen — camp-personalet (fra leiren)

1. Gå til `https://din-app.vercel.app/staff`
2. Logg inn som **camp** (`Activenorth2024`)
3. Du ser direkte **Camp View** med dagens dato
4. De to bussbannerne øverst viser status:
    - **Grønn banner**: Alle gjester har signert — ingen tiltak nødvendig
    - **Oransje banner**: Noen gjester mangler signatur — følg opp når bussen ankommer
    - **Grå banner**: Ingen forventet antall er satt for denne bussen
5. Siden oppdateres automatisk hvert 12. sekund — du trenger ikke laste inn på nytt

**Registrere no-shows (gjester som ikke møtte opp):**
6. Klikk på **"+ Register No-Shows"** øverst
7. Velg hvilken gruppe det gjelder
8. Skriv inn antall som ikke møtte
9. Skriv gjerne inn navnene (valgfritt)
10. Klikk **"Save"**

**Se detaljert gjesteinfo:**
- Klikk på et gjestenavn i gruppekortene for å se fullt navn, kontaktinfo, nasjonalitet og signaturbilde

### Se historikk og eksportere data (admin)

1. Logg inn som **admin**
2. Klikk på fanen **"Archive"**
3. Velg datoen du vil se
4. Du ser alle grupper med signaturer og no-shows for den dagen
5. Klikk **"Export CSV"** for å laste ned en Excel-kompatibel fil med alle opplysninger

---

## Roller og tilgang

| Brukernavn | Passord | Tilgang |
|-----------|---------|---------|
| `admin` | `Activenorth2024` | Alle faner: Camp View, Plan a Day, Archive, Waiver Manager |
| `camp` | `Activenorth2024` | Kun Camp View |

---

## Ofte stilte spørsmål

**Gjestene kommer til signeringssiden men ser en feilmelding**
- Sjekk at du har lastet opp en aktiv waiver i Waiver Manager
- Sjekk at du byttet ut `YOUR_SUPABASE_URL` og `YOUR_SUPABASE_ANON_KEY` i `guest.html`
- Hvis du endret filene, last dem opp til GitHub på nytt (Vercel oppdaterer automatisk)

**Personaldashbordet viser ingen data**
- Sjekk at du byttet ut nøklene i `staff.html`
- Sjekk at du kjørte SQL-skriptet i Supabase

**Feil passord / glemt passord**
- Åpne `staff.html` i Notisblokk, finn `CHANGE_ME_ADMIN` eller `Activenorth2024` og bytt det ut med nytt passord
- Last filen opp til GitHub på nytt (Vercel oppdaterer automatisk innen 1 minutt)

**Vil oppdatere waiver-teksten**
- Logg inn som admin → Waiver Manager → last opp ny versjon med nytt versjonsnummer (f.eks. `1.1`) → klikk Activate
- Gamle signaturer beholder sin gamle versjon — dette er med vilje

**Vil laste opp oppdaterte filer til GitHub**
1. Gå til github.com og logg inn
2. Klikk på repositoryet `activenorth-app`
3. Klikk på filen du vil oppdatere
4. Klikk på **blyant-ikonet** (Edit)
5. Eller: dra og slipp den nye filen inn i filutforskeren på GitHub-siden — den spør om du vil overskrive
6. Klikk **"Commit changes"**
7. Vercel oppdaterer automatisk innen ca. 1 minutt

---

## Oppsummering av lenker

Etter at du er ferdig med oppsettet, har du disse lenkene:

| Side | URL |
|------|-----|
| Gjestesignering (QR-kode) | `https://din-app.vercel.app/sign` |
| Personaldashboard | `https://din-app.vercel.app/staff` |
| Supabase (database) | `https://supabase.com` |
| GitHub (filer) | `https://github.com/ditt-brukernavn/activenorth-app` |
| Vercel (hosting) | `https://vercel.com` |
