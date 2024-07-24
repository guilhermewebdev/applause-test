import SlackTeamService from "@/app/services/SlackTeamService";
import { getSlackTeams } from "./actions";

export default async function Home() {
  const slack_teams = await getSlackTeams();
  return (
    <SlackTeamService slack_teams={slack_teams} />
  );
}
