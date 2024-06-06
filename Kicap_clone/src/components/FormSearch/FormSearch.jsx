import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import Search from '~/assets/imgs/search.svg';
import './FormSearch.scss';

const FormSearch = ({ onClick: handleToggleInSearch, searchActive }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue('');
  }, [searchActive]);

  const handleChangeInputSearch = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <div className={`form-search ${searchActive ? 'active' : ''}`}>
      <form action='/search'>
        <div className='input-group'>
          <input
            type='text'
            name='search'
            className='form-control'
            placeholder='Bạn cần tìm gì hôm nay?'
            value={inputValue}
            onChange={handleChangeInputSearch}
          />
          <span className='input-group-search'>
            <button className='btn btn-default' type='submit'>
              <img src={Search} alt='' />
            </button>
          </span>
        </div>
      </form>
      <button className='close-search' title='Đóng tìm kiếm' onClick={handleToggleInSearch}>
        <FaXmark />
      </button>
    </div>
  );
};

FormSearch.propTypes = {
  onClick: PropTypes.func.isRequired,
  searchActive: PropTypes.bool,
};

export default FormSearch;
