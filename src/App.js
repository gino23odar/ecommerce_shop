import React, {useState, useEffect} from 'react';
import {commerce} from './lib/commerce';
//import Products from './components/Products/Products';
//import Navbar from '.components/Navbar/Navbar';
import {Products, Navbar, Cart} from './components'; 
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async()=> {
    const {data} = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async()=>{
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  }

  const handleAddToCart = async(productId, quantity) =>{
    const {cart} = await commerce.cart.add(productId, quantity);
    setCart(cart);
  }

  const handleUpdateCartQuantity = async(productId, quantity) =>{
    const {cart} = await commerce.cart.update(productId, {quantity});
    setCart(cart);
  }

  const handleRemoveCartItem = async(productId)=>{
    const {cart} = await commerce.cart.remove(productId);
    setCart(cart);
  }

  const handleEmptyCart = async () => {
    const{cart} = await commerce.cart.empty();
    setCart(cart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items}/>
        <Routes>
          <Route path='/' element={<Products products = {products} onAddToCart = {handleAddToCart}/>} />
          <Route 
            path='/cart' 
            element={
              <Cart 
              cart={cart} 
              handleUpdateCartQuantity={handleUpdateCartQuantity} 
              handleRemoveCartItem ={handleRemoveCartItem}
              handleEmptyCart={handleEmptyCart}
              />} />
        </Routes>
        {/* <Products products={products} onAddToCart={handleAddToCart}/>
        <Cart cart={cart}/> */}
      </div>
    </Router>
  )
}

export default App;
