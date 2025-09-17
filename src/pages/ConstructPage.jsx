import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSpaceTravel } from '../context/SpaceTravelContext.jsx'
import Loading from '../components/Loading.jsx'
import ErrorAlert from '../components/ErrorAlert.jsx'
import styles from './ConstructPage.module.css'

export default function ConstructPage() {
  const { buildSpacecraft, loading } = useSpaceTravel()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', capacity: '', description: '', pictureUrl: '' })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!String(form.capacity).trim()) e.capacity = 'Capacity is required'
    else if (isNaN(Number(form.capacity)) || Number(form.capacity) <= 0) e.capacity = 'Capacity must be a positive number'
    if (!form.description.trim()) e.description = 'Description is required'
    return e
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    setApiError('')
    const v = validate()
    setErrors(v)
    if (Object.keys(v).length) return

    const res = await buildSpacecraft({
      name: form.name.trim(),
      capacity: Number(form.capacity),
      description: form.description.trim(),
      pictureUrl: form.pictureUrl.trim() || undefined
    })

    if (res.isError) {
      setApiError(res.data)
    } else {
      navigate('/spacecrafts')
    }
  }

  return (
    <section className={styles.wrap}>
      <Link to={-1} className={styles.back}>← Back</Link>
      <h1>Build spacecraft</h1>
      <p>Provide details to commission a new spacecraft. It will be stationed on <strong>Earth</strong> initially.</p>
      <form onSubmit={onSubmit} className={`card ${styles.form}`} noValidate>
        <ErrorAlert message={apiError} />
        <div className="form-row">
          <label htmlFor="name">Name *</label>
          <input id="name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} placeholder="e.g., Aurora Prime" />
          {errors.name && <div className={styles.error}>{errors.name}</div>}
        </div>
        <div className="form-row">
          <label htmlFor="capacity">Capacity *</label>
          <input id="capacity" value={form.capacity} onChange={(e)=>setForm({...form, capacity:e.target.value})} inputMode="numeric" placeholder="e.g., 10000" />
          {errors.capacity && <div className={styles.error}>{errors.capacity}</div>}
        </div>
        <div className="form-row">
          <label htmlFor="description">Description *</label>
          <textarea id="description" rows={4} value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} placeholder="What makes this ship special?" />
          {errors.description && <div className={styles.error}>{errors.description}</div>}
        </div>
        <div className="form-row">
          <label htmlFor="pictureUrl">Picture URL (optional)</label>
          <input id="pictureUrl" value={form.pictureUrl} onChange={(e)=>setForm({...form, pictureUrl:e.target.value})} placeholder="https://…"/>
        </div>
        <div className={styles.actions}>
          <button type="submit" disabled={loading}>{loading ? 'Building…' : 'Build spacecraft'}</button>
        </div>
      </form>
      {loading && <Loading />}
    </section>
  )
}
