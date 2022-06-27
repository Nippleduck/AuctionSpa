import React from 'react'
import './LotsContainer.css'
import { useState } from 'react';
import Toggle from '../../../shared/Toggle/Toggle';

const LotsContainer = () => {
  const [onSale, selectOnSale] = useState(true);

  return (
    <section className='lots-container'>
        <div className="filter-optional">
        <Toggle onSale={onSale} selectOnSale={selectOnSale}/>
        </div>
        <div className="content-empty">
          Ooops... guess nothing is in here yet
        </div>
        </section>
  )
}

export default LotsContainer