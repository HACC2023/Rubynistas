import React from 'react';
import { Link } from 'react-router-dom';

function AboutItem(props) {
  return (
    <>
      <li className='about__item'>
        <Link className='about__item__link' to={props.path}>
          <figure className='about__item__pic-wrap' data-category={props.label}>
            <img
              className='about__item__img'
              alt='Container'
              src={props.src}
            />
          </figure>
          <div className='about__item__info'>
            <h5 className='about__item__text'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default AboutItem;