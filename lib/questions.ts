export interface Question {
  id: string
  q: string
  opts: string[]
  ans: number
  hint: string
  explanation?: string
}

export interface Topic {
  name: string
  emoji: string
  questions: Question[]
  free: boolean
}

export interface Subject {
  key: string
  label: string
  color: string
  bg: string
  emoji: string
  topics: Topic[]
}

export const SUBJECTS: Subject[] = [
  {
    key: 'math',
    label: 'Matematik',
    color: '#534AB7',
    bg: '#EEEDFE',
    emoji: '🔢',
    topics: [
      {
        name: 'Multiplikation',
        emoji: '✖️',
        free: true,
        questions: [
          { id: 'm1', q: 'Vad är 7 × 8?', opts: ['48','54','56','64'], ans: 2, hint: '7 × 8 = 7 × 4 × 2' },
          { id: 'm2', q: 'Vad är 9 × 6?', opts: ['45','54','52','63'], ans: 1, hint: '9 × 6 = 10 × 6 − 6' },
          { id: 'm3', q: 'Vad är 12 × 5?', opts: ['55','60','65','70'], ans: 1, hint: '12 × 5 = 10 × 5 + 2 × 5' },
          { id: 'm4', q: 'Vad är 11 × 11?', opts: ['111','112','121','122'], ans: 2, hint: '11 × 11 = 100 + 10 + 10 + 1' },
          { id: 'm5', q: 'Vad är 4 × 13?', opts: ['48','50','52','54'], ans: 2, hint: '4 × 13 = 4 × 10 + 4 × 3' },
          { id: 'm6', q: 'Vad är 6 × 7?', opts: ['36','40','42','48'], ans: 2, hint: 'Tänk: 6 × 7 = 6 × 5 + 6 × 2' },
          { id: 'm7', q: 'Vad är 8 × 9?', opts: ['63','70','72','81'], ans: 2, hint: '8 × 9 = 8 × 10 − 8' },
          { id: 'm8', q: 'Vad är 3 × 15?', opts: ['40','42','45','48'], ans: 2, hint: '3 × 15 = 3 × 10 + 3 × 5' },
          { id: 'm9', q: 'Vad är 7 × 7?', opts: ['42','47','49','56'], ans: 2, hint: '7 × 7 = 49 — lär dig det utantill!' },
          { id: 'm10', q: 'Vad är 11 × 9?', opts: ['89','98','99','101'], ans: 2, hint: '11 × 9 = 10 × 9 + 9' },
        ]
      },
      {
        name: 'Division',
        emoji: '➗',
        free: true,
        questions: [
          { id: 'd1', q: 'Vad är 56 ÷ 7?', opts: ['6','7','8','9'], ans: 2, hint: '7 × 8 = 56' },
          { id: 'd2', q: 'Vad är 81 ÷ 9?', opts: ['7','8','9','10'], ans: 2, hint: '9 × 9 = 81' },
          { id: 'd3', q: 'Vad är 48 ÷ 6?', opts: ['6','7','8','9'], ans: 2, hint: '6 × 8 = 48' },
          { id: 'd4', q: 'Vad är 72 ÷ 8?', opts: ['7','8','9','10'], ans: 2, hint: '8 × 9 = 72' },
          { id: 'd5', q: 'Vad är 35 ÷ 5?', opts: ['5','6','7','8'], ans: 2, hint: '5 × 7 = 35' },
          { id: 'd6', q: 'Vad är 63 ÷ 7?', opts: ['7','8','9','10'], ans: 2, hint: '7 × 9 = 63' },
          { id: 'd7', q: 'Vad är 64 ÷ 8?', opts: ['6','7','8','9'], ans: 2, hint: '8 × 8 = 64' },
          { id: 'd8', q: 'Vad är 45 ÷ 9?', opts: ['4','5','6','7'], ans: 1, hint: '9 × 5 = 45' },
          { id: 'd9', q: 'Vad är 120 ÷ 10?', opts: ['10','11','12','13'], ans: 2, hint: 'När vi delar med 10 tar vi bort en nolla' },
          { id: 'd10', q: 'Vad är 36 ÷ 4?', opts: ['7','8','9','10'], ans: 2, hint: '4 × 9 = 36' },
        ]
      },
      {
        name: 'Bråk',
        emoji: '½',
        free: false,
        questions: [
          { id: 'b1', q: 'Vilket bråk är störst?', opts: ['1/4','1/3','1/2','1/5'], ans: 2, hint: 'Ju mindre nämnaren är, desto större bråk' },
          { id: 'b2', q: 'Vad är 1/2 + 1/4?', opts: ['2/6','1/2','3/4','2/4'], ans: 2, hint: 'Gör om 1/2 till 2/4 och addera' },
          { id: 'b3', q: 'Vad är hälften av 3/4?', opts: ['1/4','3/8','1/2','2/3'], ans: 1, hint: 'Halvera täljaren: 3 ÷ 2... eller dela med 2' },
          { id: 'b4', q: 'Hur många fjärdedelar är en hel?', opts: ['2','3','4','5'], ans: 2, hint: '1 = 4/4' },
          { id: 'b5', q: 'Vad är 3/4 − 1/4?', opts: ['1/4','2/4','3/4','4/4'], ans: 1, hint: 'Subtrahera täljarna, behåll nämnaren' },
          { id: 'b6', q: 'Vilket tal är lika med 6/3?', opts: ['1','2','3','6'], ans: 1, hint: '6 ÷ 3 = ?' },
          { id: 'b7', q: 'Vad är 1/3 av 12?', opts: ['3','4','5','6'], ans: 1, hint: '12 ÷ 3 = ?' },
          { id: 'b8', q: 'Vad är 2/5 av 10?', opts: ['2','3','4','5'], ans: 2, hint: '10 ÷ 5 × 2 = ?' },
        ]
      },
      {
        name: 'Geometri',
        emoji: '📐',
        free: false,
        questions: [
          { id: 'g1', q: 'Hur många sidor har en pentagon?', opts: ['4','5','6','7'], ans: 1, hint: 'Penta = fem på latin' },
          { id: 'g2', q: 'Vad är omkretsen av en kvadrat med sidan 5 cm?', opts: ['10 cm','15 cm','20 cm','25 cm'], ans: 2, hint: 'Omkrets = 4 × sida' },
          { id: 'g3', q: 'Vad är arean av en rektangel 6 × 4 cm?', opts: ['20 cm²','22 cm²','24 cm²','26 cm²'], ans: 2, hint: 'Area = längd × bredd' },
          { id: 'g4', q: 'Hur många grader är summan av vinklarna i en triangel?', opts: ['90°','180°','270°','360°'], ans: 1, hint: 'Klassisk regel — lär dig utantill!' },
          { id: 'g5', q: 'Vad kallas en triangel med tre lika långa sidor?', opts: ['Rätvinklig','Likbent','Liksidig','Spetsvinklig'], ans: 2, hint: 'Lik-sidig = alla sidor lika' },
          { id: 'g6', q: 'Hur många hörn har en kub?', opts: ['4','6','8','12'], ans: 2, hint: 'Tänk på en tärning' },
        ]
      },
      {
        name: 'Problemlösning',
        emoji: '🧩',
        free: false,
        questions: [
          { id: 'p1', q: 'Emma har 48 äpplen och ska dela dem lika i 6 korgar. Hur många äpplen per korg?', opts: ['6','7','8','9'], ans: 2, hint: '48 ÷ 6 = ?' },
          { id: 'p2', q: 'En tåg reser 120 km/h. Hur långt åker det på 3 timmar?', opts: ['240 km','360 km','420 km','480 km'], ans: 1, hint: 'Sträcka = hastighet × tid' },
          { id: 'p3', q: 'Lasse har 150 kr. Han köper en bok för 89 kr. Hur mycket har han kvar?', opts: ['51 kr','61 kr','71 kr','81 kr'], ans: 1, hint: '150 − 89 = ?' },
          { id: 'p4', q: 'Det är 24 elever i klassen. En tredjedel är sjuka. Hur många är friska?', opts: ['8','12','16','20'], ans: 2, hint: '24 ÷ 3 = sjuka, resten är friska' },
          { id: 'p5', q: 'En rektangel har omkretsen 28 cm och bredden 6 cm. Vad är längden?', opts: ['6 cm','7 cm','8 cm','10 cm'], ans: 2, hint: 'Omkrets = 2 × (längd + bredd) → 28 = 2 × (l + 6)' },
        ]
      },
    ]
  },
  {
    key: 'svenska',
    label: 'Svenska',
    color: '#1D9E75',
    bg: '#E1F5EE',
    emoji: '📖',
    topics: [
      {
        name: 'Ordklasser',
        emoji: '🔤',
        free: true,
        questions: [
          { id: 'sv1', q: 'Vilken ordklass är ordet "springer"?', opts: ['Substantiv','Adjektiv','Verb','Adverb'], ans: 2, hint: 'Verb beskriver vad någon gör' },
          { id: 'sv2', q: 'Vilket ord är ett adjektiv?', opts: ['snabbt','spring','snabb','sprang'], ans: 2, hint: 'Adjektiv beskriver hur något är' },
          { id: 'sv3', q: 'Vilket ord är ett substantiv?', opts: ['hoppar','glad','hund','fint'], ans: 2, hint: 'Substantiv är namn på saker, djur eller personer' },
          { id: 'sv4', q: '"Mycket" i "Det är mycket kallt" är...', opts: ['Adjektiv','Adverb','Verb','Substantiv'], ans: 1, hint: 'Adverb beskriver hur mycket eller hur ofta' },
          { id: 'sv5', q: 'Vilket ord är ett pronomen?', opts: ['katt','han','springer','stor'], ans: 1, hint: 'Pronomen ersätter substantiv' },
          { id: 'sv6', q: 'Vilken ordklass är "på" i "boken på bordet"?', opts: ['Substantiv','Verb','Preposition','Konjunktion'], ans: 2, hint: 'Prepositioner visar förhållanden i rum eller tid' },
          { id: 'sv7', q: 'Vilket ord är ett adverb?', opts: ['glad','snabbt','hund','och'], ans: 1, hint: 'Adverb beskriver ofta ett verb — hur något görs' },
          { id: 'sv8', q: '"Och" i "Lisa och Erik" är...', opts: ['Pronomen','Adjektiv','Konjunktion','Preposition'], ans: 2, hint: 'Konjunktioner binder ihop ord eller meningar' },
          { id: 'sv9', q: 'Vilket ord är ett substantiv i plural?', opts: ['katt','katter','glad','springer'], ans: 1, hint: 'Plural = mer än en' },
          { id: 'sv10', q: 'Vilken ordklass är "vacker"?', opts: ['Substantiv','Verb','Adjektiv','Adverb'], ans: 2, hint: 'Det beskriver hur något ser ut' },
        ]
      },
      {
        name: 'Skiljetecken',
        emoji: '✏️',
        free: true,
        questions: [
          { id: 'sk1', q: 'Vilket skiljetecken används vid en fråga?', opts: ['Punkt .','Utropstecken !','Frågetecken ?','Kommatecken ,'], ans: 2, hint: 'En fråga avslutas alltid med...' },
          { id: 'sk2', q: 'Vad används kommatecken till?', opts: ['Avsluta mening','Separera i lista','Starta mening','Ställa fråga'], ans: 1, hint: 'Kommatecken separerar ord eller fraser' },
          { id: 'sk3', q: 'Vilken mening är rätt skriven?', opts: ['kalle åker buss','Kalle åker buss.','kalle åker buss.','Kalle åker buss'], ans: 1, hint: 'Stor bokstav i början, punkt i slutet' },
          { id: 'sk4', q: 'När använder man utropstecken?', opts: ['Vid frågor','Vid pauser','Vid känslor/kommandon','Alltid i slutet'], ans: 2, hint: 'Utropstecken = stark känsla eller order' },
          { id: 'sk5', q: 'Vilken mening behöver kommatecken?', opts: ['Jag äter mat','Jag äter mat och dricker mjölk','Jag gillar äpplen päron och bananer','Jag springer snabbt'], ans: 2, hint: 'Lista med tre eller fler saker behöver kommatecken' },
          { id: 'sk6', q: 'Vad heter tecknet " : "?', opts: ['Semikolon','Kolon','Kommatecken','Bindestreck'], ans: 1, hint: 'Kolon används innan en lista eller förklaring' },
          { id: 'sk7', q: 'Vilken mening är FELAKTIG?', opts: ['Hjälp! Elden sprider sig.','Var bor du?','jag heter Anna.','Kom hit nu!'], ans: 2, hint: 'Kolla stor/liten bokstav' },
        ]
      },
      {
        name: 'Synonymer',
        emoji: '📝',
        free: false,
        questions: [
          { id: 'sy1', q: 'Vad är en synonym till "glad"?', opts: ['Ledsen','Lycklig','Arg','Trött'], ans: 1, hint: 'Synonym = ord med liknande betydelse' },
          { id: 'sy2', q: 'Vad är en synonym till "stor"?', opts: ['Liten','Smal','Enorm','Kort'], ans: 2, hint: 'Tänk på ett ord som också betyder mycket stort' },
          { id: 'sy3', q: 'Vad är en synonym till "snabb"?', opts: ['Långsam','Pigg','Rask','Trög'], ans: 2, hint: 'Rask = ett gammalt ord för snabb' },
          { id: 'sy4', q: 'Vad är en synonym till "börja"?', opts: ['Sluta','Starta','Pausa','Vänta'], ans: 1, hint: 'Starta = börja' },
          { id: 'sy5', q: 'Vad är ett ANTONYM (motsats) till "kall"?', opts: ['Sval','Frisk','Varm','Fuktig'], ans: 2, hint: 'Antonym = motsatsord' },
          { id: 'sy6', q: 'Vad är en synonym till "prata"?', opts: ['Lyssna','Tala','Skriva','Läsa'], ans: 1, hint: 'Tala och prata betyder samma sak' },
        ]
      },
      {
        name: 'Läsförståelse',
        emoji: '📖',
        free: false,
        questions: [
          { id: 'lf1', q: '"Maja sprang snabbt hem eftersom det regnade." Varför sprang Maja?', opts: ['Hon var sen till skolan','Det regnade','Hon var rädd','Hon var hungrig'], ans: 1, hint: 'Läs noga vad texten säger' },
          { id: 'lf2', q: '"Björnen sov hela vintern i sitt ide." Vad kallas björnens vinterbostad?', opts: ['Lya','Ide','Hål','Grotta'], ans: 1, hint: 'Ordet finns direkt i meningen' },
          { id: 'lf3', q: '"Det var kallt och mörkt ute. Stjärnorna lyste klart." Vilken tid på dygnet är det?', opts: ['Morgon','Middag','Natt','Kväll'], ans: 2, hint: 'Mörkt + stjärnor = ?' },
          { id: 'lf4', q: '"Erik läste klart sin bok och la den på hyllan." Vad gjorde Erik sist?', opts: ['Läste boken','La boken på hyllan','Hämtade boken','Köpte boken'], ans: 1, hint: 'Vad hände sist i meningen?' },
          { id: 'lf5', q: '"Läraren delade ut papper till alla elever utom en." Hur många fick papper?', opts: ['Alla','Ingen','Alla utom en','Bara en'], ans: 2, hint: 'Läs noga — "utom en" är nyckeln' },
        ]
      },
    ]
  },
  {
    key: 'engelska',
    label: 'Engelska',
    color: '#BA7517',
    bg: '#FAEEDA',
    emoji: '🌍',
    topics: [
      {
        name: 'Common words',
        emoji: '💬',
        free: true,
        questions: [
          { id: 'ew1', q: 'What does "beautiful" mean in Swedish?', opts: ['Stor','Vacker','Snabb','Glad'], ans: 1, hint: 'Think about something nice to look at' },
          { id: 'ew2', q: 'What is the English word for "hund"?', opts: ['Cat','Bird','Dog','Fish'], ans: 2, hint: 'A common pet that barks' },
          { id: 'ew3', q: 'What does "always" mean?', opts: ['Aldrig','Ibland','Alltid','Snart'], ans: 2, hint: 'Opposite of "never"' },
          { id: 'ew4', q: 'What is the English word for "skola"?', opts: ['Library','School','Office','Home'], ans: 1, hint: 'Where children go to learn' },
          { id: 'ew5', q: 'What does "quickly" mean?', opts: ['Långsamt','Fort/Snabbt','Tyst','Högt'], ans: 1, hint: 'Opposite of "slowly"' },
          { id: 'ew6', q: 'What is the English word for "vatten"?', opts: ['Milk','Juice','Water','Tea'], ans: 2, hint: 'H₂O' },
          { id: 'ew7', q: 'What does "friend" mean?', opts: ['Fiende','Lärare','Vän','Familj'], ans: 2, hint: 'Someone you like to spend time with' },
          { id: 'ew8', q: 'What is "måndag" in English?', opts: ['Sunday','Monday','Tuesday','Wednesday'], ans: 1, hint: 'First day of the work week' },
          { id: 'ew9', q: 'What does "happy" mean?', opts: ['Arg','Ledsen','Rädd','Glad'], ans: 3, hint: 'A positive feeling' },
          { id: 'ew10', q: 'What is the English word for "sol"?', opts: ['Moon','Star','Sun','Sky'], ans: 2, hint: 'It shines during the day' },
        ]
      },
      {
        name: 'Past tense',
        emoji: '⏪',
        free: true,
        questions: [
          { id: 'pt1', q: 'What is the past tense of "run"?', opts: ['Runned','Running','Ran','Runs'], ans: 2, hint: 'Irregular verb — completely different word' },
          { id: 'pt2', q: 'What is the past tense of "eat"?', opts: ['Eated','Eating','Eaten','Ate'], ans: 3, hint: 'Irregular verb, like "run → ran"' },
          { id: 'pt3', q: 'What is the past tense of "play"?', opts: ['Played','Playing','Plaied','Plays'], ans: 0, hint: 'Regular verb — just add -ed' },
          { id: 'pt4', q: 'What is the past tense of "go"?', opts: ['Goed','Going','Went','Goes'], ans: 2, hint: 'Irregular — completely different word' },
          { id: 'pt5', q: 'What is the past tense of "see"?', opts: ['Seed','Saw','Seen','Sees'], ans: 1, hint: 'Irregular — think of "saw a movie"' },
          { id: 'pt6', q: 'What is the past tense of "jump"?', opts: ['Jumpt','Jumped','Jumping','Jumps'], ans: 1, hint: 'Regular verb — add -ed' },
          { id: 'pt7', q: 'What is the past tense of "have"?', opts: ['Haved','Having','Has','Had'], ans: 3, hint: 'Irregular — "I had a dog"' },
          { id: 'pt8', q: 'What is the past tense of "write"?', opts: ['Writed','Written','Wrote','Writes'], ans: 2, hint: 'Irregular — "She wrote a letter"' },
        ]
      },
      {
        name: 'Vocabulary',
        emoji: '🗣️',
        free: false,
        questions: [
          { id: 'voc1', q: 'What does "enormous" mean?', opts: ['Liten','Mycket stor','Rund','Tung'], ans: 1, hint: 'Bigger than "big"' },
          { id: 'voc2', q: 'What is a synonym for "happy" in English?', opts: ['Sad','Angry','Joyful','Tired'], ans: 2, hint: 'Joyful = very happy' },
          { id: 'voc3', q: 'What does "ancient" mean?', opts: ['Modern','Gammal','Ny','Liten'], ans: 1, hint: 'Ancient Egypt = very old Egypt' },
          { id: 'voc4', q: 'What does "curious" mean?', opts: ['Rädd','Trött','Nyfiken','Arg'], ans: 2, hint: '"Curious George" is a famous curious monkey' },
          { id: 'voc5', q: 'What is the opposite of "difficult"?', opts: ['Impossible','Easy','Hard','Complex'], ans: 1, hint: 'Opposite of hard' },
          { id: 'voc6', q: 'What does "whisper" mean?', opts: ['Skrika','Sjunga','Viska','Ropa'], ans: 2, hint: 'Speaking very quietly' },
        ]
      },
      {
        name: 'Reading',
        emoji: '📚',
        free: false,
        questions: [
          { id: 'r1', q: '"The cat sat on the mat and slept." Where did the cat sit?', opts: ['On a chair','On the mat','On the bed','On the floor'], ans: 1, hint: 'Read the sentence carefully' },
          { id: 'r2', q: '"It was raining so Tom stayed inside." Why did Tom stay inside?', opts: ['He was sick','He was tired','It was raining','He had homework'], ans: 2, hint: '"So" connects the reason and the result' },
          { id: 'r3', q: '"Sarah has three cats: Tom, Bella and Max." How many cats does Sarah have?', opts: ['One','Two','Three','Four'], ans: 2, hint: 'Count the names after the colon' },
          { id: 'r4', q: '"The library closes at 5 PM on weekdays." When does the library close?', opts: ['3 PM','4 PM','5 PM','6 PM'], ans: 2, hint: 'The answer is directly in the sentence' },
          { id: 'r5', q: '"Emma likes apples but not bananas." What fruit does Emma NOT like?', opts: ['Apples','Bananas','Both','Neither'], ans: 1, hint: '"But not" = she dislikes it' },
        ]
      },
    ]
  },
  {
    key: 'no',
    label: 'NO',
    color: '#3B6D11',
    bg: '#EAF3DE',
    emoji: '🔬',
    topics: [
      {
        name: 'Kroppen',
        emoji: '🫀',
        free: true,
        questions: [
          { id: 'k1', q: 'Vilket organ pumpar blodet i kroppen?', opts: ['Lungan','Levern','Hjärtat','Njuren'], ans: 2, hint: 'Det sitter i bröstet och slår hela livet' },
          { id: 'k2', q: 'Hur många ben har en vuxen människa?', opts: ['196','206','216','226'], ans: 1, hint: 'Vi föds med fler ben som sedan smälter ihop' },
          { id: 'k3', q: 'Vilket organ andas vi med?', opts: ['Hjärtat','Levern','Lungan','Magen'], ans: 2, hint: 'Vi har två av dessa i bröstet' },
          { id: 'k4', q: 'Vad gör hjärnan?', opts: ['Pumpar blod','Filtrerar blod','Styr kroppen','Bryter ner mat'], ans: 2, hint: 'Det är som kroppens dator' },
          { id: 'k5', q: 'Vad kallas den stora muskeln i överarmen?', opts: ['Triceps','Biceps','Quadriceps','Hamstring'], ans: 1, hint: 'Den syns tydligt när du böjer armen' },
          { id: 'k6', q: 'Vilket organ renar blodet?', opts: ['Hjärtat','Levern','Lungan','Njuren'], ans: 3, hint: 'Vi har två av dessa — de ser ut som bönor' },
          { id: 'k7', q: 'Hur många liter blod har en vuxen människa ungefär?', opts: ['2–3 liter','4–6 liter','8–10 liter','12–15 liter'], ans: 1, hint: 'Lagom för att fylla en stor flaska!' },
          { id: 'k8', q: 'Vad kallas kroppens minsta blodkärl?', opts: ['Artär','Ven','Kapillär','Aorta'], ans: 2, hint: 'Kapillär = det allra minsta' },
          { id: 'k9', q: 'Vad är huden för?', opts: ['Bara för utseendet','Skyddar kroppen och reglerar temperatur','Pumpar blod','Filtrerar luft'], ans: 1, hint: 'Huden är kroppens största organ' },
          { id: 'k10', q: 'Vilket vitamin får vi av solljus?', opts: ['Vitamin A','Vitamin B','Vitamin C','Vitamin D'], ans: 3, hint: 'D som i Dagsljus!' },
        ]
      },
      {
        name: 'Djur & växter',
        emoji: '🌿',
        free: true,
        questions: [
          { id: 'dv1', q: 'Vilka djur är däggdjur?', opts: ['Orm & groda','Hund & val','Fjäril & bi','Örn & pingvin'], ans: 1, hint: 'Däggdjur ammar sina ungar' },
          { id: 'dv2', q: 'Vad behöver växter för att växa?', opts: ['Bara vatten','Bara ljus','Ljus, vatten & näring','Bara jord'], ans: 2, hint: 'Tänk på fotosyntesen' },
          { id: 'dv3', q: 'Vad kallas det när en larv blir en fjäril?', opts: ['Reproduktion','Metamorfos','Fotosyntes','Mutation'], ans: 1, hint: 'Det sker inne i en kokong' },
          { id: 'dv4', q: 'Vad äter ett växtätare?', opts: ['Bara kött','Bara växter','Bägge delar','Insekter'], ans: 1, hint: 'Växtätare = växt + ätare' },
          { id: 'dv5', q: 'Vilket djur är ett rovdjur i Sverige?', opts: ['Rådjur','Älg','Varg','Hare'], ans: 2, hint: 'Det jagar andra djur' },
          { id: 'dv6', q: 'Vad producerar växter under fotosyntesen?', opts: ['Koldioxid','Syre','Kväve','Vatten'], ans: 1, hint: 'Det vi andas in!' },
          { id: 'dv7', q: 'Hur många ben har en insekt?', opts: ['4','6','8','10'], ans: 1, hint: 'In-sekt = tre kroppsdelar, sex ben' },
          { id: 'dv8', q: 'Vad kallas ett djur som äter både kött och växter?', opts: ['Växtätare','Köttätare','Allätare','Rovdjur'], ans: 2, hint: 'Allätare äter allting' },
        ]
      },
      {
        name: 'Rymden',
        emoji: '🪐',
        free: false,
        questions: [
          { id: 'ry1', q: 'Vilken planet är närmast solen?', opts: ['Venus','Mars','Merkurius','Jorden'], ans: 2, hint: 'Merkurius är liten och varm' },
          { id: 'ry2', q: 'Hur lång tid tar det för jorden att gå runt solen?', opts: ['24 timmar','30 dagar','1 år','100 år'], ans: 2, hint: 'Det är varför vi har år!' },
          { id: 'ry3', q: 'Hur lång tid tar det för jorden att snurra runt sig själv?', opts: ['1 timme','12 timmar','24 timmar','7 dagar'], ans: 2, hint: 'Det är varför vi har dag och natt' },
          { id: 'ry4', q: 'Vad kallas den stjärna vi kretsar runt?', opts: ['Månen','Solen','Polstjärnan','Venus'], ans: 1, hint: 'Den lyser varje dag' },
          { id: 'ry5', q: 'Hur många planeter finns det i vårt solsystem?', opts: ['7','8','9','10'], ans: 1, hint: 'Pluto räknas inte längre som planet' },
          { id: 'ry6', q: 'Vilken planet är störst i solsystemet?', opts: ['Saturnus','Uranus','Neptunus','Jupiter'], ans: 3, hint: 'Den har också en stor röd fläck' },
        ]
      },
      {
        name: 'Fysik & kemi',
        emoji: '⚗️',
        free: false,
        questions: [
          { id: 'fk1', q: 'Vad är vatten kemisk formel?', opts: ['CO₂','H₂O','O₂','NaCl'], ans: 1, hint: '2 väten och 1 syre' },
          { id: 'fk2', q: 'Vid vilken temperatur kokar vatten (vid normalt lufttryck)?', opts: ['80°C','90°C','100°C','110°C'], ans: 2, hint: 'Standard kokpunkt' },
          { id: 'fk3', q: 'Vad kallas övergången från fast till flytande form?', opts: ['Kokning','Kondensation','Smältning','Förånga'], ans: 2, hint: 'Is smälter till vatten' },
          { id: 'fk4', q: 'Vad är luft till största delen (78%)?', opts: ['Syre','Koldioxid','Kväve','Väte'], ans: 2, hint: 'Inte syre — vi andas mest kväve' },
          { id: 'fk5', q: 'Vad händer när du blandar rött och gult ljus?', opts: ['Grönt','Lila','Orange','Brunt'], ans: 2, hint: 'Tänk på regnbågens färger' },
          { id: 'fk6', q: 'Vilket material leder el bäst?', opts: ['Trä','Glas','Koppar','Plast'], ans: 2, hint: 'Används i elsladdar' },
        ]
      },
    ]
  },
]

export function getSubject(key: string) {
  return SUBJECTS.find(s => s.key === key)
}

export function getTopic(subjectKey: string, topicName: string) {
  const subject = getSubject(subjectKey)
  return subject?.topics.find(t => t.name === topicName)
}

export function getRandomQuestions(subjectKey: string, topicName: string, count = 5): Question[] {
  const topic = getTopic(subjectKey, topicName)
  if (!topic) return []
  const shuffled = [...topic.questions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}
