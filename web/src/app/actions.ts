'use server'
import { revalidateTag } from "next/cache";

const {
  API_URL
} = process.env;

export async function deleteSlackTeam(slack_team_id: string) {
  await fetch(`${API_URL}/slack_teams/${slack_team_id}`, {
    method: 'DELETE',
    cache: 'no-cache'
  });
  revalidateTag('slack_teams')
}

export async function getSlackTeams(): Promise<SlackTeam[]> {
  const res = await fetch(`${API_URL}/slack_teams`, {
    cache: 'force-cache',
    next: {
      tags: ['slack_teams'],
      revalidate: 160,
    }
  })
  const { slack_teams } = await res.json()
  return slack_teams;
}

export async function createSlackTeam(data: FormData) {
  try {
    await fetch(`${API_URL}/slack_teams`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        slack_team: {
          integration_key: data.get('integration_key')
        }
      }),
    });
    revalidateTag('slack_teams');
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

export async function getSlackTeamMembers(slack_team_id: string): Promise<SlackTeamMember[]> {
  const res = await fetch(`${API_URL}/slack_teams/${slack_team_id}/members`, {
    cache: 'force-cache',
    next: {
      tags: ['slack_team_members'],
      revalidate: 1600,
    }
  })
  const { slack_team_members } = await res.json()
  return slack_team_members;
}