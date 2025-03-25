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

    setTimeout(() => {
      setCandidates(randomUsers);
      setCurrentCandidate(randomUsers[candidateIndex]);
    }, 200);
  }

  const addSavedCandidateToLocalStorage = () => {
    const localStorageData = localStorage.getItem('savedCandidates');
    if (localStorageData) {
      const savedCandidates = JSON.parse(localStorageData);
      const isUserSaved = savedCandidates.find((el: Candidate) => el.login === currentCandidate?.login);
      if (!isUserSaved) {
        savedCandidates.push(currentCandidate);
        localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      } else {
        alert('User is already saved');
      }
    } else {
      localStorage.setItem('savedCandidates', JSON.stringify([currentCandidate]))
    }
  }

  const addCandidate= () => {
    addSavedCandidateToLocalStorage();

    if (candidateIndex === candidates.length - 1) {
      alert('no more candidates to show');
      return;
    }

    setCandidateIndex(candidateIndex + 1);
    setCurrentCandidate(candidates[candidateIndex + 1]);
  }

  const removeCandidate= () => {
    if (candidateIndex === candidates.length - 1) {
      alert('no more candidates to show');
      return;
    }
    setCandidateIndex(candidateIndex + 1);
    setCurrentCandidate(candidates[candidateIndex + 1])
  }

  useEffect(()=> {
    if (candidates.length === 0) {
      fetchRandomUsers();
    }
  }, [candidateIndex]);

  return (<>
    <h1>Candidate Search</h1>
    {currentCandidate?.login ?
      <div className='current-user-wrap'>
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
