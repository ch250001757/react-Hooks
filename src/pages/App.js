import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import Header from '../common/Header.jsx';
import CitySelector from '../common/CitySelector.jsx';
import DateSelector from '../common/DateSelector.js';
import Journey from './Journey.jsx';
import DepartDate from './DepartDate.jsx'
import HighSpeed from './HighSpeed.jsx'
import Submit from './Submit.jsx'

import { dateFormat } from '../utils';

import './App.css';

import { bindActionCreators } from 'redux'
import { 
  exchangeFromTo, 
  showCitySelector, 
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
  setDepartDate
 } from '../store/actions'

function App(props) {
  const {
    dispatch,
    from,
    to,
    isCitySelectorVisible,
    cityData,
    isLoadingCityData,
    departDate,
    isDateSelectorVisible
  } = props

  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  // const doExChange = useCallback(() => {
  //   dispatch(exchangeFromTo())
  // }, [])

  // const doShowSelector = useCallback((flag) => {
  //   dispatch(showCitySelector(flag))
  // }, [])

  // action和dispatch绑定在一起
  const cbs = useMemo(() => {
    return bindActionCreators({
      exchangeFromTo,
      showCitySelector
    }, dispatch)
  }, [])

  const citySelectorCbs = useMemo(() => {
    return bindActionCreators({
      onBack: hideCitySelector,
      fetchCityData,
      select:setSelectedCity
    }, dispatch)
  }, [])

  const dateCbs = useMemo(() =>{
    return bindActionCreators({
      dateClick: showDateSelector,
    }, dispatch)
  },[])

  const dateSelectorCbs = useMemo(() =>{
    return bindActionCreators({
      onBack: hideDateSelector,
    }, dispatch)
  },[])

  const onSelect = useCallback((day) => {
    if(day < dateFormat()){
      return
    }
    dispatch(setDepartDate(day))
    dispatch(hideDateSelector())
  },[])


  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
      <form className="form">
        <Journey from={from} to={to}
          // exchangeFromTo={doExChange}
          // showCitySelecotr={doShowSelector}
          {...cbs}
        />
        <DepartDate departDate={departDate} {...dateCbs} />
        <HighSpeed />
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      />

      <DateSelector
        title="日期选择"
        {...dateSelectorCbs}
        onSelect={onSelect}
        show={isDateSelectorVisible}
      />
</div>
  );
}

export default connect(
  function mapStateToProps(state) {
    return state
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch }
  }
)(App)
