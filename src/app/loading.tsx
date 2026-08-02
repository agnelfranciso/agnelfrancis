export default function Loading() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'var(--background, #0f0f11)',
      color: 'var(--text, #f4f4f5)',
      zIndex: 9999,
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '3px solid rgba(255,255,255,0.1)',
        borderTopColor: 'var(--accent-primary, #FF5555)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '2rem'
      }} />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{ textAlign: 'center', opacity: 0.7 }}>
        <p style={{ marginBottom: '0.5rem' }}>Loading...</p>
        <p style={{ fontSize: '0.9rem' }}>
          Not Loading? <a href="/simple" style={{ textDecoration: 'underline', color: 'inherit' }}>Load a simpler page!</a>
        </p>
      </div>
    </div>
  );
}
