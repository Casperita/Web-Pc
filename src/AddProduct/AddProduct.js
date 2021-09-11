import React, { useState, useRef, useEffect } from 'react'
import './AddProduct.css'
import * as AiIcons from 'react-icons/ai';
import AllTags from './AllTags';
import Tags from './Tags';
import { db, storage } from '../firebase';
import DeleteProduct from './DeleteProduct';

function AddProduct() {

    const { tag, render } = AllTags();

    const [imgUrl, setImgUrl] = useState();
    const [fileUrl, setFileUrl] = useState();
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [desc, setDesc] = useState();
    const [productId, setProductId] = useState('');
    const [numberDiscount, setNumeberDiscount] = useState(0);
    const [discount, setDiscount] = useState(false);
    const [del, setDel] = useState(true);

    const inputFile = useRef(null);
    const btnEdit = useRef(null);

    const onChangeHandler = (e) => {
        const name = e.target.name;
        
        if (name == 'file'){
            const file = e.currentTarget.files
            const url = URL.createObjectURL(file[0])
            setImgUrl(url)
            sendImg(file[0])
        } else if(name == 'title'){
            setTitle(e.target.value)
        } else if(name == 'price'){
            const value = parseFloat(e.target.value)
            setPrice(value);
        } else if(name == 'desc'){
            setDesc(e.target.value)
        } else if(name == 'productId'){
            setProductId(e.target.value)
        } else if(name == 'productDiscount'){
            setNumeberDiscount(e.target.value)
        }
    }

    const onDiscountUpload = () => {
        let tempPrice; 

        if(numberDiscount == 0 || productId == '' ){
            alert("ingrese los datos requeridos")
        } else {
            const refProduct = db.collection('products').doc(`${productId}`);
            refProduct.get()
            .then((doc) => {
                tempPrice = doc.data().price;
                console.log("prrecio original: ", tempPrice)
                console.log("descuento aplicado: ", numberDiscount)
                tempPrice = (tempPrice * numberDiscount) / 100;
                console.log("precio final: ", tempPrice)
                refProduct.update({
                    price: tempPrice,
                    discount: numberDiscount
                })
                setProductId(null);
                setNumeberDiscount(null);
                document.getElementsByName('productId')[0].value = ''
                document.getElementsByName('productDiscount')[0].value = 0
            })
        }
    }

    const sendImg = (file) => {

        if(file == ''){
            console.error("No es una imagen")
        }

        const ref = storage.ref(`/productsImg/${file?.name}`)
        const uploadTask = ref.put(file)

        uploadTask.on("state_changed",
        (snapshot) => {
            console.log(snapshot)
        }, (err) => {
            console.log(err)
        }, () => {
            ref
            .getDownloadURL()
            .then((fileUrl) => {
                setFileUrl(fileUrl);
            });
        });

    }

    const sendProduct = () => {

        if(fileUrl==undefined || title==undefined || price==undefined || desc==undefined){
            alert("Hay campos incompletos")
        } else {

        const refProduct = db.collection('products').doc();

        refProduct.set({
            title: `${title}`,
            price: price,
            discount: undefined,
            desc: `${desc}`,
            img: `${fileUrl}`,
            rate: 0,
            rateCount: 0,
            tags: tag
        })
        .then(onUpload)
        
        }
    }

    function onUpload() {
        window.location.reload()
    }

    const onClickHandler = () => {
        inputFile.current.click();
    }

    return (
        <div className='addProduct'>

                <div className="addProduct__container">

                    <div className='addProduct__title'>
                        <div className='addProduct__add' onClick={() => setDel(true)}><AiIcons.AiFillFileAdd /><h3>Agregar un Nuevo Producto</h3></div>
                        <div className='addProduct__discount' onClick={() => setDiscount(!discount)}><AiIcons.AiFillFileAdd /><h3>Agregar un Descuento</h3></div>
                        <div className='addProduct__delete' onClick={() => setDel(false)}><AiIcons.AiFillDelete /> <h3>Eliminar Producto</h3> </div>
                    </div>

                    {discount
                    ? (<div className='discount'>
                        <div className="discount__container">
                            <h3>Agregar descuento a un producto</h3>
                            <div className="discount__productinfo">
                                <p>ID del producto</p>
                                <input type='text' name='productId' placeholder='ID del producto...' onChange={(e) => onChangeHandler(e) } />
                            </div>
                            <div className="discount__productinfo">
                                <p>Porcentaje a descontar</p>
                                %<input type='number' name='productDiscount' placeholder='10' onChange={(e) => onChangeHandler(e) } />
                            </div>
                            <button onClick={onDiscountUpload}> Actualizar precio </button>
                        </div>
                    </div>)
                    : null}

                    {del
                    ?
                    (<div>
                        <div className="addProduct__info">

                        <div className="addImg">
                            <img src={imgUrl ? `${imgUrl}` : 'addProduct.png'} />
                            <input type='file' name='file' ref={inputFile} onChange={(e) => onChangeHandler(e)} />
                            <button onClick={onClickHandler}>Agregar imagen</button>
                        </div>

                        <div className="addInfo">
                            <div className="addInfo__title">
                                <p>Titulo</p>
                                <textarea type='text' name='title' placeholder='Agregar un titulo...'
                                onChange={(e) => onChangeHandler(e)} />
                            </div>

                            <div className="addInfo__price">
                                <p>Precio</p>
                                <input type='text' name='price' onChange={(e) => onChangeHandler(e)}
                                placeholder='$999.99' />
                            </div>
                            
                            
                        </div>

                        <div className="addDesc">
                            <p>Descripcion</p>
                            <textarea type='text' name='desc' placeholder='Agregar una descripcion....'
                            onChange={(e) => onChangeHandler(e)} />
                        </div>

                        
                    </div>

                    <div className="addTags">

                        <div className="addTags__toAdd">
                            <p>Agregar Etiquetas</p>
                            {render}
                        </div>

                    </div>
                    
                    <div className='addTags__send'>
                        <button onClick={() => sendProduct()}> Subir Nuevo Producto </button> 
                    </div>
                    </div>)

                    : <DeleteProduct /> }
                    
                </div>
            
        </div>
    )
}

export default AddProduct
