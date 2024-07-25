import { createRecognizement, getSlackTeamMembers } from "@/app/actions";
import MembersTemplate from "@/app/templates/Members";

interface MembersProps {
  params: {
    id: string;
  }
}

export default async function Members(props: MembersProps) {
  const { params } = props;
  const slack_team_members = await getSlackTeamMembers(params.id);
  return (
    <MembersTemplate
      slack_team_members={slack_team_members}
      slack_team_id={params.id}
      onCreateRecognizement={createRecognizement}
    />
  )
}