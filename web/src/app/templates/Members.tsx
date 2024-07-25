'use client'

import Link from "next/link";
import { useState } from "react";

interface MembersTemplateProps {
  slack_team_members: SlackTeamMember[];
  onCreateRecognizement?: (data: FormData) => void
  slack_team_id: string;
}

export default function MembersTemplate(props: MembersTemplateProps) {
  const {
    slack_team_members,
    onCreateRecognizement,
    slack_team_id
  } = props;
  const [selected, select] = useState<SlackTeamMember>()
  return (
    <main>
      <section>
        <h2>Membros do time</h2>
        <nav>
          <Link href='/'>Início</Link>
        </nav>
        <ul>
          {slack_team_members.map(slack_team_member => (
            <li>
              <img src={slack_team_member.avatar_url} alt={slack_team_member.name} />
              <span>{slack_team_member.name}</span>
              <span>{slack_team_member.email}</span>
              <button type="button" onClick={() => select(slack_team_member)}>
                Criar reconhecimento
              </button>
            </li>
          ))}
        </ul>
      </section>
      {!!selected && (
        <section>
          <h2>Reconhecimento para {selected.name}</h2>
          <form action={onCreateRecognizement}>
            <label htmlFor="message">Mensagem:</label>
            <input type="text" name="message" id="message" />
            <input type="hidden" name="slack_id" value={slack_team_id} />
            <input type="hidden" name="slack_team_member_id" value={selected.slack_id} />
            <button type="submit">Enviar</button>
          </form>
        </section>
      )}
    </main>
  )
}