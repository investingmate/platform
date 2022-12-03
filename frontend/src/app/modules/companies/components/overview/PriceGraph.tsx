import React from 'react'
import {useIntl} from 'react-intl';
import {CustomCard} from "../../../../../components/CustomCard";
// import TradingViewWidget from "react-tradingview-widget";

const PriceGraph = () => {
  const intl = useIntl()
  return (
    <CustomCard title={intl.formatMessage({id: 'COMPANIES.PRICE_GRAPH'})}>
      TODO
      {/*<TradingViewWidget*/}
      {/*  symbol="NASDAQ:AAPL"*/}
      {/*  timezone="Australia/Sydney"*/}
      {/*  withdateranges*/}
      {/*  details*/}
      {/*  calendar*/}
      {/*  show_popup_button*/}
      {/*  popup_width={window.screen.width * 0.9 ?? "1000"}*/}
      {/*  popup_height={window.screen.height * 0.8 ?? "650"}*/}
      {/*/>*/}
    </CustomCard>
  )
}

export {PriceGraph}
