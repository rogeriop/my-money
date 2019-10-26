import React from 'react';
import useGet from './useGet'

const url = 'https://mymoney-rogerio.firebaseio.com/movimentacoes/2019-08.json'


function App() {
  const data = useGet(url)
  return (
    <div>
      <h1>MyMoney</h1>
      { JSON.stringify(data) }
      { data.loading && <p>Loading . . .</p>}
    </div>
  );
}

export default App;
