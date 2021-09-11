import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated, config } from "react-spring";
import './Header.css'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth, db } from './firebase';
import OutsideClick from './Header__Dropdown/OutsideClick';
import HeaderSearch from './SearchCategory/HeaderSearch';


function Header__dropdownProduct( {callbackFromParent} ) {

    const ref = useRef();

    OutsideClick(ref, () => {
        callbackFromParent(false);

    });

    return (

        <div className='header__openRow' ref={ref} >

            <div className='header__openProductOne'>

                <Link to='/search/pcarmada' className='header__openItemLink'>
                    <div className='header__openItem' onClick={() => callbackFromParent(false)}>

                        <p className='header__openItem_Icon'> <BsIcons.BsArrowReturnRight /> </p>
                        <p className='header__openItem_title'> Pc Armada </p>
                        
                    </div>
                </Link>
                
                <Link to='/search/notebook' className='header__openItemLink'>
                    <div className='header__openItem' onClick={() => callbackFromParent(false)}>

                        <p className='header__openItem_Icon'> <BsIcons.BsArrowReturnRight /> </p>
                        <p className='header__openItem_title'> Notebooks </p>
                        
                    </div>
                </Link>
                
                <Link to='/search/combo' className='header__openItemLink'>
                    <div className='header__openItem' onClick={() => callbackFromParent(false)}>

                        <p className='header__openItem_Icon'> <BsIcons.BsArrowReturnRight /> </p>
                        <p className='header__openItem_title'> Combo Actualizacion </p>
                        
                    </div>
                </Link>
                
                <Link to='/search/procesador' className='header__openItemLink'>
                    <div className='header__openItem' onClick={() => callbackFromParent(false)}>

                        <p className='header__openItem_Icon'> <BsIcons.BsArrowReturnRight /> </p>
                        <p className='header__openItem_title'> Procesador </p>
                        
                    </div>
                </Link>
                
                <Link to='/search/motherboard' className='header__openItemLink'>
                    <div className='header__openItem' onClick={() => callbackFromParent(false)}>

                        <p className='header__openItem_Icon'> <BsIcons.BsArrowReturnRight /> </p>
                        <p className='header__openItem_title'> Motherboard </p>
                        
                    </div>
                </Link>
                
                <Link to='/search/ram' className='header__openItemLink'>
                    <div className='header__openItem' onClick={() => callbackFromParent(false)}>

                        <p className='header__openItem_Icon'> <BsIcons.BsArrowReturnRight /> </p>
                        <p className='header__openItem_title'> Memorias RAM </p>
                        
                    </div>
                </Link>
                

            </div>

            <div className='header__openProductOne'>

                <Link to='/search/videocard' className='header__openItemLink'>
                    <div className='header__openItem' onClick={() => callbackFromParent(false)}>

                        <p className='header__openItem_Icon'> <BsIcons.BsArrowReturnRight /> </p>
                        <p className='header__openItem_title'> Placas de Video </p>
                        
                    </div>
                </Link>
                
                <Link to='/search/monitor' className='header__openItemLink'>
                    <div className='header__openItem' onClick={() => callbackFromParent(false)}>

                        <p className='header__openItem_Icon'> <BsIcons.BsArrowReturnRight /> </p>
                        <p className='header__openItem_title'> Monitores </p>
                        
                    </div>
                </Link>
                
                <Link to='/search/gabinete' className='header__openItemLink'>
                    <div className='header__openItem' onClick={() => callbackFromParent(false)}>

                        <p className='header__openItem_Icon'> <BsIcons.BsArrowReturnRight /> </p>
                        <p className='header__openItem_title'> Gabinetes </p>
                        
                    </div>
                </Link>
                
                <Link to='/search/fuente' className='header__openItemLink'>
                    <div className='header__openItem' onClick={() => callbackFromParent(false)}>

                        <p className='header__openItem_Icon'> <BsIcons.BsArrowReturnRight /> </p>
                        <p className='header__openItem_title'> Fuentes de Alimentacion </p>
                        
                    </div>
                </Link>
                
                <Link to='/search/periferico' className='header__openItemLink'>
                    <div className='header__openItem' onClick={() => callbackFromParent(false)}>

                        <p className='header__openItem_Icon'> <BsIcons.BsArrowReturnRight /> </p>
                        <p className='header__openItem_title'> Perifericos </p>
                        
                    </div>
                </Link>
                
                <Link to='/search/almacenamiento' className='header__openItemLink'>
                    <div className='header__openItem' onClick={() => callbackFromParent(false)} >

                        <p className='header__openItem_Icon'> <BsIcons.BsArrowReturnRight /> </p>
                        <p className='header__openItem_title'> Almacenamiento </p>
                        
                    </div>
                </Link>


            </div>

            <div className="header__openProductOne">


                <Link to='/search/refrigeracion' className='header__openItemLink'>
                        <div className='header__openItem' onClick={() => callbackFromParent(false)} >

                            <p className='header__openItem_Icon'> <BsIcons.BsArrowReturnRight /> </p>
                            <p className='header__openItem_title'> Refrigeracion </p>
                            
                        </div>
                </Link>

                <Link to='/search/redes' className='header__openItemLink'>
                        <div className='header__openItem' onClick={() => callbackFromParent(false)} >

                            <p className='header__openItem_Icon'> <BsIcons.BsArrowReturnRight /> </p>
                            <p className='header__openItem_title'> Redes </p>
                            
                        </div>
                </Link>

                <Link to='/search/portatil' className='header__openItemLink'>
                        <div className='header__openItem' onClick={() => callbackFromParent(false)} >

                            <p className='header__openItem_Icon'> <BsIcons.BsArrowReturnRight /> </p>
                            <p className='header__openItem_title'> Memorias Portatiles </p>
                            
                        </div>
                </Link>

                <Link to='/search/all' className='header__openItemLink'>
                        <div className='header__openItem' onClick={() => callbackFromParent(false)} >

                            <p className='header__openItem_Icon'> <BsIcons.BsArrowReturnRight /> </p>
                            <p className='header__openItem_title'> Ver Todos </p>
                            
                        </div>
                </Link>

            </div>
            

        </div>
    )

}

function Header__dropdownUser( {callbackFromParent} ) {

    const [ { user }, dispatch] = useStateValue();
    const handleAuthentication = () => {
        if (user){
            auth.signOut();
        }
    }

    const [openMenuUs, setOpenMenuUs] = useState(false);

    const ref = useRef();

    OutsideClick(ref, () => {
        callbackFromParent(false);

    });

    const { s } = useSpring({
        s: user ? 180 : 0
    });

    return (

        <div className='header__openContainer' ref={ref} >

            <Link className='header__openContainer' to='/profile' >
                <div className='header__openItem' onClick={() => callbackFromParent(false)}>

                    <p className='header__openItem_Icon'><AiIcons.AiOutlineUser/> </p>
                    <p> Mi Perfil </p>
                        
                </div>
            </Link>

            <Link  className='header__openContainer' to='/favorites' >
                <div className='header__openItem' onClick={() => callbackFromParent(false)} >

                    <p className='header__openItem_Icon'> <BsIcons.BsFillHeartFill /> </p>
                    <p> Mis Favoritos </p>

                </div>
            </Link>

            <Link  className='header__openContainer' to='/purchases' >
                <div className='header__openItem' onClick={() => callbackFromParent(false)} >

                <p className='header__openItem_Icon'> <AiIcons.AiFillTags /> </p>
                <p> Mis Compras </p>

                </div>
            </Link>

            <Link className='header__openContainer' to={!user && '/login'}>
                <div className='header__openItem' onClick={handleAuthentication} >

                    <animated.p className='header__openItem_Icon' style={{ transform: s.interpolate(s => `rotatey(${s}deg)`) }}> <FaIcons.FaSignInAlt /> </animated.p>
                    <p> {user ? 'SignOut' : 'SignIn'} </p>
                    
                </div>
            </Link>

        </div>
    )
}

function Header( { count } ) {

    const { render, searchIndex } = HeaderSearch();

    const [openMenuP, setOpenMenuP] = useState(false);

    const myCallbackP = (openMenuP) => {
        setOpenMenuP(openMenuP);
    };

    const productBg = useSpring({
        background: openMenuP ? '#565656' : '#1D1D1D',
    })

    const { p } =useSpring({
        p: openMenuP ? 180 : 0
    });

    const productAppear = useSpring({
        transform: openMenuP ? 'translate3D(0,0,0)' : 'translate3D(0,-300px,0)',
        opacity: openMenuP ? 1 : 0,
        config : config.slow
    });



    const [openMenuUs, setOpenMenuUs] = useState(false);

    const myCallbackUs = (openMenuUs) => {
        setOpenMenuUs(openMenuUs);
    };

    const UserBg = useSpring({ background: openMenuUs ? '#565656' : '#1D1D1D' })

    const { u } = useSpring({
        u: openMenuUs ? 180 : 0
    });

    const UserAppear = useSpring({
        transform: openMenuUs ? 'translate3D(0,0,0)' : 'translate3D(0,-300px,0)',
        opacity: openMenuUs ? 1 : 0,
        config : config.slow
    });



    const [ { user }, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user){
            auth.signOut();
        }
    }

    const [basket, setBasket] = useState([]);

    const getBasketItems = () => {
        db.collection('basketItems').doc(`${user?.uid}`).collection('basket').onSnapshot((snapshot) => {
            const tempItems = snapshot.docs.map((doc) => ({
                id: doc.id,
                product: doc.data()
            }))
            setBasket(tempItems);
        })
    }

    useEffect(() => {
        getBasketItems();
    },[user])

    const getCount = () => {
        let count = 0;
        basket.forEach((item) => {
            count += item.product.quantity
        })

        return count;
    }

    function isUserAdmin() {
        if(user?.uid == "VilvXiHvODM1UYZ7NTt8FMPXDfo2"){
            return (
                <div>
                    <Link to='/addProduct' className='header__addProduct_link'>
                        <p className='header__addProduct_icon'><AiIcons.AiFillFileAdd /></p>
                    </Link>
                </div>
            )
        } else{
            return null
        }
    }


    return (

        <div className='big__header'>

            <div className='header'>
                
                <Link to= '/'>           
                    <animated.img className="header__logo" src='pclogo.png' />

                </Link>
                
                <div className='header__search'>
                    {render}
                </div>
            
                <div className='header__nav'>

                        <div className="header__addProduct">
                            {isUserAdmin()}
                        </div>

                        <animated.div className='header__user' onClick={() => setOpenMenuUs(!openMenuUs)}  style={UserBg}>
                            <div> 
                                <img className='header__userPp' src={user?.photoURL? (user?.photoURL) : 'userIcon__white.png'}></img>
                            </div>

                            <div className='header__optionUser' >

                                <span className='header__option_1'> Hola {user?.displayName ? (user.displayName) : 'Usuario'}</span>

                                <animated.span className='header__option_2_arrow' style={{ transform: u.interpolate(u => `rotatex(${u}deg)`) }}>
                                    { <FaIcons.FaArrowCircleDown /> }
                                </animated.span>
                            </div>
                        </animated.div>

                    <Link className='header__chat' to='/chat' style={{ textDecoration: 'none' }}>
                        <div className='header__option'>
                            <span className='header__option_1'>Chat</span>

                            <span className='header__option_2_chat'> { <AiIcons.AiFillWechat /> }</span>
                        </div>
                    </Link>

                    <Link to='#' style={{ textDecoration: 'none' }}>
                    
                        <animated.div className='header__option' style={productBg} onClick={() => setOpenMenuP(!openMenuP)}>
                            <span className='header__option_1'>Productos</span>

                            <animated.span className='header__option_2_arrow' style={{ transform: p.interpolate(p => `rotatex(${p}deg)`) }}>
                                { <FaIcons.FaArrowCircleDown /> }
                            </animated.span>

                        </animated.div>

                    </Link>

                    <Link to='/checkout' style={{ textDecoration: 'none' }}>
                        <div className='header__option__basket'>
                        
                            <div className='header__basketIcon'>
                                <AiIcons.AiOutlineShoppingCart />
                                <span  className='header__basketNum'>
                                    { getCount() }
                                </span>
                                
                            </div>
                        </div>
                    </Link>


                </div>

            </div>

            <animated.div className='dropdown' style={productAppear}>
                { openMenuP 
                ? ( <Header__dropdownProduct callbackFromParent = {myCallbackP} /> ) 
                : null }
            </animated.div>
            
            <animated.div className='dropdown' style={UserAppear}>
                { openMenuUs
                ? ( <Header__dropdownUser callbackFromParent = {myCallbackUs} /> )
                : null }
            </animated.div>


        </div>
    )
}

export default Header
