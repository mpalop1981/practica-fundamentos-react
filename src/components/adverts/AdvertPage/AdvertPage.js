import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAdvert } from '../service';
import Page from '../../layout/Page';

const AdvertPageFunction = () => {
  const [advert, setAdvert] = useState(null);
  const { advertId } = useParams();

  useEffect(() => {
    getAdvert(advertId).then(advert => setAdvert(advert));
  }, [advertId]);
  return (
    <Page title="Advert detail">
      <div>
        {advert ? (
          <div>
            {advert.photo ? <img src={advert.photo} width="500"></img> : ''}
            <ul>
              <li>Name: {advert.name}</li>
              <li>Price: {advert.price}</li>
              <li>Sell: {advert.sale.toString()}</li>
              <li>Tags: {advert.tags}</li>
            </ul>
          </div>
        ) : (
          'Nothing to show'
        )}
      </div>
    </Page>
  );
};

export default AdvertPageFunction;
