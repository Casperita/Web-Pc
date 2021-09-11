import React, { useEffect, useReducer } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route }
from 'react-router-dom';
import Checkout from './Checkout';
import Footer from './Footer/Footer';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Spring from './Spring';
import Product__Test from './Test/Product__Test';
import Chat from './Chat/Chat';
import SignIn from './SignIn';
import PasswordReset from './PasswordReset';
import Profile from './Profile';
import Perfil from './Perfil/Perfil';
import Payment from './Payment/Payment';
import ProductInfo from './ProductInfo/ProductInfo';
import Product from './Product';
import Purchases from './Purchases/Purchases';
import Favorites from './Favorites/Favorites';
import AddProduct from './AddProduct/AddProduct';
import SearchCategory from './SearchCategory/SearchCategory';
import BuildPc from './BuildPc/BuildPc';
import BuildSelect from './BuildPc/BuildSelect';

function App() {

  const [ state, dispatch ] = useStateValue();

  useEffect( () => { 
    auth.onAuthStateChanged(authUser => {
      if (authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else{
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    } )
  }, [])


  return (
      <Router>
        <div className="app">

          <Switch>
            <Route path='/login'>
              <Login />

            </Route>

            <Route path='/signin'>
              <SignIn />

            </Route>

            <Route path='/profile'>
              <Header />
              <Perfil />
            </Route>

            <Route path='/reset'>
              <PasswordReset />

            </Route>

            <Route path='/checkout'>
              <Header />
              <div className='app__homeMovil'>
                  <Checkout />
              </div>
            </Route>

            <Route path='/productInfo/:productId'>
              <Header />
              <div className='app__homeMovil'>
                  <ProductInfo />
              </div>
            </Route>

            <Route path='/search/:searchTag?/:subCategory?'>
              <Header />
              <div className='app__homeMovil'>
                  <SearchCategory />
              </div>
            </Route>

            <Route path='/purchases'>
              <Header />
              <div className='app__homeMovil'>
                  <Purchases />
              </div>
            </Route>

            <Route path='/build'>
              <Header />
              <div className='app__homeMovil'>
                  <BuildPc />
              </div>
            </Route>

            <Route path='/buildselect/:type'>
              <Header />
              <div className='app__homeMovil'>
                  <BuildSelect />
              </div>
            </Route>

            <Route path='/favorites'>
              <Header />
              <div className='app__homeMovil'>
                <Favorites />
              </div>
            </Route>

            <Route path='/addProduct'>
            <Header />
              <div className='app__homeMovil'>
                <AddProduct />
              </div>
            </Route>

            <Route path='/payment'>
              <Header />
              <div className='app__homeMovil'>
                  <Payment />
              </div>

            </Route>

            <Route path='/chat'>
              <Header />
              <div className='app__homeMovil'>
                  <Chat />
              </div>
              
            </Route>

            <Route path='/'>
                <Header />
                <div className='app__homeMovil'>
                  <Home />
                </div>

            </Route>

          </Switch>
          <Footer />
        </div>

      </Router>
  );
}

export default App;
