import React from 'react'
import Toggle from '../../../shared/Toggle/Toggle'
import { useState } from 'react'
import './FilterPanel.css'
import settingsvg from './images/settings.svg'
import Popup from '../../../shared/Popup/Popup'

const filters = [
  {name: 'Date (new first)'},
  {name: 'Date (old first)'},
  {name: 'Price (lower first)'},
  {name: 'Price (higher first)'}
];

const FilterPanel = () => {
  const [onSale, selectOnSale] = useState(true);
  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedSort, setSort] = useState(filters[0].name);

  return (
    <section className='filter-panel'>
        <input className='text-input' placeholder='Type in lot name' type={"text"}></input>
        <Toggle onSale={onSale} selectOnSale={selectOnSale}/>
        <div className='filter-option sort-filter' onClick={() => setOpenSort(!openSort)}>
            filter by: <span className='selected-filter'>{selectedSort}</span>
            {openSort &&
              <ul className='dropdown'>
                {filters.map((option, idx) => 
                  <li key={idx} className='dropdown-item' onClick={() => setSort(filters[idx].name)}>
                  {option.name}
                  </li>
                )}
              </ul>
            }
        </div>
        <div className='filter-option filters-toggle' onClick={() => setOpenFilter(!openFilter)}>
            filters
            <img className='settings-img' alt='settings-svg' src={settingsvg}/>
        </div>
        <Popup active={openFilter} setActive={setOpenFilter}>dfdsfd</Popup>
    </section>
  )
}

export default FilterPanel