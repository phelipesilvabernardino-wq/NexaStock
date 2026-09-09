import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginAdmChef.css'

function LoginAdmChef() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  const [empresaId, setEmpresaId] = useState('')
  const [senha, setSenha] = useState('')

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    setMessage('Entrando...')

    try {
      const resposta = await fetch('http://localhost:3000/login/empresa', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          empresa_id: empresaId,
          senha: senha
        })
      })

      const dados = await resposta.json()

      if (!resposta.ok) {
        setMessage(dados.erro || 'Erro ao realizar login')
        return
      }

      console.log('LOGIN EMPRESA:', dados)

          localStorage.setItem('token', dados.token)
          localStorage.setItem('empresa_id', String(dados.empresa.empresa_id))
          localStorage.setItem('empresa_nome', dados.empresa.nome)

          navigate('/adm-estoque')

    } catch (erro) {
      console.error('ERRO AO CONECTAR COM O BACKEND:', erro)

      setMessage(
        'Não foi possível conectar ao servidor.'
      )
    }
  }

  return (
    <div className="adm-login">

      <main className="adm-login-layout">

        <section className="adm-brand-panel">

          <button
            className="adm-logo"
            type="button"
            onClick={() => navigate('/')}
          >
            <span className="adm-logo-mark">N</span>
            NexaStock
          </button>

          <div className="adm-brand-message">

            <span className="adm-eyebrow">
              Área da empresa
            </span>

            <h1>
              Seu estoque, em movimento.
            </h1>

            <p>
              Acompanhe a operação da sua empresa em um só lugar,
              com clareza e agilidade.
            </p>

          </div>

          <div className="adm-benefit">

            <span className="adm-benefit-icon">
              ✦
            </span>

            Gestão inteligente para a sua operação

          </div>

        </section>

        <section className="adm-form-panel">

          <div className="adm-form-container">

            <button
              className="adm-back"
              type="button"
              onClick={() => navigate('/')}
            >
              <span>←</span>
              Voltar
            </button>

            <h2>
              Acesse sua empresa
            </h2>

            <p className="adm-description">
              Informe seus dados para entrar na plataforma.
            </p>


            <form onSubmit={handleSubmit}>

              <div className="adm-field">

                <label htmlFor="company-id">
                  Número de cadastro da empresa
                </label>

                <input
                  id="company-id"
                  name="company-id"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ex.: 1, 2, 3, 4..."
                  value={empresaId}
                  onChange={(e) => setEmpresaId(e.target.value)}
                />

              </div>

              <div className="adm-field">

                <label htmlFor="password">
                  Senha
                </label>

                <div className="adm-password">

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />

                  <button
                    type="button"
                    className="adm-password-button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>

                </div>

              </div>
              
              <button
                className="adm-submit"
                type="submit"
              >
                Entrar
              </button>

              <p className="adm-message">
                {message}
              </p>

            </form>


            <p className="adm-help">
              Ainda não tem acesso? Fale com o administrador da sua empresa.
            </p>

          </div>

        </section>

      </main>

    </div>
  )
}

export default LoginAdmChef