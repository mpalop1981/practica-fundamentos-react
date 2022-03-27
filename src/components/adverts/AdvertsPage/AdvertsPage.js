import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NewAdvertButton from '../NewAdvertButton/NewAdvertButton';
import { getLastAdverts } from '../service';
import FormField from '../../common/FormField';

function AdvertsPage() {
  const [adverts, setAdverts] = useState([]);
  const [search, setSearch] = useState({});

  useEffect(() => {
    getLastAdverts().then(advert => setAdverts(advert));
  }, []);

  const handleChange = useCallback(event => {
    setSearch(search => ({
      ...search,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    let updatedOptions = [];

    for (var key in search) {
      if (key === 'name') {
        updatedOptions = adverts
          .filter(x => x.name === search.name)
          .map(x => x);
      }
      if (key === 'price' && updatedOptions.length > 0) {
        updatedOptions = updatedOptions
          .filter(x => x.price <= search.price)
          .map(x => x);
      } else if (key === 'price') {
        updatedOptions = adverts
          .filter(x => x.price <= search.price)
          .map(x => x);
      }
      if (key === 'tags' && updatedOptions.length > 0) {
        updatedOptions = updatedOptions
          .filter(x => x.tags.find(z=>z === search.tags))
          .map(x => x);
      }else if(key === 'tags'){
        updatedOptions = adverts
          .filter(x => x.tags.find(z=>z === search.tags))
          .map(x => x);
      }
    }

    if (updatedOptions.length > 0) {
      setAdverts(updatedOptions);
    }
  };

  let navigate = useNavigate();
  const clearFilters = () => {
    let path = '/';
    navigate(path);
  };

  return (
    <div>
      {adverts.length ? (
        <div>
          <h3>FILTERS</h3>
          <form onSubmit={handleSubmit}>
            <FormField
              type="text"
              name="name"
              label="Name"
              className="loginForm-field"
              //value={name}
              onChange={handleChange}
            />
            <FormField
              type="text"
              name="price"
              label="Price lower than"
              className="loginForm-field"
              //value={price}
              onChange={handleChange}
            />
            <select multiple name="tags" label="Tags" onChange={handleChange}>
              <option value="lifestyle">lifestyle</option>
              <option value="mobile">mobile</option>
              <option value="motor">motor</option>
              <option value="work">work</option>
            </select>
            <br></br>
            <button>Search</button>
          </form>
          <button onClick={clearFilters}>Clear</button>
          <h3>ADVERTS</h3>
          <ul>
            {adverts.map(advert => (
              <li key={advert.id}>
                <Link to={`/adverts/${advert.id}`}>
                  {advert.name} - {advert.price} -{' '}
                  {advert.tags.map(tag => tag + ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          Todavia no hay ningún anuncio disponible. ¿Te gustaría añadir tu
          primer anuncio?
          <br></br>
          <NewAdvertButton />
        </div>
      )}
    </div>
  );
}

export default AdvertsPage;
