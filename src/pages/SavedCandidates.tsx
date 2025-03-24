import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";
import "./SavedCandidates.css";

const SavedCandidates = () => {
  const [users, setUsers] = useState<Candidate[]>([]);
  const columnNames = ['Image', 'Name', 'Location', 'Email', 'Company', 'Bio', 'Reject'];

  const getUsersFromLocalStorage = () => {
    const localStorageData = localStorage.getItem('savedCandidates');
    
    if (localStorageData) {
      setUsers(JSON.parse(localStorageData));
    }
  }

  const removeUserFromLocalStorage = (username: string) => {
    const localStorageData = localStorage.getItem('savedCandidates');

    if (localStorageData) {
      const savedUsers = JSON.parse(localStorageData);
      const updatedUsers = savedUsers.filter((user: Candidate) => user.login !== username);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedUsers));
      return 'user_removed';
    }
  }

  const removeCandidate = (username: string) => {
    const result = removeUserFromLocalStorage(username);
    if (result === 'user_removed') {
      const updatedUsers = users.filter((el) => el.login !== username);
      setUsers(updatedUsers);
    }
  }

  useEffect(() => {
    getUsersFromLocalStorage();
  }, []);

  return (
    <>
      <h2>Potential Candidates</h2>
      <div className="potential-candidates">
      <div className="column-names">
        {columnNames.map((column) => (
          <div>{column}</div>
        ))}
      </div>
      <div className="saved-users">
        {users.map((user: Candidate, index) => (
          <div className={index % 2 === 0 ? "saved-user light" : "saved-user dark"}>
              <div className="user-avatar">
                <img src={user.avatarUrl} alt="user-avatar" />
              </div>
              <div className="name-and-username">
                <p>{user.name}</p>
                <p className="username">({user.login})</p>
              </div>
              <div>
                <p>{user.location}</p>
              </div>
              <div>
                <p>{user.email}</p>
              </div>
              <div>
                <p>{user.company}</p>
              </div>
              <div>
                <p>{user.bio}</p>
              </div>
              <div className="action-button">
                <span className="material-symbols-outlined remove" onClick={() => removeCandidate(user.login)}>remove</span>
              </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default SavedCandidates;
