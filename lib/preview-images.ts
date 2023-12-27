/* eslint-disable @typescript-eslint/no-unused-vars */

// Disabled because lqip-modern is Vulnerable

/* 
# npm audit report

sharp  <0.32.6
Severity: high
sharp vulnerability in libwebp dependency CVE-2023-4863 - https://github.com/advisories/GHSA-54xq-cgqr-rpm3
No fix available
node_modules/sharp
  lqip-modern  *
  Depends on vulnerable versions of sharp
  node_modules/lqip-modern

2 high severity vulnerabilities

Some issues need review, and may require choosing
a different dependency.
*/

import got from 'got'
// import lqip from 'lqip-modern'
import { ExtendedRecordMap, PreviewImage, PreviewImageMap } from 'notion-types'
import { getPageImageUrls, normalizeUrl } from 'notion-utils'
import pMap from 'p-map'
import pMemoize from 'p-memoize'

import { defaultPageCover, defaultPageIcon } from './config'
import { db } from './db'
import { mapImageUrl } from './map-image-url'

export async function getPreviewImageMap(
  recordMap: ExtendedRecordMap
): Promise<PreviewImageMap> {
  const urls: string[] = getPageImageUrls(recordMap, {
    mapImageUrl
  })
    .concat([defaultPageIcon, defaultPageCover])
    .filter(Boolean)

  const previewImagesMap = Object.fromEntries(
    await pMap(
      urls,
      async (url) => {
        const cacheKey = normalizeUrl(url)
        return [cacheKey, await getPreviewImage(url, { cacheKey })]
      },
      {
        concurrency: 8
      }
    )
  )

  return previewImagesMap
}

async function createPreviewImage(
  url: string,
  { cacheKey }: { cacheKey: string }
): Promise<PreviewImage | null> {
  return null
  // try {
  //   try {
  //     const cachedPreviewImage = await db.get(cacheKey)
  //     if (cachedPreviewImage) {
  //       return cachedPreviewImage
  //     }
  //   } catch (err) {
  //     // ignore redis errors
  //     console.warn(`redis error get "${cacheKey}"`, err.message)
  //   }

  //   const { body } = await got(url, { responseType: 'buffer' })
  //   const result = await lqip(body)
  //   console.log('lqip', { ...result.metadata, url, cacheKey })

  //   const previewImage = {
  //     originalWidth: result.metadata.originalWidth,
  //     originalHeight: result.metadata.originalHeight,
  //     dataURIBase64: result.metadata.dataURIBase64
  //   }

  //   try {
  //     await db.set(cacheKey, previewImage)
  //   } catch (err) {
  //     // ignore redis errors
  //     console.warn(`redis error set "${cacheKey}"`, err.message)
  //   }

  //   return previewImage
  // } catch (err) {
  //   console.warn('failed to create preview image', url, err.message)
  //   return null
  // }
}

export const getPreviewImage = pMemoize(createPreviewImage)
