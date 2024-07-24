'use client'
import SlackTeamTemplate from "@/app/templates/SlackTeam";
import { createSlackTeam, deleteSlackTeam } from "@/app/actions";

interface SlackTeamServiceProps {
  slack_teams: SlackTeam[];
}

export default function SlackTeamService(props: SlackTeamServiceProps) {
  const { slack_teams } = props;
  return (
    <SlackTeamTemplate
      slack_teams={slack_teams}
      onRemoveSlackTeam={deleteSlackTeam}
      onCreateSlackTeam={createSlackTeam}
    />
  )
}