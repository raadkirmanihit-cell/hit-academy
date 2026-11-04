// Basic voice for the coach prototype, using the browser's built-in speech features.
// The launched product would use a proper speech service on our own server instead.
import { useEffect, useRef, useState } from 'react'

const synth = () => (typeof window !== 'undefined' ? window.speechSynthesis : null)
const Recognition = () => (typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null)

// Spoken text: no markdown, no *stage directions*, no bullet dashes.
export function speakable(text) {
  return String(text)
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*[^*]+\*/g, ' ')
    .replace(/^\s*[-•]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// Prefer natural-sounding English voices where the browser has them.
function pickVoice(alt) {
  const s = synth(); if (!s) return null
  const voices = s.getVoices().filter((v) => /^en[-_]/i.test(v.lang))
  if (!voices.length) return null
  const rank = (v) => (/natural|neural|online/i.test(v.name) ? 0 : /google|samantha|daniel|serena|karen|moira|aria|jenny|guy|libby|ryan/i.test(v.name) ? 1 : 2)
  const sorted = [...voices].sort((a, b) => rank(a) - rank(b))
  return sorted[alt && sorted.length > 1 ? 1 : 0]
}

const micAllowedByPage = () => {
  try { return document.featurePolicy?.allowsFeature ? document.featurePolicy.allowsFeature('microphone') : true } catch { return true }
}

// How long the learner can pause before their spoken turn is sent, and how long to wait for them to start.
export const PAUSE_MS = 4000
const NOTHING_MS = 12000

export function useVoice({ alt = false } = {}) {
  const canSpeak = !!synth()
  const [canListen, setCanListen] = useState(() => !!Recognition() && micAllowedByPage())
  const [listening, setListening] = useState(false)
  const [voiceOn, setVoiceOn] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [micNote, setMicNote] = useState('')
  const rec = useRef(null)

  useEffect(() => {
    const s = synth(); if (!s) return
    s.getVoices() // some browsers load the voice list lazily
    return () => { s.cancel(); rec.current?.abort?.() }
  }, [])

  // onEnd runs when the reply has been spoken (used by hands-free mode to open the microphone).
  function speak(text, onEnd) {
    const s = synth(); if (!s) { onEnd?.(); return }
    s.cancel()
    const u = new SpeechSynthesisUtterance(speakable(text))
    const v = pickVoice(alt); if (v) { u.voice = v; u.lang = v.lang } else u.lang = 'en-GB'
    u.rate = 1; u.pitch = alt ? 0.95 : 1
    u.onstart = () => setSpeaking(true)
    u.onend = () => { setSpeaking(false); onEnd?.() }
    u.onerror = () => setSpeaking(false)
    s.speak(u)
  }
  function stopSpeaking() { synth()?.cancel(); setSpeaking(false) }

  // Listens for one turn; streams the words into onText and calls onFinal with the full text and how long
  // the learner spoke ({ secs }), measured from the first to the last word heard.
  // The turn ends after a silence of pauseMs (so a short, deliberate pause doesn't cut the learner off),
  // or when the learner taps the microphone again.
  function listen(onText, onFinal, onNothing, { pauseMs = PAUSE_MS } = {}) {
    const R = Recognition(); if (!R) return
    if (listening) { rec.current?.stop(); return }
    stopSpeaking()
    const r = new R()
    r.lang = 'en-US'; r.interimResults = true; r.continuous = true; r.maxAlternatives = 1
    let finalText = '', first = 0, last = 0, timer = 0
    const stopAfter = (ms) => { clearTimeout(timer); timer = setTimeout(() => { try { r.stop() } catch { /* already stopped */ } }, ms) }
    stopAfter(NOTHING_MS) // give up if nothing is said at all
    r.onresult = (e) => {
      const now = performance.now(); if (!first) first = now; last = now
      stopAfter(pauseMs)
      let interim = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalText += e.results[i][0].transcript
        else interim += e.results[i][0].transcript
      }
      onText((finalText + interim).trim())
    }
    r.onerror = (e) => {
      if (['not-allowed', 'service-not-allowed', 'audio-capture'].includes(e.error)) {
        setCanListen(false)
        setMicNote('The microphone isn\'t available here. Please type instead, or check your browser\'s microphone permission.')
      }
    }
    r.onend = () => {
      clearTimeout(timer)
      setListening(false)
      // The first result arrives about half a second after speech starts.
      if (finalText.trim()) onFinal(finalText.trim(), { secs: first ? Math.max(0.5, (last - first) / 1000 + 0.5) : 0 })
      else onNothing?.()
    }
    rec.current = r
    try { r.start(); setListening(true); setMicNote('') } catch { setListening(false) }
  }

  // Where the page can't use the microphone itself, the device's own dictation still works in the text box.
  function dictationTip() {
    const ua = navigator.userAgent || ''
    const how = /iPhone|iPad|Android/i.test(ua) ? 'tap the microphone on your keyboard'
      : /Mac/i.test(ua) ? 'click in the text box and press the Fn key twice (or Globe+D) to start dictation'
      : /Windows/i.test(ua) ? 'click in the text box and press Windows key + H to start dictation'
      : 'use your device\'s dictation feature in the text box'
    setMicNote(`The microphone can't be used directly in this preview. To speak instead of typing, ${how}. Replies can still be read aloud with Voice on.`)
  }

  return { canSpeak, canListen, listening, voiceOn, setVoiceOn, speaking, speak, stopSpeaking, listen, micNote, dictationTip }
}
