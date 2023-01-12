import { injectable } from "inversify";
import { $axios } from "~/utils/api";

@injectable()
export class CountryService {
    async getCountries() {
        try {
            const res = await $axios.$get('/all');
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async getRegionCountry(region: string) {
        try {
            const res = await $axios.$get(`/region/${region}`);
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async searchCountries(value: string) {
        try {
            const res = await $axios.$get(`/name/${value}`);
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject(error)
        }
    }
}