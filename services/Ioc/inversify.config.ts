import 'reflect-metadata'
import { Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'
import { ICountryService } from '../Country/ICountryService';
import { CountryService } from '../Country/CountryService';
import { SYMBOLS } from './SYMBOLS';
export const container = new Container();

// ! logics
container.bind<ICountryService>(SYMBOLS.ICountryService).to(CountryService).inTransientScope()


export const { lazyInject } = getDecorators(container)