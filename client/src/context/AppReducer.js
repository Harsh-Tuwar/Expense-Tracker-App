export default (state, action) => {
    switch (action.type) {
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
            }

        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            }

        case 'GET_ALL_TRANSACTIONS':
            return {
                ...state,
                loading: false,
                transactions: action.payload
            }

        case 'TRANSACTION_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
} 