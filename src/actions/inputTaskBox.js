import * as types from '../constants/actionTypes.js';

export function setTitle(title) {
  return {
    type: types.TASKBOX_SET_TITLE,
    data: title
  }
}

export function setDescription(decription) {
  return {
    type: types.TASKBOX_SET_DESCRIPTION,
    data: decription
  }
}

export function setExchangePair(pair) {
  return {
    type: types.TASKBOX_SET_SELECTED_EXCHANGE_PAIR,
    data: pair
  }
}

export function setBegin(begin_date) {
  return {
    type: types.TASKBOX_SET_BEGIN,
    data: begin_date
  }
}

export function setEnd(end_date) {
  return {
    type: types.TASKBOX_SET_END,
    data: end_date
  }
}

export function setBids(price) {
  return {
    type: types.TASKBOX_SET_BIDS,
    data: price
  }
}

export function setSell(price) {
  return {
    type: types.TASKBOX_SET_SELL,
    data: price
  }
}

export function setExchangeTimes(exchange_times) {
  return {
    type: types.TASKBOX_SET_EXCHANGE_TIMES,
    data: exchange_times
  }
}

export function setExecuteRate(execute_rate) {
  return {
    type: types.TASKBOX_SET_EXECUTE_RATE,
    data: execute_rate
  }
}

export function setEachPiece(each_piece) {
  return {
    type: types.TASKBOX_SET_EACH_PIECE,
    data: each_piece
  }
}
