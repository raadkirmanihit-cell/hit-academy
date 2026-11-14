// Saved coach chats and the optional coach profile.
// Live site: in the student's account (database update 11). Until that update is run, and in the
// preview, they are kept in this browser instead, so nothing is lost either way.
import { backend } from '../platform/backend.js'
import { readJSON, writeJSON } from '../platform/storage.js'

const K = { chats: (u) => `hit.coach.chats.${u}`, profile: (u) => `hit.coach.profile.${u}` }
const MAX_LOCAL = 60
let useLocal = !backend.coachChats // the preview backend has no coach tables

const localChats = (u) => readJSON(K.chats(u), [])
function writeLocal(u, list) { writeJSON(K.chats(u), list.slice(0, MAX_LOCAL)) }

export const newId = () => (globalThis.crypto?.randomUUID ? crypto.randomUUID() : 'c-' + Math.random().toString(36).slice(2) + Date.now().toString(36))

export async function loadChats(userId) {
  if (!useLocal) {
    try {
      const remote = await backend.coachChats(userId)
      // Chats kept in the browser before update 11 was run move into the account once.
      const local = localChats(userId).filter((c) => !remote.some((r) => r.id === c.id))
      for (const c of local) await backend.saveCoachChat(userId, c).catch(() => {})
      if (local.length) writeLocal(userId, [])
      return [...remote, ...local].sort(byNewest)
    } catch { useLocal = true }
  }
  return localChats(userId).sort(byNewest)
}
const byNewest = (a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)

export async function saveChat(userId, chat) {
  if (!useLocal) {
    try { await backend.saveCoachChat(userId, chat); return } catch { useLocal = true }
  }
  writeLocal(userId, [chat, ...localChats(userId).filter((c) => c.id !== chat.id)].sort(byNewest))
}

export async function deleteChat(userId, id) {
  if (!useLocal) {
    try { await backend.deleteCoachChat(userId, id); return } catch { useLocal = true }
  }
  writeLocal(userId, localChats(userId).filter((c) => c.id !== id))
}

export async function loadProfile(userId) {
  if (!useLocal) {
    try { return (await backend.coachProfile(userId)) || readJSON(K.profile(userId), null) } catch { useLocal = true }
  }
  return readJSON(K.profile(userId), null)
}

export async function saveProfile(userId, data) {
  if (!useLocal) {
    try { await backend.saveCoachProfile(userId, data); return } catch { useLocal = true }
  }
  writeJSON(K.profile(userId), data)
}
