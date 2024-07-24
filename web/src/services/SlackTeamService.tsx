import SlackTeamTemplate from "@/templates/SlackTeam";
import { useState } from "react";

interface SlackTeamServiceProps {
  slack_teams: SlackTeam[];
}

export default function SlackTeamService(props: SlackTeamServiceProps) {
  const [slack_teams, set_slack_teams] = useState(props.slack_teams);
  return (
    <SlackTeamTemplate slack_teams={slack_teams} />
  )
}