'use client'

interface MembersTemplateProps {
  slack_team_members: SlackTeamMember[];
}

export default function MembersTemplate(props: MembersTemplateProps) {
  const { slack_team_members } = props;
  return (
    <main>
      <section>
        <h2>Membros do time</h2>
        <ul>
          {slack_team_members.map(slack_team_member => (
            <li>
              <img src={slack_team_member.avatar_url} alt={slack_team_member.name} />
              <span>{slack_team_member.name}</span>
              <span>{slack_team_member.email}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}