'use server'
import { revalidateTag } from "next/cache";

const {
  API_URL
} = process.env;

export async function deleteSlackTeam(slack_team_id: string) {
  console.log('test')
  await fetch(`${API_URL}/slack_teams/${slack_team_id}`, {
    method: 'DELETE',
    cache: 'no-cache'
  });
  revalidateTag('slack_teams')
}

export async function getSlackTeams(): Promise<SlackTeam[]> {
  const res = await fetch(`${API_URL}/slack_teams`, {
    next: {
      tags: ['slack_teams'],
      revalidate: 160
    }
  })
  const { slack_teams } = await res.json()
  return slack_teams;
}