import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styles from '../styles/Home.module.css'
import PWABadge from 'pwa-badge';

export default function Home() {
  const [form, setForm] = React.useState({
    count: '',
    api: '',
  });
  let badge;

  React.useEffect(() => {
    badge = new PWABadge();
    console.log('badge?.isSupported() ', badge?.isSupported() )
  })

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

  const forceSetBadge = () => {
    const { api } = form;
    switch (api) {
      case 'navigator.setBadge':
        navigator.setBadge(form.count)
        break;
      case 'navigator.setExperimentalBadge':
        navigator.setExperimentalBadge(form.count)
        break;
      case 'navigator.setClientBadge':
        navigator.setClientBadge(form.count)
        break;
      case 'navigator.setAppBadge':
        navigator.setAppBadge(form.count)
        break;
      case 'navigator.setExperimentalAppBadge':
        navigator.setExperimentalAppBadge(form.count)
        break;
      case 'window.ExperimentalBadge':
        window.ExperimentalBadge(form.count)
        break;
      default:
        window.ExperimentalBadge(form.count)
        break;
    }
  }


  return (
    <div style={{ padding: 15 }}>
      <h1>PWA Badge</h1>
      <div>{badge?.isSupported() ? "badge is supported" : "badge is not supported"}</div>
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
        
        <select name="api" value={form.api} onChange={handleChange}>
          <option></option>
          <option>navigator.setBadge</option>
          <option>navigator.setExperimentalBadge</option>
          <option>navigator.setClientBadge</option>
          <option>navigator.setAppBadge</option>
          <option>navigator.setExperimentalAppBadge</option>
          <option>window.ExperimentalBadge</option>
        </select>
        <div>
          <button onClick={forceSetBadge}>set {form.api}</button>
        </div>
      </div>
    </div>
  )
}
