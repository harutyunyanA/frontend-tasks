import { useContext } from "react";
import { UserContext } from "../context/user-context";
import { UserItem } from "./user-item";

export const UserList = () => {
  const { users } = useContext(UserContext);
  return (
    <div className="col-md-8">
      <h2>User list</h2>
      <div className="row">
        {users.map((user) => {
          return <UserItem key={user.id} user={user} />;
        })}
      </div>
    </div>
  );
};
