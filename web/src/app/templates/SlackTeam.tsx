"use client"
import Link from "next/link";
import { useFormState } from "react-dom";

export interface SlackTeamTemplatePropos {
  slack_teams: SlackTeam[];
  onRemoveSlackTeam: (deletionState: MutationState, slack_team_id: string) => Promise<MutationState>;
  onCreateSlackTeam?: (data: FormData) => void;
}

const initialSlackTeamDeletion = {
  message: '',
  ok: true,
}

export default function SlackTeamTemplate(props: SlackTeamTemplatePropos) {
  const { slack_teams, onRemoveSlackTeam, onCreateSlackTeam } = props;
  const [deletionState, deleteSlackTeamAction] = useFormState(onRemoveSlackTeam, initialSlackTeamDeletion)
  return (
    <main>
      <h1>Times do Slack</h1>
        <section>
        <h2>Adicionar Time</h2>
        <form action={onCreateSlackTeam}>
          <ul>
            <li>
              <label htmlFor="integration_key">Chave de integração</label>
              <input required name="integration_key" id="integration_key" type="text" />
            </li>
          </ul>
          <button type="submit">Criar</button>
        </form>
      </section>
      <section>
        <h2>Times</h2>
        {deletionState.message && (
          <p>{deletionState.message}</p>
        )}
        <ul>
          {slack_teams.map((slack_team) => (
            <li key={slack_team.slack_id}>
              <Link href={`/slack_teams/${slack_team.slack_id}/members`}>{slack_team.name}</Link>
              <button type="button" onClick={() => deleteSlackTeamAction(slack_team.slack_id)}>Remover</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}