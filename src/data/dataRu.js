let wordsRu = [
    "дима","машина","бимба","дорога","идти",
     "дом",'абажур', 'аванс', 'агент', 'адрес', 'академия', 'аккумулятор', 'алгоритм', 'аллергия', 'альбом', 'амплуа',
     'анекдот', 'анимация', 'апельсин', 'арбуз', 'арена', 'ассорти', 'астрономия', 'атлас', 'атом', 'аудитория',
     'аэропорт', 'аятолла', 'бабушка', 'багаж', 'базар', 'баклажан', 'балкон', 'банан', 'банк', 'бассейн',
     'бахрома', 'башка', 'бегемот', 'беда', 'беженец', 'бездна', 'белка', 'белочка', 'бензин', 'билет',
     'бинт', 'биология', 'биоритм', 'бисер', 'битва', 'благо', 'блеск', 'блин', 'блок', 'блондинка',
     'блюдо', 'бокал', 'бор', 'борт', 'ботинок', 'бочка', 'боярин', 'брат', 'бревно', 'бригада',
     'бритва', 'бронза', 'брошь', 'брызги', 'бтр', 'бублик', 'будка', 'будущее', 'буква', 'булка',
     'бульвар', 'бум', 'буря', 'бутерброд', 'буфет', 'быль', 'бюргер', 'бюст', 'бюстгальтер', 'вагон',
     'вал', 'валенок', 'вампир', 'варежка', 'василек', 'ваучер', 'ведерко', 'век', 'велосипед', 'вена',
     'верблюд', 'верстак', 'вертушка', 'весы', 'ветер', 'вечер', 'вибрация', 'визг', 'винегрет', 'вино',
     'вираж', 'виртуоз', 'виски', 'витамин', 'витрина', 'вишня', 'вкус', 'власть', 'внутренность', 'вода',
     'вождь', 'возитка', 'воздух', 'волки', 'волос', 'вопрос', 'ворона', 'восьмерка', 'враг', 'врач',
     'вред', 'вскрытие', 'вспышка', 'встреча', 'вторник', 'вулкан', 'вундеркинд', 'вход', 'въезд', 'выход',
     'вьюга', 'вязание', 'гадость', 'газ', 'галактика', 'гараж', 'гастроли', 'гвоздика', 'генерал', 'герой',
     'героиня', 'гигант', 'гимназия', 'гипс', 'гитара', 'глава', 'глобус', 'голубь', 'горло', 'горошек',
     'горшок', 'гость', 'грабли', 'градус', 'грамматика', 'график', 'гриб', 'гром', 'груз', 'груша',
     'гряда', 'губа', 'губка', 'гудок', 'гусеница', 'дамба', 'дача', 'дверь', 'двигатель', 'двор',
     'дгст', 'дед', 'декабрь', 'деколь', 'дело', 'демократия', 'день', 'депо', 'деревня', 'десерт',
     'детектив', 'джаз', 'дзюдо', 'диван', 'дикобраз', 'диплом', 'диск', 'дитя', 'дичь', 'дно',
     'добро', 'добро', 'дождь', 'доктор', 'долг', 'долг', 'дом', 'домино', 'допинг', 'дорога',
     'дочь', 'дрова', 'дума', 'дурак', 'дыхание', 'дым', 'дятел', 'егерь', 'еда', 'ежедневник',
     'ежик', 'езда', 'известность', 'износ', 'изображение', 'изумруд', 'икра', 'именины', 'июль', 'июнь',
     'июнь', 'июнь', 'календарь', 'камера', 'капля', 'каракуль', 'карандаш', 'карман', 'карта', 'кассета',
     'катер', 'кафедра', 'квартал', 'кедр', 'кекс', 'кельт', 'кентавр', 'керосин', 'кетчуп', 'кидание',
     'килограмм', 'кино', 'клавиша', 'класс', 'клей', 'кольцо', 'команда', 'комар', 'комплекс', 'конвейер',
     'конец', 'конь', 'корень', 'коса', 'кости', 'кот', 'крахмал', 'кресло', 'крыша', 'круг',
     'крышка', 'куб', 'кузов', 'кукла', 'кулак', 'курс', 'кусок', 'лабиринт', 'ладонь', 'лед',
     'лев', 'легенда', 'лед', 'лес', 'лидер', 'личность', 'лоб', 'лодка', 'ложка', 'локоть',
     'лопата', 'лужа', 'любовь', 'люди', 'лямка', 'ляпис', 'магия', 'май', 'май', 'май',
     'майник', 'машина', 'мгла', 'мебель', 'медведь', 'медсестра', 'мелодия', 'меню', 'месяц', 'миг',
     'миграция', 'минус', 'младенец', 'множество', 'мозг', 'молния', 'молоток', 'молчание', 'момент', 'море',
     'мороз', 'морс', 'москит', 'мост', 'мотоцикл', 'моча', 'мудрость', 'музей', 'музыка', 'набережная',
     'набор', 'навык', 'наглость', 'надежда', 'наивность', 'направление', 'наручники', 'насмешка', 'наушники', 'неделя',
     'незнакомец', 'немец', 'неон', 'нептун', 'нерв', 'нет', 'нефть', 'ния', 'носки', 'нож',
     'ножницы', 'номер', 'ночь', 'ночь', 'ночь', 'ночь', 'нюанс', 'няня', 'обед', 'обед', 'обед',
     'обычай', 'овал', 'огонь', 'огурец', 'одежда', 'одесса', 'один', 'озеро', 'озон', 'окно',
     'оказия', 'округ', 'олень', 'опера', 'опора', 'орган', 'оргия', 'орден', 'орел', 'орех',
     'оркестр', 'орочи', 'осень', 'отель', 'оторванность', 'офис', 'охрана', 'охота', 'оценка', 'очки',
     'пакет', 'палка', 'палец', 'память', 'панель', 'пара', 'парк', 'пароль', 'пассажир', 'пасть',
     'патрон', 'пация', 'певец', 'пекарь', 'пенсия', 'перевод', 'переулок', 'песня', 'петух', 'печать',
     'печень', 'пила', 'пират', 'пирог', 'план', 'платформа', 'платье', 'плита', 'плюс', 'поезд',
     'подарок', 'пол', 'поле', 'помощь', 'понедельник', 'поощрение', 'попугай', 'пост', 'пот', 'пол',
     'похититель', 'праздник', 'принц', 'приветствие', 'прикол', 'приложение', 'пробка', 'проект', 'профессия', 'пруд',
     'психология', 'птица', 'подарок', 'пункт', 'пуля', 'путешествие', 'пучок', 'пятно', 'пяточек', 'работа',
    ];
export default wordsRu;