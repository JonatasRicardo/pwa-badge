import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [form, setForm] = React.useState({
    count: '',
    api: '',
  });

  const handleChange = (e) => {
    const { value, name } = e?.target;
    setForm({
      ...form,
      [name]: value
    })
  }

  const updateBadge = () => {
    setBadge(form.count);
  }

  const setApi = (api) => {
    setForm({
      ...form,
      api
    })
  }

  const setBadge = (...args) => {
    if (navigator.setBadge) {
      setApi('navigator.setBadge')
      return navigator.setBadge(...args);
    } else if (navigator.setExperimentalBadge) {
      setApi('navigator.setExperimentalBadge')
      return navigator.setExperimentalBadge(...args);
    } else if (navigator.setClientBadge) {
      setApi('navigator.setClientBadge')
      return navigator.setClientBadge(...args);
    } else if (navigator.setAppBadge) {
      setApi('navigator.setAppBadge')
      navigator.setAppBadge(...args);
    } else if (navigator.setExperimentalAppBadge) {
      setApi('navigator.setExperimentalAppBadge')
      navigator.setExperimentalAppBadge(...args);
    } else if (window.ExperimentalBadge) {
      setApi('window.ExperimentalBadge')
      window.ExperimentalBadge.set(...args);
    }
  }

  const clearBadge = () => {
      if (navigator.clearAppBadge) {
        navigator.clearAppBadge();
      } else if (navigator.clearExperimentalAppBadge) {
        navigator.clearExperimentalAppBadge();
      } else if (window.ExperimentalBadge) {
        window.ExperimentalBadge.clear();
      } else if (navigator.clearBadge) {
        return navigator.clearBadge();
      } else if (navigator.clearExperimentalBadge) {
        return navigator.clearExperimentalBadge();
      } else if (navigator.clearClientBadge) {
        return navigator.clearClientBadge();
      }
  }

  return (
    <div>
      <h1>PWA Badge</h1>
      <div>
        {JSON.stringify(form)} <br/>
        <div>
          <input type="number" name="count" value={form.count} onChange={handleChange}/>
        </div>
        <div>
          <button onClick={updateBadge}>set</button>
        </div>
        <div>
          <button onClick={clearBadge}>clear</button>
        </div>
        
        {/* <select name="api" value={form.api} onChange={handleChange}>
          <option></option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select> */}
      </div>
    </div>
  )
}
