import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

type ModalState = {
  isOpen: boolean
  title: string
  text: string
}

function Home() {
  const navigate = useNavigate()

  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    title: 'Acesso selecionado',
    text: 'Esta é uma tela de protótipo. O login ainda não está conectado ao backend.',
  })

  function showModal(title: string, text: string) {
    setModal({
      isOpen: true,
      title,
      text,
    })
  }

  function hideModal() {
    setModal((currentModal) => ({
      ...currentModal,
      isOpen: false,
    }))
  }

  function handleLogin(role: string) {
    if (role === 'company') {
      navigate('/login-empresa')
      return
    }

    if (role === 'employee') {
      showModal(
        'Login de funcionário',
        'Você selecionou o acesso de funcionário da empresa. A tela de login será conectada ao sistema posteriormente.',
      )
      return
    }

    showModal(
      'Login de usuário',
      'Você selecionou o acesso de usuário. A tela de login será conectada ao sistema posteriormente.',
    )
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setModal((currentModal) => ({
          ...currentModal,
          isOpen: false,
        }))
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <div className="background-shape shape-one"></div>
      <div className="background-shape shape-two"></div>

      <div className="arrow-bg arrow-left">↗</div>
      <div className="arrow-bg arrow-right">↗</div>

      <main className="home-page">
        <header className="brand">
          <div className="brand-mark" aria-hidden="true">
            <span className="mark-box"></span>
            <span className="mark-arrow">↗</span>
          </div>

          <div className="brand-name">
            <span>Nexa</span>
            <strong>Stock</strong>
          </div>

          <p>CONTROLE. ORGANIZE. EVOLUA.</p>
        </header>

        <section className="login-card">
          <div className="intro">
            <div className="intro-icon">↗</div>

            <div>
              <h1>Bem-vindo!</h1>
              <p>Selecione como deseja acessar o NexaStock.</p>
            </div>
          </div>

          <div className="login-options">
            <button
              className="login-option"
              type="button"
              onClick={() => handleLogin('company')}
            >
              <div className="option-icon">▣</div>

              <div className="option-text">
                <h2>Administrador Chefe</h2>
                <p>
                  Acesso ao painel de gerenciamento e controle de estoque.
                </p>
              </div>

              <span className="option-arrow">→</span>
            </button>

           <button
              className="login-option"
              type="button"
              onClick={() => navigate('/login-usuarios')}
            >
              <div className="option-icon user-icon">
                ♙
              </div>

              <div className="option-text">
                <h2>Usuário</h2>

                <p>
                  Acesso para consultar produtos e informações disponíveis.
                </p>
              </div>

              <span className="option-arrow">
                →
              </span>
          </button>
          </div>

        </section>

        <p className="copyright">
          © 2026 NexaStock • Gestão inteligente de estoque
        </p>
      </main>

      <div
        className={`modal${modal.isOpen ? ' show' : ''}`}
        aria-hidden={modal.isOpen ? 'false' : 'true'}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            hideModal()
          }
        }}
      >
        <div className="modal-box">
          <button
            className="close-modal"
            aria-label="Fechar"
            onClick={hideModal}
          >
            ×
          </button>

          <div className="modal-icon">✓</div>

          <h2>{modal.title}</h2>

          <p>{modal.text}</p>

          <button className="modal-button" onClick={hideModal}>
            Entendi
          </button>
        </div>
      </div>
    </>
  )
}

export default Home