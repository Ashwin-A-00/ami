/* =====================================================================
   Ami · i18n  —  picks the brochure language from the user's system
   ===================================================================== */
(() => {
  /* ---------- Cell 1: detect browser language + resolved locale ---------- */
  // Gets the user's primary language preference (e.g., "nl-NL", "en-US")
  const browserLang = navigator.language;

  // Gets the active locale from the internationalization engine
  const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;

  console.log("Browser Language:", browserLang);
  console.log("Resolved Locale:", systemLocale);

  /* ---------- Cell 2: translations (brand names Ami / allNow stay untranslated) ---------- */
  const LANGS = {
    en: { name: "English", dir: "ltr", t: {
      doc_title: "Ami · Product introduction",
      n1: "Overview", n2: "Expressions", n3: "Ask Ami", n4: "Brand", n5: "Files",
      eyebrow: "Product introduction",
      tagline: "Your digital service desk colleague",
      p1: "Always on", p2: "Every language", p3: "Human first",
      hint: "Move your mouse, hover or click Ami",
      cta: "Try Ami",
      lang_label: "Language", loc_showing: "Showing in", loc_browser: "Browser language", loc_resolved: "Locale",
      over_t: "What Ami does", over_s: "One friendly place to get help at work, in your own language.",
      c1t: "Ask anything", c1d: "Type a question in plain words and Ami finds the answer.",
      c2t: "Search knowledge", c2d: "Articles, how-tos and policies, searched for you.",
      c3t: "Find a service", c3d: "Request equipment, software access or travel without hunting through menus.",
      c4t: "Human first", c4d: "When a person is the better answer, Ami connects you to live support.",
      exp_t: "Expressions", exp_s: "Ami reacts to what is happening.",
      e1: "Happy · default", e2: "Wink · greeting", e3: "Joy · ticket solved",
      try_t: "Ask Ami", try_s: "Try a quick prompt or type your own.",
      greet: "Hi! I'm Ami 👋 Ask me anything.",
      q1: "Reset my password", q2: "SAP help", q3: "Travel support",
      r1: "I can start a password reset for you right now.",
      r2: "SAP help coming up. Which module is giving you trouble?",
      r3: "Let me open Travel & Expenses for you.",
      r_def: "On it! Let me search the knowledge base for that.",
      ph: "Type a message...", send: "Send",
      icons_t: "Ami icon set", icons_s: "Sizes as per the brand spec.",
      i1: "Chat logo", i2: "Bot avatar", i3: "Portal logo", i4: "Topic icon",
      brand_t: "Brand colours",
      files_t: "File deliverables", th1: "File", th2: "Size", th3: "Used for",
      u1: "Otto premium chat header", u2: "PNG fallback for the Otto chat header", u3: "Bot profile / live profile picture",
      u4: "Employee Center header", u5: "Employee Center topic tile", u6: "Employee Center home page", u7: "Employee Center topic page",
      f_date: "Edition",
      ld1: "Waking up Ami…", ld2: "Plugging in the headset…", ld3: "Learning every language…", ld4: "Ready! Hi there 👋"
    }},
    nl: { name: "Nederlands", dir: "ltr", t: {
      doc_title: "Ami · Productintroductie",
      n1: "Overzicht", n2: "Expressies", n3: "Vraag Ami", n4: "Merk", n5: "Bestanden",
      eyebrow: "Productintroductie",
      tagline: "Jouw digitale servicedesk-collega",
      p1: "Altijd beschikbaar", p2: "Elke taal", p3: "Mens eerst",
      hint: "Beweeg je muis, hover of klik op Ami",
      cta: "Probeer Ami",
      lang_label: "Taal", loc_showing: "Weergegeven in", loc_browser: "Browsertaal", loc_resolved: "Landinstelling",
      over_t: "Wat Ami doet", over_s: "Eén vriendelijke plek voor hulp op het werk, in je eigen taal.",
      c1t: "Vraag maar raak", c1d: "Typ je vraag in gewone woorden en Ami zoekt het antwoord.",
      c2t: "Zoek in kennis", c2d: "Artikelen, handleidingen en beleid, voor je doorzocht.",
      c3t: "Vind een dienst", c3d: "Vraag apparatuur, softwaretoegang of reizen aan zonder door menu's te zoeken.",
      c4t: "Mens eerst", c4d: "Is een persoon het beste antwoord, dan verbindt Ami je door met live support.",
      exp_t: "Expressies", exp_s: "Ami reageert op wat er gebeurt.",
      e1: "Blij · standaard", e2: "Knipoog · begroeting", e3: "Vreugde · ticket opgelost",
      try_t: "Vraag Ami", try_s: "Probeer een snelle vraag of typ je eigen.",
      greet: "Hoi! Ik ben Ami 👋 Vraag me maar wat.",
      q1: "Wachtwoord resetten", q2: "SAP-hulp", q3: "Reisondersteuning",
      r1: "Ik kan nu meteen een wachtwoordreset voor je starten.",
      r2: "SAP-hulp komt eraan. Welke module geeft problemen?",
      r3: "Ik open Reizen en onkosten voor je.",
      r_def: "Ik ga ermee aan de slag! Ik zoek het op in de kennisbank.",
      ph: "Typ een bericht...", send: "Verstuur",
      icons_t: "Ami-iconenset", icons_s: "Formaten volgens de merkspecificatie.",
      i1: "Chatlogo", i2: "Bot-avatar", i3: "Portallogo", i4: "Onderwerpicoon",
      brand_t: "Merkkleuren",
      files_t: "Bestanden", th1: "Bestand", th2: "Formaat", th3: "Gebruikt voor",
      u1: "Otto premium-chatkop", u2: "PNG-terugval voor de Otto-chatkop", u3: "Botprofiel- / live-profielfoto",
      u4: "Koptekst Employee Center", u5: "Onderwerptegel Employee Center", u6: "Startpagina Employee Center", u7: "Onderwerppagina Employee Center",
      f_date: "Editie",
      ld1: "Ami wordt wakker…", ld2: "Headset aansluiten…", ld3: "Elke taal leren…", ld4: "Klaar! Hallo daar 👋"
    }},
    de: { name: "Deutsch", dir: "ltr", t: {
      doc_title: "Ami · Produktvorstellung",
      n1: "Überblick", n2: "Mimik", n3: "Ami fragen", n4: "Marke", n5: "Dateien",
      eyebrow: "Produktvorstellung",
      tagline: "Dein digitaler Service-Desk-Kollege",
      p1: "Immer da", p2: "Jede Sprache", p3: "Mensch zuerst",
      hint: "Bewege die Maus, fahre darüber oder klicke auf Ami",
      cta: "Ami ausprobieren",
      lang_label: "Sprache", loc_showing: "Angezeigt in", loc_browser: "Browsersprache", loc_resolved: "Gebietsschema",
      over_t: "Was Ami kann", over_s: "Ein freundlicher Ort für Hilfe bei der Arbeit, in deiner eigenen Sprache.",
      c1t: "Frag einfach", c1d: "Stelle deine Frage in normalen Worten, Ami findet die Antwort.",
      c2t: "Wissen durchsuchen", c2d: "Artikel, Anleitungen und Richtlinien, für dich durchsucht.",
      c3t: "Service finden", c3d: "Beantrage Geräte, Softwarezugriff oder Reisen, ohne dich durch Menüs zu klicken.",
      c4t: "Mensch zuerst", c4d: "Wenn ein Mensch die bessere Antwort ist, verbindet Ami dich mit dem Live-Support.",
      exp_t: "Mimik", exp_s: "Ami reagiert auf das, was passiert.",
      e1: "Fröhlich · Standard", e2: "Zwinkern · Begrüßung", e3: "Freude · Ticket gelöst",
      try_t: "Ami fragen", try_s: "Probiere eine Schnellfrage oder tippe deine eigene.",
      greet: "Hallo! Ich bin Ami 👋 Frag mich alles.",
      q1: "Passwort zurücksetzen", q2: "SAP-Hilfe", q3: "Reiseunterstützung",
      r1: "Ich kann sofort ein Zurücksetzen deines Passworts starten.",
      r2: "SAP-Hilfe kommt. Welches Modul macht Probleme?",
      r3: "Ich öffne Reisen & Spesen für dich.",
      r_def: "Mache ich! Ich suche dazu in der Wissensdatenbank.",
      ph: "Nachricht eingeben...", send: "Senden",
      icons_t: "Ami-Icon-Set", icons_s: "Größen laut Markenspezifikation.",
      i1: "Chat-Logo", i2: "Bot-Avatar", i3: "Portal-Logo", i4: "Themen-Icon",
      brand_t: "Markenfarben",
      files_t: "Dateien", th1: "Datei", th2: "Größe", th3: "Verwendung",
      u1: "Otto-Premium-Chat-Kopfzeile", u2: "PNG-Ersatz für die Otto-Chat-Kopfzeile", u3: "Bot-Profil- / Live-Profilbild",
      u4: "Kopfzeile des Employee Center", u5: "Themenkachel im Employee Center", u6: "Startseite des Employee Center", u7: "Themenseite des Employee Center",
      f_date: "Ausgabe",
      ld1: "Ami wacht auf…", ld2: "Headset wird angeschlossen…", ld3: "Jede Sprache lernen…", ld4: "Fertig! Hallo zusammen 👋"
    }},
    fr: { name: "Français", dir: "ltr", t: {
      doc_title: "Ami · Présentation du produit",
      n1: "Aperçu", n2: "Expressions", n3: "Demander à Ami", n4: "Marque", n5: "Fichiers",
      eyebrow: "Présentation du produit",
      tagline: "Votre collègue du service desk numérique",
      p1: "Toujours disponible", p2: "Toutes les langues", p3: "L'humain d'abord",
      hint: "Bougez la souris, survolez ou cliquez sur Ami",
      cta: "Essayer Ami",
      lang_label: "Langue", loc_showing: "Affiché en", loc_browser: "Langue du navigateur", loc_resolved: "Paramètres régionaux",
      over_t: "Ce que fait Ami", over_s: "Un seul endroit convivial pour obtenir de l'aide au travail, dans votre langue.",
      c1t: "Demandez ce que vous voulez", c1d: "Posez votre question avec vos mots, Ami trouve la réponse.",
      c2t: "Chercher dans les connaissances", c2d: "Articles, guides et politiques, recherchés pour vous.",
      c3t: "Trouver un service", c3d: "Demandez du matériel, un accès logiciel ou un voyage sans fouiller dans les menus.",
      c4t: "L'humain d'abord", c4d: "Quand une personne est la meilleure réponse, Ami vous met en relation avec le support en direct.",
      exp_t: "Expressions", exp_s: "Ami réagit à ce qui se passe.",
      e1: "Content · par défaut", e2: "Clin d'œil · accueil", e3: "Joie · ticket résolu",
      try_t: "Demander à Ami", try_s: "Essayez une demande rapide ou saisissez la vôtre.",
      greet: "Salut ! Je suis Ami 👋 Posez-moi vos questions.",
      q1: "Réinitialiser mon mot de passe", q2: "Aide SAP", q3: "Aide pour les voyages",
      r1: "Je peux lancer une réinitialisation de votre mot de passe tout de suite.",
      r2: "L'aide SAP arrive. Quel module vous pose problème ?",
      r3: "J'ouvre Voyages et notes de frais pour vous.",
      r_def: "Je m'en occupe ! Je cherche dans la base de connaissances.",
      ph: "Écrivez un message...", send: "Envoyer",
      icons_t: "Jeu d'icônes Ami", icons_s: "Tailles selon la spécification de marque.",
      i1: "Logo de chat", i2: "Avatar du bot", i3: "Logo du portail", i4: "Icône de sujet",
      brand_t: "Couleurs de la marque",
      files_t: "Fichiers livrables", th1: "Fichier", th2: "Taille", th3: "Utilisation",
      u1: "En-tête du chat premium Otto", u2: "Repli PNG pour l'en-tête du chat Otto", u3: "Photo du profil du bot / profil en direct",
      u4: "En-tête d'Employee Center", u5: "Vignette de sujet d'Employee Center", u6: "Page d'accueil d'Employee Center", u7: "Page de sujet d'Employee Center",
      f_date: "Édition",
      ld1: "Ami se réveille…", ld2: "Branchement du casque…", ld3: "Apprentissage de toutes les langues…", ld4: "C'est prêt ! Salut 👋"
    }},
    es: { name: "Español", dir: "ltr", t: {
      doc_title: "Ami · Presentación del producto",
      n1: "Resumen", n2: "Expresiones", n3: "Pregunta a Ami", n4: "Marca", n5: "Archivos",
      eyebrow: "Presentación del producto",
      tagline: "Tu colega digital del service desk",
      p1: "Siempre disponible", p2: "Todos los idiomas", p3: "Las personas primero",
      hint: "Mueve el ratón, pasa el cursor o haz clic en Ami",
      cta: "Prueba a Ami",
      lang_label: "Idioma", loc_showing: "Mostrado en", loc_browser: "Idioma del navegador", loc_resolved: "Configuración regional",
      over_t: "Qué hace Ami", over_s: "Un solo lugar amable para pedir ayuda en el trabajo, en tu propio idioma.",
      c1t: "Pregunta lo que quieras", c1d: "Escribe tu pregunta con tus palabras y Ami encuentra la respuesta.",
      c2t: "Busca en el conocimiento", c2d: "Artículos, guías y políticas, buscados por ti.",
      c3t: "Encuentra un servicio", c3d: "Solicita equipos, acceso a software o viajes sin perderte en los menús.",
      c4t: "Las personas primero", c4d: "Cuando una persona es la mejor respuesta, Ami te conecta con soporte en vivo.",
      exp_t: "Expresiones", exp_s: "Ami reacciona a lo que ocurre.",
      e1: "Feliz · predeterminada", e2: "Guiño · saludo", e3: "Alegría · ticket resuelto",
      try_t: "Pregunta a Ami", try_s: "Prueba una consulta rápida o escribe la tuya.",
      greet: "¡Hola! Soy Ami 👋 Pregúntame lo que quieras.",
      q1: "Restablecer mi contraseña", q2: "Ayuda con SAP", q3: "Ayuda con viajes",
      r1: "Puedo iniciar ahora mismo el restablecimiento de tu contraseña.",
      r2: "Ayuda con SAP en camino. ¿Qué módulo te da problemas?",
      r3: "Voy a abrir Viajes y gastos para ti.",
      r_def: "¡Voy! Lo busco en la base de conocimiento.",
      ph: "Escribe un mensaje...", send: "Enviar",
      icons_t: "Conjunto de iconos de Ami", icons_s: "Tamaños según la especificación de marca.",
      i1: "Logo del chat", i2: "Avatar del bot", i3: "Logo del portal", i4: "Icono de tema",
      brand_t: "Colores de marca",
      files_t: "Archivos entregables", th1: "Archivo", th2: "Tamaño", th3: "Uso",
      u1: "Cabecera del chat premium de Otto", u2: "Alternativa PNG para la cabecera del chat de Otto", u3: "Foto del perfil del bot / perfil en vivo",
      u4: "Cabecera de Employee Center", u5: "Tarjeta de tema de Employee Center", u6: "Página de inicio de Employee Center", u7: "Página de tema de Employee Center",
      f_date: "Edición",
      ld1: "Ami se está despertando…", ld2: "Conectando los auriculares…", ld3: "Aprendiendo todos los idiomas…", ld4: "¡Listo! Hola 👋"
    }},
    it: { name: "Italiano", dir: "ltr", t: {
      doc_title: "Ami · Presentazione del prodotto",
      n1: "Panoramica", n2: "Espressioni", n3: "Chiedi ad Ami", n4: "Brand", n5: "File",
      eyebrow: "Presentazione del prodotto",
      tagline: "Il tuo collega digitale del service desk",
      p1: "Sempre disponibile", p2: "Ogni lingua", p3: "Prima le persone",
      hint: "Muovi il mouse, passa sopra o clicca su Ami",
      cta: "Prova Ami",
      lang_label: "Lingua", loc_showing: "Visualizzato in", loc_browser: "Lingua del browser", loc_resolved: "Impostazioni locali",
      over_t: "Cosa fa Ami", over_s: "Un unico posto amichevole per ricevere aiuto al lavoro, nella tua lingua.",
      c1t: "Chiedi quello che vuoi", c1d: "Scrivi la domanda con parole tue e Ami trova la risposta.",
      c2t: "Cerca nella conoscenza", c2d: "Articoli, guide e policy, cercati per te.",
      c3t: "Trova un servizio", c3d: "Richiedi dispositivi, accesso ai software o viaggi senza perderti nei menu.",
      c4t: "Prima le persone", c4d: "Quando la risposta migliore è una persona, Ami ti collega al supporto live.",
      exp_t: "Espressioni", exp_s: "Ami reagisce a ciò che succede.",
      e1: "Felice · predefinita", e2: "Occhiolino · saluto", e3: "Gioia · ticket risolto",
      try_t: "Chiedi ad Ami", try_s: "Prova una richiesta rapida o scrivi la tua.",
      greet: "Ciao! Sono Ami 👋 Chiedimi quello che vuoi.",
      q1: "Reimposta la mia password", q2: "Aiuto SAP", q3: "Supporto viaggi",
      r1: "Posso avviare subito il ripristino della tua password.",
      r2: "Arriva l'aiuto SAP. Quale modulo ti dà problemi?",
      r3: "Apro Viaggi e spese per te.",
      r_def: "Ci penso io! Cerco nella knowledge base.",
      ph: "Scrivi un messaggio...", send: "Invia",
      icons_t: "Set di icone Ami", icons_s: "Dimensioni secondo la specifica del brand.",
      i1: "Logo della chat", i2: "Avatar del bot", i3: "Logo del portale", i4: "Icona argomento",
      brand_t: "Colori del brand",
      files_t: "File consegnati", th1: "File", th2: "Dimensione", th3: "Utilizzo",
      u1: "Intestazione della chat premium di Otto", u2: "Alternativa PNG per l'intestazione della chat di Otto", u3: "Immagine del profilo del bot / profilo live",
      u4: "Intestazione di Employee Center", u5: "Riquadro argomento di Employee Center", u6: "Home page di Employee Center", u7: "Pagina argomento di Employee Center",
      f_date: "Edizione",
      ld1: "Ami si sta svegliando…", ld2: "Collego le cuffie…", ld3: "Imparo ogni lingua…", ld4: "Pronto! Ciao 👋"
    }},
    hi: { name: "हिन्दी", dir: "ltr", t: {
      doc_title: "Ami · प्रोडक्ट परिचय",
      n1: "अवलोकन", n2: "भाव", n3: "Ami से पूछें", n4: "ब्रांड", n5: "फ़ाइलें",
      eyebrow: "प्रोडक्ट परिचय",
      tagline: "आपका डिजिटल सर्विस डेस्क सहकर्मी",
      p1: "हमेशा उपलब्ध", p2: "हर भाषा", p3: "पहले इंसान",
      hint: "माउस हिलाएँ, Ami पर होवर करें या क्लिक करें",
      cta: "Ami को आज़माएँ",
      lang_label: "भाषा", loc_showing: "इस भाषा में दिख रहा है", loc_browser: "ब्राउज़र की भाषा", loc_resolved: "लोकेल",
      over_t: "Ami क्या करता है", over_s: "काम पर मदद पाने की एक दोस्ताना जगह, आपकी अपनी भाषा में।",
      c1t: "कुछ भी पूछें", c1d: "अपने शब्दों में सवाल लिखें और Ami जवाब ढूँढ देगा।",
      c2t: "जानकारी खोजें", c2d: "लेख, गाइड और नीतियाँ, आपके लिए खोजे गए।",
      c3t: "सेवा खोजें", c3d: "मेन्यू में भटके बिना उपकरण, सॉफ़्टवेयर एक्सेस या यात्रा का अनुरोध करें।",
      c4t: "पहले इंसान", c4d: "जब किसी व्यक्ति का जवाब बेहतर हो, तो Ami आपको लाइव सपोर्ट से जोड़ देता है।",
      exp_t: "भाव", exp_s: "जो हो रहा है, Ami उस पर प्रतिक्रिया देता है।",
      e1: "खुश · डिफ़ॉल्ट", e2: "आँख मारना · अभिवादन", e3: "खुशी · टिकट हल हुआ",
      try_t: "Ami से पूछें", try_s: "कोई त्वरित सवाल आज़माएँ या अपना लिखें।",
      greet: "नमस्ते! मैं Ami हूँ 👋 मुझसे कुछ भी पूछें।",
      q1: "मेरा पासवर्ड रीसेट करें", q2: "SAP सहायता", q3: "यात्रा सहायता",
      r1: "पासवर्ड रीसेट अभी शुरू किया जा सकता है।",
      r2: "SAP सहायता आ रही है। किस मॉड्यूल में परेशानी आ रही है?",
      r3: "आपके लिए यात्रा और खर्च पेज खोला जा रहा है।",
      r_def: "ठीक है! नॉलेज बेस में खोजा जा रहा है।",
      ph: "संदेश लिखें...", send: "भेजें",
      icons_t: "Ami आइकन सेट", icons_s: "ब्रांड स्पेसिफ़िकेशन के अनुसार आकार।",
      i1: "चैट लोगो", i2: "बॉट अवतार", i3: "पोर्टल लोगो", i4: "टॉपिक आइकन",
      brand_t: "ब्रांड रंग",
      files_t: "डिलिवरेबल फ़ाइलें", th1: "फ़ाइल", th2: "आकार", th3: "उपयोग",
      u1: "Otto प्रीमियम चैट हेडर", u2: "Otto चैट हेडर के लिए PNG विकल्प", u3: "बॉट प्रोफ़ाइल / लाइव प्रोफ़ाइल चित्र",
      u4: "Employee Center हेडर", u5: "Employee Center टॉपिक टाइल", u6: "Employee Center होम पेज", u7: "Employee Center टॉपिक पेज",
      f_date: "संस्करण",
      ld1: "Ami जाग रहा है…", ld2: "हेडसेट जोड़ा जा रहा है…", ld3: "हर भाषा सीखी जा रही है…", ld4: "तैयार! नमस्ते 👋"
    }},
    ja: { name: "日本語", dir: "ltr", t: {
      doc_title: "Ami · 製品紹介",
      n1: "概要", n2: "表情", n3: "Amiに聞く", n4: "ブランド", n5: "ファイル",
      eyebrow: "製品紹介",
      tagline: "あなたのデジタルサービスデスクの同僚",
      p1: "いつでも対応", p2: "あらゆる言語", p3: "まず人を大切に",
      hint: "マウスを動かす、ホバーする、またはAmiをクリック",
      cta: "Amiを試す",
      lang_label: "言語", loc_showing: "表示言語", loc_browser: "ブラウザの言語", loc_resolved: "ロケール",
      over_t: "Amiにできること", over_s: "仕事で困ったときの、あなたの言語で頼れるひとつの窓口。",
      c1t: "何でも聞ける", c1d: "ふだんの言葉で質問すれば、Amiが答えを見つけます。",
      c2t: "ナレッジを検索", c2d: "記事、ハウツー、ポリシーをまとめて検索します。",
      c3t: "サービスを探す", c3d: "メニューを探し回らずに、機器、ソフトウェアアクセス、出張を申請できます。",
      c4t: "まず人を大切に", c4d: "人が答えるほうがよいときは、Amiがライブサポートにつなぎます。",
      exp_t: "表情", exp_s: "Amiは状況に合わせて反応します。",
      e1: "うれしい・標準", e2: "ウインク・あいさつ", e3: "大喜び・チケット解決",
      try_t: "Amiに聞く", try_s: "クイックプロンプトを試すか、自由に入力してください。",
      greet: "こんにちは！Amiです 👋 何でも聞いてください。",
      q1: "パスワードをリセット", q2: "SAPのヘルプ", q3: "出張サポート",
      r1: "今すぐパスワードのリセットを開始できます。",
      r2: "SAPのヘルプをご案内します。どのモジュールでお困りですか？",
      r3: "出張・経費を開きますね。",
      r_def: "お任せください！ナレッジベースで検索します。",
      ph: "メッセージを入力...", send: "送信",
      icons_t: "Amiアイコンセット", icons_s: "ブランド仕様に沿ったサイズ。",
      i1: "チャットロゴ", i2: "ボットアバター", i3: "ポータルロゴ", i4: "トピックアイコン",
      brand_t: "ブランドカラー",
      files_t: "納品ファイル", th1: "ファイル", th2: "サイズ", th3: "用途",
      u1: "Ottoプレミアムチャットのヘッダー", u2: "OttoチャットヘッダーのPNG代替", u3: "ボットプロフィール/ライブプロフィール画像",
      u4: "Employee Centerのヘッダー", u5: "Employee Centerのトピックタイル", u6: "Employee Centerのホームページ", u7: "Employee Centerのトピックページ",
      f_date: "版",
      ld1: "Amiが目を覚ましています…", ld2: "ヘッドセットを接続中…", ld3: "あらゆる言語を学習中…", ld4: "準備完了！こんにちは 👋"
    }},
    ar: { name: "العربية", dir: "rtl", t: {
      doc_title: "Ami · تقديم المنتج",
      n1: "نظرة عامة", n2: "التعابير", n3: "اسأل Ami", n4: "العلامة", n5: "الملفات",
      eyebrow: "تقديم المنتج",
      tagline: "زميلك الرقمي في مكتب الخدمة",
      p1: "متاح دائمًا", p2: "بكل اللغات", p3: "الإنسان أولًا",
      hint: "حرّك الفأرة أو مرّر المؤشر أو انقر على Ami",
      cta: "جرّب Ami",
      lang_label: "اللغة", loc_showing: "العرض بلغة", loc_browser: "لغة المتصفح", loc_resolved: "الإعدادات الإقليمية",
      over_t: "ماذا يفعل Ami", over_s: "مكان واحد ودود للحصول على المساعدة في العمل، بلغتك.",
      c1t: "اسأل عن أي شيء", c1d: "اكتب سؤالك بكلماتك وسيجد Ami الإجابة.",
      c2t: "ابحث في المعرفة", c2d: "مقالات وأدلة وسياسات، يتم البحث فيها نيابةً عنك.",
      c3t: "اعثر على خدمة", c3d: "اطلب معدات أو صلاحية برنامج أو رحلة دون التنقل بين القوائم.",
      c4t: "الإنسان أولًا", c4d: "عندما يكون الشخص هو الإجابة الأفضل، يوصلك Ami بالدعم المباشر.",
      exp_t: "التعابير", exp_s: "يتفاعل Ami مع ما يحدث.",
      e1: "سعيد · الافتراضي", e2: "غمزة · ترحيب", e3: "فرح · تم حل التذكرة",
      try_t: "اسأل Ami", try_s: "جرّب سؤالًا سريعًا أو اكتب سؤالك.",
      greet: "مرحبًا! أنا Ami 👋 اسألني أي شيء.",
      q1: "إعادة تعيين كلمة المرور", q2: "مساعدة SAP", q3: "دعم السفر",
      r1: "يمكنني بدء إعادة تعيين كلمة المرور الآن.",
      r2: "مساعدة SAP في الطريق. أي وحدة تواجه فيها مشكلة؟",
      r3: "سأفتح لك السفر والمصروفات.",
      r_def: "حاضر! سأبحث في قاعدة المعرفة.",
      ph: "اكتب رسالة...", send: "إرسال",
      icons_t: "مجموعة أيقونات Ami", icons_s: "الأحجام وفق مواصفات العلامة.",
      i1: "شعار الدردشة", i2: "صورة الروبوت", i3: "شعار البوابة", i4: "أيقونة الموضوع",
      brand_t: "ألوان العلامة",
      files_t: "الملفات المسلّمة", th1: "الملف", th2: "الحجم", th3: "الاستخدام",
      u1: "ترويسة دردشة Otto المميزة", u2: "بديل PNG لترويسة دردشة Otto", u3: "صورة ملف الروبوت / الملف المباشر",
      u4: "ترويسة Employee Center", u5: "بلاطة الموضوع في Employee Center", u6: "الصفحة الرئيسية لـ Employee Center", u7: "صفحة الموضوع في Employee Center",
      f_date: "الإصدار",
      ld1: "Ami يستيقظ…", ld2: "جارٍ توصيل سماعة الرأس…", ld3: "جارٍ تعلّم كل اللغات…", ld4: "جاهز! مرحبًا 👋"
    }}
  };

  /* ---------- Cell 3: choose language (saved choice > browser list > browser lang > locale > English) ---------- */
  const base = tag => String(tag || '').toLowerCase().split('-')[0];
  let lang = 'en';

  const pick = () => {
    let saved = null;
    try { saved = localStorage.getItem('ami-lang'); } catch (e) {}
    if (saved && LANGS[saved]) return saved;
    const candidates = [...(navigator.languages || []), browserLang, systemLocale];
    for (const c of candidates) if (LANGS[base(c)]) return base(c);
    return 'en';
  };

  // full tag used for Intl formatting (e.g. "nl-NL" when the page is in Dutch)
  const fmtTag = () => {
    const tag = base(browserLang) === lang ? browserLang : base(systemLocale) === lang ? systemLocale : lang;
    try { return Intl.getCanonicalLocales(tag)[0]; } catch (e) { return lang; }
  };

  const t = key => (LANGS[lang].t[key] ?? LANGS.en.t[key] ?? key);

  /* ---------- Cell 4: apply to the page ---------- */
  const apply = next => {
    lang = LANGS[next] ? next : 'en';
    const L = LANGS[lang], tag = fmtTag();
    const root = document.documentElement;
    root.lang = tag;
    root.dir = L.dir;

    document.querySelectorAll('[data-i18n]').forEach(el => (el.textContent = t(el.dataset.i18n)));
    document.querySelectorAll('[data-i18n-ph]').forEach(el => (el.placeholder = t(el.dataset.i18nPh)));
    document.title = t('doc_title');

    // localized numbers (sizes), no thousands separator so 1440 stays 1440
    const nf = new Intl.NumberFormat(tag, { useGrouping: false });
    document.querySelectorAll('[data-w]').forEach(el => {
      // ⁦ ... ⁩ keeps "144 × 144 px" in reading order inside right-to-left pages
      el.textContent = `⁦${nf.format(el.dataset.w)} × ${nf.format(el.dataset.h)} px⁩`;
    });

    // localized edition date
    let date;
    try { date = new Intl.DateTimeFormat(tag, { dateStyle: 'long' }).format(new Date()); }
    catch (e) { date = new Date().toLocaleDateString(); }
    const foot = document.getElementById('footMeta');
    if (foot) foot.textContent = `${t('p1')} · ${t('p2')} · ${t('p3')}  —  ${t('f_date')}: ${date}`;

    // "what did we detect" chip
    const chip = document.getElementById('localeChip');
    if (chip) {
      chip.textContent = '';
      const a = document.createElement('span');
      a.textContent = `🌐 ${t('loc_showing')}: ${L.name} (⁦${tag}⁩)`;
      const b = document.createElement('small');
      b.textContent = `${t('loc_browser')}: ⁦${browserLang}⁩ · ${t('loc_resolved')}: ⁦${systemLocale}⁩`;
      chip.append(a, b);
    }

    const sel = document.getElementById('lang');
    if (sel) sel.value = lang;
    document.dispatchEvent(new CustomEvent('ami:lang', { detail: { lang, tag } }));
  };

  const init = () => {
    const sel = document.getElementById('lang');
    if (sel) {
      sel.innerHTML = '';
      Object.entries(LANGS).forEach(([code, v]) => {
        const o = document.createElement('option');
        o.value = code; o.textContent = v.name;
        sel.appendChild(o);
      });
      sel.addEventListener('change', () => {
        try { localStorage.setItem('ami-lang', sel.value); } catch (e) {}
        apply(sel.value);
      });
    }
    apply(pick());
  };

  window.AmiI18n = { init, apply, t, detected: { browserLang, systemLocale } };
})();
