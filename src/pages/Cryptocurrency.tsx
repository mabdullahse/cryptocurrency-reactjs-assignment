import { useEffect, useState } from 'react';
import useApiRequest from '../hooks/RequestApi';
import { NumericFormat } from 'react-number-format';


interface ICrypto {
  id: number,
  name: string,
  symbol: string,
  cmc_rank: string,
  quote: {
    USD: {
      price: number,
      volume_24h: number
    }
  }
}
interface Props {
  data: ICrypto[];
  error: any;
  isLoaded: boolean;
  refresh: () => void;
}

function Cryptocurrency() {
  const {  data, error, isLoaded, refresh }   = useApiRequest({
    url: '/crypto.json',
    option: 'GET',
    include_crypto_api: true,
  })   as Props 

 
  
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    setIsSpinning(!isLoaded);
  }, [isLoaded]);

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='inline-block text-xl sm:text-3xl font-bold md:font-extrabold text-slate-900 my-5 '>
          Cryptocurrency List  
        </h1>

        <div className='cursor-pointer'>
          <svg
            onClick={refresh}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className={`w-6 h-6 ${isSpinning ? 'icn-spinner' : ''}`}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
            />
          </svg>
        </div>
      </div>

      <div className='relative overflow-x-auto shadow-sm sm:rounded-lg'>
        <table className='w-full text-sm text-left text-gray-500  '>
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
            {isSpinning &&
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className='h-12 bg-white border-b hover:bg-gray-50 cursor-pointer loading-shimmer'>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap  '
                  ></th>
                  <td className='px-6 py-4'> </td>
                  <td className='px-6 py-4'> </td>
                  <td className='px-6 py-4'></td>
                  <td className='px-6 py-4'></td>
                </tr>
              ))}
          {!isSpinning &&
              data.map((item, index) => (
                <tr className='bg-white border-b hover:bg-gray-50 cursor-pointer'>
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
                    value={item.quote.USD.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    decimalScale={2}
                  />
                </td>
                <td className='px-6 py-4'>
                  {' '}
                  <NumericFormat
                    value={item.quote.USD.volume_24h}
                    displayType={'text'}
                    decimalScale={2}
                    thousandSeparator={true}
                    prefix={'$'}
                  />
                </td>
              </tr>
              ))}

            {/* <tr className='bg-white border-b hover:bg-gray-50 cursor-pointer'>
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap  '
              >
                Bitcoin
              </th>
              <td className='px-6 py-4'>1</td>
              <td className='px-6 py-4'>BTC</td>
              <td className='px-6 py-4'>
                <NumericFormat
                  value={2456981}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              </td>
              <td className='px-6 py-4'>
                {' '}
                <NumericFormat
                  value={19882345383.658875}
                  displayType={'text'}
                  decimalScale={2}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cryptocurrency;
