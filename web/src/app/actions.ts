'use server'
import { revalidateTag } from "next/cache";

const {
  API_URL
} = process.env;

export async function deleteSlackTeam(_formState: MutationState, slack_team_id: string): Promise<MutationState> {
  try {
    await fetch(`${API_URL}/slack_teams/${slack_team_id}`, {
      method: 'DELETE',
      cache: 'no-cache'
    });
    revalidateTag('slack_teams')
    return {
      message: 'Time removido',
      ok: true
    }
  } catch (error: any) {
    return {
      message: error.message || 'Falha ao exluir time',
      ok: false
    }
  }
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

export async function createSlackTeam(_formState: MutationState, data: FormData) {
  try {
    const res = await fetch(`${API_URL}/slack_teams`, {
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
    if (res.status >= 400) {
      const response = await res.json()
      return {
        message: response?.error?.message || 'Falha ao adicionar time',
        ok: false
      }
    }
    revalidateTag('slack_teams');
    return {
      message: 'Time adicionado',
      ok: true
    }
  } catch (error: any) {
    return {
      message: error.message || 'Falha ao adicionar time',
      ok: false
    }
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

export async function createRecognizement(_formState: MutationState, data: FormData) {
  try {
    await fetch(`${API_URL}/slack_teams/${data.get('slack_id')}/recognizement`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        recognizement: {
          message: data.get('message'),
          slack_team_member_id: data.get('slack_team_member_id')
        }
      })
    })
    return {
      message: 'Reconhecimento criado',
      ok: true
    }    
  } catch (error: any) {
    console.error(error)
    return {
      message: error.message || 'Falha ao enviar reconhecimento',
      ok: false
    }
  }
}