import { serverClient } from "@/lib/api_client";
import Link from "next/link";

async function getData(): Promise<SlackTeam[]> {
  const { data: { slack_teams } } = await serverClient.get('/slack_teams')
  return slack_teams;
}

export default async function Home() {
  const slack_teams = await getData();
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
  );
}
