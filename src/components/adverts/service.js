import client from '../../api/client';

const advertsBaseUrl = 'api/v1/adverts';

export const getLastAdverts = () => {
  return client.get(advertsBaseUrl);
};

export const getAdvert = advertId => {
  const url = `${advertsBaseUrl}/${advertId}`;
  return client.get(url);
};

export const createNewAdvert = advert => {
  return client.post(advertsBaseUrl, advert);
};
