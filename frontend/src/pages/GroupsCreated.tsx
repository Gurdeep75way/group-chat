import { useGetUserCreatedGroupsQuery } from "../services/api";

const GroupsCreated = () => {
  const { data, error, isLoading } = useGetUserCreatedGroupsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching groups.</p>;

  return (
    <div>
      <h2>Groups You Created</h2>
      <ul>
        {data?.data.map((group) => (
          <li key={group._id}>{group.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsCreated;
