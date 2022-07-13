import React, { useEffect, useState, useMemo } from 'react'
import './LotPage.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../../apiAccessor/axiosApi'
import CountdownContainer from '../../shared/CountdownContainer/CountdownContainer'
import moment from 'moment'
import BiddingPanel from './BiddingPanel/BiddingPanel'
import Spinner from '../../shared/Spinner/Spinner'

const LotPage = () => {
  const { id } = useParams();
  const [lot, setLot] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const bids = useMemo(() => lot?.bids?.sort((a,b) => b.price - a.price) ?? [], [lot.bids]);
  const highestBid = useMemo(() => bids[0] ?? null, [bids]);

  useEffect(() => {
    getLot();
  },[])

  const getLot = async () => {
    try {
      const response = await axios.get(`lots/${id}`)
      .then(response => response.data);
      setLot(response);
      setIsLoading(false);
    } catch { navigate(-1); }
  }

  return (isLoading ? <div className="loading-container"><Spinner/></div> :
    <div className="page-lot-container">
      <div className="lot-page-header">
        <h1 className='go-back-button' onClick={() => navigate('/lots', {replace: true})}>go back</h1>
        <div className="countdown-container">
          <div className="countdown">
            <CountdownContainer openDate={lot.openDate} closeDate={lot.closeDate}/>
          </div>
        </div>
      </div>    
      <div className="lot-details">
      <div className="lot-header">
          <div className="title-container">
            <h1 className="lot-title">{lot.name}</h1>
            <hr className="line page-lot-line" />
          </div>
        </div>
      <div className="lot-info-container">
      <div className="image-container">
        <img className='lot-image page-lot-image' alt='' src={`${process.env.REACT_APP_AUCTION_API_URL}/images/lot/${id}/large`}/>
      </div>
      <div className="lot-info">
        <div className="status-container">
          <h1 className='status'>{lot.status}</h1>
        </div>
        {
          lot?.sold &&
          <div>
              <div 
                className="buyer-container" 
                style={{
                  'marginBottom': '1rem',
                  'fontFamily': 'var(--text-font-primary)',
                  'color': 'var(--color-secondary)'}}>
                  <h2 className="price-title">Sold to:</h2>
                  <h2 className="bidder">{highestBid?.bidder}</h2>
                  <div className="bid-price">
                      <h2 className="price-title">Final price:</h2>
                      <h2 className='price-value'>{lot?.startPrice + highestBid?.price}</h2>
                  </div>
              </div>
          </div>
        }
        <div className="description">
            <h1 className="description-title">Auction duration:
            <span className="description-text">{`${moment(lot.openDate).format('LL')} - ${moment(lot.closeDate).format('LL')}`}</span>
            </h1>
          </div>
        <div className="description">
            <h1 className="description-title">Seller:
            <span className="description-text">{lot.seller}</span>
            </h1>
          </div>
        <div className="description">
            <h1 className="description-title">Category:
            <span className="description-text">{lot.category}</span>
            </h1>
          </div>
        <div className="description">
          <h1 className="description-title">Description:
          <span className="description-text">{lot.description}</span>
          </h1>
        </div>
      </div>
      </div>
      </div>
      <div className="bidding-details">
        {(moment(lot.openDate).utc(true).local() <= moment().utc(true).local() &&
          moment(lot.closeDate).local() >= moment().local())
         && <BiddingPanel lot={lot}/>}
      </div>
    </div>
  )
}

export default LotPage