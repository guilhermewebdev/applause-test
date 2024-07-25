import { getSlackTeams } from "./actions";
import SlackTeamTemplate from "@/app/templates/SlackTeam";
import { createSlackTeam, deleteSlackTeam } from "@/app/actions";

export default async function Home() {
  const slack_teams = await getSlackTeams();
  return (
    <SlackTeamTemplate
      slack_teams={slack_teams}
      onRemoveSlackTeam={deleteSlackTeam}
      onCreateSlackTeam={createSlackTeam}
    />
  )
}
