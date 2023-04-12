import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import CryptoCard from '../components/CryptoCard';
import useApiRequest from '../hooks/RequestApi';
import RefreshIcon from '../assets/icons/RefreshIcon';
import { useCurrencyContext } from '../store/CurrencyContext';
import WarningIcon from './../assets/icons/WarningIcon';
import BackIcon from './../assets/icons/BackIcon';

export interface ISelectedCrypto {
  id: number;
  name: string;
  symbol: string;
  cmc_rank: number;
  quote: {
    USD: {
      price: number;
      volume_24h: number;
      market_cap: number;
      volume_change_24h: number;
    };
  };
  total_supply: number;
  circulating_supply: number;
  logo: string;
}

interface Props {
  data: ISelectedCrypto;
  error: any;
  isLoaded: boolean;
  refresh: () => void;
}

const CryptocurrencyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { currency, togglCurrency } = useCurrencyContext();

  const { data, error, isLoaded, refresh } = useApiRequest({
    url: '/cryptoinfo.json',
    option: 'GET',
    include_crypto_api: true,
  }) as Props;

  const [isSpinning, setIsSpinning] = useState(true);
  useEffect(() => {
    setIsSpinning(!isLoaded);
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    refresh();
  }, [currency]);

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex justify-between items-center'>
          <h1 className='inline-block text-xl sm:text-3xl font-bold md:font-extrabold text-slate-900 my-5 mr-5'>
            {data.name}
          </h1>
          <img src={data.logo} alt={data.name} />
        </div>

        <div className='cursor-pointer flex gap-x-2'>
          <div onClick={() => navigate('/crypto/')}>
            <BackIcon />
          </div>
          <RefreshIcon refresh={() => refresh()} isSpinning={isSpinning} />
        </div>
      </div>

      <div
        className='flex p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50  '
        role='alert'
      >
        <WarningIcon />
        <span className='sr-only'>Info</span>
        <div>
          <span className='font-medium'> alert! </span>
          Although the page is dynamic, the content remains unchanged due to
          limitations with the CoinMarketCap API. Like can't use CoinMarketCap
          API-KEY on client side & Allow limited api requests As a workaround, I
          am retrieving the data from a local file.
        </div>
      </div>

      <div className='flex justify-center items-start min-h-screen  pt-2'>
        <CryptoCard
          rank={data.cmc_rank}
          name={data.name}
          symbol={data.symbol}
          price={data.quote?.USD?.price}
          volume={data.quote?.USD?.volume_24h}
          marketCap={data.quote?.USD?.market_cap}
          change24h={data.quote?.USD?.volume_change_24h}
          totalSupply={data.total_supply}
          availableSupply={data.circulating_supply}
          priceInBitcoin={data.quote?.USD?.price}
          isSpinning={isSpinning}
        />
      </div>
    </div>
  );
};

export default CryptocurrencyDetail;
