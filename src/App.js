import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios'
/*
axios
  .get('https://mymoney-rogerio.firebaseio.com/valor.json')
  .then(res => {
    console.log(res)
  })
*/
/*
axios
  .post('https://mymoney-rogerio.firebaseio.com/valor.json', {
    outro: 'Rogério Pinheiro'
  })
  .then(res => {
    console.log(res)
  })
*/
const url = 'https://mymoney-rogerio.firebaseio.com/movimentacoes/2019-08.json'

// função pura
// recebe um estado + parametros e retorna alguma coisa baseado nos parametros
// é mais fácil de testar

// manipular meu estado
const reducer = (state, action) => {
  if(action.type === 'REQUEST') {
    return {
      ...state, // tras tudo dentro de state e substitui só o abaixo
      loading: true
    }
  }
  if(action.type === 'SUCCESS'){
    return {
      ...state,
      loading: false,
      data: action.data
    }
  }
  return state
}

function App() {
  const [data, dispatch] = useReducer(reducer, {
    loading: true,
    data: {}
  })

  useEffect(() => {
    dispatch ({ type: 'REQUEST' })
    axios
      .get(url)
      .then(res => {
       dispatch({ type: 'SUCCESS', data: res.data })
      })
  }, [])
  return (
    <div>
      <h1>MyMoney</h1>
      { JSON.stringify(data) }
      { data.loading && <p>Loading . . .</p>}
    </div>
  );
}

export default App;
