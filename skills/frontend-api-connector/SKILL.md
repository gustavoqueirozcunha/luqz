---
name: frontend-api-connector
description: Conecta frontend React/Vite existente a uma API REST com autenticação JWT. Use ao substituir fonte de dados hardcoded, webhook ou URL pública por API própria com login.
type: prompt
version: 1.0.0
categories:
  - frontend
  - react
  - auth
---

# Frontend API Connector

## When to use

Use esta skill ao conectar um frontend React/Vite a uma API REST com JWT. Cobre criação do cliente HTTP, hook de autenticação, página de login e proteção de rotas.

## Instructions

### Arquivos a criar/modificar

```
src/
├── services/
│   └── api.ts           → cliente HTTP com token automático
├── hooks/
│   └── useAuth.ts       → gerencia JWT no localStorage
├── pages/
│   └── LoginPage.tsx    → formulário de login
└── App.tsx              → route guard
```

### 1. `services/api.ts` — cliente HTTP base

```ts
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function getToken() {
  return localStorage.getItem('luqz_token')
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken()
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  if (res.status === 401) {
    localStorage.removeItem('luqz_token')
    window.location.href = '/login'
  }
  return res.json()
}
```

### 2. `hooks/useAuth.ts`

```ts
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('luqz_token'))

  async function login(email: string, password: string) {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    if (data.token) {
      localStorage.setItem('luqz_token', data.token)
      setIsAuthenticated(true)
    }
    return data
  }

  function logout() {
    localStorage.removeItem('luqz_token')
    setIsAuthenticated(false)
  }

  return { isAuthenticated, login, logout }
}
```

### 3. `App.tsx` — route guard

```tsx
const { isAuthenticated } = useAuth()
if (!isAuthenticated) return <LoginPage />
```

### 4. Substituir service existente

Trocar qualquer `fetch` direto para webhook/URL pública por `apiFetch('/endpoint')` do cliente criado.

## Important rules

- Token sempre em `localStorage` para SPAs simples (sem SSR)
- Interceptar 401 automaticamente para redirecionar ao login — não deixar o usuário ver erro de autorização
- CORS na API deve estar configurado com `origin: true, credentials: true`
- `VITE_API_URL` no `.env` do frontend para facilitar troca de ambiente (dev → prod)
- Nunca expor `JWT_SECRET` no frontend — o token é opaco para o cliente

## Error handling

| Problema | Causa | Fix |
|----------|-------|-----|
| CORS error no browser | API sem `credentials: true` | `app.register(cors, { origin: true, credentials: true })` |
| 401 em toda request | Token expirado ou ausente | Verificar `localStorage.getItem('luqz_token')` não está null |
| Dados do webhook antigo ainda carregando | Service antigo não substituído | Buscar todos os `fetch(` no projeto e substituir |
