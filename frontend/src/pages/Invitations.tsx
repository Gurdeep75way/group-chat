import { useGetUserInvitationsQuery } from "../services/api";

const Invitations = () => {
  const { data, error, isLoading } = useGetUserInvitationsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching invitations.</p>;

  return (
    <div>
      <h2>Invitations</h2>
      <ul>
        {data?.data.map((invite) => (
          <li key={invite._id}>{invite?.groupId} - Status: {invite.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default Invitations;
