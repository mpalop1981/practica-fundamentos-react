import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNewAdvert } from '../service';
import FormField from '../../common/FormField';

function NewAdvert() {
  const navigate = useNavigate();
  const [newAdvert, setNewAdvert] = useState({
    name: '',
    sale: true,
    price: '',
  });
  const [tags, setTags] = useState([]);
  const [photo, setPhoto] = useState(null);

  const { name, sale, price } = newAdvert;

  const handleChange = useCallback(event => {
    setNewAdvert(newAdvert => ({
      ...newAdvert,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleChangeTags = useCallback(event => {
    const updatedOptions = [...event.target.options]
      .filter(option => option.selected)
      .map(x => x.value);
    setTags(updatedOptions);
  }, []);

  const handleChangeFile = useCallback(event => {
    setPhoto(event.target.files[0]);
  }, []);

  const buttonDisabled = useMemo(() => {
    return !name || !sale || !price || !tags.length > 0;
  }, [name, sale, price, tags]);

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData();
    for (var key in newAdvert) {
      formData.append(key, newAdvert[key]);
    }
    formData.append('tags', tags);
    if (photo != null) {
      formData.append('photo', photo);
    }
    try{
      await createNewAdvert(formData);
      navigate('/');
    }catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="newAdvert">
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Name (*) Required</td>
              <td>
                <FormField
                  type="text"
                  name="name"
                  className="loginForm-field"
                  value={name}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Sale (*) Required</td>
              <td>
                <select name="sale" value={sale} onChange={handleChange}>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Price (*) Required</td>
              <td>
                <FormField
                  type="text"
                  name="price"
                  className="loginForm-field"
                  value={price}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Tags (*) Required</td>
              <td>
                <select
                  multiple
                  name="tags"
                  value={tags}
                  onChange={handleChangeTags}
                >
                  <option value="lifestyle">lifestyle</option>
                  <option value="mobile">mobile</option>
                  <option value="motor">motor</option>
                  <option value="work">work</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Photo</td>
              <td>
                <input type="file" onChange={handleChangeFile}></input>
              </td>
            </tr>
          </tbody>
        </table>
        <button className="button-newAd" disabled={buttonDisabled}>
          Save
        </button>
      </form>
    </div>
  );
}

export default NewAdvert;
