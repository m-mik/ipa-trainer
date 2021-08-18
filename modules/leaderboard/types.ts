export type LeaderboardUser = {
  id: string
  name: string
  points: number
}

export type Leaderboard = {
  users: LeaderboardUser[]
  hasMore: boolean
}
