import { Injectable } from '@angular/core';
import { PHRASES } from './mock-data';
import { Phrase } from './phrase.class';

const phrasesPromise: Promise<Phrase[]> = new Promise((resolve) => {
  setTimeout(() => {
    resolve(PHRASES)
  }, 3000)
})

@Injectable({
  providedIn: 'root'
})
export class PhraseService {

  constructor() { }

  getAllPhrases(): Promise<Phrase[]> {
    return phrasesPromise
  }

  getPhrase(id: number): Promise<Phrase | undefined> {
    return phrasesPromise
    .then(phrases => phrases.find(phrase => phrase.id === id))
  }
}
