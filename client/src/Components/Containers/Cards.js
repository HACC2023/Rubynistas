import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out some of our AWESOME Containers!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='../Assets/images/Container(1).png'
              text='Green plastic polypro'
              label='Durable'

            />
            <CardItem
              src='./Assets/images/Container(2).png'
              text='Clear plastic polypro'
              label='Durable'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='./Assets/images/Container(4).png'
              text='Clear plastic polypro'
              label='Durable'
            />
            <CardItem
              src='./Assets/images/Container(3).png'
              text='Green plastic polypro'
              label='Durable'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;