import React, { useState } from 'react'
import './Category.css'
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import SubCategory from './SubCategory';

function SubTag({ name, category, subCategories }) {

    const [activeCategory, setActiveCategory] = useState(false);

    function categoriesTitle() {
        if(activeCategory){
            return (<p className='category__categoriesTitle_titleChanged'> {name} </p>)
        } else{
            return (<p className='category__categoriesTitle_titleStart'> {name} </p>)
        }
    }

    return (
        <div className='category'>
            <div className='category__container'>

                <div className='category__categories'>

                    <div className='category__categoriesIcon' onClick={() => setActiveCategory(!activeCategory) }>
                        {activeCategory
                        ? (<p className='category__categoriesIcon_titleChanged'><AiIcons.AiOutlineArrowRight /></p>)
                        : (<p className='category__categoriesIcon_title'><AiIcons.AiOutlineArrowRight /></p>)}
                    </div>

                    <Link to={`/search/${category}`} className="category__categoriesTitle" 
                    onClick={() => setActiveCategory(true)}>
                        {categoriesTitle()}
                    </Link>

                </div>

                <div className="category__subCategories">
                    {activeCategory
                    ? (<div> 
                        {subCategories.map((etiqueta) => (
                            <SubCategory
                            category={category}
                            etiqueta={etiqueta} />
                        ))}
                    </div>)
                    : (<div className='category__noneDisplay'></div>)
                    }
                </div>
            
            </div>
        </div>
    )
}

export default SubTag
