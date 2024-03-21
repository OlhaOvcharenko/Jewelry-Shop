/* INITIAL STATE */

const initialState = {
  products: [],
  bagItems: JSON.parse(localStorage.getItem('bagItems')) || [],
  orders: [],
};
  
export default initialState;