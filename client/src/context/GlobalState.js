import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import Axios from 'axios';

// initial state
const initialState = {
    // expense - negative num , income - positive num
    transactions: [],
    error: null,
    loading: true
}

// create context with default value == intialState.transactions
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // action - get all transactions
    async function getAllTransactions() {
        try {
            const res = await Axios.get('/api/v1/transactions');

            dispatch({
                type: 'GET_ALL_TRANSACTIONS',
                payload: res.data.data
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            });
        }
    }

    // action - delete transaction
    async function deleteTransaction(id) {
        try {
            await Axios.delete(`/api/v1/transactions/${id}`);

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
    }

    // action - add transaction
    async function addTransaction(transaction) {
        const config = {
            headers: {
                "Content-Type": 'application/json'
            }
        }

        try {
            const res = await Axios.post('/api/v1/transactions', transaction, config);

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            });
        }
    }

    return <GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        getAllTransactions
    }}>
        {children}
    </GlobalContext.Provider>
}

