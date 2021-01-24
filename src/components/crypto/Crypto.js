import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Crypto.css';
import Coin from '../coin/Coin';
import Header from '../header/Header';
import GeneralChart from '../chart/GeneralChart';

function Crypto() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [xValue, setXValue] = useState([]);
  const [yValue, setYValue] = useState([]);

   const fetchApiData = () => {
        return axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(({data}) => {
          console.log(data);
          return data;
        }, (error) => {
          console.log(error);
        });
      }


  const fetchChartApiData = () => {
         return axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily')
         .then(({data}) => {
         console.log(data);
         return data;
         }, (error) => {
           console.log(error);
         });
       }

  useEffect(() => {
        fetchApiData().then(data => {
         setCoins(data);
         }).then(
         fetchChartApiData().then(data => {
         console.log('data', data);
            for (let d of data.prices){
               setXValue(d[0]);
               setYValue(d[1]);
            }
          }))
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      <Header />
       <div className='coin-search'>
          <h1 className='coin-text'>Search a currency</h1>
          <form>
            <input
              className='coin-input'
              type='text'
              onChange={handleChange}
              placeholder='Search'
            />
          </form>
        </div>
       <GeneralChart
        xValue={xValue}
        yValue={yValue}
        />
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default Crypto;
