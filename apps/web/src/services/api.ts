export const post = (path: string, body: unknown, headers?: Record<string, string>) => {
  return fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })
}

export const get = (path: string, headers?: Record<string, string>) => {
  let headersValue: any = {}
  if (headers?.token) {
    headersValue.Authorization = `Bearer ${headers?.token}`
  }
  return fetch(path, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...headersValue },
  })
}
