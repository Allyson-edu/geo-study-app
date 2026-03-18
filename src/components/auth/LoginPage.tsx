import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#1A1A1A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decoração Bauhaus — faixa vermelha topo */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: '#D62B2B' }} />
      {/* Quadrado amarelo — canto superior direito */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: '#F5C400', opacity: 0.15 }} />
      {/* Faixa azul — canto inferior esquerdo */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 120, height: 6, background: '#1A4DAB' }} />

      {/* Card central */}
      <div
        style={{
          background: '#FFFFFF',
          border: '3px solid #FFFFFF',
          boxShadow: '6px 6px 0 #D62B2B',
          padding: '48px 40px',
          width: '100%',
          maxWidth: 420,
          textAlign: 'center',
        }}
      >
        {/* Marca colorida Bauhaus */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
          <div style={{ width: 12, height: 40, background: '#D62B2B' }} />
          <div style={{ width: 12, height: 40, background: '#F5C400' }} />
          <div style={{ width: 12, height: 40, background: '#1A4DAB' }} />
          <span
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: '#1A1A1A',
              letterSpacing: '-0.02em',
              marginLeft: 8,
            }}
          >
            GeoStudy
          </span>
        </div>

        <p style={{ fontSize: 14, color: '#5C5C5C', marginBottom: 40, lineHeight: 1.5 }}>
          Plataforma de estudos para Geologia UFPE.
          <br />
          Progresso salvo em todos os seus dispositivos.
        </p>

        <button
          onClick={handleGoogleLogin}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: '14px 24px',
            background: '#1A1A1A',
            color: '#FFFFFF',
            border: '2px solid #1A1A1A',
            borderRadius: 0,
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '0.02em',
            textTransform: 'uppercase' as const,
            transition: 'box-shadow 0.12s ease, transform 0.12s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '4px 4px 0 #D62B2B'
            e.currentTarget.style.transform = 'translate(-2px, -2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.transform = 'none'
          }}
        >
          {/* Google G icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Entrar com Google
        </button>

        <p style={{ fontSize: 12, color: '#9A9A9A', marginTop: 24, lineHeight: 1.6 }}>
          Seu progresso sincroniza entre todos os seus dispositivos
        </p>
      </div>
    </div>
  )
}
