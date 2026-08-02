import type { GrammarLesson } from '../types';

export const grammarLessons: GrammarLesson[] = [
  {
    id: 'gram-motion',
    name: 'Czasowniki ruchu',
    icon: 'Footprints',
    summary: 'идти czy ходить? ехать czy ездить? Pieszo vs pojazdem i „teraz” vs „regularnie”.',
    rules: [
      {
        title: 'Dwie osie decyzji',
        body:
          'Polskie „iść” i „jechać” w rosyjskim rozpadają się na cztery czasowniki. Wybór zależy od dwóch pytań: czy na piechotę, czy pojazdem - i czy chodzi o jedną konkretną drogę teraz, czy o czynność powtarzalną.',
        keyPoint: 'Najpierw pytasz: pieszo czy pojazdem? Potem: raz i w jedną stronę, czy w kółko?',
        table: {
          headers: ['', 'Raz, teraz', 'Regularnie'],
          rows: [
            ['Pieszo', 'идти', 'ходить'],
            ['Pojazdem', 'ехать', 'ездить'],
          ],
        },
        examples: [
          { ru: 'Я иду в магазин.', pl: 'Idę do sklepu (właśnie teraz).' },
          { ru: 'Я хожу в магазин каждый день.', pl: 'Chodzę do sklepu codziennie.' },
          { ru: 'Мы едем в Москву.', pl: 'Jedziemy do Moskwy (jesteśmy w drodze).' },
          { ru: 'Мы ездим в Москву каждое лето.', pl: 'Jeździmy do Moskwy każdego lata.' },
        ],
      },
      {
        title: 'Pieszo czy pojazdem - rosyjski jest rygorystyczny',
        body:
          'Po polsku „idę do pracy” ujdzie, nawet jeśli jedziesz tramwajem. Po rosyjsku nie: jeśli w grę wchodzi pojazd, to ехать/ездить. Do innego miasta czy kraju zawsze jedziesz - nigdy идти.',
        keyPoint: 'Do innego miasta zawsze ехать, choćby to było dziesięć minut pociągiem.',
        examples: [
          { ru: 'Я еду на работу на автобусе.', pl: 'Jadę do pracy autobusem.' },
          { ru: 'Я иду на работу пешком.', pl: 'Idę do pracy pieszo.' },
          { ru: 'Летом мы едем в Польшу.', pl: 'Latem jedziemy do Polski.', note: 'Nigdy „идём в Польшу”.' },
        ],
      },
      {
        title: 'Czas przeszły: byłem i wróciłem vs byłem w drodze',
        body:
          'W czasie przeszłym różnica robi się bardzo praktyczna. ходил/ездил znaczy „poszedłem i wróciłem” - opisuje całą wyprawę. шёл/ехал opisuje samą drogę, zwykle jako tło innego zdarzenia.',
        keyPoint: 'ходил = byłem tam i już wróciłem. шёл = byłem w trakcie drogi.',
        examples: [
          { ru: 'Вчера я ходил в кино.', pl: 'Wczoraj byłem w kinie.', note: 'Poszedłem i wróciłem.' },
          { ru: 'Я шёл домой, когда зазвонил телефон.', pl: 'Szedłem do domu, kiedy zadzwonił telefon.' },
          { ru: 'Летом мы ездили в Москву.', pl: 'Latem byliśmy w Moskwie.' },
        ],
      },
      {
        title: 'Odmiana - i jedna groźna pułapka',
        body:
          'Warto znać te cztery odmiany na pamięć, bo wracają w każdej rozmowie. Uwaga na мы едем (jedziemy) i мы едим (jemy) - różnica to jedna litera, a nieporozumienie gwarantowane.',
        keyPoint: 'едем = jedziemy, едим = jemy. Akcent i litera „е” kontra „и”.',
        table: {
          headers: ['', 'идти', 'ходить', 'ехать', 'ездить'],
          rows: [
            ['я', 'иду', 'хожу', 'еду', 'езжу'],
            ['ты', 'идёшь', 'ходишь', 'едешь', 'ездишь'],
            ['он/она', 'идёт', 'ходит', 'едет', 'ездит'],
            ['мы', 'идём', 'ходим', 'едем', 'ездим'],
            ['вы', 'идёте', 'ходите', 'едете', 'ездите'],
            ['они', 'идут', 'ходят', 'едут', 'ездят'],
          ],
        },
      },
    ],
    questions: [
      {
        prompt: 'Сейчас я ___ в магазин.',
        translation: 'Właśnie teraz idę do sklepu.',
        options: ['хожу', 'иду', 'еду'],
        correctIndex: 1,
        explanation: 'Jedna konkretna droga w tej chwili, na piechotę → идти. „хожу” znaczyłoby „chodzę regularnie”.',
      },
      {
        prompt: 'Каждый день я ___ на работу пешком.',
        translation: 'Codziennie chodzę do pracy pieszo.',
        options: ['иду', 'хожу', 'шёл'],
        correctIndex: 1,
        explanation: 'Czynność powtarzalna („каждый день”) i na piechotę → ходить.',
      },
      {
        prompt: 'Завтра мы ___ в Москву.',
        translation: 'Jutro jedziemy do Moskwy.',
        options: ['ездим', 'едем', 'ходим'],
        correctIndex: 1,
        explanation: 'Jedna zaplanowana podróż w jedną stronę, do innego miasta → ехать.',
      },
      {
        prompt: 'Каждое лето мы ___ на море.',
        translation: 'Każdego lata jeździmy nad morze.',
        options: ['едем', 'ездим', 'идём'],
        correctIndex: 1,
        explanation: 'Powtarzalne wyjazdy z powrotem → ездить. „едем” dotyczyłoby tego jednego, konkretnego wyjazdu.',
      },
      {
        prompt: 'Вчера я ___ в кино.',
        translation: 'Wczoraj byłem w kinie.',
        options: ['шёл', 'ходил', 'иду'],
        correctIndex: 1,
        explanation: 'Cała wyprawa: poszedłem i wróciłem → ходил. „шёл” opisywałoby samą drogę, nie pobyt.',
      },
      {
        prompt: 'Я ___ домой, когда зазвонил телефон.',
        translation: 'Szedłem do domu, kiedy zadzwonił telefon.',
        options: ['ходил', 'шёл', 'хожу'],
        correctIndex: 1,
        explanation: 'Byłem w trakcie drogi - to tło dla innego zdarzenia → шёл.',
      },
      {
        prompt: 'Я ___ на автобусе.',
        translation: 'Jadę autobusem.',
        options: ['иду', 'еду', 'хожу'],
        correctIndex: 1,
        explanation: 'W grę wchodzi pojazd, więc идти odpada - po rosyjsku autobusem zawsze się jedzie.',
      },
      {
        prompt: 'Она ___ в бассейн два раза в неделю.',
        translation: 'Ona chodzi na basen dwa razy w tygodniu.',
        options: ['идёт', 'ходит', 'едет'],
        correctIndex: 1,
        explanation: '„Dwa razy w tygodniu” to regularność → ходить.',
      },
      {
        prompt: 'Куда ты ___?',
        translation: 'Dokąd idziesz? (pytanie do kogoś w drodze)',
        options: ['идёшь', 'ходишь', 'ездишь'],
        correctIndex: 0,
        explanation: 'Pytamy o tę jedną drogę, tu i teraz → идёшь. „ходишь” to pytanie o zwyczaj.',
      },
      {
        prompt: 'Дети ___ в школу.',
        translation: 'Dzieci idą do szkoły (właśnie teraz, widzimy je).',
        options: ['ходят', 'идут', 'ездят'],
        correctIndex: 1,
        explanation: 'Konkretna droga w tym momencie → идут.',
      },
      {
        prompt: 'Мы ___ в Санкт-Петербург на поезде.',
        translation: 'Jedziemy do Petersburga pociągiem.',
        options: ['едим', 'едем', 'идём'],
        correctIndex: 1,
        explanation: 'Klasyczna pułapka: едем = jedziemy, едим = jemy. Jedna litera, zupełnie inne zdanie.',
      },
      {
        prompt: 'Я ___ на дачу каждые выходные.',
        translation: 'Jeżdżę na daczę w każdy weekend.',
        options: ['езжу', 'еду', 'ездию'],
        correctIndex: 0,
        explanation: 'Regularnie i pojazdem → ездить, a forma dla „я” to езжу. „ездию” nie istnieje.',
      },
    ],
  },
  {
    id: 'gram-numbers',
    name: 'Liczebnik i rzeczownik',
    icon: 'Hash',
    summary: 'Dlaczego два стола, ale пять столов - i skąd się bierze „мне двадцать один год”.',
    rules: [
      {
        title: 'Trzy grupy liczebników',
        body:
          'Rzeczownik po liczbie zmienia formę, a reguła zależy od tego, jaka to liczba. To jedna z tych rzeczy, które trzeba raz zrozumieć i już zawsze działa.',
        keyPoint: '1 → mianownik. 2, 3, 4 → dopełniacz liczby POJEDYNCZEJ. 5 i więcej → dopełniacz liczby MNOGIEJ.',
        table: {
          headers: ['', 'стол (m)', 'книга (ż)', 'окно (n)'],
          rows: [
            ['1', 'один стол', 'одна книга', 'одно окно'],
            ['2, 3, 4', 'два стола', 'две книги', 'два окна'],
            ['5 i więcej', 'пять столов', 'пять книг', 'пять окон'],
          ],
        },
      },
      {
        title: 'Pułapka dla Polaka: два стола, nie „два столы”',
        body:
          'Po polsku mówimy „dwa stoły” - mianownik liczby mnogiej. Rosyjski w tym miejscu używa dopełniacza liczby pojedynczej, czyli formy identycznej jak w „нет стола”. To najczęstszy błąd Polaków i słychać go od razu.',
        keyPoint: 'два/три/четыре + ta sama forma co po „нет”: нет стола → два стола.',
        examples: [
          { ru: 'два стола', pl: 'dwa stoły', note: 'nie „два столы”' },
          { ru: 'три брата', pl: 'trzej bracia' },
          { ru: 'четыре окна', pl: 'cztery okna' },
        ],
      },
      {
        title: 'два czy две?',
        body:
          'Tylko liczebnik 2 rozróżnia rodzaj: две idzie z rzeczownikami żeńskimi, два z męskimi i nijakimi. Od trzech wzwyż rodzaj przestaje mieć znaczenie.',
        keyPoint: 'две только z rodzajem żeńskim: две книги, две сестры. Reszta: два.',
        examples: [
          { ru: 'два брата', pl: 'dwaj bracia' },
          { ru: 'две сестры', pl: 'dwie siostry' },
          { ru: 'два окна', pl: 'dwa okna' },
        ],
      },
      {
        title: 'Liczby złożone: decyduje ostatnia cyfra',
        body:
          'Przy 21, 32, 45 patrzysz wyłącznie na ostatnią cyfrę. Wyjątkiem są nastki 11-14 - one zawsze zachowują się jak „pięć i więcej”, mimo że kończą się na 1, 2, 3, 4.',
        keyPoint: '21 → jak 1. 22 → jak 2. 25 → jak 5. Ale 11-14 → zawsze jak 5.',
        examples: [
          { ru: 'двадцать один стол', pl: 'dwadzieścia jeden stołów' },
          { ru: 'двадцать два стола', pl: 'dwadzieścia dwa stoły' },
          { ru: 'одиннадцать столов', pl: 'jedenaście stołów', note: 'nastka - jak przy piątce' },
        ],
      },
      {
        title: 'Wiek: год / года / лет',
        body:
          'Ta sama reguła odpowiada za to, jak podajesz swój wiek. Warto zapamiętać ją jako gotowy zestaw, bo to pytanie pada w każdej rozmowie.',
        keyPoint: '1, 21, 31 → год. 2-4, 22-24 → года. 5-20, 25-30 → лет.',
        examples: [
          { ru: 'Мне двадцать один год.', pl: 'Mam dwadzieścia jeden lat.' },
          { ru: 'Мне двадцать два года.', pl: 'Mam dwadzieścia dwa lata.' },
          { ru: 'Мне двадцать пять лет.', pl: 'Mam dwadzieścia pięć lat.' },
        ],
      },
    ],
    questions: [
      {
        prompt: 'В комнате два ___.',
        translation: 'W pokoju są dwa stoły.',
        options: ['стол', 'стола', 'столов'],
        correctIndex: 1,
        explanation: 'Po 2, 3, 4 idzie dopełniacz liczby pojedynczej: стола. Polskie „dwa stoły” myli - tu nie ma mnogiej.',
      },
      {
        prompt: 'У меня пять ___.',
        translation: 'Mam pięć książek.',
        options: ['книги', 'книга', 'книг'],
        correctIndex: 2,
        explanation: 'Od pięciu wzwyż - dopełniacz liczby mnogiej: книг (końcówka zerowa).',
      },
      {
        prompt: 'В доме три ___.',
        translation: 'W domu są trzy okna.',
        options: ['окно', 'окна', 'окон'],
        correctIndex: 1,
        explanation: '3 należy do grupy 2-4 → dopełniacz liczby pojedynczej: окна.',
      },
      {
        prompt: 'Я купил ___ книги.',
        translation: 'Kupiłem dwie książki.',
        options: ['два', 'две', 'двое'],
        correctIndex: 1,
        explanation: 'книга jest rodzaju żeńskiego, więc две. два zostawiamy dla rodzaju męskiego i nijakiego.',
      },
      {
        prompt: 'На столе двадцать один ___.',
        translation: 'Na stole leży dwadzieścia jeden ołówków.',
        options: ['карандаш', 'карандаша', 'карандашей'],
        correctIndex: 0,
        explanation: 'Liczba kończy się na 1, więc zachowuje się jak jedynka: mianownik liczby pojedynczej.',
      },
      {
        prompt: 'В классе одиннадцать ___.',
        translation: 'W klasie jest jedenastu uczniów.',
        options: ['ученик', 'ученика', 'учеников'],
        correctIndex: 2,
        explanation: 'Nastki 11-14 zawsze idą jak „pięć i więcej” - dopełniacz liczby mnogiej, mimo końcówki „-надцать один”.',
      },
      {
        prompt: 'Я работаю семь ___ в неделю.',
        translation: 'Pracuję siedem dni w tygodniu.',
        options: ['день', 'дня', 'дней'],
        correctIndex: 2,
        explanation: '7 to „pięć i więcej” → dopełniacz liczby mnogiej: дней.',
      },
      {
        prompt: 'У неё два ___.',
        translation: 'Ona ma dwóch braci.',
        options: ['брат', 'брата', 'братьев'],
        correctIndex: 1,
        explanation: 'Grupa 2-4 → брата. „братьев” pasowałoby dopiero od pięciu.',
      },
      {
        prompt: 'У меня четыре ___.',
        translation: 'Mam cztery siostry.',
        options: ['сестра', 'сестры', 'сестёр'],
        correctIndex: 1,
        explanation: '4 to wciąż grupa 2-4 → dopełniacz liczby pojedynczej: сестры.',
      },
      {
        prompt: 'Мне двадцать пять ___.',
        translation: 'Mam dwadzieścia pięć lat.',
        options: ['год', 'года', 'лет'],
        correctIndex: 2,
        explanation: 'Ostatnia cyfra to 5 → лет.',
      },
      {
        prompt: 'Мне двадцать один ___.',
        translation: 'Mam dwadzieścia jeden lat.',
        options: ['год', 'года', 'лет'],
        correctIndex: 0,
        explanation: 'Ostatnia cyfra to 1 → год, mimo że po polsku mówimy „lat”.',
      },
      {
        prompt: 'Моему брату двадцать два ___.',
        translation: 'Mój brat ma dwadzieścia dwa lata.',
        options: ['год', 'года', 'лет'],
        correctIndex: 1,
        explanation: 'Ostatnia cyfra to 2 → года.',
      },
    ],
  },
  {
    id: 'gram-where',
    name: 'Где czy куда?',
    icon: 'Compass',
    summary: 'Miejsce czy kierunek - в/на z biernikiem albo miejscownikiem, plus powrót przez из/с.',
    rules: [
      {
        title: 'Jeden przyimek, dwa przypadki',
        body:
          'в i на znaczą co innego w zależności od przypadku, który po nich stoi. Biernik odpowiada na pytanie куда? (dokąd), miejscownik na где? (gdzie). To ta sama różnica co polskie „idę do szkoły” kontra „jestem w szkole”, tylko że po rosyjsku przyimek się nie zmienia.',
        keyPoint: 'Ruch dokądś → biernik. Bycie gdzieś → miejscownik.',
        table: {
          headers: ['Pytanie', 'Przyimek', 'Przykład'],
          rows: [
            ['Куда? (dokąd)', 'в / на + biernik', 'Я иду в школу.'],
            ['Где? (gdzie)', 'в / на + miejscownik', 'Я в школе.'],
            ['Откуда? (skąd)', 'из / с + dopełniacz', 'Я из школы.'],
          ],
        },
      },
      {
        title: 'Czasownik podpowiada przypadek',
        body:
          'Nie musisz zgadywać - wystarczy spojrzeć na czasownik. Czasowniki ruchu (идти, ехать, пойти) domagają się kierunku, czyli biernika. Czasowniki stanu (быть, жить, работать, находиться) opisują miejsce, czyli miejscownik.',
        keyPoint: 'идти / ехать → куда (biernik). быть / жить / работать → где (miejscownik).',
        examples: [
          { ru: 'Я еду на работу.', pl: 'Jadę do pracy.', note: 'ruch → biernik' },
          { ru: 'Я работаю на работе.', pl: 'Pracuję w pracy.', note: 'stan → miejscownik' },
          { ru: 'Мы идём в театр.', pl: 'Idziemy do teatru.' },
          { ru: 'Мы в театре.', pl: 'Jesteśmy w teatrze.' },
        ],
      },
      {
        title: 'в czy на - i jak wrócić',
        body:
          'в używamy z przestrzeniami zamkniętymi, krajami i miastami. на z otwartymi przestrzeniami, wydarzeniami i pewną grupą rzeczowników, które po prostu trzeba zapamiętać: работа, почта, вокзал, улица, концерт, урок. Kluczowa wskazówka: para do powrotu jest sztywna.',
        keyPoint: 'в → из (в школу / из школы). на → с (на работу / с работы). Nigdy „из работы”.',
        examples: [
          { ru: 'Я иду на почту.', pl: 'Idę na pocztę.' },
          { ru: 'Я иду с почты.', pl: 'Wracam z poczty.' },
          { ru: 'Я еду в Москву.', pl: 'Jadę do Moskwy.' },
          { ru: 'Я еду из Москвы.', pl: 'Jadę z Moskwy.' },
        ],
      },
      {
        title: 'Końcówki, których szukasz',
        body:
          'Miejscownik dla większości rzeczowników to końcówka -е, biernik zależy od rodzaju. Rodzaj męski nieżywotny w bierniku wygląda jak mianownik, więc różnicę widać dopiero po żeńskich.',
        table: {
          headers: ['', 'Mianownik', 'Куда?', 'Где?'],
          rows: [
            ['ż', 'школа', 'в школу', 'в школе'],
            ['ż', 'работа', 'на работу', 'на работе'],
            ['m', 'вокзал', 'на вокзал', 'на вокзале'],
            ['n', 'море', 'на море', 'на море'],
          ],
        },
      },
    ],
    questions: [
      {
        prompt: 'Я иду ___.',
        translation: 'Idę do szkoły.',
        options: ['в школе', 'в школу', 'из школы'],
        correctIndex: 1,
        explanation: 'Czasownik ruchu → pytanie куда? → biernik: в школу.',
      },
      {
        prompt: 'Я работаю ___.',
        translation: 'Pracuję w fabryce.',
        options: ['на завод', 'на заводе', 'с завода'],
        correctIndex: 1,
        explanation: 'работать opisuje miejsce → где? → miejscownik: на заводе.',
      },
      {
        prompt: 'Мы едем ___.',
        translation: 'Jedziemy do Moskwy.',
        options: ['в Москве', 'в Москву', 'из Москвы'],
        correctIndex: 1,
        explanation: 'ехать to ruch → kierunek → biernik: в Москву.',
      },
      {
        prompt: 'Дети играют ___.',
        translation: 'Dzieci bawią się na ulicy.',
        options: ['на улицу', 'на улице', 'с улицы'],
        correctIndex: 1,
        explanation: 'Bawią się w jakimś miejscu, nie zmierzają donikąd → miejscownik: на улице.',
      },
      {
        prompt: 'Он пришёл ___.',
        translation: 'Przyszedł z pracy.',
        options: ['из работы', 'с работы', 'на работу'],
        correctIndex: 1,
        explanation: 'работа łączy się z на, więc powrót to с работы. „из работы” nie istnieje.',
      },
      {
        prompt: 'Она живёт ___.',
        translation: 'Ona mieszka w Polsce.',
        options: ['в Польшу', 'в Польше', 'из Польши'],
        correctIndex: 1,
        explanation: 'жить opisuje miejsce → miejscownik: в Польше.',
      },
      {
        prompt: 'Я иду ___.',
        translation: 'Idę na pocztę.',
        options: ['в почту', 'на почту', 'на почте'],
        correctIndex: 1,
        explanation: 'почта to jeden z rzeczowników z на, a ruch wymaga biernika: на почту.',
      },
      {
        prompt: 'Я жду тебя ___.',
        translation: 'Czekam na ciebie na dworcu.',
        options: ['на вокзал', 'на вокзале', 'в вокзале'],
        correctIndex: 1,
        explanation: 'Czekanie to bycie w miejscu → miejscownik. вокзал zawsze z на, nie z в.',
      },
      {
        prompt: 'Я возвращаюсь ___.',
        translation: 'Wracam ze szkoły.',
        options: ['из школы', 'с школы', 'в школу'],
        correctIndex: 0,
        explanation: 'школа łączy się z в, więc powrót to из школы. Para в–из jest sztywna.',
      },
      {
        prompt: '___ ты живёшь?',
        translation: 'Gdzie mieszkasz?',
        options: ['Куда', 'Где', 'Откуда'],
        correctIndex: 1,
        explanation: 'жить to stan, pytamy o miejsce → Где.',
      },
      {
        prompt: '___ ты идёшь?',
        translation: 'Dokąd idziesz?',
        options: ['Куда', 'Где', 'Откуда'],
        correctIndex: 0,
        explanation: 'идти to ruch, pytamy o cel drogi → Куда.',
      },
      {
        prompt: 'Книга лежит ___.',
        translation: 'Książka leży na stole.',
        options: ['на стол', 'на столе', 'со стола'],
        correctIndex: 1,
        explanation: 'Leży, czyli znajduje się gdzieś → miejscownik: на столе. „на стол” znaczyłoby „(kładę) na stół”.',
      },
    ],
  },
];
