// What the app calls the student in greetings: their chosen first name, else the first word of their full name.
export function firstName(user) {
  return (user?.callName || '').trim() || (user?.name || '').trim().split(/\s+/)[0] || ''
}
