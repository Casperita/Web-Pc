import React, { useEffect, useState } from 'react'
import * as AiIcons from 'react-icons/ai';
import './AllTags.css'

function AllTags() {
    var tags = [];

    const [tag, setTag] = useState([]);

    const getTag = (e) => {
        let lastTag;
        let i;

        lastTag = e.target.textContent;

        if(tag.length < 1) {
            setTag( tags => [...tags, `${lastTag}`])

        } else {
            for(i=0; i<tag.length; i++){
                if(lastTag == tag[i]){
                    tag.splice(i, 1)
                }
            }

            setTag( tags => [...tags, `${lastTag}`])

        }
    }

    function deleteTag(index) {
        let tempTag = [...tag];
        tempTag.splice(index, 1)
        setTag(tempTag)
    }

    return {
        tag,
        render: (
        <div className='allTags'>

            <div className="allTags__all">

                <div className='allTags__container'>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >pcarmada</button> </div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Basica</button> </div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Medio</button> </div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Alta</button> </div>
                </div>

                <div className='allTags__container'>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >notebook</button> </div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Notebooks</button> </div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Accesorios</button> </div>
                </div>

                <div className='allTags__container'>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >combo</button> </div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Combo AMD</button> </div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Combo Intel</button> </div>
                </div>

                <div className='allTags__container'>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Procesador</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >AMD</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Intel</button></div>
                </div>

                <div className='allTags__container'>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >ram</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >DDR2</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >DDR3</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >DDR4</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >SODIMM DDR3</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >SODIMM DDR4</button></div>
                </div>

                <div className='allTags__container'>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >motherboard</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >AMD FM2</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >AMD AM3</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >AMD AM4</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Intel 6ta/7ma</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Intel 8va/9na</button></div>
                </div>

                <div className='allTags__container'>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >videocard</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Radeon</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Nvidia</button></div>
                </div>

                <div className='allTags__container'>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >monitor</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Monitor</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Accesorios</button></div>
                </div>

                <div className='allTags__container'>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >gabinete</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Full Tower</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Mid Tower</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Mini Tower</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Con Fuente</button></div>
                </div>

                <div className='allTags__container'>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >fuente</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >500w-650w</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >651w-800w</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >801w-1000w</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >+1000w</button></div>
                </div>

                <div className='allTags__container'>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >almacenamiento</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Externo USB</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Rigido</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >SSD</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >SSD M2</button></div>
                </div>

                <div className='allTags__container'>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >refrigeracion</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Cooler CPU</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >WaterCooling</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Coolers Gabinete</button></div>
                </div>

                <div className='allTags__container'>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >redes</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Routers y Repetidores</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Place de Red USB</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Placa de red Interna</button></div>
                </div>

                <div className='allTags__container'>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >portatil</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Pendrive</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >MicroSD</button></div>
                </div>
                
                <div className='allTags__container'>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >periferico</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Mouse</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >MousePads</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Teclados/Kit</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Auriculares</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Joystick</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >Parlantes</button></div>
                    <div className='allTags__tag'> <AiIcons.AiFillTags /> <button onClick={(e) => getTag(e)} >WebCam</button></div>
                </div>

            </div>

            <div className="allTags__added">

                <p>Etiquetas Agregadas</p>

                {tag.map((etiqueta, index) => (
                    <div className="allTags__addedTag"> <AiIcons.AiOutlineTags /> <button onClick={() => deleteTag(index)}>{etiqueta}</button> </div>
                ))}
            </div>


        </div>
    )}
}

export default AllTags
