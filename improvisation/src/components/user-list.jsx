export const UserList = ({ users, onDelete }) => {
  return (
    <div className="col-md-8">
      <h2>User List</h2>
      <table className="table table-bordered table-striped table-dark table-hover">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>age</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm mx-2"
                    onClick={() => {
                      onDelete(user.id);
                    }}
                  >
                    Delete
                  </button>
                  <button className="btn btn-warning btn-sm mx-2">Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
