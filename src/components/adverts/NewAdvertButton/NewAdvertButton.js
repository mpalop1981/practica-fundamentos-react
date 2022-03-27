import { Link, useNavigate } from 'react-router-dom';
import './newAdvertButton.css';

function NewAdvertButton() {
  let navigate = useNavigate();
  const handleNewAdvert = () => {
    let path = 'new';
    navigate(path);
  };

  return (
    <button className="button-newAd" onClick={handleNewAdvert}>
      Publish
    </button>
  );
}

export default NewAdvertButton;
