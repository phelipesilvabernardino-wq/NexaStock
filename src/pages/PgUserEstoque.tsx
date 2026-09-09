import { useState } from "react";
import "./PgUserEstoque.css";

function PgUserEstoque() {
    const [activePage, setActivePage] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [showNovoProduto, setShowNovoProduto] = useState(false);

    const [novoProduto, setNovoProduto] = useState({
    produto: "",
    categoria: "",
    quantidade: "",
    valor: "",
    status: "sim"
});

    const [showNovaMovimentacao, setShowNovaMovimentacao] = useState(false);

    const [novaMovimentacao, setNovaMovimentacao] = useState({
    tipo: "entrada",
    produto: "",
    data: "",
    quantidade: "",
    usuario: ""
});

    const [showNovoFornecedor, setShowNovoFornecedor] = useState(false);

    const [novoFornecedor, setNovoFornecedor] = useState({
    nome: "",
    cnpj: "",
    contato: "",
    email: "",
    status: "sim"
});

    const handlePageChange = (page: string) => {
        setActivePage(page);
        setSidebarOpen(false);
    };

    const handleNovoProdutoChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
    const { name, value } = event.target;

    setNovoProduto((prev) => ({
        ...prev,
        [name]: value
    }));
};

    const handleCadastrarProduto = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        console.log("Novo produto:", novoProduto);

        setShowNovoProduto(false);

        setNovoProduto({
            produto: "",
            categoria: "",
            quantidade: "",
            valor: "",
            status: "sim"
        });
};
    
    const handleNovaMovimentacaoChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
    const { name, value } = event.target;

    setNovaMovimentacao((prev) => ({
        ...prev,
        [name]: value
    }));
};

    const handleRegistrarMovimentacao = (
    event: React.FormEvent<HTMLFormElement>
) => {
    event.preventDefault();

    console.log("Nova movimentação:", novaMovimentacao);

    setShowNovaMovimentacao(false);

    setNovaMovimentacao({
        tipo: "entrada",
        produto: "",
        data: "",
        quantidade: "",
        usuario: ""
    });
};

    const handleNovoFornecedorChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
    const { name, value } = event.target;

    setNovoFornecedor((prev) => ({
        ...prev,
        [name]: value
    }));
};

    const handleCadastrarFornecedor = (
    event: React.FormEvent<HTMLFormElement>
) => {
    event.preventDefault();

    console.log("Novo fornecedor:", novoFornecedor);

    setShowNovoFornecedor(false);

    setNovoFornecedor({
        nome: "",
        cnpj: "",
        contato: "",
        email: "",
        status: "sim"
    });
};

    return (
        <div className="app">

            <aside className={`sidebar ${sidebarOpen ? "open" : ""}`} id="sidebar">

                <div className="logo">

                    <div className="logo-icon">
                        ↗
                    </div>

                    <div className="logo-name">
                        Nexa<span>Stock</span>
                    </div>

                    <div className="logo-subtitle">
                        CONTROLE. ORGANIZE. EVOLUA.
                    </div>

                </div>

                <nav className="nav">

                    <button
                        className={`nav-item ${activePage === "dashboard" ? "active" : ""}`}
                        onClick={() => handlePageChange("dashboard")}
                    >
                        <span className="nav-icon">⌂</span>
                        Painel
                    </button>

                    <button
                        className={`nav-item ${activePage === "estoque" ? "active" : ""}`}
                        onClick={() => handlePageChange("estoque")}
                    >
                        <span className="nav-icon">◇</span>
                        Estoque
                    </button>

                    <button
                        className={`nav-item ${activePage === "movimentacoes" ? "active" : ""}`}
                        onClick={() => handlePageChange("movimentacoes")}
                    >
                        <span className="nav-icon">⇄</span>
                        Movimentações
                    </button>

                    <button
                        className={`nav-item ${activePage === "fornecedores" ? "active" : ""}`}
                        onClick={() => handlePageChange("fornecedores")}
                    >
                        <span className="nav-icon">▱</span>
                        Fornecedores
                    </button>

                </nav>

                <div className="company-box">

                    <small>Empresa selecionada</small>

                    <div className="company-name">
                        ▣ &nbsp;
                    </div>

                </div>

            </aside>

            <main className="main">

                <div className="content">

                    <header className="header">

                        <div>

                            <button
                                className="mobile-menu"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                ☰
                            </button>

                            <h1>
                                {activePage === "dashboard" && "Painel"}
                                {activePage === "estoque" && "Estoque"}
                                {activePage === "movimentacoes" && "Movimentações"}
                                {activePage === "fornecedores" && "Fornecedores"}
                            </h1>

                            <p>
                                {activePage === "dashboard" &&
                                    "Visão geral do sistema e da sua empresa"}

                                {activePage === "estoque" &&
                                    "Gerencie produtos e estoque"}

                                {activePage === "movimentacoes" &&
                                    "Controle as movimentações do estoque"}

                                {activePage === "fornecedores" &&
                                    "Gerencie os fornecedores da empresa"}
                            </p>

                        </div>

                    </header>

                    {/* PAINEL */}

                    {activePage === "dashboard" && (
                        <section className="page active" id="dashboard">

                            <div className="metrics">

                                <div className="metric">

                                    <div className="metric-icon">
                                        ♙
                                    </div>

                                    <div className="metric-number">
                                        0
                                    </div>

                                    <div className="metric-title">
                                        Usuários
                                    </div>

                                    <div className="metric-description">
                                        ativos
                                    </div>

                                </div>

                                <div className="metric">

                                    <div className="metric-icon">
                                        ◇
                                    </div>

                                    <div className="metric-number">
                                        0
                                    </div>

                                    <div className="metric-title">
                                        Produtos
                                    </div>

                                    <div className="metric-description">
                                        cadastrados
                                    </div>

                                </div>

                                <div className="metric">

                                    <div className="metric-icon">
                                        ⇄
                                    </div>

                                    <div className="metric-number">
                                        0
                                    </div>

                                    <div className="metric-title">
                                        Movimentações
                                    </div>

                                    <div className="metric-description">
                                        este mês
                                    </div>

                                </div>

                                <div className="metric">

                                    <div className="metric-icon">
                                        ▱
                                    </div>

                                    <div className="metric-number">
                                        0
                                    </div>

                                    <div className="metric-title">
                                        Fornecedores
                                    </div>

                                    <div className="metric-description">
                                        cadastrados
                                    </div>

                                </div>

                            </div>

                            {/* ESTOQUE */}

                            <div className="card">

                                <div className="card-header">

                                    <div className="card-title">

                                        <span className="card-title-icon">
                                            ◇
                                        </span>

                                        Estoque

                                    </div>

                                    <button
                                        className="view-all"
                                        onClick={() => handlePageChange("estoque")}
                                    >
                                        Ver todos
                                    </button>

                                </div>

                                <div className="table-wrapper">

                                    <table>

                                        <thead>

                                            <tr>
                                                <th>Produto</th>
                                                <th>Categoria</th>
                                                <th>Quantidade</th>
                                                <th>Valor unitário</th>
                                                <th>Estoque</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            <tr>

                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <span className="status active">
                                                        Ativo
                                                    </span>
                                                </td>

                                            </tr>

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                            {/* MOVIMENTAÇÕES */}

                            <div className="card">

                                <div className="card-header">

                                    <div className="card-title">

                                        <span className="card-title-icon">
                                            ⇄
                                        </span>

                                        Movimentações

                                    </div>

                                    <button
                                        className="view-all"
                                        onClick={() => handlePageChange("movimentacoes")}
                                    >
                                        Ver todos
                                    </button>

                                </div>

                                <div className="table-wrapper">

                                    <table>

                                        <thead>

                                            <tr>
                                                <th>Tipo</th>
                                                <th>Descrição</th>
                                                <th>Data</th>
                                                <th>Quantidade</th>
                                                <th>Usuário</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            <tr>

                                                <td>

                                                    <div className="movement">

                                                        <div className="movement-icon movement-entry">
                                                        </div>

                                                    </div>

                                                </td>

                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>

                                            </tr>

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                            {/* FORNECEDORES */}

                            <div className="card">

                                <div className="card-header">

                                    <div className="card-title">

                                        <span className="card-title-icon">
                                            ▱
                                        </span>

                                        Fornecedores

                                    </div>

                                    <button
                                        className="view-all"
                                        onClick={() => handlePageChange("fornecedores")}
                                    >
                                        Ver todos
                                    </button>

                                </div>

                                <div className="table-wrapper">

                                    <table>

                                        <thead>

                                            <tr>
                                                <th>Nome</th>
                                                <th>CNPJ</th>
                                                <th>Contato</th>
                                                <th>E-mail</th>
                                                <th>Status</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            <tr>

                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <span className="status active">
                                                        Ativo
                                                    </span>
                                                </td>

                                            </tr>

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </section>
                    )}

                    {/* ESTOQUE */}

                    {activePage === "estoque" && (
                        <section className="page active" id="estoque">

                            <div className="card">

                                <div className="card-header">

                                    <div className="card-title">
                                        ◇ &nbsp; Estoque
                                    </div>

                                    <button
                                        className="btn"
                                        onClick={() => setShowNovoProduto(true)}
                                    >
                                        + Novo produto
                                    </button>

                                </div>

                                <div className="toolbar">

                                    <input
                                        type="text"
                                        className="search"
                                        placeholder="Pesquisar produto..."
                                    />

                                </div>

                                <div className="table-wrapper">

                                    <table>

                                        <thead>

                                            <tr>
                                                <th>Produto</th>
                                                <th>Categoria</th>
                                                <th>Quantidade</th>
                                                <th>Valor</th>
                                                <th>Status</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            <tr>

                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <span className="status active">
                                                        Ativo
                                                    </span>
                                                </td>

                                            </tr>

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </section>
                    )}

                    {/* MOVIMENTAÇÕES */}

                    {activePage === "movimentacoes" && (
                        <section className="page active" id="movimentacoes">

                            <div className="card">

                                <div className="card-header">

                                    <div className="card-title">
                                        ⇄ &nbsp; Movimentações
                                    </div>

                                   <button
                                        className="btn"
                                        onClick={() => setShowNovaMovimentacao(true)}
                                    >
                                        + Nova movimentação
                                    </button>

                                </div>

                                <div className="toolbar">

                                    <input
                                        type="text"
                                        className="search"
                                        placeholder="Pesquisar movimentação..."
                                    />

                                </div>

                                <div className="table-wrapper">

                                    <table>

                                        <thead>

                                            <tr>
                                                <th>Tipo</th>
                                                <th>Descrição</th>
                                                <th>Data</th>
                                                <th>Quantidade</th>
                                                <th>Usuário</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            <tr>

                                                <td>

                                                    <span className="status active">
                                                        Entrada
                                                    </span>

                                                </td>

                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>

                                            </tr>

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </section>
                    )}

                    {/* FORNECEDORES */}

                    {activePage === "fornecedores" && (
                        <section className="page active" id="fornecedores">

                            <div className="card">

                                <div className="card-header">

                                    <div className="card-title">
                                        ▱ &nbsp; Fornecedores
                                    </div>

                                    <button
                                        className="btn"
                                        onClick={() => setShowNovoFornecedor(true)}
                                    >
                                        + Novo fornecedor
                                    </button>

                                </div>

                                <div className="toolbar">

                                    <input
                                        type="text"
                                        className="search"
                                        placeholder="Pesquisar fornecedor..."
                                    />

                                </div>

                                <div className="table-wrapper">

                                    <table>

                                        <thead>

                                            <tr>
                                                <th>Nome</th>
                                                <th>CNPJ</th>
                                                <th>Contato</th>
                                                <th>E-mail</th>
                                                <th>Status</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            <tr>

                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <span className="status active">
                                                        Ativo
                                                    </span>
                                                </td>

                                            </tr>

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </section>
                    )}
                        {showNovoProduto && (
                            <div
                                className="modal-overlay"
                                onClick={() => setShowNovoProduto(false)}
                            >
                                <div
                                    className="modal-novo-usuario"
                                    onClick={(event) => event.stopPropagation()}
                                >

                                    <div className="modal-header">

                                        <div>
                                            <h2>Novo produto</h2>

                                            <p>
                                                Cadastre um novo produto no estoque
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            className="modal-close"
                                            onClick={() => setShowNovoProduto(false)}
                                        >
                                            ×
                                        </button>

                                    </div>

                                    <form onSubmit={handleCadastrarProduto}>

                                        <div className="modal-body">

                                            <div className="form-group">

                                                <label htmlFor="produto">
                                                    Produto
                                                </label>

                                                <input
                                                    id="produto"
                                                    name="produto"
                                                    type="text"
                                                    placeholder="Digite o nome do produto"
                                                    value={novoProduto.produto}
                                                    onChange={handleNovoProdutoChange}
                                                    required
                                                />

                                            </div>

                                            <div className="form-group">

                                                <label htmlFor="categoria">
                                                    Categoria
                                                </label>

                                                <input
                                                    id="categoria"
                                                    name="categoria"
                                                    type="text"
                                                    placeholder="Digite a categoria"
                                                    value={novoProduto.categoria}
                                                    onChange={handleNovoProdutoChange}
                                                    required
                                                />

                                            </div>

                                            <div className="form-group">

                                                <label htmlFor="quantidade">
                                                    Quantidade
                                                </label>

                                                <input
                                                    id="quantidade"
                                                    name="quantidade"
                                                    type="number"
                                                    placeholder="Digite a quantidade"
                                                    value={novoProduto.quantidade}
                                                    onChange={handleNovoProdutoChange}
                                                    min="0"
                                                    required
                                                />

                                            </div>

                                            <div className="form-group">

                                                <label htmlFor="valor">
                                                    Valor
                                                </label>

                                                <input
                                                    id="valor"
                                                    name="valor"
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="Digite o valor"
                                                    value={novoProduto.valor}
                                                    onChange={handleNovoProdutoChange}
                                                    min="0"
                                                    required
                                                />

                                            </div>

                                            <div className="form-group">

                                                <label htmlFor="status-produto">
                                                    Status
                                                </label>

                                                <select
                                                    id="status-produto"
                                                    name="status"
                                                    value={novoProduto.status}
                                                    onChange={handleNovoProdutoChange}
                                                >
                                                    <option value="sim">
                                                        Ativo
                                                    </option>

                                                    <option value="nao">
                                                        Não Ativo
                                                    </option>
                                                </select>

                                            </div>

                                        </div>

                                        <div className="modal-footer">

                                            <button
                                                type="button"
                                                className="btn-cancelar"
                                                onClick={() => setShowNovoProduto(false)}
                                            >
                                                Cancelar
                                            </button>

                                            <button
                                                type="submit"
                                                className="btn"
                                            >
                                                Cadastrar produto
                                            </button>

                                        </div>

                                    </form>

                                </div>
                            </div>
                        )}

                    {showNovaMovimentacao && (
                        <div
                            className="modal-overlay"
                            onClick={() => setShowNovaMovimentacao(false)}
                        >
                            <div
                                className="modal-novo-usuario"
                                onClick={(event) => event.stopPropagation()}
                            >

                                <div className="modal-header">

                                    <div>
                                        <h2>Nova movimentação</h2>

                                        <p>
                                            Registre uma nova movimentação no estoque
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="modal-close"
                                        onClick={() => setShowNovaMovimentacao(false)}
                                    >
                                        ×
                                    </button>

                                </div>

                                <form onSubmit={handleRegistrarMovimentacao}>

                                    <div className="modal-body">

                                        {/* TIPO */}
                                        <div className="form-group">

                                            <label htmlFor="tipo-movimentacao">
                                                Tipo
                                            </label>

                                            <select
                                                id="tipo-movimentacao"
                                                name="tipo"
                                                value={novaMovimentacao.tipo}
                                                onChange={handleNovaMovimentacaoChange}
                                                required
                                            >
                                                <option value="entrada">
                                                    Entrada
                                                </option>

                                                <option value="saida">
                                                    Saída
                                                </option>
                                            </select>

                                        </div>

                                        {/* PRODUTO */}
                                        <div className="form-group">

                                            <label htmlFor="produto-movimentacao">
                                                Produto
                                            </label>

                                            <input
                                                id="produto-movimentacao"
                                                name="produto"
                                                type="text"
                                                placeholder="Digite o produto"
                                                value={novaMovimentacao.produto}
                                                onChange={handleNovaMovimentacaoChange}
                                                required
                                            />

                                        </div>

                                        {/* DATA */}
                                        <div className="form-group">

                                            <label htmlFor="data-movimentacao">
                                                Data
                                            </label>

                                            <input
                                                id="data-movimentacao"
                                                name="data"
                                                type="date"
                                                value={novaMovimentacao.data}
                                                onChange={handleNovaMovimentacaoChange}
                                                required
                                            />

                                        </div>

                                        {/* QUANTIDADE */}
                                        <div className="form-group">

                                            <label htmlFor="quantidade-movimentacao">
                                                Quantidade
                                            </label>

                                            <input
                                                id="quantidade-movimentacao"
                                                name="quantidade"
                                                type="number"
                                                placeholder="Digite a quantidade"
                                                min="1"
                                                value={novaMovimentacao.quantidade}
                                                onChange={handleNovaMovimentacaoChange}
                                                required
                                            />

                                        </div>

                                        {/* USUÁRIO */}
                                        <div className="form-group">

                                            <label htmlFor="usuario-movimentacao">
                                                Usuário
                                            </label>

                                            <input
                                                id="usuario-movimentacao"
                                                name="usuario"
                                                type="text"
                                                placeholder="Digite o usuário"
                                                value={novaMovimentacao.usuario}
                                                onChange={handleNovaMovimentacaoChange}
                                                required
                                            />

                                        </div>

                                    </div>

                                    <div className="modal-footer">

                                        <button
                                            type="button"
                                            className="btn-cancelar"
                                            onClick={() => setShowNovaMovimentacao(false)}
                                        >
                                            Cancelar
                                        </button>

                                        <button
                                            type="submit"
                                            className="btn"
                                        >
                                            Registrar movimentação
                                        </button>

                                    </div>

                                </form>

                            </div>
                        </div>
                    )}
                    {showNovoFornecedor && (
                        <div
                            className="modal-overlay"
                            onClick={() => setShowNovoFornecedor(false)}
                        >
                            <div
                                className="modal-novo-usuario"
                                onClick={(event) => event.stopPropagation()}
                            >

                                {/* CABEÇALHO */}
                                <div className="modal-header">

                                    <div>
                                        <h2>Novo fornecedor</h2>

                                        <p>
                                            Cadastre um novo fornecedor para sua empresa
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="modal-close"
                                        onClick={() => setShowNovoFornecedor(false)}
                                    >
                                        ×
                                    </button>

                                </div>

                                {/* FORMULÁRIO */}
                                <form onSubmit={handleCadastrarFornecedor}>

                                    <div className="modal-body">

                                        <div className="form-group">

                                            <label htmlFor="fornecedor-nome">
                                                Nome
                                            </label>

                                            <input
                                                id="fornecedor-nome"
                                                name="nome"
                                                type="text"
                                                placeholder="Digite o nome do fornecedor"
                                                value={novoFornecedor.nome}
                                                onChange={handleNovoFornecedorChange}
                                                required
                                            />

                                        </div>

                                        <div className="form-group">

                                            <label htmlFor="fornecedor-cnpj">
                                                CNPJ
                                            </label>

                                            <input
                                                id="fornecedor-cnpj"
                                                name="cnpj"
                                                type="text"
                                                placeholder="Digite o CNPJ"
                                                value={novoFornecedor.cnpj}
                                                onChange={handleNovoFornecedorChange}
                                                required
                                            />

                                        </div>

                                        <div className="form-group">

                                            <label htmlFor="fornecedor-contato">
                                                Contato
                                            </label>

                                            <input
                                                id="fornecedor-contato"
                                                name="contato"
                                                type="text"
                                                placeholder="Digite o telefone ou contato"
                                                value={novoFornecedor.contato}
                                                onChange={handleNovoFornecedorChange}
                                                required
                                            />

                                        </div>

                                        <div className="form-group">

                                            <label htmlFor="fornecedor-email">
                                                E-mail
                                            </label>

                                            <input
                                                id="fornecedor-email"
                                                name="email"
                                                type="email"
                                                placeholder="Digite o e-mail"
                                                value={novoFornecedor.email}
                                                onChange={handleNovoFornecedorChange}
                                                required
                                            />

                                        </div>

                                        <div className="form-group">

                                            <label htmlFor="fornecedor-status">
                                                Status
                                            </label>

                                            <select
                                                id="fornecedor-status"
                                                name="status"
                                                value={novoFornecedor.status}
                                                onChange={handleNovoFornecedorChange}
                                            >
                                                <option value="sim">
                                                    Ativo
                                                </option>

                                                <option value="nao">
                                                    Não Ativo
                                                </option>
                                            </select>

                                        </div>

                                    </div>

                                    <div className="modal-footer">

                                        <button
                                            type="button"
                                            className="btn-cancelar"
                                            onClick={() => setShowNovoFornecedor(false)}
                                        >
                                            Cancelar
                                        </button>

                                        <button
                                            type="submit"
                                            className="btn"
                                        >
                                            Cadastrar fornecedor
                                        </button>

                                    </div>

                                </form>

                            </div>
                        </div>
                    )}

                    <footer>
                        NexaStock © 2026 — Todos os direitos reservados.
                    </footer>

                </div>

            </main>

        </div>
    );
}

export default PgUserEstoque;