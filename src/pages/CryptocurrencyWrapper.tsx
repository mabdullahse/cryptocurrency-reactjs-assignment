import React  from 'react';
import useApiRequest from '../hooks/RequestApi';

import { useNavigate } from 'react-router-dom';
import RefreshIcon from '../assets/icons/RefreshIcon';
import { useCurrencyContext } from '../store/CurrencyContext';
import Cryptocurrency from './Cryptocurrency';

interface ICrypto {
  id: number;
  name: string;
  symbol: string;
  cmc_rank: string;
  quote: {
    [key: string]: {
      price: number;
      volume_24h: number;
    };
  };
}
interface Props {
  data: ICrypto[];
  error: any;
  isLoaded: boolean;
  refresh: (updatedURL?: string) => void;
}

function getURL(currency: string) {
  return currency === 'USD'
    ? '/crypto-usd.json'
    : currency === 'EUR'
    ? '/crypto-eur.json'
    : '/crypto-cny.json';
}

function CryptocurrencyWrapper() {
  const navigate = useNavigate();
  const { currency } = useCurrencyContext();

  const { data, error, isLoaded, refresh } = useApiRequest({
    url: getURL(currency),
    option: 'GET',
    include_crypto_api: true,
  }) as Props;

  const onCryptoSelection = (id: number) => {
    navigate('/crypto/' + id);
  };

  const currencySymbol =
    data && data[0]?.quote['USD']
      ? 'USD'
      : data && data[0]?.quote['EUR']
      ? 'EUR'
      : 'CNY';
  const currencyPrefix =
    currencySymbol === 'USD' ? '$' : currencySymbol === 'EUR' ? '€' : '¥';

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='inline-block text-xl sm:text-3xl font-bold md:font-extrabold text-slate-900 my-5 '>
          Cryptocurrency List 
        </h1>

        <div className='cursor-pointer'>
          <RefreshIcon
            refresh={() => refresh(getURL(currency))}
            isSpinning={!isLoaded}
          />
        </div>
      </div>

      {!isLoaded && <div className='h-96   loading-shimmer'></div>}

      <div className={`overflow mx-auto shadow-sm sm:rounded-lg`}>
        {isLoaded && (
          <Cryptocurrency
            data={data}
            currencyPrefix={currencyPrefix}
            currencySymbol={currencySymbol}
            onCryptoSelection={onCryptoSelection}
          />
        )}

        {/*
        
        Table without Windowing 
        <table className='w-full text-sm text-left text-gray-500 h-96 '>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50    '>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Rank
              </th>
              <th scope='col' className='px-6 py-3'>
                Symbol
              </th>
              <th scope='col' className='px-6 py-3'>
                Price
              </th>
              <th scope='col' className='px-6 py-3'>
                24 hour Change
              </th>
            </tr>
          </thead>
          <tbody>
          

            {!isSpinning &&
              data.map((item, index) => (
                

                <tr
                  key={index}
                  className='bg-white border-b hover:bg-gray-50 cursor-pointer'
                  onClick={() => onCryptoSelection(item.id)}
                >
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap  '
                  >
                    {item.name}
                  </th>
                  <td className='px-6 py-4'> {item.cmc_rank}</td>
                  <td className='px-6 py-4'>{item.symbol}</td>
                  <td className='px-6 py-4'>
                    <NumericFormat
                      value={item.quote[currencySymbol].price}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={currencyPrefix}
                      decimalScale={2}
                    />
                  </td>
                  <td className='px-6 py-4'>
                    <NumericFormat
                      value={item.quote[currencySymbol].volume_24h}
                      displayType={'text'}
                      decimalScale={2}
                      thousandSeparator={true}
                      prefix={currencyPrefix}
                    />
                  </td>
                </tr>
              ))}

            
          </tbody>
        </table> */}
      </div>
    </div>
  );
}

export default CryptocurrencyWrapper;
