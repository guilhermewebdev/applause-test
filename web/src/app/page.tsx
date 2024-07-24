"use client"
import { serverClient } from "@/lib/api_client";
import SlackTeamService from "@/services/SlackTeamService";

async function getData(): Promise<SlackTeam[]> {
  const { data: { slack_teams } } = await serverClient.get('/slack_teams')
  return slack_teams;
}

export default async function Home() {
  const slack_teams = await getData();
  return (
    <SlackTeamService slack_teams={slack_teams} />
  );
}
