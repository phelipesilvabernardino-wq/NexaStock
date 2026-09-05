import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LoginAdmChef from './pages/LoginAdmChef'
import LoginUsuarios from './pages/LoginUsuarios'
import PgAdmEstoque from './pages/PgAdmEstoque'
import PgUserEstoque from './pages/PgUserEstoque'

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login-empresa"
                    element={<LoginAdmChef />}
                />

                <Route
                    path="/login-usuarios"
                    element={<LoginUsuarios />}
                />

                <Route
                    path="/adm-estoque"
                    element={<PgAdmEstoque />}
                />

                <Route
                    path="/pg-user-estoque"
                    element={<PgUserEstoque />}
                />

                <Route
                    path="*"
                    element={<Home />}
                />

            </Routes>
        </BrowserRouter>
    )
}

export default App