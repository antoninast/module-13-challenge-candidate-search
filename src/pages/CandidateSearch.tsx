import { useState, useEffect } from 'react';

import './CandidateSearch.css';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>();
  const [candidateIndex, setCandidateIndex] = useState<number>(0);
  const randomUsers: Candidate[] = [];

  const fetchRandomUsers = async () => {
    const fetchedUsers = await searchGithub();
    fetchedUsers.forEach(async(user: any) => {
      if (user.login) {
        const userInfo = await searchGithubUser(user.login);
        if (userInfo) {
          randomUsers.push({
            login: user.login,
            name: userInfo.name,
            location: userInfo.location,
            email: userInfo.email,
            company: userInfo.company,
            bio: userInfo.bio,
            avatarUrl: userInfo.avatar_url
          });
        }
      }
    });
    setCandidates(randomUsers);
  }

  const addCandidate= () => {
    if (candidateIndex === 29) {
      alert('no more candidates to show');
      return;
    }
    setCandidateIndex(candidateIndex + 1);
    console.log('add cand', candidateIndex);
  }

  const removeCandidate= () => {
    if (candidateIndex === 29) {
      alert('no more candidates to show');
      return;
    }
    setCandidateIndex(candidateIndex + 1);
  }

  useEffect(()=> {
    if (candidates.length === 0) {
      fetchRandomUsers();
    }

    if (!candidates[candidateIndex]?.login) {
      setCandidateIndex(candidateIndex + 1);
    }

    setCurrentCandidate(candidates[candidateIndex]);
  }, [candidateIndex]);

  return (<>
    <h1>Candidate Search</h1>

    {currentCandidate?.login ?
      <div>
        <div className="current-user">
          <img src={currentCandidate.avatarUrl} alt="user-avatar" />
          <div className="user-info">
            <div className="name-and-username">{currentCandidate.name} <p>({currentCandidate.login})</p></div>
            <p>Location: {currentCandidate.location}</p>
            <p>Email: {currentCandidate.email}</p>
            <p>Company: {currentCandidate.company}</p>
            <p>Bio: {currentCandidate.bio}</p>
          </div>
        </div>
        <div className="action-buttons">
          <span className="material-symbols-outlined remove" onClick={() => removeCandidate()}>remove</span>
          <span className="material-symbols-outlined add" onClick={() => addCandidate()}>add</span>
        </div>
      </div>
      : 'No candidate is available'}
  </>);
};

export default CandidateSearch;
