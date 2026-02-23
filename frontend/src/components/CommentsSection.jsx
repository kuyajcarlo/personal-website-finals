import { useState, useEffect } from 'react'

const API_BASE = '';

export default function CommentsSection() {
  const [comments, setComments] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchComments()
  }, [])

  async function fetchComments() {
    setFetching(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/api/comments`)
      const data = await res.json()
      if (data.success) {
        setComments(data.data)
      } else {
        console.error('API Error:', data.error)
      }
    } catch (err) {
      console.error('Failed to load comments:', err)
      setError('Could not connect to the database.')
    } finally {
      setFetching(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name.trim() || !message.trim()) {
      setError('Please fill in both fields.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: name.trim(), 
          message: message.trim() 
        }),
      })
      const data = await res.json()

      if (data.success) {
        setName('')
        setMessage('')
        setSuccess('Comment posted!')
        fetchComments() // Refresh list
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError(data.error || 'Something went wrong.')
      }
    } catch (err) {
      setError('Server unreachable. Please check your Vercel logs.')
    } finally {
      setLoading(false)
    }
  }

  function handleClear() {
    if (window.confirm('Clear all comments? (This only clears your view)')) {
      setComments([])
    }
  }

  function formatDate(dateStr) {
    try {
      return new Date(dateStr).toLocaleString('en-PH', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    } catch {
      return dateStr
    }
  }

  return (
    <section className="comments-section" id="comments">
      <h2 className="section-title">
        <i className="bi bi-chat-dots-fill"></i> COMMENTS
      </h2>

      <div className="comments-grid">
        <div className="comment-form-wrap">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={100}
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-input"
                placeholder="Write your message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                maxLength={1000}
              />
            </div>

            {error && <p className="error-msg"><i className="bi bi-exclamation-circle"></i> {error}</p>}
            {success && <p className="success-msg"><i className="bi bi-check-circle"></i> {success}</p>}

            <div className="form-actions">
              <button type="submit" className={`btn-primary ${loading ? 'btn-loading' : ''}`} disabled={loading}>
                {loading ? 'Posting...' : 'Post Comment'}
              </button>

            </div>
          </form>
        </div>

        <div className="comment-list-wrap">
          <h3><i className="bi bi-clock-history"></i> RECENT COMMENTS</h3>

          {fetching ? (
            <p className="no-comments">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="no-comments">No comments yet. Be the first!</p>
          ) : (
            <div className="comment-list">
              {comments.map((c, i) => (
                <div className="comment-item" key={c.id || i}>
                  <div className="comment-meta">
                    <span className="comment-name">{c.name}</span>
                    <span className="comment-time">{formatDate(c.created_at)}</span>
                  </div>
                  {/* Fixed to match your Supabase column name 'comment' */}
                  <p className="comment-body">{c.comment || c.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}