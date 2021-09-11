import React from 'react'
import './EveryTag.css'
import Category from './Category'
import { Link } from 'react-router-dom'

function EveryTag() {

    const Tags = [
        {  name: 'Pc Armada', category: 'pcarmada', subCategories: ['Basica', 'Media', 'Alta']},
        {  name: 'Notebooks', category: 'notebook', subCategories: ['Notebooks', 'Accesorios']},
        {  name: 'Combo Actualizacion', category: 'combo', subCategories: ['Combo AMD', 'Combo Intel']},
        {  name: 'Procesador', category: 'procesador', subCategories: ['AMD', 'Intel']},
        {  name: 'Motherboard', category: 'motherboard', subCategories: ['AMD FM2', 'AMD AM3', 'AMD AM4', 'INTEL 6ta/7ma', 'INTEL 8va/9na']},
        {  name: 'Memoria RAM', category: 'ram', subCategories: ['DDR2', 'DDR3', 'DDR4', 'SODIMM DDR3', 'SODIMM DDR4']},
        {  name: 'Placas de Video', category: 'videocard', subCategories: ['Radeon', 'Nvidia']},
        {  name: 'Monitores', category: 'monitor', subCategories: ['Monitor', 'Accesorios']},
        {  name: 'Gabinetes', category: 'gabinete', subCategories: ['Full Tower', 'Mid Tower', 'Mini Tower', 'Con Fuente']},
        {  name: 'Fuentes de Alimentacion', category: 'fuente', subCategories: ['500w-650w', '651w-800w', '801w-1000w', '+1000w']},
        {  name: 'Perifericos', category: 'periferico', subCategories: ['Mouse', 'MousePads', 'Teclados/Kit', 'Auriculares', 'Joystick', 'Parlantes', 'WebCam']},
        {  name: 'Almacenamiento', category: 'almacenamiento', subCategories: ['Externo USB', 'SSD', 'Rigido', 'SSD M2']},
        {  name: 'Refrigeracion', category: 'refrigeracion', subCategories: ['Cooler CPU', 'WaterCooling', 'Coolers Gabinete']},
        {  name: 'Redes', category: 'redes', subCategories: ['Routers y Repetidores', 'Place de Red USB', 'Placa de red Interna']},
        {  name: 'Memoria Portatil', category: 'portatil', subCategories: ['Pendrive', 'MicroSD']},
    ]

    return (
        <div className="everyCategory">
            <div className="everyCategory__container">

                {Tags.map((category, index) => (
                    <Category 
                        name= {Tags[index].name}
                        category= {Tags[index].category}
                        subCategories= {Tags[index].subCategories}
                    />
                ))}

                <div className="everyCategory__allProducts">
                    <Link to={`/search/all`} className="everyCategory__allProducts_title">
                        <p> Todos los Productos  </p>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default EveryTag
