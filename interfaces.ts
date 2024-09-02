export interface IFlags {
    isChecking: boolean,
    isApiResult: boolean,
    isPost: boolean
}


export interface IOrderServiceModel {
    AccountId: number,
    Price: number
}

export interface ICreateOrderService {
    OrderServiceModel: IOrderServiceModel,
    IdServices: [number]
}

export interface IAuthorizedUser {
    username: string,
    password: string
}

//#region интерфейсы из MithraTrade
export interface IAddressModel {
    Id: number,
    StateProvinceId: number | null,
    CityId: number | null,
    CityName: string,
    CityDistrict: string,
    Address1: string,
    Address2: string,
    FullAddress: string,
    ZipPostalCode: string,
    StateProvince: string,
    PhoneNumber: string,
    Latitude: number | null,
    Longitude: number | null,
    CityFullName: string,
    AvailableStates: Array<ISelectListItem>,
    CountryId: number
}

export interface ISelectListItem {
    Text: string,
    Value: string,
    Group: null,
    Selected: boolean,
    Disabled: boolean,
}

export interface ILotFilterValueModel {
    FilterId: number,
    FilterValue: string,
    FilterValuesIds: Array<number>
}

export interface ICustomFiltersError {
    Filterid: number,
    IsValid: boolean,
    Message: string
}

export interface IErrorDictionary {
    [key: string]: Array<string>;
}

export interface IBuyType {
    Id: number,
    ParentId: number,
    Title: string,
    Description: string
}

export interface IPriceReduceTypeModel {
    Id: number,
    Description: string,
    IntervalDescription: string,
}

export interface IAvailableCategoryModel {
    Id: number,
    Name: string,
    SecondName:string,
    ParentId: number | null,
}

export interface ICompanyCustomerModel {
    Id: number,
    FIO: string,
    Status: string,
    HasCertificate: boolean,
}

export interface IPictureModel {
    PictureId: number,
    PictureFileName: string,
    DisplayNumber: number,
    Url: string,
    ContentType: string,
    PictureFile: any,
    FullUrl: string,
}

export interface IIntervalModel {
    Id: number,
    Ind: number | null,
    LotPriceReduceTypeId: number,
    CompanyId: number,
    LotId: number,
    LotInd: number,
    TradeSessionId: number,
    StartPriceDate: Date,
    ApplicationStartPriceDate: Date | null,
    ApplicationEndPriceDate: Date | null,
    EndPriceDate: Date,
    Comment: string,
    IntervalDeposite: number | null,
    IntervalStepName: string,
    IntervalStep: number | null,
    Price: number,
    LotApplicationPeriodStart: Date,
    BasePrice: number,
}  

export interface IDocumentModel {
    DocumentId: number,
    Name: string,
    Comment: string,
    DocumentTypeId: number,
    CreationDate: Date,
    IsSigned: boolean,
    SignStatusId: number | null,
    SignStatusDescription: string,
    DocumentTypeDescription: string,
    CurrentUserCanSign: boolean,
    SignatureLink: string,
    Signature: string,
    DataToSign: string
}

export interface ITagModel {
    Id: number,
    TagName: string,
}

export interface ILotModel {
    Id: number,
    Name: string,
    TradeId: number,
    TradeTypeId: number | null,
    IsOpenPriceForm: boolean | null,
    IsOpenForm: boolean | null,
    WithoutLegalForce: boolean | null,
    WithoutApplicationsAcceptance: boolean | null,
    TradeBuyTypeId: number | null,
    //Category: string,
    Information: string,
    BasePrice: number,
    BuyNowPrice: string,
    StepPercent: number | null,
    StepValue: number | null,
    StepDayInterval: number | null,
    PriceReduceTypeId: number | null,
    DepositType: string,
    DepositSize: string,
    DepositPercent: number | null,
    DepositDate: string,
    DepositReturnDate: string,
    DepositRules: string,
    DepositeIsRequired: boolean | null,
    RestartIsRequired: boolean | null,
    PriceReduceUnitMeasurement: string,
    PriceIncreaseUnitMeasurement: string,
    ReduceStepSize: number | null,
    IncreaseStepSize: number | null,
    IncreaseInvervalStart: number | null,
    IncreacseInvervalEnd: number | null,
    ReduceInterval: number | null,
    ReduceLimitValue: number | null,
    IsLegalForce: boolean,
    LotTradeStateId: number | null,
    OldStateId: number | null,
    CategoriesIds: Array<number | string>,

    LotApplicationPeriodStart: Date | null,
    LotApplicationPeriodEnd: Date | null,
    LotTradePeriodStart: Date | null,
    LotTradePeriodEnd: Date | null,
    ReductionLowerBoundPercent: number | null,
    DepositBankAccountId: number | null,
    PriceReduceAfterMinutes: number | null,
    TradePeriodEndAfterLastBetMinutes: number | null,
    BasePriceReducePercent: number | null,
    AuctionStepType:  number,

    AvailableBuyTypes: Array<IBuyType>,
    AvailableTradeTypes: Array<ISelectListItem>,
    AvailablePriceReduceTypes: Array<IPriceReduceTypeModel>,
    AvailablePriceIncreaseTypes: Array<IPriceReduceTypeModel>,
    AvailableDepositCalculationTypes: Array<ISelectListItem>,
    AvailableDepositBankAccounts: Array<ISelectListItem>,
    AvailableCategories: Array<IAvailableCategoryModel>,
    AvailableDocumentTypes: Array<ISelectListItem>,
    AvailableCompanyCustomers: Array<ICompanyCustomerModel>,

    Address: IAddressModel,
    FiltersValues: Array<ILotFilterValueModel>,
    Pictures: Array<IPictureModel>,
    Intervals: Array<IIntervalModel>,

    Documents: Array<IDocumentModel>,
    TradeCertifiedCustomers: Array<number>,

    Video: string,
    TradePeriodLength: number,
    AllowBids: boolean,
    Quantity: string,
    ShippingPaymentType: number | null,
    ShippingMethodId: number | null,
    PaymentMethodId: number | null,
    DealType: number | null,

    AvailableShippingMethods: Array<ISelectListItem>,
    AvailablePaymentMethods: Array<ISelectListItem>,
    AvailableShippingPaymentTypes: Array<ISelectListItem>,
    AvailableDealTypes: Array<ISelectListItem>,

    Tags: Array<ITagModel>

    IsClosedTrade: boolean,
    IsPreorder: boolean
}

export interface ILotEditorModel {
    Lot: ILotModel,
    ParentCategoryId: number | null,
    SubCategoryId: number | null,
    ThirdLevelCategoryId: number | null,
    ShowValidation: boolean,
    ImageFiles: Array<any>,
    ImagePath: any | null,
    Errors: IErrorDictionary,
    AvailableAllowTypes: Array<ISelectListItem>
    AvailableLengthPeriods: Array<ISelectListItem>,
    AvailableYesNoTypes: Array<ISelectListItem>,
    AvailableUnitsOfMeasurement: Array<ISelectListItem>,
    AvailableAuctionStepTypes: Array<ISelectListItem>,
    TradeStartType: number,
    AvailableCities: Array<any>,
    DepositeIsRequired: boolean | null,
    RestartIsRequired: boolean | null,
    TagsSearch: any,
    IsButtonLoading: boolean,
    IsApplied: boolean,
    LotUrl: string,
    FullLotUrl: string,
    CitiesLoaded: boolean,
    VideoErrorMessage: string,
    ActivateDate: Date| null,
    IsLegalForce: boolean,
    IsClosedTrade: boolean,
    IsPreorder: boolean,
    CustomFiltersError: Array<ICustomFiltersError>
}
//#endregion