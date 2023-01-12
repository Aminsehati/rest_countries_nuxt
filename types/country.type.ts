export class Country {
    name!: string
    image!: string
    nativeName!: string
    population!: string
    region!: StaticRange
    languages!: Language[]
    subregion!:string
    capital!:string
    bordersCountry!:string[]
    topLevel!:string[]
    currencies!:Currency[]
}
class Language {
    iso639_1!: string
    iso639_2!: string
    name!: string
    nativeName!: string
}

export class Currency {
    code!:string
    name!:string
    symbol!:string
}
