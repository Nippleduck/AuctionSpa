import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useQuery } from 'react-query'
import axios from '../../../apiAccessor/axiosApi'

const UpdatableImage = ({id, format}) => {
    const getImage = useQuery(["image", id.toString()], async () => 
    await axios.get(`images/lot/${id}/${format}/blob`).then(res => res.data), {
        staleTime: 120000
    });

    const image = useMemo(() => `data:image/jpeg;base64, ${getImage.data}`, [getImage.data]);

  return (
    <img src={image} alt="lot_image" className="lot-image" />
  )
}

export default UpdatableImage