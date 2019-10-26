import { useReducer, useEffect } from 'react'
import axios from 'axios'


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
  
  const useGet = url => {
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
    return data
  }
  
  export default useGet