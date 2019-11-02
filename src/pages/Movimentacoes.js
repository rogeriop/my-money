import React from 'react'
import { Redirect } from 'react-router-dom'
import { useState } from 'react'
import Rest from '../utils/rest'

const baseURL = 'https://mymoney-rogerio.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL)


const Movimentacoes = ( { match }) => {
    const infoMes = useGet(`meses/${match.params.data}`)
    const [dataPatch, alterarMes] = usePatch(`meses/${match.params.data}`)
    
    const movimentacoes = useGet(`movimentacoes/${match.params.data}`)
    const [postData, salvarNovaMovimentacao] = usePost(`movimentacoes/${match.params.data}`)
    const [removeData, removerMovimentacao] = useDelete()

    // gestão do formulário
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')

    const onChangeDescricao = evt => {
      setDescricao(evt.target.value)
    }

    const onChangeValor = evt => {
      setValor(evt.target.value)
    }

    const salvarMovimentacao = async() => {
      if (!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
        await salvarNovaMovimentacao ({
          descricao,
          valor: parseFloat(valor)
        })
        setDescricao('')
        setValor(0)
        movimentacoes.refetch()
        infoMes.refetch()
      }
    }

    const removerMovimentacaoClick = async(id) => {
      await removerMovimentacao (`movimentacoes/${match.params.data}/${id}`)
      movimentacoes.refetch()
      infoMes.refetch()
    }

    const alterarPrevisaoEntrada = (evt) => {
      alterarMes({ previsao_entrada: evt.target.value })
    }

    const alterarPrevisaoSaida = (evt) => {
      alterarMes({ previsao_saida: evt.target.value })
    }

    if(movimentacoes.error === 'Permission denied'){
      return <Redirect to='/login' />
    }
    return (
      <div className='container'>
        <h1>Movimentações</h1>
        {
          !infoMes.loading && infoMes.data && <div>
            <span>Previsão entrada: {infoMes.data.previsao_entrada} <input type='text' onBlur={alterarPrevisaoEntrada}/> / Previsão saída: {infoMes.data.previsao_saida} </span> <input type='text' onBlur={alterarPrevisaoSaida} /><br />
            Entradas: {infoMes.data.entradas} / Saídas: {infoMes.data.saidas}
          </div>
        }
        <table className='table'>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
              { movimentacoes.data &&
                Object
                  .keys(movimentacoes.data)
                  .map(movimentacao => {
                    return (
                      <tr key={movimentacao}>
                        <td>
                          {movimentacoes.data[movimentacao].descricao}
                        </td>
                        <td className='text-right'>
                          {movimentacoes.data[movimentacao].valor} {' '}
                          <button className='btn btn-danger' onClick={() => removerMovimentacaoClick(movimentacao)}>-</button>  
                        </td>
                      </tr>
                    )
                  })
              }
              <tr>
                <td>
                  <input type='text' value={descricao}  onChange={onChangeDescricao}/>
                </td>
                <td>
                  <input type='text' value={valor}  onChange={onChangeValor} />
                  <button className='btn btn-success' onClick={salvarMovimentacao}>+</button>
                </td>
              </tr>
          </tbody>
        
        </table>
      </div>
    )
  }
  
  export default Movimentacoes