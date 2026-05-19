import type { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: '1',
    name: 'W restauracji',
    icon: 'Utensils',
    dialog: `- Здравствуйте! Можно меню, пожалуйста?|Dzień dobry! Czy można prosić menu?
- Да, конечно. Вот ваше меню.|Tak, oczywiście. Oto państwa menu.
- Что вы рекомендуете сегодня?|Co pan poleca dzisiaj?
- У нас очень вкусный борщ и свежие фрукты.|Mamy bardzo smaczny barszcz i świeże owoce.
- Хорошо, я возьму борщ.|Dobrze, wezmę barszcz.
- Что вы будете пить?|Co będzie pan pił?
- Я хочу чай с лимоном, пожалуйста.|Chcę herbatę z cytryną, proszę.
- Сахар нужен?|Czy potrzebny jest cukier?
- Нет, спасибо, я пью чай без сахара.|Nie, dziękuję, piję herbatę bez cukru.
- Желаете что-нибудь ещё?|Czy życzy pan sobie coś jeszcze?
- Да, принесите, пожалуйста, хлеб и воду.|Tak, proszę przynieść chleb i wodę.
- Один момент, скоро всё будет готово.|Chwileczkę, zaraz wszystko będzie gotowe.
- Спасибо большое.|Dziękuję bardzo.
- Вот ваш заказ. Приятного аппетита!|Oto pańskie zamówienie. Smacznego!
- Благодарю, всё выглядит очень вкусно.|Dziękuję, wszystko wygląda bardzo smacznie.`,
    words: [
      { pl: 'owoce', ru: 'фрукты', image: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=400' },
      { pl: 'warzywa', ru: 'овощи', image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400' },
      { pl: 'herbata', ru: 'чай', image: 'https://images.unsplash.com/photo-1544787210-22bbd921bd14?w=400' },
      { pl: 'zupa', ru: 'суп', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400' },
      { pl: 'chleb', ru: 'хлеб', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
      { pl: 'woda', ru: 'вода', image: 'https://images.unsplash.com/photo-1548919973-5cfe5d4fc494?w=400' },
      { pl: 'cukier', ru: 'сахар', image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=400' },
      { pl: 'sól', ru: 'соль', image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400' },
      { pl: 'kawa', ru: 'кофе', image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=400' },
      { pl: 'mleko', ru: 'молоко', image: 'https://images.unsplash.com/photo-1550583724-1255d1426639?w=400' },
    ],
    conjugations: [
      {
        title: 'Czasownik "есть" (jeść)',
        rows: [
          { pronoun: 'я', verb: 'ем' },
          { pronoun: 'ты', verb: 'ешь' },
          { pronoun: 'он/она', verb: 'ест' },
          { pronoun: 'мы', verb: 'едим' },
          { pronoun: 'вы', verb: 'едите' },
          { pronoun: 'они', verb: 'едят' },
        ],
      },
      {
        title: 'Czasownik "пить" (pić)',
        rows: [
          { pronoun: 'я', verb: 'пью' },
          { pronoun: 'ты', verb: 'пьёшь' },
          { pronoun: 'он/она', verb: 'пьёт' },
          { pronoun: 'мы', verb: 'пьём' },
          { pronoun: 'вы', verb: 'пьёте' },
          { pronoun: 'они', verb: 'пьют' },
        ],
      },
      {
        title: 'Rzeczownik "вода" (woda)',
        rows: [
          { pronoun: 'mianownik', verb: 'вода' },
          { pronoun: 'dopełniacz', verb: 'воды' },
          { pronoun: 'celownik', verb: 'воде' },
          { pronoun: 'biernik', verb: 'воду' },
          { pronoun: 'narzędnik', verb: 'водой' },
          { pronoun: 'miejscownik', verb: 'воде' },
        ],
      },
      {
        title: 'Czasownik "хотеть" (chcieć)',
        rows: [
          { pronoun: 'я', verb: 'хочу' },
          { pronoun: 'ты', verb: 'хочешь' },
          { pronoun: 'он/она', verb: 'хочет' },
          { pronoun: 'мы', verb: 'хотим' },
          { pronoun: 'вы', verb: 'хотите' },
          { pronoun: 'они', verb: 'хотят' },
        ],
      },
      {
        title: 'Czasownik "заказывать" (zamawiać)',
        rows: [
          { pronoun: 'я', verb: 'заказываю' },
          { pronoun: 'ты', verb: 'заказываешь' },
          { pronoun: 'он/она', verb: 'заказывает' },
          { pronoun: 'мы', verb: 'заказываем' },
          { pronoun: 'вы', verb: 'заказываете' },
          { pronoun: 'они', verb: 'заказывают' },
        ],
      },
    ],
    unusualPhrases: [
      { 
        pl: 'Z cukrem vs Bez cukru', 
        ru: 'С сахаром vs Без сахара', 
        explanation: 'Używamy narzędnika po "с" i dopełniacza po "без".',
        examples: [
          { pl: 'Herbata z cukrem', ru: 'Чай с сахаром' },
          { pl: 'Kawa bez cukru', ru: 'Кофе bez сахара' },
          { pl: 'Woda z cytryną', ru: 'Вода с лимоном' },
          { pl: 'Zupa bez soli', ru: 'Суп без соли' },
          { pl: 'Chcę zupę z chlebem', ru: 'Я хочу суп с хлебом' },
        ]
      },
    ],
    sentences: [
      { pl: 'Co pan zamawia?', ru: 'Что вы заказываете?' },
      { pl: 'Chcę barszcz i herbatę.', ru: 'Я хочу борщ и чай.' },
      { pl: 'Proszę przynieść menu.', ru: 'Принесите меню, пожалуйста.' },
      { pl: 'Ile to kosztuje?', ru: 'Сколько это стоит?' },
      { pl: 'Rachunek, poproszę.', ru: 'Счёт, пожалуйста.' },
    ],
    enumeratives: [
      { pl: '1 - jeden', ru: 'один' },
      { pl: '2 - dwa', ru: 'два' },
      { pl: '3 - trzy', ru: 'три' },
      { pl: '4 - cztery', ru: 'четыре' },
      { pl: '5 - pięć', ru: 'пять' },
      { pl: '6 - sześć', ru: 'шесть' },
      { pl: '7 - siedem', ru: 'семь' },
      { pl: '8 - osiem', ru: 'восемь' },
      { pl: '9 - dziewięć', ru: 'девять' },
      { pl: '10 - dziesięć', ru: 'десять' },
    ],
    hardWords: [
      { pl: 'polecać', ru: 'рекомендовать', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400' },
      { pl: 'smacznego', ru: 'приятного аппетита', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400' },
      { pl: 'śniadanie', ru: 'завтрак', image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400' },
      { pl: 'obiad', ru: 'обед', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
      { pl: 'kolacja', ru: 'ужин', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400' },
      { pl: 'restauracja', ru: 'ресторан', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400' },
      { pl: 'kelner', ru: 'официант', image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=400' },
      { pl: 'rachunek', ru: 'счёт', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400' },
      { pl: 'napój', ru: 'напиток', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400' },
      { pl: 'sok', ru: 'сок', image: 'https://images.unsplash.com/photo-1600271886332-699bb2798b98?w=400' },
    ],
  },
  {
    id: '2',
    name: 'W domu',
    icon: 'Home',
    dialog: `- Привет! Ты уже дома?|Cześć! Jesteś już w domu?
- Да, я пришёл полчаса назад.|Tak, przyszedłem pół godziny temu.
- Чем ты занимаешься?|Czym się zajmujesz?
- Я сижу в гостиной и смотрю телевизор.|Siedzę w salonie i oglądam telewizję.
- Ты уже ужинал?|Jadłeś już kolację?
- Нет ещё, я жду тебя.|Jeszcze nie, czekam na ciebie.
- Я буду дома через двадцать минут.|Będę w domu za dwadzieścia minut.
- Отлично, тогда я начну готовить.|Świetnie, wtedy zacznę gotować.
- Что у нас на ужин?|Co mamy na kolację?
- Думаю сделать салат и запечь рыбу.|Myślę o zrobieniu sałatki i upieczeniu ryby.
- Звучит вкусно. Нужно что-то купить?|Brzmi smacznie. Trzeba coś kupić?
- Зайди в magasin, kup хлеб и молоко.|Wstąp do sklepu, kup chleb i mleko.
- Хорошо, я скоро буду.|Dobrze, wkrótce będę.
- Не забудь ключи, я могу не услышать звонок.|Nie zapomnij kluczy, mogę nie usłyszeć dzwonka.
- Окей, до встречи!|Okej, do zobaczenia!`,
    words: [
      { pl: 'dom', ru: 'дом', image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400' },
      { pl: 'okno', ru: 'окно', image: 'https://images.unsplash.com/photo-1503708928676-1cb796a0891e?w=400' },
      { pl: 'drzwi', ru: 'дверь', image: 'https://images.unsplash.com/photo-1481277542470-605fe2e0e5ef?w=400' },
      { pl: 'stół', ru: 'стол', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400' },
      { pl: 'krzesło', ru: 'стул', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400' },
      { pl: 'kuchnia', ru: 'кухня', image: 'https://images.unsplash.com/photo-1556911220-e152748a3f88?w=400' },
      { pl: 'łóżko', ru: 'кровать', image: 'https://images.unsplash.com/photo-1505693419173-42b92568f190?w=400' },
      { pl: 'lustro', ru: 'зеркало', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400' },
      { pl: 'szafa', ru: 'шкаф', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400' },
      { pl: 'ściana', ru: 'стена', image: 'https://images.unsplash.com/photo-1516542076529-1ea3854896f2?w=400' },
    ],
    conjugations: [
      {
        title: 'Czasownik "жить" (żyć/mieszkać)',
        rows: [
          { pronoun: 'я', verb: 'живу' },
          { pronoun: 'ты', verb: 'живёшь' },
          { pronoun: 'он/она', verb: 'живёт' },
          { pronoun: 'мы', verb: 'живём' },
          { pronoun: 'вы', verb: 'живёте' },
          { pronoun: 'они', verb: 'живут' },
        ],
      },
      {
        title: 'Czasownik "смотреть" (oglądać/patrzeć)',
        rows: [
          { pronoun: 'я', verb: 'смотрю' },
          { pronoun: 'ты', verb: 'смотришь' },
          { pronoun: 'он/она', verb: 'смотрит' },
          { pronoun: 'мы', verb: 'смотрим' },
          { pronoun: 'вы', verb: 'смотрите' },
          { pronoun: 'они', verb: 'смотрят' },
        ],
      },
      {
        title: 'Czasownik "сидеть" (siedzieć)',
        rows: [
          { pronoun: 'я', verb: 'сижу' },
          { pronoun: 'ты', verb: 'сидишь' },
          { pronoun: 'он/она', verb: 'сидит' },
          { pronoun: 'мы', verb: 'сидим' },
          { pronoun: 'вы', verb: 'сидите' },
          { pronoun: 'они', verb: 'сидят' },
        ],
      },
      {
        title: 'Przymiotnik "большой" (duży)',
        rows: [
          { pronoun: 'męski', verb: 'большой' },
          { pronoun: 'żeński', verb: 'большая' },
          { pronoun: 'nijaki', verb: 'большое' },
          { pronoun: 'mnoga', verb: 'большие' },
        ],
      },
      {
        title: 'Czasownik "делать" (robić)',
        rows: [
          { pronoun: 'я', verb: 'делаю' },
          { pronoun: 'ты', verb: 'делаешь' },
          { pronoun: 'он/она', verb: 'делает' },
          { pronoun: 'мы', verb: 'делаем' },
          { pronoun: 'вы', verb: 'делаете' },
          { pronoun: 'они', verb: 'делают' },
        ],
      },
    ],
    unusualPhrases: [
      { 
        pl: 'Dom (budynek) vs Doma (w domu)', 
        ru: 'Дом vs Дома', 
        explanation: '"Дом" to rzeczownik oznaczający budynek. "Дома" to przysłówek oznaczający miejsce pobytu.',
        examples: [
          { pl: 'To jest mój dom.', ru: 'Это мой дом' },
          { pl: 'Jestem teraz w domu.', ru: 'Я сейчас дома' },
          { pl: 'Gdzie jest twój dom?', ru: 'Где твой дом?' },
          { pl: 'Ona jest w domu.', ru: 'Она дома' },
          { pl: 'Mój dom jest duży.', ru: 'Мой дом большой' },
        ]
      },
      { 
        pl: 'Na ulicy', 
        ru: 'На улице', 
        explanation: 'W języku rosyjskim używamy "на" zamiast "w" mówiąc o ulicy.',
        examples: [
          { pl: 'Jestem na ulicy.', ru: 'Я на улице' },
          { pl: 'Oni są na dworze.', ru: 'Они на улице' },
          { pl: 'Dzieci są na ulicy.', ru: 'Дети на улице' },
          { pl: 'Na ulicy jest zimno.', ru: 'На улице холодно' },
          { pl: 'Wyjdź na dwór.', ru: 'Выйди на улицу' },
        ]
      },
    ],
    sentences: [
      { pl: 'Gdzie jesteś?', ru: 'Где ты?' },
      { pl: 'Jestem w domu.', ru: 'Я дома.' },
      { pl: 'Oglądam telewizję.', ru: 'Я смотрю телевизор.' },
      { pl: 'Co na kolację?', ru: 'Что на ужин?' },
      { pl: 'Wkrótce będę.', ru: 'Я скоро буду.' },
    ],
    enumeratives: [
      { pl: 'wiosna', ru: 'весна' },
      { pl: 'lato', ru: 'лето' },
      { pl: 'jesień', ru: 'осень' },
      { pl: 'zima', ru: 'зима' },
      { pl: 'styczeń', ru: 'январь' },
      { pl: 'luty', ru: 'февраль' },
      { pl: 'marzec', ru: 'март' },
      { pl: 'kwiecień', ru: 'апрель' },
      { pl: 'maj', ru: 'май' },
      { pl: 'czerwiec', ru: 'июнь' },
      { pl: 'lipiec', ru: 'июль' },
      { pl: 'sierpień', ru: 'август' },
      { pl: 'wrzesień', ru: 'сентябрь' },
      { pl: 'październik', ru: 'октябрь' },
      { pl: 'listopad', ru: 'ноябрь' },
      { pl: 'grudzień', ru: 'декабрь' },
    ],
    hardWords: [
      { pl: 'mieszkanie', ru: 'квартира', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400' },
      { pl: 'sypialnia', ru: 'спальня', image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400' },
      { pl: 'łazienka', ru: 'ванная', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400' },
      { pl: 'budynek', ru: 'здание', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400' },
      { pl: 'piętro', ru: 'этаж', image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=400' },
      { pl: 'klucze', ru: 'ключи', image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400' },
      { pl: 'lodówka', ru: 'холодильник', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400' },
      { pl: 'telewizor', ru: 'телевизор', image: 'https://images.unsplash.com/photo-1593359674290-309995570089?w=400' },
      { pl: 'salon', ru: 'гостиная', image: 'https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?w=400' },
      { pl: 'drzwi', ru: 'дверь', image: 'https://images.unsplash.com/photo-1481277542470-605fe2e0e5ef?w=400' },
    ],
  },
  {
    id: '3',
    name: 'Moja rodzina',
    icon: 'Users',
    dialog: `- Кто это на фотографии?|Kto to jest na zdjęciu?
- Это моя большая семья.|To jest moja duża rodzina.
- Расскажи, кто есть кто.|Opowiedz, kto jest kim.
- Вот это мой папа, а это моя мама.|Oto mój tata, a to moja mama.
- Твои родители очень красиво выглядят.|Twoi rodzice bardzo ładnie wyglądają.
- Спасибо, они сейчас на пенсии.|Dziękuję, oni są teraz na emeryturze.
- А это твои брат и сестра?|A to twój brat i siostra?
- Да, это мой старший брат i младшая сестра.|Tak, to mój starszy brat i młodsza siostra.
- Где они живут?|Gdzie oni mieszkają?
- Брат живёт в Москве, а сестра учится в Питере.|Brat mieszka w Moskwie, a siostra uczy się w Pitrze (Petersburgu).
- У тебя есть дети?|Masz dzieci?
- Да, у меня есть сын и дочь.|Tak, mam syna i córkę.
- Как их зовут?|Jak oni się nazywają?
- Сына зовут Антон, а дочь — Мария.|Syn nazywa się Anton, a córka — Maria.
- Какая замечательная семья!|Jaka wspaniała rodzina!`,
    words: [
      { pl: 'mama', ru: 'мама', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400' },
      { pl: 'tata', ru: 'папа', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400' },
      { pl: 'brat', ru: 'брат', image: 'https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=400' },
      { pl: 'siostra', ru: 'сестра', image: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=400' },
      { pl: 'syn', ru: 'сын', image: 'https://images.unsplash.com/photo-1502086223501-7ea2443f84fd?w=400' },
      { pl: 'córka', ru: 'дочь', image: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?w=400' },
      { pl: 'babcia', ru: 'бабушка', image: 'https://images.unsplash.com/photo-1520699049698-acd2fccb8cc8?w=400' },
      { pl: 'dziadek', ru: 'дедушка', image: 'https://images.unsplash.com/photo-1475149301140-7e3e00504106?w=400' },
      { pl: 'mąż', ru: 'муж', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400' },
      { pl: 'żona', ru: 'жена', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
    ],
    conjugations: [
      {
        title: 'Zaimki dzierżawcze (mój/moja)',
        rows: [
          { pronoun: 'rodzaj męski', verb: 'мой' },
          { pronoun: 'rodzaj żeński', verb: 'моя' },
          { pronoun: 'rodzaj nijaki', verb: 'моё' },
          { pronoun: 'liczba mnoga', verb: 'мои' },
        ],
      },
      {
        title: 'Zaimki osobowe',
        rows: [
          { pronoun: 'ja', verb: 'я' },
          { pronoun: 'ty', verb: 'ты' },
          { pronoun: 'on/ona/ono', verb: 'он/она/оно' },
          { pronoun: 'my', verb: 'мы' },
          { pronoun: 'wy', verb: 'вы' },
          { pronoun: 'oni/one', verb: 'они' },
        ],
      },
      {
        title: 'Czasownik "любить" (kochać/lubić)',
        rows: [
          { pronoun: 'я', verb: 'люблю' },
          { pronoun: 'ты', verb: 'любишь' },
          { pronoun: 'он/она', verb: 'любит' },
          { pronoun: 'мы', verb: 'любим' },
          { pronoun: 'вы', verb: 'любите' },
          { pronoun: 'они', verb: 'любят' },
        ],
      },
      {
        title: 'Czasownik "знать" (wiedzieć/znać)',
        rows: [
          { pronoun: 'я', verb: 'знаю' },
          { pronoun: 'ты', verb: 'знаешь' },
          { pronoun: 'он/она', verb: 'знает' },
          { pronoun: 'мы', verb: 'знаем' },
          { pronoun: 'вы', verb: 'знаете' },
          { pronoun: 'они', verb: 'знают' },
        ],
      },
      {
        title: 'Przymiotnik "молодой" (młody)',
        rows: [
          { pronoun: 'męski', verb: 'молодой' },
          { pronoun: 'żeński', verb: 'молодая' },
          { pronoun: 'nijaki', verb: 'молодое' },
          { pronoun: 'mnoga', verb: 'молодые' },
        ],
      },
    ],
    unusualPhrases: [
      { 
        pl: 'Nazywam się... (Odmiana)', 
        ru: 'Меня зовут...', 
        explanation: 'W języku rosyjskim używamy biernika zaimka + "зовут" (wołają).',
        examples: [
          { pl: 'Ja mam na imię (Mnie wołają)', ru: 'Меня зовут' },
          { pl: 'Ty masz na imię (Ciebie wołają)', ru: 'Тебя зовут' },
          { pl: 'On ma na imię (Jego wołają)', ru: 'Его зовут' },
          { pl: 'Ona ma na imię (Ją wołają)', ru: 'Её зовут' },
          { pl: 'Jak oni mają na imię?', ru: 'Как их зовут?' },
        ]
      },
      { 
        pl: 'U mnie jest... (Mam...)', 
        ru: 'У меня есть...', 
        explanation: 'W języku rosyjskim "posiadanie" wyrażamy konstrukcją "u kogo jest co".',
        examples: [
          { pl: 'Ja mam (U mnie jest)', ru: 'У меня есть' },
          { pl: 'Ty masz (U ciebie jest)', ru: 'У тебя есть' },
          { pl: 'On ma (U niego jest)', ru: 'У него есть' },
          { pl: 'Ona ma (U niej jest)', ru: 'У неё есть' },
          { pl: 'My mamy (U nas jest)', ru: 'У нас есть' },
        ]
      },
    ],
    sentences: [
      { pl: 'Kto to jest?', ru: 'Кто это?' },
      { pl: 'To jest mój tata.', ru: 'Это мой папа.' },
      { pl: 'Jak oni się nazywają?', ru: 'Как их зовут?' },
      { pl: 'Mam brata.', ru: 'У меня есть брат.' },
      { pl: 'Gdzie oni mieszkają?', ru: 'Где они живут?' },
    ],
    enumeratives: [
      { pl: '11', ru: 'одиннадцать' },
      { pl: '12', ru: 'двенадцать' },
      { pl: '13', ru: 'тринадцать' },
      { pl: '14', ru: 'четырнадцать' },
      { pl: '15', ru: 'пятнадцать' },
      { pl: '16', ru: 'шестнадцать' },
      { pl: '17', ru: 'семнадцать' },
      { pl: '18', ru: 'восемнадцать' },
      { pl: '19', ru: 'девятнадцать' },
      { pl: '20', ru: 'двадцать' },
    ],
    hardWords: [
      { pl: 'rodzina', ru: 'семья', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400' },
      { pl: 'rodzice', ru: 'родители', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400' },
      { pl: 'starszy', ru: 'старший', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400' },
      { pl: 'młodszy', ru: 'младший', image: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=400' },
      { pl: 'dzieci', ru: 'дети', image: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?w=400' },
      { pl: 'wnuk', ru: 'внук', image: 'https://images.unsplash.com/photo-1502086223501-7ea2443f84fd?w=400' },
      { pl: 'wnuczka', ru: 'внучка', image: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?w=400' },
      { pl: 'krewni', ru: 'родственники', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400' },
      { pl: 'człowiek', ru: 'человек', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400' },
      { pl: 'ludzie', ru: 'люди', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400' },
    ],
  },
];
