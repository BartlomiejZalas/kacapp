import type { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'foundations',
    name: 'Podstawy',
    lessons: [
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
              { pl: 'Kawa bez cukru', ru: 'Кофе без сахара' },
              { pl: 'Woda z cytryną', ru: 'Вода с лимоном' },
              { pl: 'Zupa bez soli', ru: 'Суп без соли' },
              { pl: 'Chcę зupę z chlebem', ru: 'Я хочу суп с хлебом' },
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
- Звучит вкусно. Нужно что-нибудь купить?|Brzmi smacznie. Trzeba coś kupić?
- Зайди в магазин, купи хлеб и молоко.|Wstąp do sklepu, kup chleb i mleko.
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
          { pl: 'podłoga', ru: 'пол', image: 'https://images.unsplash.com/photo-1581850518616-cee81537e691?w=400' },
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
- Да, это мой старший брат и младшая сестра.|Tak, to mój starszy brat i młodsza siostra.
- Где они живут?|Gdzie oni mieszkają?
- Брат живёт в Москве, а сестра учится в Питере.|Brat mieszka в Москве, а siostra uczy się w Pitrze (Petersburgu).
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
          { pl: 'dziecko', ru: 'ребёнок', image: 'https://images.unsplash.com/photo-1502086223501-7ea2443f84fd?w=400' },
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
      {
        id: '4',
        name: 'Kraje i zawody',
        icon: 'Globe',
        dialog: `- Здравствуйте! Давайте познакомимся.|Dzień dobry! Zapoznajmy się.
- Меня зовут Анна. А вас?|Nazywam się Anna. A pan/pani?
- Меня зовут Иван. Очень приятно.|Nazywam się Iwan. Bardzo mi miło.
- Взаимно. Иван, где вы живёте?|Wzajemnie. Iwanie, gdzie pan mieszka?
- Я живу в Москве. А вы?|Mieszkam w Moskwie. A pani?
- А я живу в Варшаве.|A ja mieszkam w Warszawie.
- Вы говорите по-русски?|Czy mówi pan po rosyjsku?
- Да, немного. Я ещё учусь.|Tak, trochę. Jeszcze się uczę.
- Кто вы по профессии?|Kim pan jest z zawodu?
- Я инженер. А вы?|Jestem inżynierem. A pani?
- Я учительница, работаю в школе.|Jestem nauczycielką, pracuję w szkole.`,
        words: [
          { pl: 'Polska', ru: 'Польша', image: 'https://images.unsplash.com/photo-1512813583141-b9219a658148?w=400' },
          { pl: 'Rosja', ru: 'Россия', image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=400' },
          { pl: 'Niemcy', ru: 'Германия', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400' },
          { pl: 'Francja', ru: 'Франция', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
          { pl: 'Anglia', ru: 'Англия', image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=400' },
          { pl: 'Ameryka', ru: 'Америка', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400' },
          { pl: 'Chiny', ru: 'Китай', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400' },
          { pl: 'nauczyciel', ru: 'учитель', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400' },
          { pl: 'lekarz', ru: 'врач', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400' },
          { pl: 'student', ru: 'студент', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400' },
        ],
        conjugations: [
          {
            title: 'Czasownik "жить" (mieszkać)',
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
            title: 'Czasownik "говорить" (mówić)',
            rows: [
              { pronoun: 'я', verb: 'говорю' },
              { pronoun: 'ты', verb: 'говоришь' },
              { pronoun: 'он/она', verb: 'говорит' },
              { pronoun: 'мы', verb: 'говорим' },
              { pronoun: 'вы', verb: 'говорите' },
              { pronoun: 'они', verb: 'говорят' },
            ],
          },
        ],
        unusualPhrases: [
          {
            pl: 'Skąd jesteś? (Pochodzenie)',
            ru: 'Я из...',
            explanation: 'Używamy "из" + dopełniacz (Genitive).',
            examples: [
              { pl: 'Jestem z Polski', ru: 'Я из Польши' },
              { pl: 'Jestem z Rosji', ru: 'Я из России' },
              { pl: 'On jest z Niemiec', ru: 'Он из Германии' },
              { pl: 'Ona jest z Ameryki', ru: 'Она из Америки' },
              { pl: 'My jesteśmy z Anglii', ru: 'Мы из Англии' },
            ]
          },
          {
            pl: 'Mówić w języku...',
            ru: 'Говорить по-...',
            explanation: 'Używamy konstrukcji "по-" + przymiotnik zakończony na "-и".',
            examples: [
              { pl: 'Mówię po rosyjsku', ru: 'Я говорю по-русски' },
              { pl: 'Mówisz po polsku?', ru: 'Ты говоришь по-польски?' },
              { pl: 'Mówimy po angielsku', ru: 'Мы говориm по-английски' },
              { pl: 'On mówi po niemiecku', ru: 'Он говорит по-немецки' },
              { pl: 'Ona mówi po francusku', ru: 'Она говорит по-французски' },
            ]
          },
        ],
        sentences: [
          { pl: 'Gdzie pan/pani mieszka?', ru: 'Где вы живёте?' },
          { pl: 'Mówię trochę po rosyjsku.', ru: 'Я немного говорю по-русски.' },
          { pl: 'Kim jesteś z zawodu?', ru: 'Кто ты по профессии?' },
          { pl: 'Pracuję w biurze.', ru: 'Я работаю в офисе.' },
          { pl: 'Bardzo mi miło.', ru: 'Очень приятно.' },
        ],
        enumeratives: [
          { pl: 'polski', ru: 'польский' },
          { pl: 'rosyjski', ru: 'русский' },
          { pl: 'angielski', ru: 'английский' },
          { pl: 'niemiecki', ru: 'немецкий' },
          { pl: 'francuski', ru: 'французский' },
          { pl: 'chiński', ru: 'китайский' },
          { pl: 'hiszpański', ru: 'испанский' },
          { pl: 'włoski', ru: 'итальянский' },
        ],
        hardWords: [
          { pl: 'inżynier', ru: 'инженер', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400' },
          { pl: 'kucharz', ru: 'повар', image: 'https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?w=400' },
          { pl: 'nauczycielka', ru: 'учительница', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400' },
          { pl: 'szkoła', ru: 'школа', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400' },
          { pl: 'szpital', ru: 'больница', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce2?w=400' },
          { pl: 'biuro', ru: 'офис', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400' },
          { pl: 'zawód', ru: 'профессия', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400' },
          { pl: 'miło cię poznać', ru: 'приятно познакомиться', image: 'https://images.unsplash.com/photo-1521791136064-7986c2923216?w=400' },
          { pl: 'narodowość', ru: 'национальность', image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=400' },
          { pl: 'kraj', ru: 'страна', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400' },
        ],
      },
      {
        id: '5',
        name: 'Na granicy',
        icon: 'Plane',
        dialog: `- Здравствуйте! Ваш паспорт и виза, пожалуйста.|Dzień dobry! Pański paszport i wiza, poproszę.
- Вот, пожалуйста. И мой паспорт, и паспорт моей жены.|Oto one. Zarówno mój paszport, jak i paszport mojej żony.
- Какова цель вашего визита?|Jaki jest cel pańskiej wizyty?
- Мы едем в отпуск к друзьям.|Jedziemy na urlop do przyjaciół.
- У вас есть вещи для декларирования?|Czy ma pan rzeczy do oclenia?
- Нет, только личные вещи в чемоданах.|Nie, tylko rzeczy osobiste w walizkach.
- Откройте этот большой чемодан, пожалуйста.|Proszę otworzyć tę dużą walizkę.
- Конечно. Здесь одежда, книги и один подарок.|Ociewiście. Tutaj są ubrania, książki i jeden prezent.
- Что это за конверт?|Co to za koperta?
- Это письмо для моего друга.|To jest list dla mojego przyjaciela.
- Хорошо. Всё в порядке. Счастливого пути!|Dobrze. Wszystko w porządku. Szczęśliwej drogi!
- Спасибо большое. До свидания!|Dziękuję bardzo. Do widzenia!`,
        words: [
          { pl: 'paszport', ru: 'паспорт', image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400' },
          { pl: 'wiza', ru: 'виза', image: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=400' },
          { pl: 'granica', ru: 'граница', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400' },
          { pl: 'walizka', ru: 'чемодан', image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400' },
          { pl: 'bagaż', ru: 'багаж', image: 'https://images.unsplash.com/photo-1581553676214-4632b4ec378c?w=400' },
          { pl: 'cło', ru: 'таможня', image: 'https://images.unsplash.com/photo-1520699049698-acd2fccb8cc8?w=400' },
          { pl: 'podpis', ru: 'подпись', image: 'https://images.unsplash.com/photo-1512428559083-560df5f4b95d?w=400' },
          { pl: 'list', ru: 'письмо', image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400' },
          { pl: 'prezent', ru: 'подарок', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400' },
          { pl: 'mąż', ru: 'муж', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400' },
        ],
        conjugations: [
          {
            title: 'Rzeczownik "муж" (mąż)',
            rows: [
              { pronoun: 'mianownik', verb: 'муж' },
              { pronoun: 'dopełniacz', verb: 'мужа' },
              { pronoun: 'celownik', verb: 'мужу' },
              { pronoun: 'biernik', verb: 'мужа' },
              { pronoun: 'narzędnik', verb: 'мужем' },
              { pronoun: 'miejscownik', verb: 'муже' },
            ],
          },
          {
            title: 'Rzeczownik "чемодан" (walizka)',
            rows: [
              { pronoun: 'mianownik', verb: 'чемодан' },
              { pronoun: 'dopełniacz', verb: 'чемодана' },
              { pronoun: 'celownik', verb: 'чемодану' },
              { pronoun: 'biernik', verb: 'чемодан' },
              { pronoun: 'narzędnik', verb: 'чемоданом' },
              { pronoun: 'miejscownik', verb: 'чемодане' },
            ],
          },
          {
            title: 'Rzeczownik "письмо" (list)',
            rows: [
              { pronoun: 'mianownik', verb: 'письмо' },
              { pronoun: 'dopełniacz', verb: 'письма' },
              { pronoun: 'celownik', verb: 'письму' },
              { pronoun: 'biernik', verb: 'письмо' },
              { pronoun: 'narzędnik', verb: 'письмом' },
              { pronoun: 'miejscownik', verb: 'письме' },
            ],
          },
          {
            title: 'Czasownik "ехать" (jechać)',
            rows: [
              { pronoun: 'я', verb: 'еду' },
              { pronoun: 'ты', verb: 'едешь' },
              { pronoun: 'он/она', verb: 'едет' },
              { pronoun: 'мы', verb: 'едем' },
              { pronoun: 'вы', verb: 'едете' },
              { pronoun: 'они', verb: 'едут' },
            ],
          },
        ],
        unusualPhrases: [
          {
            pl: 'Cel wizyty',
            ru: 'Цель визита',
            explanation: 'Standardowe pytanie na granicy o powód przyjazdu.',
            examples: [
              { pl: 'Jaki jest cel wizyty?', ru: 'Какова цель визита?' },
              { pl: 'Mój cel to turystyka.', ru: 'Моя цель — туризм.' },
              { pl: 'Jadę do pracy.', ru: 'Я еду по работе.' },
            ]
          },
          {
            pl: 'Szczęśliwej drogi!',
            ru: 'Счастливого пути!',
            explanation: 'Tradycyjne życzenie dobrej podróży.',
          },
        ],
        sentences: [
          { pl: 'Poproszę pański paszport.', ru: 'Ваш паспорт, пожалуйста.' },
          { pl: 'Nie mam nic do oclenia.', ru: 'У меня нет вещей для декларирования.' },
          { pl: 'To jest mój bagaż.', ru: 'Это мой bagaż.' },
          { pl: 'Gdzie jest granica?', ru: 'Где граница?' },
          { pl: 'Jadę do przyjaciół.', ru: 'Я еду к друзьям.' },
        ],
        enumeratives: [
          { pl: 'samolot', ru: 'самолёт' },
          { pl: 'pociąg', ru: 'поезд' },
          { pl: 'samochód', ru: 'машина' },
          { pl: 'autobus', ru: 'автобус' },
          { pl: 'statek', ru: 'корабль' },
          { pl: 'bilet', ru: 'билет' },
          { pl: 'miejsce', ru: 'место' },
          { pl: 'peron', ru: 'платформа' },
        ],
        hardWords: [
          { pl: 'deklaracja', ru: 'декларация', image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=400' },
          { pl: 'kontrola', ru: 'контроль', image: 'https://images.unsplash.com/photo-1541872703-74c5e443d1fe?w=400' },
          { pl: 'przepis', ru: 'правило', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400' },
          { pl: 'zakaz', ru: 'запрет', image: 'https://images.unsplash.com/photo-1541872703-74c5e443d1fe?w=400' },
          { pl: 'pozwolenie', ru: 'разрешение', image: 'https://images.unsplash.com/photo-1512428559083-560df5f4b95d?w=400' },
          { pl: 'obywatelstwo', ru: 'гражданство', image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=400' },
          { pl: 'celnik', ru: 'таможенник', image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=400' },
          { pl: 'przegląd', ru: 'осмотр', image: 'https://images.unsplash.com/photo-1541872703-74c5e443d1fe?w=400' },
        ],
      },
      {
        id: '6',
        name: 'Na dworcu w Moskwie',
        icon: 'Train',
        dialog: `- Мамочка, Агата - твоя подружка?|Mamusiu, czy Agata jest twoją koleżanką?
- Да, дочка.|Tak, córeczko.
- Какая она?|Jaka ona jest?
- Красивая. У неё голубые глаза и светлые волосы...|Ładna. Ma niebieskie oczy, jasne włosy...
- Это она! Агата! Агата!|To ona! To ona!
- Маша, отпусти тётю. Слышишь меня? Это не Агата.|Masza! Puść panią! To nie jest Agata.
- Вы не Агата?|Nie jest pani Agata?
- Мне очень жаль, но я не Агата. Меня зовут Ева.|Przykro mi, ale nie. Mam na imię Ewa.
- Извините нас, пожалуйста, мы встречаем мою подругу и дочка очень волнуется.|Proszę nam wybaczyć! Czekamy na przyjazd mojej koleżanki i córka jest bardzo przejęta.
- Ничего страшного.|Nic złego się nie stało.
- Маша, веди себя прилично!|Masza, zachowuj się przyzwoicie!
- Мамочка, а ты давно не виделась с Агатой?|Mamusiu, jak długo nie widziałaś Agaty?
- Сто лет...|Sto lat...
- Ну, тогда ты её не узнаешь!|W takim razie ty jej nie poznasz!
- Почему?|Dlaczego?
- Она уже старая!|Ona już jest stara!
- И вовсе она не старая.|Wcale nie jest stara.
- А я говорю - старая!|Mówię ci, że jest!
- Она совсем не изменилась.|Ona w ogóle się не zmieniła.
- Откуда ты знаешь?|Skąd wiesz?
- Она стоит за тобой и ждёт, когда ты с ней поздороваешься. Привет Агатка! Рада тебя видеть!|Ona stoi za tobą i czeka, aż się z nią przywitasz. Cześć Agatka! Cieszę się, że cię widzę!
- Лена! Как я по тебе соскучилась! А это твоя дочка?|Lena! Ależ stęskniłam się za tobą! A to twoja córka?
- Да, это мой сорванец.|Tak, to mój urwis.
- Как дела, Машенька?|Jak się masz, Maszeńka?
- Привет! Ты так долго ехала... Я устала тебя встречать!|Cześć! Tak długo jechałaś... Zmęczyłam się czekaniem na ciebie!
- Едем домой. Моя машина стоит недалеко от вокзала. Агата, дай мне твою сумку.|Jedziemy do domu. Mój samochód stoi niedaleko dworca. Agata, daj mi twoją torbę.`,
        words: [
          { pl: 'dworzec', ru: 'вокзал', image: 'https://images.unsplash.com/photo-1548625361-f6dbfa5a5664?w=400' },
          { pl: 'samochód', ru: 'машина', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400' },
          { pl: 'dziewczyna', ru: 'девушка', image: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=400' },
          { pl: 'kobieta', ru: 'женщина', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400' },
          { pl: 'mężczyzna', ru: 'мужчина', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400' },
          { pl: 'oczy', ru: 'глаза', image: 'https://images.unsplash.com/photo-1512429815049-514d2a1387d7?w=400' },
          { pl: 'włosy', ru: 'волосы', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400' },
          { pl: 'przyjaciółka', ru: 'подруга', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400' },
        ],
        conjugations: [
          {
            title: 'Czasownik "идти" (iść)',
            rows: [
              { pronoun: 'я', verb: 'иду' },
              { pronoun: 'ты', verb: 'идёшь' },
              { pronoun: 'он/она', verb: 'идёт' },
              { pronoun: 'мы', verb: 'идём' },
              { pronoun: 'вы', verb: 'идёте' },
              { pronoun: 'они', verb: 'идут' },
            ],
          },
          {
            title: 'Czasownik "нести" (nieść)',
            rows: [
              { pronoun: 'я', verb: 'несу' },
              { pronoun: 'ты', verb: 'несёшь' },
              { pronoun: 'он/она', verb: 'несёт' },
              { pronoun: 'мы', verb: 'несём' },
              { pronoun: 'вы', verb: 'несёте' },
              { pronoun: 'они', verb: 'несут' },
            ],
          },
          {
            title: 'Czasownik "везти" (wieźć)',
            rows: [
              { pronoun: 'я', verb: 'везу' },
              { pronoun: 'ты', verb: 'везёшь' },
              { pronoun: 'он/она', verb: 'везёт' },
              { pronoun: 'мы', verb: 'везём' },
              { pronoun: 'вы', verb: 'везёте' },
              { pronoun: 'они', verb: 'везут' },
            ],
          },
          {
            title: 'Czasownik "ждать" (czekać)',
            rows: [
              { pronoun: 'я', verb: 'жду' },
              { pronoun: 'ты', verb: 'ждёшь' },
              { pronoun: 'он/она', verb: 'ждёт' },
              { pronoun: 'мы', verb: 'ждём' },
              { pronoun: 'вы', verb: 'ждёте' },
              { pronoun: 'они', verb: 'ждут' },
            ],
          },
        ],
        unusualPhrases: [
          {
            pl: 'Zwroty grzecznościowe i codzienne',
            ru: 'Вежливые и повседневные фразы',
            explanation: 'Przydatne zwroty podczas spotkań i w codziennych sytuacjach.',
            examples: [
              { pl: 'Nic złego się nie stało', ru: 'Ничего страшного' },
              { pl: 'Bardzo mi przykro', ru: 'Мне очень жаль' },
              { pl: 'Zachowuj się przyzwoicie!', ru: 'Веди себя прилично!' },
              { pl: 'Cieszę się, że cię widzę!', ru: 'Рада тебя видеть!' },
            ]
          },
        ],
        sentences: [
          { pl: 'Jak się masz?', ru: 'Как дела?' },
          { pl: 'Skąd wiesz?', ru: 'Откуда ты знаешь?' },
          { pl: 'Ależ stęskniłam się za tobą!', ru: 'Как я по тебе соскучилась!' },
          { pl: 'Jaka ona jest?', ru: 'Какая она?' },
        ],
        enumeratives: [
          { pl: 'północ', ru: 'север' },
          { pl: 'południe', ru: 'юг' },
          { pl: 'wschód', ru: 'восток' },
          { pl: 'zachód', ru: 'запад' },
          { pl: 'północny wschód', ru: 'северо-восток' },
          { pl: 'południowy wschód', ru: 'юго-восток' },
          { pl: 'południowy zachód', ru: 'юго-запад' },
          { pl: 'północny zachód', ru: 'северо-запад' },
        ],
        hardWords: [
          { pl: 'przejmować się', ru: 'волноваться' },
          { pl: 'zmienić się', ru: 'измениться' },
          { pl: 'przywitać się', ru: 'поздороваться' },
          { pl: 'przeczytać', ru: 'прочитать' },
          { pl: 'pomóc', ru: 'помочь' },
          { pl: 'nieść', ru: 'нести' },
          { pl: 'wieźć', ru: 'везти' },
          { pl: 'czekać', ru: 'ждать' },
        ],
      },
      {
        id: '7',
        name: 'W klasie',
        icon: 'BookOpen',
        dialog: `- Доброе утро! Садитесь, пожалуйста.|Dzień dobry! Proszę usiąść.
- Где твоя тетрадь и домашнее задание?|Gdzie jest twój zeszyt i zadanie domowe?
- Извините, я забыл тетрадь дома.|Przepraszam, zapomniałem zeszytu w domu.
- Возьми ручку и напиши на листке бумаги сто раз: "Я не забуду домашнее задание".|Weź długopis i napisz na kartce sto razy: "Nie zapomnę zadania domowego"
- Хорошо, я напишу. Можно мне подойти к доске?|Dobrze, napiszę. Czy mogę podejść do tablicy?
- Да, подойди к доске и напиши мелом это слово.|Tak, podejdź do tablicy i napisz kredą to słowo.
- Какое слово мне написать?|Jakie słowo mam napisać?
- Напиши слово "школа".|Napisz słowo "szkoła".
- Готово. Я могу сесть на место?|Gotowe. Czy mogę usiąść na miejsce?
- Да, садись. Молодец.|Tak, siadaj. Zuch.`,
        words: [
          { pl: 'plecak', ru: 'рюкзак', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400' },
          { pl: 'klasa', ru: 'класс', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400' },
          { pl: 'tablica', ru: 'доска', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400' },
          { pl: 'kreda', ru: 'мел', image: 'https://images.unsplash.com/photo-1587309995166-51e29eef26f8?w=400' },
          { pl: 'zeszyt', ru: 'тетрадь', image: 'https://images.unsplash.com/photo-1531346878377-244bb797d3ef?w=400' },
          { pl: 'długopis', ru: 'ручка', image: 'https://images.unsplash.com/photo-1585336261022-680e2a5ce249?w=400' },
          { pl: 'ołówek', ru: 'карандаш', image: 'https://images.unsplash.com/photo-1520005705307-8ec968f3a39e?w=400' },
          { pl: 'zadanie domowe', ru: 'домашнее задание', image: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=400' },
          { pl: 'kartka papieru', ru: 'листок бумаги', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400' },
          { pl: 'książka', ru: 'книга', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400' },
        ],
        conjugations: [
          {
            title: 'Czasownik "писать" (pisać)',
            rows: [
              { pronoun: 'я', verb: 'пишу' },
              { pronoun: 'ты', verb: 'пишешь' },
              { pronoun: 'он/она', verb: 'пишет' },
              { pronoun: 'мы', verb: 'пишем' },
              { pronoun: 'вы', verb: 'пишете' },
              { pronoun: 'они', verb: 'пишут' },
            ],
          },
          {
            title: 'Czasownik "забыть" (zapomnieć)',
            rows: [
              { pronoun: 'я', verb: 'забуду' },
              { pronoun: 'ты', verb: 'забудешь' },
              { pronoun: 'он/она', verb: 'забудет' },
              { pronoun: 'мы', verb: 'забудем' },
              { pronoun: 'вы', verb: 'забудете' },
              { pronoun: 'они', verb: 'забудут' },
            ],
          },
        ],
        unusualPhrases: [
          {
            pl: 'Podejść do tablicy',
            ru: 'Подойти к доске',
            explanation: 'W języku rosyjskim używamy przyimka "к" z celownikiem, gdy mówimy o zbliżaniu się do kogoś lub czegoś.',
            examples: [
              { pl: 'Podejdź do tablicy!', ru: 'Подойди к доске!' },
              { pl: 'Idę do nauczyciela.', ru: 'Я иду к учителю.' },
            ]
          },
        ],
        sentences: [
          { pl: 'Proszę usiąść.', ru: 'Садитесь, пожалуйста.' },
          { pl: 'Gdzie jest twoje zadanie domowe?', ru: 'Где твоё домашнее задание?' },
          { pl: 'Piszę kredą na tablicy.', ru: 'Я пишу мелом на доске.' },
          { pl: 'Zapomniałem zeszytu.', ru: 'Я забыл тетрадь.' },
        ],
        enumeratives: [
          { pl: 'matematyka', ru: 'математика' },
          { pl: 'fizyka', ru: 'физика' },
          { pl: 'chemia', ru: 'химия' },
          { pl: 'biologia', ru: 'биология' },
          { pl: 'historia', ru: 'история' },
          { pl: 'geografia', ru: 'география' },
          { pl: 'język polski', ru: 'польский язык' },
          { pl: 'język angielski', ru: 'английский язык' },
          { pl: 'wychowanie fizyczne (WF)', ru: 'физкультура' },
          { pl: 'informatyka', ru: 'информатика' },
        ],
        hardWords: [
          { pl: 'uczyć się', ru: 'учиться' },
          { pl: 'uczeń', ru: 'ученик' },
          { pl: 'uczennica', ru: 'ученица' },
          { pl: 'pisać', ru: 'писать' },
          { pl: 'czytać', ru: 'читать' },
          { pl: 'pamiętać', ru: 'помнить' },
          { pl: 'zapomnieć', ru: 'забыть' },
          { pl: 'wiedzieć', ru: 'знать' },
        ],
      },
    ],
  },
  {
    id: 'stanag1',
    name: 'STANAG 1',
    lessons: [
      {
        id: 'stanag-1-lesson',
        name: 'STANAG 1 - Podstawy Wojskowe',
        icon: 'Shield',
        dialog: `- Привет, сержант! Как прошла сегодня тренировка?|Cześć, sierżancie! Jak poszedł dzisiejszy trening?
- Отлично, рядовой. Мы отрабатывали наземную операцию.|Świetnie, szeregowy. Ćwiczyliśmy operację lądową.
- Я слышал, что скоро будут военные учения.|Słyszałem, że wkrótce będą ćwiczenia wojskowe.
- Да, на военном полигоне. Мы должны быть готовы к защите Родины.|Tak, na poligonie wojskowym. Musimy być gotowi do obrony Ojczyzny.
- Я служу в армии уже три года. Это моя обязанность.|Służę w armii już trzy lata. To mój obowiązek.
- Хорошо, рядовой. Армия требует дисциплины и отваги. Сейчас время для рапорта.|Dobrze, szeregowy. Armia wymaga dyscypliny i odwagi. Teraz czas na raport.
- Разрешите доложить! Все системы вооружения в порядке.|Pozwólcie zameldować! Wszystkie systemy uzbrojenia są w porządku.
- Отлично. Мы должны быть готовы ко всему, даже к вооруженному нападению.|Doskonale. Musimy być gotowi na wszystko, nawet na napaść zbrojną.
- Так точно!|Tak jest!`,
        words: [
          { pl: 'wojna', ru: 'война' },
          { pl: 'operacja lądowa', ru: 'наземная операция' },
          { pl: 'ja służę w armii', ru: 'Я служу в армии' },
          { pl: 'armia', ru: 'Армия' },
          { pl: 'siły zbrojne', ru: 'Вооруженные силы' },
          { pl: 'ćwiczenia wojskowe', ru: 'военные учения' },
          { pl: 'poligon wojskowy', ru: 'военный полигон' },
          { pl: 'uzbrojenie', ru: 'вооружение' },
          { pl: 'desant', ru: 'приземление' },
          { pl: 'militaryzacja', ru: 'милитаризация' },
          { pl: 'linia ognia', ru: 'линия огня' },
          { pl: 'napaść zbrojna', ru: 'вооруженное нападение' },
          { pl: 'obrona ojczyzny', ru: 'защита Родины' },
          { pl: 'obrona państwa', ru: 'государственная оборона' },
          { pl: 'dowodzić', ru: 'командовать' },
          { pl: 'dowodzenie', ru: 'командование' },
          { pl: 'konflikt zbrojny', ru: 'вооруженный конфликт' },
          { pl: 'przeciwnik', ru: 'противник' },
          { pl: 'plan pokojowy', ru: 'мирный план' },
          { pl: 'sojusznik', ru: 'союзник' },
          { pl: 'raport', ru: 'отчет' },
          { pl: 'przysięga wojskowa', ru: 'военная присяга' },
        ],
        conjugations: [
          {
            title: 'Czasownik "служить" (służyć)',
            rows: [
              { pronoun: 'я', verb: 'служу' },
              { pronoun: 'ты', verb: 'служишь' },
              { pronoun: 'он/она', verb: 'служит' },
              { pronoun: 'мы', verb: 'служим' },
              { pronoun: 'вы', verb: 'служите' },
              { pronoun: 'они', verb: 'служат' },
            ],
          },
          {
            title: 'Czasownik "командовать" (dowodzić)',
            rows: [
              { pronoun: 'я', verb: 'командую' },
              { pronoun: 'ты', verb: 'командуешь' },
              { pronoun: 'он/она', verb: 'командует' },
              { pronoun: 'мы', verb: 'командуем' },
              { pronoun: 'вы', verb: 'командуете' },
              { pronoun: 'они', verb: 'командуют' },
            ],
          },
        ],
        unusualPhrases: [
          {
            pl: 'Służyć w armii',
            ru: 'Служить в армии',
            explanation: 'Używamy przyimka "в" (w) z miejscownikiem (prepositional case) dla instytucji takich jak armia.',
            examples: [
              { pl: 'On służy w marynarce wojennej.', ru: 'Он служит на флоте.' },
              { pl: 'Mój brat służy w wojsku.', ru: 'Мой брат служит в армии.' },
            ]
          },
          {
            pl: 'Obrona Ojczyzny',
            ru: 'Защита Родины',
            explanation: 'Wyrażenie "ochrona Ojczyzny" często występuje w języku rosyjskim jako stałe połączenie.',
          },
        ],
        sentences: [
          { pl: 'Rozpoczynają się ćwiczenia wojskowe.', ru: 'Начинаются военные учения.' },
          { pl: 'Dowodzę operacją lądową.', ru: 'Я командую наземной операцией.' },
          { pl: 'Obrona państwa to nasz obowiązek.', ru: 'Оборона государства - наша обязанность.' },
          { pl: 'Mamy nowego sojusznika.', ru: 'У нас новый союзник.' },
          { pl: 'Przygotowujemy raport.', ru: 'Мы готовим отчет.' },
        ],
        enumeratives: [
          { pl: 'Szeregowy', ru: 'Рядовой' },
          { pl: 'Kapral', ru: 'Ефрейтор' },
          { pl: 'Sierżant', ru: 'Сержант' },
          { pl: 'Starszy sierżant', ru: 'Старший сержант' },
          { pl: 'Chorąży', ru: 'Прапорщик' },
          { pl: 'Porucznik', ru: 'Лейтенант' },
          { pl: 'Kapitan', ru: 'Капитан' },
          { pl: 'Major', ru: 'Майор' },
          { pl: 'Pułkownik', ru: 'Полковник' },
          { pl: 'Generał', ru: 'Генерал' },
        ],
        hardWords: [
          { pl: 'pokój', ru: 'мир' },
          { pl: 'konflikt', ru: 'конфликт' },
          { pl: 'dyplomacja', ru: 'дипломатия' },
          { pl: 'stolica', ru: 'столица' },
          { pl: 'dowódca', ru: 'командир' },
          { pl: 'żołnierz', ru: 'солдат' },
          { pl: 'atak', ru: 'атака' },
          { pl: 'obrona', ru: 'оборона' },
          { pl: 'rozejm', ru: 'перемирие' },
          { pl: 'negocjacje', ru: 'переговоры' },
        ],
      },
    ],
  },
];