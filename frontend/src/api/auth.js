async function request(path, options) {
  const response = await fetch(`/api/auth/${path}`, { credentials: 'same-origin', ...options })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || '요청에 실패했습니다.')
  return data
}

export const login = (email, password, keepLoggedIn) => request('login', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, keepLoggedIn }),
})

export const signup = details => request('signup', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(details),
})

export const emailAvailable = email => request(`email-available?email=${encodeURIComponent(email)}`)
