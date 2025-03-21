import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState('');

  const fetchUsers = async () => {
    const result = await searchGithub();
    const user = await searchGithubUser('antoninast');

    console.log(
      1, candidate,
      2, result,
      3, user
    );
  }

  useEffect(()=> {
    // get random candidate
    // setCandidate to it

    fetchUsers();
    setCandidate('new');


  }, []);
  return <h1>Candidate Search</h1>;
};

export default CandidateSearch;
