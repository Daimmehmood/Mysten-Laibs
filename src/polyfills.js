// Polyfills for Sui SDK
import { TextEncoder, TextDecoder } from 'util'
import { Buffer } from 'buffer'

if (typeof global !== 'undefined') {
  global.Buffer = Buffer
  global.TextEncoder = TextEncoder
  global.TextDecoder = TextDecoder
}

if (typeof window !== 'undefined') {
  window.Buffer = Buffer
  window.TextEncoder = TextEncoder
  window.TextDecoder = TextDecoder
}
