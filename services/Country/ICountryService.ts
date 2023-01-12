export interface ICountryService {
    getCountries(): Promise<any>
    getRegionCountry(region: string): Promise<any>
    searchCountries(value:string):Promise<any>
}