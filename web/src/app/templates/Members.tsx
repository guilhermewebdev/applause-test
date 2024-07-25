'use client'

import Link from "next/link";
import { createRef, useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import styles from '../styles/members.module.scss'
interface MembersTemplateProps {
  slack_team_members: SlackTeamMember[];
  onCreateRecognizement: (formState: MutationState, data: FormData) => Promise<MutationState>
  slack_team_id: string;
}

const initialRecognizementCreation = {
  message: '',
  ok: true,
}

export default function MembersTemplate(props: MembersTemplateProps) {
  const {
    slack_team_members,
    onCreateRecognizement,
    slack_team_id
  } = props;
  const [search, setSearch] = useState('')
  const [selected, select] = useState<SlackTeamMember>()
  const form = createRef<HTMLFormElement>();
  const [recognizementCreation, createRecognizement] = useFormState(onCreateRecognizement, initialRecognizementCreation)
  useEffect(() => {
    if(recognizementCreation.ok) form.current?.reset()
  }, [recognizementCreation])
  const filteredMembers = useMemo(() => {
    if(!search) return slack_team_members;
    return slack_team_members.filter(member =>{
      return member.email.match(search) || member.email.match(search)
    })
  }, [search, slack_team_members])
  return (
    <main className={styles.main}>
      <nav>
        <Link href='/'>Início</Link>
      </nav>
      <h1 className={styles.h1}>Criar reconhecimento</h1>
      <section className={styles.members}>
        <h2>Membros do time</h2>
        <fieldset>
          <label htmlFor="search">Buscar membro:</label>
          <input type="text" onChange={(event) => setSearch(event.target.value)} id="search" name="search" />
        </fieldset>
        <ul>
          {filteredMembers.map(slack_team_member => (
            <li key={slack_team_member.slack_id}>
              <img className={styles.avatar} src={slack_team_member.avatar_url} alt={slack_team_member.name} />
              <div className={styles.info}>
                <span className={styles.name}>{slack_team_member.name}</span>
                <span className={styles.email}>{slack_team_member.email}</span>
              </div>
              <button type="button" onClick={() => select(slack_team_member)}>
                Criar reconhecimento
              </button>
            </li>
          ))}
        </ul>
      </section>
      {!!selected && (
        <section className={styles.recognizement}>
          <h2>Reconhecimento para {selected.name}</h2>
          <form ref={form} action={createRecognizement}>
            <label htmlFor="message">Mensagem:</label>
            <div className={styles.message_field}>
              <textarea required name="message" id="message" />
              {!!recognizementCreation?.message && <small>{recognizementCreation.message}</small>}
            </div>
            <input required type="hidden" name="slack_id" value={slack_team_id} />
            <input required type="hidden" name="slack_team_member_id" value={selected.slack_id} />
            <button type="submit">Enviar</button>
          </form>
        </section>
      )}
    </main>
  )
}