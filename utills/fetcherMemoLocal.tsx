import axios from 'axios';
import React from 'react';

const fetcherMemoLocal = <Data,>(): any => {
  let tocken = sessionStorage.getItem('tocken');
  if (!tocken) {
    console.log('fetcherMemoLocal : non-tocken', tocken);
    return 'non-tocken';
  }
  console.log('fetcherMemoLocal : tocken', tocken);
  return tocken;
};

export default fetcherMemoLocal;
