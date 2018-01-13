import * as types from '../constants/actionTypes.js';
import moment from 'moment';

const initialState = {
  title: 'Bitfinex',
  description: 'exchange limit ticker for sell, buy and more...',
  exchangePair: 'BTCUSD',
  startDate: moment(new Date()).format('MM-DD-YYYY HH:mm:ss'),
  endDate: moment(new Date()).format('MM-DD-YYYY HH:mm:ss'),
  startDateHolder: null,
  endDateHolder: null,
  bids: '0.00000000',
  sell: '0.00000000',
  exchange_times: '1',
  execute_rate: '1 mins',
  each_piece: '10%'
}

export default function inputTaskBox(state=initialState, action) {
  switch(action.type) {
    case types.TASKBOX_SET_TITLE:
      return {
        ...state,
        title: action.data,
      }
      break;
    case types.TASKBOX_SET_DESCRIPTION:
      return {
        ...state,
        description: action.data,
      }
      break;
    case types.TASKBOX_SET_SELECTED_EXCHANGE_PAIR:
      return {
        ...state,
        exchangePair: action.data,
      }
      break;
    case types.TASKBOX_SET_BEGIN:
      return {
        ...state,
        startDate: action.data,
      }
      break;
    case types.TASKBOX_SET_END:
      return {
        ...state,
        endDate: action.data,
      }
      break;
    case types.TASKBOX_SET_BIDS:
      return {
        ...state,
        bids: action.data,
      }
      break;
    case types.TASKBOX_SET_SELL:
      return {
        ...state,
        sell: action.data,
      }
      break;
    case types.TASKBOX_SET_EXCHANGE_TIMES:
      return {
        ...state,
        exchange_times: action.data,
      }
      break;
    case types.TASKBOX_SET_EXECUTE_RATE:
      return {
        ...state,
        execute_rate: action.data,
      }
      break;
    case types.TASKBOX_SET_EACH_PIECE:
      return {
        ...state,
        each_piece: action.data,
      }
      break;
    default:
      return state;
      break;
  }
}
