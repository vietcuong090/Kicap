import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '../Button/Button';
import ProductCard from '../ProductCard/ProductCard';
import './SectionProduct.scss';

const SectionProduct = ({ products, title, strongTitle, navigate }) => {
  const swiperSettings = {
    slidesPerView: 2,
    spaceBetween: 10,
    navigation: products.length > 4,
    modules: [Navigation],
    breakpoints: {
      991: {
        slidesPerView: 3,
      },
      1150: {
        slidesPerView: 4,
      },
    },
  };

  const txtButton = title && strongTitle ? `Xem tất cả . ${title} ${strongTitle}` : 'Xem tất cả';

  return (
    <section className='section_product'>
      <div className='container'>
        <h2 className='product_title'>
          <Link to={`/${navigate}`} className='text-hover-primary'>
            {title} <strong>{strongTitle}</strong>
          </Link>
        </h2>
        <div className='product_block'>
          <Swiper {...swiperSettings} className={products.length < 4 ? 'center' : ''}>
            {products.map((item) => {
              return (
                <SwiperSlide key={item._id}>
                  <ProductCard product={item}></ProductCard>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Button primary className='btn-more' to={navigate}>
            {txtButton}
          </Button>
        </div>
      </div>
    </section>
  );
};

SectionProduct.propTypes = {
  products: PropTypes.array.isRequired,
  title: PropTypes.string,
  strongTitle: PropTypes.string,
  max: PropTypes.string,
  navigate: PropTypes.string.isRequired,
};

export default SectionProduct;
