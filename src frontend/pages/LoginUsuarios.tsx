import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginUsuarios.css'

function LoginUsuarios() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  const [empresaId, setEmpresaId] = useState('')
  const [nome, setNome] = useState('')
  const [senha, setSenha] = useState('')

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    setMessage('Entrando...')

    try {
      const resposta = await fetch('http://localhost:3000/login/usuario', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          empresa_id: empresaId,
          nome: nome,
          senha: senha
        })
      })

      const dados = await resposta.json()

      if (!resposta.ok) {
        setMessage(dados.erro || 'Erro ao realizar login')
        return
      }

      console.log('LOGIN:', dados)

      navigate('/pg-user-estoque')

    } catch (erro) {
      console.error('ERRO AO CONECTAR COM O BACKEND:', erro)

      setMessage('Não foi possível conectar ao servidor.')
    }
  }

  return (
    <div className="usuario-login">

      <main className="usuario-login-layout">

        <section className="usuario-brand-panel">

          <button
            className="usuario-logo"
            type="button"
            onClick={() => navigate('/')}
          >
            <span className="usuario-logo-mark">N</span>
            NexaStock
          </button>

          <div className="usuario-brand-message">

            <span className="usuario-eyebrow">
              Área do usuário
            </span>

            <h1>
              Seu trabalho, mais simples.
            </h1>

            <p>
              Acesse sua conta e acompanhe suas atividades
              dentro da empresa.
            </p>

          </div>

          <div className="usuario-benefit">

            <span className="usuario-benefit-icon">
              ✦
            </span>

            Acesso rápido e seguro para sua equipe

          </div>

        </section>

        <section className="usuario-form-panel">

          <div className="usuario-form-container">

            <button
              className="usuario-back"
              type="button"
              onClick={() => navigate('/')}
            >
              <span>←</span>
              Voltar
            </button>

            <h2>
              Acesse sua conta
            </h2>

            <p className="usuario-description">
              Informe seus dados para entrar na plataforma.
            </p>


            <form onSubmit={handleSubmit}>

              {/* EMPRESA */}
              <div className="usuario-field">

                <label htmlFor="company-id">
                  Número de cadastro da empresa
                </label>

                <input
                  id="company-id"
                  name="company-id"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ex.: 1,2,3,4..."
                  value={empresaId}
                  onChange={(e) => setEmpresaId(e.target.value)}
                />

              </div>

              <div className="usuario-field">

                <label htmlFor="employee-id">
                  Nome de funcionário
                </label>

              <input
                id="username"
                name="username"
                type="text"
                placeholder="Digite seu nome de usuário"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              </div>

              <div className="usuario-field">

                <label htmlFor="password">
                  Senha
                </label>

                <div className="usuario-password">

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
                    className="usuario-password-button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>

                </div>

              </div>

              <button
                className="usuario-submit"
                type="submit"
              >
                Entrar
              </button>

              <p className="usuario-message">
                {message}
              </p>

            </form>


            <p className="usuario-help">
              Ainda não tem acesso? Fale com o administrador da sua empresa.
            </p>

          </div>

        </section>

      </main>

    </div>
  )
}

export default LoginUsuarios