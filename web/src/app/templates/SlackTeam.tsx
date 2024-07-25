"use client"
import Link from "next/link";
import { createRef, useEffect } from "react";
import { useFormState } from "react-dom";
import styles from '../styles/slack_team.module.scss';

export interface SlackTeamTemplatePropos {
  slack_teams: SlackTeam[];
  onRemoveSlackTeam: (deletionState: MutationState, slack_team_id: string) => Promise<MutationState>;
  onCreateSlackTeam: (creationState: MutationState, data: FormData) => Promise<MutationState>;
}

const initialState = {
  message: '',
  ok: true,
}

export default function SlackTeamTemplate(props: SlackTeamTemplatePropos) {
  const { slack_teams, onRemoveSlackTeam, onCreateSlackTeam } = props;
  const [deletionState, deleteSlackTeamAction] = useFormState(onRemoveSlackTeam, initialState)
  const [creationState, createSlackTeam] = useFormState(onCreateSlackTeam, initialState);
  const form = createRef<HTMLFormElement>()
  useEffect(() => {
    if(creationState) form.current?.reset()
  }, [creationState])
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Times do Slack</h1>
      <section className={styles.slack_team_creation}>
        <h2 className={styles.h2}>Adicionar Time</h2>
        <form className={styles.form} ref={form} action={createSlackTeam}>
          <ul className={styles.form_list}>
            <li className={styles.form_list_item}>
              <label className={styles.label} htmlFor="integration_key">Chave de integração</label>
              <input className={styles.input} required name="integration_key" id="integration_key" type="text" />
            </li>
          </ul>
          <button className={styles.button} type="submit">Criar</button>
        </form>
      </section>
      <section className={styles.slack_team_list_section}>
        <h2 className={styles.h2}>Times</h2>
        {deletionState.message && (
          <p className={deletionState.ok ? styles.success : styles.error}>{deletionState.message}</p>
        )}
        {creationState.message && (
          <p className={creationState.ok ? styles.success : styles.error}>{creationState.message}</p>
        )}
        <ul className={styles.slack_team_list}>
          {slack_teams.map((slack_team) => (
            <li className={styles.slack_team_item} key={slack_team.slack_id}>
              <Link href={`/slack_teams/${slack_team.slack_id}/members`}>{slack_team.name}</Link>
              <button className={styles.small_button} type="button" onClick={() => deleteSlackTeamAction(slack_team.slack_id)}>Remover</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}