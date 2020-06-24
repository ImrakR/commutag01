import { ptLangPathCorrector } from '../ptLangPathCorrector'
import { format } from 'url'

describe('ptLangPathCorrector', () => {
  const lang = 'es'
  const allLanguages = ['es', 'en', 'it']

  it('throws if href is not a string or object', () => {
    expect(() => ptLangPathCorrector(undefined, undefined, lang, allLanguages))
      .toThrowError(
        '\'href\' type must be either \'string\' or \'object\', but it is undefined',
      )
  })

  it('throws if as is not undefined or a string', () => {
    expect(() => ptLangPathCorrector(10, '/', lang, allLanguages))
      .toThrowError(
        '\'as\' type must be \'string\', but it is number',
      )
  })

  it('adds lang to no args Links', () => {
    const href = '/'
    const result = ptLangPathCorrector(undefined, href, lang, allLanguages)

    expect(result.as).toEqual('/es')
    expect(result.href)
      .toEqual(expect.objectContaining({
        pathname: '/[lang]/',
        query: {
          lang: 'es'
        }
      }))
    
    expect(format(result.href)).toEqual('/[lang]/?lang=es')
  })

  it('adds lang to basic href Links', () => {
    const href = '/deposit'
    const result = ptLangPathCorrector(undefined, href, lang, allLanguages)

    expect(result.as).toEqual('/es/deposit')
    expect(result.href)
      .toEqual(expect.objectContaining({
        pathname: '/[lang]/deposit',
        query: {
          lang: 'es'
        }
      }))

    expect(format(result.href)).toEqual('/[lang]/deposit?lang=es')
  })

  it('adds lang to complex href Links', () => {
    const href = `/deposit?mode=swapping&ticker=Dai`

    const result = ptLangPathCorrector(undefined, href, lang, allLanguages)

    expect(result.as).toEqual('/es/deposit?mode=swapping&ticker=Dai')
    expect(result.href)
      .toEqual(expect.objectContaining({
        pathname: '/[lang]/deposit',
        query: {
          lang: 'es',
          mode: 'swapping',
          ticker: 'Dai'
        }
      }))

    expect(format(result.href)).toEqual(`/[lang]/deposit?mode=swapping&ticker=Dai&lang=es`)
  })

  it('preserves hash, if it exists', () => {
    const href = {
      pathname: `/deposit`,
      hash: `#home`,
      query: {
        mode: 'swapping',
        ticker: 'Dai'
      }
    }
    const result = ptLangPathCorrector(undefined, href, lang, allLanguages)

    expect(result.as).toEqual('/es/deposit?mode=swapping&ticker=Dai#home')
    expect(result.href)
      .toEqual(expect.objectContaining({
        pathname: '/[lang]/deposit',
        query: {
          lang: 'es',
          mode: 'swapping',
          ticker: 'Dai'
        }
      }))

    expect(format(result.href)).toEqual(`/[lang]/deposit?mode=swapping&ticker=Dai&lang=es#home`)
  })

  describe('using as', () => {
    it('does not remove lang from as when lang is provided', () => {
      const as = '/es/foo'
      const href = `/deposit?mode=swapping&ticker=Dai&lang=es`
      const result = ptLangPathCorrector(as, href, lang, allLanguages)

      expect(result.as).toEqual('/es/foo')
      expect(result.href)
        .toEqual(expect.objectContaining({
          pathname: '/[lang]/deposit',
          query: {
            lang: 'es',
            mode: 'swapping',
            ticker: 'Dai'
          }
        }))

      expect(format(result.href)).toEqual(`/[lang]/deposit?mode=swapping&ticker=Dai&lang=es`)
    })

    it('adds non-default language to as and href.query', () => {
      const as = '/foo'
      const href = `/somewhere/else?option1=value1#hash1`
      const result = ptLangPathCorrector(as, href, lang, allLanguages)

      expect(result.as).toEqual('/es/foo')
      expect(result.href).toEqual(expect.objectContaining({
        pathname: '/[lang]/somewhere/else',
        hash: '#hash1',
        query: {
          lang: 'es',
          option1: 'value1',
        },
      }))
      expect(format(result.href)).toEqual('/[lang]/somewhere/else?option1=value1&lang=es#hash1')
    })
  })
})