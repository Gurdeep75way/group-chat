import { useGetAllGroupsQuery } from "../services/api";

const GroupsJoined = () => {
  const { data, error, isLoading } = useGetAllGroupsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching groups.</p>;

  return (
    <div>
      <h2>Groups You Joined</h2>
      <ul>
        {data?.data.map((group) => (
          <li key={group._id}>{group.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsJoined;
