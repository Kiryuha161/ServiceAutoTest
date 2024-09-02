import { IAddressModel, IAvailableCategoryModel, IBuyType, ICompanyCustomerModel, ILotModel, IPriceReduceTypeModel, ISelectListItem } from './interfaces';

const currentDate = new Date();
const daysToAdd = 7;
const LotApplicationPeriodEnd = new Date(currentDate);
LotApplicationPeriodEnd.setDate(currentDate.getDate() + daysToAdd);

const availableStates: ISelectListItem[] = [
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Адыгея', Value: '77' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Алтай', Value: '80' },
    { Disabled: false, Group: null, Selected: false, Text: 'край. Алтайский', Value: '98' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Амурская', Value: '104' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Архангельская', Value: '105' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Астраханская', Value: '106' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Башкортостан', Value: '78' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Белгородская', Value: '107' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Брянская', Value: '108' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Бурятия', Value: '79' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Владимирская', Value: '109' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Волгоградская', Value: '110' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Вологодская', Value: '111' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Воронежская', Value: '112' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Дагестан', Value: '81' },
    { Disabled: false, Group: null, Selected: false, Text: 'аобл. Еврейская', Value: '153' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Ивановская', Value: '113' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Ингушетия', Value: '82' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Иркутская', Value: '114' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Кабардино-Балкарская', Value: '83' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Калининградская', Value: '115' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Калмыкия', Value: '84' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Калужская', Value: '116' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Камчатская', Value: '117' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Карачаево-Черкесская', Value: '85' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Карелия', Value: '86' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Кемеровская', Value: '118' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Кировская', Value: '119' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Коми', Value: '87' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Костромская', Value: '120' },
    { Disabled: false, Group: null, Selected: false, Text: 'край. Краснодарский', Value: '99' },
    { Disabled: false, Group: null, Selected: false, Text: 'край. Красноярский', Value: '100' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Курганская', Value: '121' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Курская', Value: '122' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Ленинградская', Value: '123' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Липецкая', Value: '124' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Магаданская', Value: '125' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Марий Эл', Value: '88' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Мордовия', Value: '89' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Московская', Value: '126' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Мурманская', Value: '127' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Нижегородская', Value: '128' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Новгородская', Value: '129' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Новосибирская', Value: '130' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Омская', Value: '131' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Оренбургская', Value: '132' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Орловская', Value: '133' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Пензенская', Value: '134' },
    { Disabled: false, Group: null, Selected: false, Text: 'край. Пермский', Value: '135' },
    { Disabled: false, Group: null, Selected: false, Text: 'край. Приморский', Value: '101' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Псковская', Value: '136' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Ростовская', Value: '137' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Рязанская', Value: '138' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Самарская', Value: '139' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Саратовская', Value: '140' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Саха /Якутия/', Value: '90' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Сахалинская', Value: '141' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Свердловская', Value: '142' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Северная Осетия - Алания', Value: '91' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Смоленская', Value: '143' },
    { Disabled: false, Group: null, Selected: false, Text: 'край. Ставропольский', Value: '102' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Тамбовская', Value: '144' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Татарстан', Value: '92' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Тверская', Value: '145' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Томская', Value: '146' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Тульская', Value: '147' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Тыва', Value: '93' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Тюменская', Value: '148' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Удмуртская', Value: '94' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Ульяновская', Value: '149' },
    { Disabled: false, Group: null, Selected: false, Text: 'край. Хабаровский', Value: '103' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Хакасия', Value: '95' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Челябинская', Value: '150' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Чеченская', Value: '96' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Читинская', Value: '151' },
    { Disabled: false, Group: null, Selected: false, Text: 'респ. Чувашская', Value: '97' },
    { Disabled: false, Group: null, Selected: false, Text: 'обл. Ярославская', Value: '152' },
]

const availableBuyTypes: IBuyType[] = [
    { Id: 1, ParentId: null, Title: 'Закупка', Description: 'Закупка' },
    { Id: 2, ParentId: null, Title: 'Продажа', Description: 'Продажа' }
]

const availableCategories: IAvailableCategoryModel[] = [
    { Id: 81, Name: 'Квартира', SecondName: null, ParentId: 28 },
    { Id: 82, Name: 'Квартира в новостройке', SecondName: null, ParentId: 28 },
    { Id: 83, Name: 'Комната', SecondName: null, ParentId: 28 },
    { Id: 84, Name: 'Доля в квартире', SecondName: null, ParentId: 28 },
    { Id: 90, Name: 'Коттедж', SecondName: null, ParentId: 28 },
    { Id: 91, Name: 'Таунхаус', SecondName: null, ParentId: 28 },
    { Id: 92, Name: 'Дом/Дача', SecondName: null, ParentId: 28 },
    { Id: 95, Name: 'Часть дома', SecondName: null, ParentId: 28 },
    { Id: 96, Name: 'Земельный участок', SecondName: null, ParentId: 28 },
    { Id: 129, Name: 'Легковые автомобили', SecondName: 'Легковые автомобили', ParentId: 17 },
    { Id: 72, Name: 'Офис', SecondName: null, ParentId: 29 },
    { Id: 2, Name: 'Объекты недвижимости', SecondName: 'Недвижимость', ParentId: null },
    { Id: 17, Name: 'Автомобили', SecondName: 'Транспорт', ParentId: null },
    { Id: 28, Name: 'Жилая', SecondName: null, ParentId: 2 },
    { Id: 29, Name: 'Коммерческая', SecondName: null, ParentId: 2 },
    { Id: 73, Name: 'Здание', SecondName: null, ParentId: 29 },
    { Id: 74, Name: 'Торговая площадь', SecondName: null, ParentId: 29 },
    { Id: 75, Name: 'Помещение свободного назначения', SecondName: null, ParentId: 29 },
    { Id: 76, Name: 'Производство', SecondName: null, ParentId: 29 },
    { Id: 77, Name: 'Склад', SecondName: null, ParentId: 29 },
    { Id: 78, Name: 'Гараж', SecondName: null, ParentId: 29 },
    { Id: 79, Name: 'Готовый бизнес', SecondName: null, ParentId: 29 },
    { Id: 80, Name: 'Коммерческая земля', SecondName: null, ParentId: 29 }
]

const availableDocumentTypes = [
    { Disabled: false, Group: null, Selected: false, Text: 'Техническая документация', Value: '2' },
    { Disabled: false, Group: null, Selected: false, Text: 'Договор о задатке', Value: '4' },
    { Disabled: false, Group: null, Selected: false, Text: 'Проект договора купли-продажи имущества (предприятия)', Value: '5' },
    { Disabled: false, Group: null, Selected: false, Text: 'Копия выписки из Единого государственного реестра юридических лиц', Value: '6' },
    { Disabled: false, Group: null, Selected: false, Text: 'Копия выписки из Единого государственного реестра инидивидуальных предпринимателей', Value: '7' },
    { Disabled: false, Group: null, Selected: false, Text: 'Копия учредительного документа', Value: '8' },
    { Disabled: false, Group: null, Selected: false, Text: 'Копия документа, удостоверяющего личность', Value: '9' },
    { Disabled: false, Group: null, Selected: false, Text: 'Перевод на русский язык документов о регистрации', Value: '10' },
    { Disabled: false, Group: null, Selected: false, Text: 'Копии документов, подтверждающих полномочия руководителя', Value: '11' },
    { Disabled: false, Group: null, Selected: false, Text: 'Копия решения об одобрении или о совершении крупной сделки', Value: '12' },
    { Disabled: false, Group: null, Selected: false, Text: 'Cведения о наличии/отсутствии заинтересованности заявителя', Value: '13' },
    { Disabled: false, Group: null, Selected: false, Text: 'Cведения о заявителе', Value: '15' },
    { Disabled: false, Group: null, Selected: false, Text: 'Свидетельство о постановке на учет организации в налоговом органе', Value: '17' },
    { Disabled: false, Group: null, Selected: false, Text: 'Доверенность', Value: '22' },
    { Disabled: false, Group: null, Selected: false, Text: 'Сведения об идентификационном номере налогоплательщика', Value: '30' },
    { Disabled: false, Group: null, Selected: false, Text: 'Изображение', Value: '31' },
    { Disabled: false, Group: null, Selected: false, Text: 'Подтверждение соответствия требованиям к участникам закрытых торгов', Value: '32' },
    { Disabled: false, Group: null, Selected: false, Text: 'Другой документ', Value: '34' },
    { Disabled: false, Group: null, Selected: false, Text: 'Квитанция об оплате задатка', Value: '49' }
]

const availablePaymentMethods = [
    { Disabled: false, Group: null, Selected: false, Text: 'Банковский перевод', Value: '2' },
    { Disabled: false, Group: null, Selected: false, Text: 'Наличными при встрече', Value: '5' },
    { Disabled: false, Group: null, Selected: false, Text: 'По договоренности', Value: '1' },
    { Disabled: false, Group: null, Selected: false, Text: 'Онлайн-перевод (WebMoney, Яндекс.Деньги и др.)', Value: '3' },
    { Disabled: false, Group: null, Selected: false, Text: 'Почтовый перевод (в т.ч. наложенный платеж)', Value: '4' }
]

const address: IAddressModel = {
    Address1: null,
    Address2: null,
    AvailableStates: availableStates,
    CityDistrict: null,
    CityFullName: null,
    CityId: null,
    CityName: null,
    CountryId: 0,
    FullAddress: null,
    Id: 0,
    Latitude: null,
    Longitude: null,
    PhoneNumber: null,
    StateProvince: null,
    StateProvinceId: null,
    ZipPostalCode: null,
}

const availableShippingMethods = [
    { Disabled: false, Group: null, Selected: false, Text: 'Курьерская доставка', Value: '2' },
    { Disabled: false, Group: null, Selected: false, Text: 'Личная встреча', Value: '3' },
    { Disabled: false, Group: null, Selected: false, Text: 'Самовывоз', Value: '4' },
    { Disabled: false, Group: null, Selected: false, Text: 'Почта России', Value: '1' },
]

const availablePriceReduceTypes: IPriceReduceTypeModel[] = [
    { Id: 2, Description: 'Цена на интервале задается как цена на предыдущем интервале минус процент снижения от начальной цены', IntervalDescription: 'Снижение от начальной цены, проценты' },
    { Id: 1, Description: 'Цена на интервале задается как снижение в рублях от начальной цены', IntervalDescription: 'Снижение от начальной цены, рубли' },
    { Id: 5, Description: 'Цена на интервале фиксированная и устанавливается вручную', IntervalDescription: 'Фиксированная цена, рубли' }
]

const availableTradeTypes = [
    { Disabled: false, Group: null, Selected: true, Text: 'Открытый Аукцион', Value: '1' },
    { Disabled: false, Group: null, Selected: false, Text: 'Закрытый Аукцион', Value: '32' },
    { Disabled: false, Group: null, Selected: false, Text: 'Англо-голландский аукцион', Value: '37' }
]

const availableCompanyCustomers: ICompanyCustomerModel[] = [
    { Id: 1795, FIO: 'Тестов Тест Тестович', Status: 'Активен', HasCertificate: true }
]

const availableDealTypes = [
    { Disabled: false, Group: null, Selected: false, Text: 'Предоплата', Value: '1' },
    { Disabled: false, Group: null, Selected: false, Text: 'Оплата при получении', Value: '2' }
]

const availableDepositCalculationTypes = [
    { Disabled: false, Group: null, Selected: false, Text: 'Фиксированная сумма', Value: '1' },
    { Disabled: false, Group: null, Selected: false, Text: 'Процент от базовой цены', Value: '2' }
]

const availableShippingPaymentTypes = [
    { Disabled: false, Group: null, Selected: false, Text: 'Покупатель', Value: '1' },
    { Disabled: false, Group: null, Selected: false, Text: 'Продавец', Value: '2' }
]

const lot: ILotModel = {
    Address: address,
    AllowBids: true,
    AuctionStepType: 0,
    AvailableBuyTypes: availableBuyTypes,
    AvailableCategories: availableCategories,
    AvailableCompanyCustomers: availableCompanyCustomers,
    AvailableDealTypes: availableDealTypes,
    AvailableDepositBankAccounts: [],
    AvailableDepositCalculationTypes: availableDepositCalculationTypes,
    AvailableDocumentTypes: availableDocumentTypes,
    AvailablePaymentMethods: availablePaymentMethods,
    AvailablePriceIncreaseTypes: [],
    AvailablePriceReduceTypes: availablePriceReduceTypes,
    AvailableShippingMethods: availableShippingMethods,
    AvailableShippingPaymentTypes: availableShippingPaymentTypes,
    AvailableTradeTypes: availableTradeTypes,
    BasePrice: null,
    BasePriceReducePercent: null,
    BuyNowPrice: null,
    CategoriesIds: [],
    DealType: null,
    DepositBankAccountId: null,
    DepositDate: null,
    DepositPercent: null,
    DepositReturnDate: null,
    DepositRules: null,
    DepositSize: null,
    DepositType: null,
    DepositeIsRequired: null,
    Documents: [],
    FiltersValues: [],
    Id: 0,
    IncreacseInvervalEnd: null,
    IncreaseInvervalStart: null,
    IncreaseStepSize: null,
    Information: null,
    Intervals: [],
    IsClosedTrade: false,
    IsLegalForce: false,
    IsOpenForm: true,
    IsOpenPriceForm: true,
    IsPreorder: false,
    LotApplicationPeriodEnd: null,
    LotApplicationPeriodStart: null,
    LotTradePeriodEnd: currentDate,
    LotTradePeriodStart: null,
    LotTradeStateId: 1,
    Name: "Тест автоматизированного создания лотов",
    OldStateId: null,
    PaymentMethodId: null,
    Pictures: [],
    PriceIncreaseUnitMeasurement: null,
    PriceReduceAfterMinutes: null,
    PriceReduceTypeId: null,
    PriceReduceUnitMeasurement: null,
    Quantity: "1",
    ReduceInterval: null,
    ReduceLimitValue: null,
    ReduceStepSize: null,
    ReductionLowerBoundPercent: null,
    RestartIsRequired: null,
    ShippingMethodId: null,
    ShippingPaymentType: null,
    StepDayInterval: null,
    StepPercent: null,
    StepValue: null,
    Tags: [],
    TradeBuyTypeId: 2,
    TradeCertifiedCustomers: [],
    TradeId: 0,
    TradePeriodEndAfterLastBetMinutes: null,
    TradePeriodLength: 0,
    TradeTypeId: 1,
    Video: null,
    WithoutApplicationsAcceptance: true,
    WithoutLegalForce: true
};

export { lot };