"use client"
import Link from "next/link";

export interface SlackTeamTemplatePropos {
  slack_teams: SlackTeam[];
  onRemoveSlackTeam?: (slack_team_id: string) => void;
  onCreateSlackTeam?: (integration_key: string) => void;
}

export default function SlackTeamTemplate(props: SlackTeamTemplatePropos) {
  const { slack_teams, onRemoveSlackTeam, onCreateSlackTeam } = props;
  return (
    <main>
      <h1>Times do Slack</h1>
      <form>
        <h2>Adicionar Time</h2>
        <ul>
          <li>
            <label htmlFor="integration_key">Chave de integração</label>
            <input id="integration_key" type="text" />
          </li>
        </ul>
        <button type="submit">Criar</button>
      </form>
      <section>
        <h2>Times</h2>
        <ul>
          {slack_teams.map((slack_team) => (
            <li key={slack_team.slack_id}>
              <Link href={`/slack_teams/${slack_team.slack_id}/members`}>{slack_team.name}</Link>
              <button type="button" onClick={() => onRemoveSlackTeam?.(slack_team.slack_id)}>Remover</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}