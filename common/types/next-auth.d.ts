declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      image: string | null
      points: number
    }
  }

  interface User {
    id: string
    name: string | null
    image: string | null
  }
}
