import Link from "next/link";
import { useState } from "react";

export interface SlackTeamTemplatePropos {
  slack_teams: SlackTeam[];
}

export default function SlackTeamTemplate(props: SlackTeamTemplatePropos) {
  const { slack_teams } = props;
  return (
    <main>
      <h1>Times do Slack</h1>
      <ul>
        {slack_teams.map((slack_team) => (
          <li key={slack_team.slack_id}>
            <Link href={`/slack_teams/${slack_team.slack_id}/members`}>{slack_team.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}