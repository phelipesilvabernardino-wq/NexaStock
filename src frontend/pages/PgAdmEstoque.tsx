import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import "./PgAdmEstoque.css";

function PgAdmEstoque() {
    const [activePage, setActivePage] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [showNovoUsuario, setShowNovoUsuario] = useState(false);

    const [novoUsuario, setNovoUsuario] = useState({
        nome: "",
        senha: "",
    });

    const [usuarios, setUsuarios] = useState<any[]>([]);

    const [showNovoProduto, setShowNovoProduto] = useState(false);

    const [showEditarUsuario, setShowEditarUsuario] = useState(false);

    const [usuarioEditando, setUsuarioEditando] = useState({
        id: "",
        nome: "",
        senha: "",
    });

    const [showExcluirUsuario, setShowExcluirUsuario] = useState(false);

    const [usuarioExcluindo, setUsuarioExcluindo] = useState({
        id: "",
        nome: "",
    });

    const [showEditarProduto, setShowEditarProduto] = useState(false);

    const [produtoEditando, setProdutoEditando] = useState({
        id: "",
        produto: "",
        categoria: "",
        quantidade: "",
        valor: "",
        status: "sim",
    });

    const [novoProduto, setNovoProduto] = useState({
        produto: "",
        categoria: "",
        quantidade: "",
        valor: "",
        status: "sim",
    });

    const [showNovaMovimentacao, setShowNovaMovimentacao] = useState(false);

    const [novaMovimentacao, setNovaMovimentacao] = useState({
        tipo: "entrada",
        produto: "",
        data: "",
        quantidade: "",
        usuario: "",
    });

    const [showNovoFornecedor, setShowNovoFornecedor] = useState(false);

    const [showEditarFornecedor, setShowEditarFornecedor] = useState(false);

    const [fornecedorEditando, setFornecedorEditando] = useState({
    id: "",
    nome: "",
    cnpj: "",
    contato: "",
    email: "",
    status: "sim",
});

    const handleEditarFornecedor = (fornecedor: any) => {
        setFornecedorEditando({
            id: String(fornecedor.id),
            nome: fornecedor.nome || "",
            cnpj: fornecedor.cnpj || "",
            contato: fornecedor.contato || "",
            email: fornecedor.email || "",
            status: fornecedor.status ? "sim" : "nao",
        });

        setShowEditarFornecedor(true);
};

    const handleEditarFornecedorChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
    const { name, value } = event.target;

    setFornecedorEditando((prev) => ({
        ...prev,
        [name]: value,
    }));
};
 
    const handleSalvarEdicaoFornecedor = async (
    event: FormEvent<HTMLFormElement>
) => {
    event.preventDefault();

    try {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Token não encontrado. Faça login novamente.");
            return;
        }

        const response = await fetch(
            `http://localhost:3000/fornecedores/${fornecedorEditando.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nome: fornecedorEditando.nome,
                    cnpj: fornecedorEditando.cnpj,
                    contato: fornecedorEditando.contato,
                    email: fornecedorEditando.email,
                    status: fornecedorEditando.status === "sim",
                }),
            }
        );

        const data = await response.json();

        console.log(
            "STATUS EDITAR FORNECEDOR:",
            response.status
        );

        console.log(
            "RESPOSTA DO BACKEND:",
            data
        );

        if (!response.ok) {
            alert(
                data.erro ||
                data.error ||
                JSON.stringify(data) ||
                "Erro ao editar fornecedor."
            );
            return;
        }

        alert("Fornecedor atualizado com sucesso!");

        setShowEditarFornecedor(false);

        setFornecedorEditando({
            id: "",
            nome: "",
            cnpj: "",
            contato: "",
            email: "",
            status: "sim",
        });

        carregarFornecedores();

    } catch (error) {
        console.error(
            "ERRO AO EDITAR FORNECEDOR:",
            error
        );

        if (error instanceof Error) {
            alert("ERRO: " + error.message);
        } else {
            alert("Erro desconhecido ao editar fornecedor.");
        }
    }
};

    const handleExcluirFornecedor = (fornecedor: any) => {
    setFornecedorExcluindo({
        id: String(fornecedor.id),
        nome: fornecedor.nome,
    });

    setShowExcluirFornecedor(true);
};

    const confirmarExclusaoFornecedor = async () => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Token não encontrado. Faça login novamente.");
            return;
        }

        const response = await fetch(
            `http://localhost:3000/fornecedores/${fornecedorExcluindo.id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();

        console.log(
            "STATUS EXCLUIR FORNECEDOR:",
            response.status
        );

        console.log(
            "RESPOSTA DO BACKEND:",
            data
        );

        if (!response.ok) {
            alert(
                data.erro ||
                data.error ||
                JSON.stringify(data) ||
                "Erro ao excluir fornecedor."
            );
            return;
        }

        alert("Fornecedor excluído com sucesso!");

        setShowExcluirFornecedor(false);

        setFornecedorExcluindo({
            id: "",
            nome: "",
        });

        carregarFornecedores();

    } catch (error) {
        console.error(
            "ERRO AO EXCLUIR FORNECEDOR:",
            error
        );

        if (error instanceof Error) {
            alert("ERRO: " + error.message);
        } else {
            alert("Erro desconhecido ao excluir fornecedor.");
        }
    }
};

const [showExcluirFornecedor, setShowExcluirFornecedor] = useState(false);

const [fornecedorExcluindo, setFornecedorExcluindo] = useState({
    id: "",
    nome: "",
});

    const [novoFornecedor, setNovoFornecedor] = useState({
        nome: "",
        cnpj: "",
        contato: "",
        email: "",
        status: "sim",
    });

    const [fornecedores, setFornecedores] = useState<any[]>([]);
    const [produtos, setProdutos] = useState<any[]>([]);
    const [movimentacoes, setMovimentacoes] = useState<any[]>([]);

    async function carregarProdutos() {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("Token não encontrado.");
                return;
            }

            const response = await fetch(
                "http://localhost:3000/estoque",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            console.log(
                "ESTOQUE RECEBIDO:",
                JSON.stringify(data, null, 2)
            );

            if (!response.ok) {
                console.error("Erro ao buscar estoque:", data);
                return;
            }

            setProdutos(data);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        }
    }

    async function carregarFornecedores() {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("Token não encontrado.");
                return;
            }

            const response = await fetch(
                "http://localhost:3000/fornecedores",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            console.log(
                "Fornecedores cadastrados:",
                JSON.stringify(data, null, 2)
            );

            if (!response.ok) {
                console.error(
                    "Erro ao buscar fornecedores:",
                    data
                );
                return;
            }

            setFornecedores(data);
        } catch (error) {
            console.error(
                "Erro ao carregar fornecedores:",
                error
            );
        }
    }

    const handlePageChange = (page: string) => {
        setActivePage(page);
        setSidebarOpen(false);
    };

    const handleNovoUsuarioChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;

        setNovoUsuario((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCadastrarUsuario = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert(
                    "Token não encontrado. Faça login novamente."
                );
                return;
            }

            const response = await fetch(
                "http://localhost:3000/usuarios",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        nome: novoUsuario.nome,
                        senha: novoUsuario.senha,
                    }),
                }
            );

            const data = await response.json();

            console.log("STATUS:", response.status);
            console.log(
                "RESPOSTA DO BACKEND:",
                data
            );

            if (!response.ok) {
                alert(
                    data.erro ||
                    data.error ||
                    JSON.stringify(data) ||
                    "Erro ao cadastrar usuário"
                );
                return;
            }

            alert("Usuário cadastrado com sucesso!");

            setShowNovoUsuario(false);

            setNovoUsuario({
                nome: "",
                senha: "",
            });

            carregarUsuarios();
        } catch (error) {
            console.error(
                "ERRO COMPLETO:",
                error
            );

            if (error instanceof Error) {
                alert("ERRO: " + error.message);
            } else {
                alert(
                    "Erro desconhecido ao cadastrar usuário."
                );
            }
        }
    };

    const handleEditarUsuario = (usuario: any) => {
        setUsuarioEditando({
            id: String(usuario.id),
            nome: usuario.nome,
            senha: "",
        });

        setShowEditarUsuario(true);
    };

    const handleEditarUsuarioChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;

        setUsuarioEditando((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSalvarEdicaoUsuario = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert(
                    "Token não encontrado. Faça login novamente."
                );
                return;
            }

            const response = await fetch(
                `http://localhost:3000/usuarios/${usuarioEditando.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        nome: usuarioEditando.nome,
                        senha: usuarioEditando.senha,
                    }),
                }
            );

            const data = await response.json();

            console.log(
                "STATUS EDITAR USUÁRIO:",
                response.status
            );

            console.log(
                "RESPOSTA DO BACKEND:",
                data
            );

            if (!response.ok) {
                alert(
                    data.erro ||
                    data.error ||
                    JSON.stringify(data) ||
                    "Erro ao editar usuário."
                );
                return;
            }

            alert(
                "Usuário atualizado com sucesso!"
            );

            setShowEditarUsuario(false);

            setUsuarioEditando({
                id: "",
                nome: "",
                senha: "",
            });

            carregarUsuarios();
        } catch (error) {
            console.error(
                "ERRO AO EDITAR USUÁRIO:",
                error
            );

            if (error instanceof Error) {
                alert(
                    "ERRO: " + error.message
                );
            } else {
                alert(
                    "Erro desconhecido ao editar usuário."
                );
            }
        }
    };

    const handleExcluirUsuario = (usuario: any) => {
        setUsuarioExcluindo({
            id: String(usuario.id),
            nome: usuario.nome,
        });

        setShowExcluirUsuario(true);
    };

    const confirmarExclusaoUsuario = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert(
                    "Token não encontrado. Faça login novamente."
                );
                return;
            }

            const response = await fetch(
                `http://localhost:3000/usuarios/${usuarioExcluindo.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            console.log(
                "STATUS EXCLUIR USUÁRIO:",
                response.status
            );

            console.log(
                "RESPOSTA DO BACKEND:",
                data
            );

            if (!response.ok) {
                alert(
                    data.erro ||
                    data.error ||
                    JSON.stringify(data) ||
                    "Erro ao excluir usuário."
                );
                return;
            }

            alert(
                "Usuário excluído com sucesso!"
            );

            setShowExcluirUsuario(false);

            setUsuarioExcluindo({
                id: "",
                nome: "",
            });

            carregarUsuarios();
        } catch (error) {
            console.error(
                "ERRO AO EXCLUIR USUÁRIO:",
                error
            );

            if (error instanceof Error) {
                alert(
                    "ERRO: " + error.message
                );
            } else {
                alert(
                    "Erro desconhecido ao excluir usuário."
                );
            }
        }
    };

    const handleEditarProduto = (produto: any) => {
        setProdutoEditando({
            id: String(produto.id),
            produto: produto.produto,
            categoria: produto.categoria,
            quantidade: String(produto.quantidade),
            valor: String(produto.valor),
            status: produto.status ? "sim" : "nao",
        });

        setShowEditarProduto(true);
    };

    const handleExcluirProduto = async (id: number) => {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este produto?"
        );

        if (!confirmar) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert(
                    "Token não encontrado. Faça login novamente."
                );
                return;
            }

            const response = await fetch(
                `http://localhost:3000/estoque/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            console.log(
                "STATUS EXCLUIR PRODUTO:",
                response.status
            );

            console.log(
                "RESPOSTA DO BACKEND:",
                data
            );

            if (!response.ok) {
                alert(
                    data.erro ||
                    data.error ||
                    JSON.stringify(data) ||
                    "Erro ao excluir produto."
                );
                return;
            }

            alert(
                "Produto excluído com sucesso!"
            );

            carregarProdutos();
        } catch (error) {
            console.error(
                "ERRO AO EXCLUIR PRODUTO:",
                error
            );

            if (error instanceof Error) {
                alert(
                    "ERRO: " + error.message
                );
            } else {
                alert(
                    "Erro desconhecido ao excluir produto."
                );
            }
        }
    };

    const handleEditarProdutoChange = (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = event.target;

        setProdutoEditando((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const carregarUsuarios = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log(
                    "Token não encontrado."
                );
                return;
            }

            const response = await fetch(
                "http://localhost:3000/usuarios",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            console.log(
                "USUÁRIOS:",
                JSON.stringify(data, null, 2)
            );

            if (!response.ok) {
                console.error(
                    "Erro ao buscar usuários:",
                    data
                );
                return;
            }

            setUsuarios(data);
        } catch (error) {
            console.error(
                "Erro ao carregar usuários:",
                error
            );
        }
    };

    async function carregarMovimentacoes() {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log(
                    "Token não encontrado."
                );
                return;
            }

            const response = await fetch(
                "http://localhost:3000/movimentacao",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            console.log(
                "MOVIMENTAÇÕES:",
                JSON.stringify(data, null, 2)
            );

            if (!response.ok) {
                console.error(
                    "Erro ao buscar movimentações:",
                    data
                );
                return;
            }

            setMovimentacoes(data);
        } catch (error) {
            console.error(
                "Erro ao carregar movimentações:",
                error
            );
        }
    }

    const handleNovoProdutoChange = (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = event.target;

        setNovoProduto((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCadastrarProduto = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert(
                    "Token não encontrado. Faça login novamente."
                );
                return;
            }

            const response = await fetch(
                "http://localhost:3000/estoque",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        produto: novoProduto.produto,
                        categoria: novoProduto.categoria,
                        quantidade: Number(
                            novoProduto.quantidade
                        ),
                        valor: Number(
                            novoProduto.valor
                        ),
                        status:
                            novoProduto.status === "sim",
                    }),
                }
            );

            const data = await response.json();

            console.log(
                "STATUS:",
                response.status
            );

            console.log(
                "RESPOSTA DO BACKEND:",
                data
            );

            if (!response.ok) {
                alert(
                    data.erro ||
                    data.error ||
                    JSON.stringify(data) ||
                    "Erro ao cadastrar produto"
                );
                return;
            }

            alert(
                "Produto cadastrado com sucesso!"
            );

            setShowNovoProduto(false);

            setNovoProduto({
                produto: "",
                categoria: "",
                quantidade: "",
                valor: "",
                status: "sim",
            });

            carregarProdutos();
        } catch (error) {
            console.error(
                "ERRO AO CADASTRAR PRODUTO:",
                error
            );

            if (error instanceof Error) {
                alert(
                    "ERRO: " + error.message
                );
            } else {
                alert(
                    "Erro desconhecido ao cadastrar produto."
                );
            }
        }
    };

    const handleNovaMovimentacaoChange = (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = event.target;

        setNovaMovimentacao((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegistrarMovimentacao = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert(
                    "Token não encontrado. Faça login novamente."
                );
                return;
            }

            const produtoSelecionado = produtos.find(
                (produto) =>
                    produto.produto ===
                    novaMovimentacao.produto
            );

            console.log(
                "PRODUTO SELECIONADO:",
                produtoSelecionado
            );

            const usuarioSelecionado = usuarios.find(
                (usuario) =>
                    usuario.nome ===
                    novaMovimentacao.usuario
            );

            if (!produtoSelecionado) {
                alert(
                    "Produto não encontrado no estoque."
                );
                return;
            }

            if (!usuarioSelecionado) {
                alert(
                    "Usuário não encontrado."
                );
                return;
            }

            const response = await fetch(
                "http://localhost:3000/movimentacao",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        estoque_id: Number(
                            produtoSelecionado.id
                        ),
                        tipo: novaMovimentacao.tipo,
                        data: novaMovimentacao.data,
                        quantidade: Number(
                            novaMovimentacao.quantidade
                        ),
                        usuario_id: Number(
                            usuarioSelecionado.id
                        ),
                    }),
                }
            );

            const data = await response.json();

            console.log(
                "STATUS MOVIMENTAÇÃO:",
                response.status
            );

            console.log(
                "RESPOSTA DO BACKEND:",
                data
            );

            if (!response.ok) {
                alert(
                    data.erro ||
                    data.error ||
                    JSON.stringify(data) ||
                    "Erro ao registrar movimentação."
                );
                return;
            }

            alert(
                "Movimentação registrada com sucesso!"
            );

            setShowNovaMovimentacao(false);

            setNovaMovimentacao({
                tipo: "entrada",
                produto: "",
                data: "",
                quantidade: "",
                usuario: "",
            });

            carregarMovimentacoes();
            carregarProdutos();
        } catch (error) {
            console.error(
                "ERRO AO REGISTRAR MOVIMENTAÇÃO:",
                error
            );

            if (error instanceof Error) {
                alert(
                    "ERRO: " + error.message
                );
            } else {
                alert(
                    "Erro desconhecido ao registrar movimentação."
                );
            }
        }
    };

    const handleNovoFornecedorChange = (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = event.target;

        setNovoFornecedor((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCadastrarFornecedor = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert(
                    "Token não encontrado. Faça login novamente."
                );
                return;
            }

            const response = await fetch(
                "http://localhost:3000/fornecedores",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        nome: novoFornecedor.nome,
                        cnpj: novoFornecedor.cnpj,
                        contato: novoFornecedor.contato,
                        email: novoFornecedor.email,
                        status:
                            novoFornecedor.status === "sim",
                    }),
                }
            );

            const data = await response.json();

            console.log(
                "STATUS FORNECEDOR:",
                response.status
            );

            console.log(
                "RESPOSTA DO BACKEND:",
                data
            );

            if (!response.ok) {
                alert(
                    data.erro ||
                    data.error ||
                    JSON.stringify(data) ||
                    "Erro ao cadastrar fornecedor"
                );
                return;
            }

            alert(
                "Fornecedor cadastrado com sucesso!"
            );

            setShowNovoFornecedor(false);

            setNovoFornecedor({
                nome: "",
                cnpj: "",
                contato: "",
                email: "",
                status: "sim",
            });

            carregarFornecedores();
        } catch (error) {
            console.error(
                "ERRO AO CADASTRAR FORNECEDOR:",
                error
            );

            if (error instanceof Error) {
                alert(
                    "ERRO: " + error.message
                );
            } else {
                alert(
                    "Erro desconhecido ao cadastrar fornecedor."
                );
            }
        }
    };

    const handleSalvarEdicaoProduto = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert(
                    "Token não encontrado. Faça login novamente."
                );
                return;
            }

            const response = await fetch(
                `http://localhost:3000/estoque/${produtoEditando.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        produto: produtoEditando.produto,
                        categoria: produtoEditando.categoria,
                        quantidade: Number(
                            produtoEditando.quantidade
                        ),
                        valor: Number(
                            produtoEditando.valor
                        ),
                        status:
                            produtoEditando.status === "sim",
                    }),
                }
            );

            const data = await response.json();

            console.log(
                "STATUS EDITAR PRODUTO:",
                response.status
            );

            console.log(
                "RESPOSTA DO BACKEND:",
                data
            );

            if (!response.ok) {
                alert(
                    data.erro ||
                    data.error ||
                    JSON.stringify(data) ||
                    "Erro ao editar produto."
                );
                return;
            }

            alert(
                "Produto atualizado com sucesso!"
            );

            setShowEditarProduto(false);

            setProdutoEditando({
                id: "",
                produto: "",
                categoria: "",
                quantidade: "",
                valor: "",
                status: "sim",
            });

            carregarProdutos();
        } catch (error) {
            console.error(
                "ERRO AO EDITAR PRODUTO:",
                error
            );

            if (error instanceof Error) {
                alert(
                    "ERRO: " + error.message
                );
            } else {
                alert(
                    "Erro desconhecido ao editar produto."
                );
            }
        }
    };

    useEffect(() => {
        carregarUsuarios();
    }, []);

    useEffect(() => {
        carregarProdutos();
    }, []);

    useEffect(() => {
        carregarFornecedores();
    }, []);

    useEffect(() => {
        carregarMovimentacoes();
    }, []);

    return (
        <div className="pg-adm-estoque">
            <div className="app">

            <aside
                className={`sidebar ${
                    sidebarOpen ? "open" : ""
                }`}
                id="sidebar"
            >

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
                        className={`nav-item ${
                            activePage === "dashboard"
                                ? "active"
                                : ""
                        }`}
                        onClick={() => handlePageChange("dashboard")
                        }
                    >
                        <span className="nav-icon">
                            ⌂
                        </span>

                        Painel
                    </button>

                    <button
                        className={`nav-item ${
                            activePage === "usuarios"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handlePageChange("usuarios")
                        }
                    >
                        <span className="nav-icon">
                            ♙
                        </span>

                        Usuários
                    </button>

                    <button
                        className={`nav-item ${
                            activePage === "estoque"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handlePageChange("estoque")
                        }
                    >
                        <span className="nav-icon">
                            ◇
                        </span>

                        Estoque
                    </button>

                    <button
                        className={`nav-item ${
                            activePage === "movimentacoes"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handlePageChange(
                                "movimentacoes"
                            )
                        }
                    >
                        <span className="nav-icon">
                            ⇄
                        </span>

                        Movimentações
                    </button>

                    <button
                        className={`nav-item ${
                            activePage === "fornecedores"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handlePageChange(
                                "fornecedores"
                            )
                        }
                    >
                        <span className="nav-icon">
                            ▱
                        </span>

                        Fornecedores
                    </button>

                </nav>

                <div className="company-box">

                    <small>
                        Empresa selecionada
                    </small>

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
                                onClick={() =>
                                    setSidebarOpen(
                                        !sidebarOpen
                                    )
                                }
                            >
                                ☰
                            </button>

                            <h1>
                                {activePage ===
                                    "dashboard" &&
                                    "Painel"}

                                {activePage ===
                                    "usuarios" &&
                                    "Usuários"}

                                {activePage ===
                                    "estoque" &&
                                    "Estoque"}

                                {activePage ===
                                    "movimentacoes" &&
                                    "Movimentações"}

                                {activePage ===
                                    "fornecedores" &&
                                    "Fornecedores"}
                            </h1>

                            <p>
                                {activePage ===
                                    "dashboard" &&
                                    "Visão geral do sistema e da sua empresa"}

                                {activePage ===
                                    "usuarios" &&
                                    "Gerencie os usuários da sua empresa"}

                                {activePage ===
                                    "estoque" &&
                                    "Gerencie produtos e estoque"}

                                {activePage ===
                                    "movimentacoes" &&
                                    "Controle as movimentações do estoque"}

                                {activePage ===
                                    "fornecedores" &&
                                    "Gerencie os fornecedores da empresa"}
                            </p>

                        </div>

                    </header>


                    {activePage === "dashboard" && (

                        <section
                            className="page active"
                            id="dashboard"
                        >

                            <div className="metrics">

                                <div className="metric">

                                    <div className="metric-icon">
                                        ♙
                                    </div>

                                    <div className="metric-number">
                                        {usuarios.length}
                                    </div>

                                    <div className="metric-title">
                                        Usuários
                                    </div>

                                    <div className="metric-description">
                                        cadastrados
                                    </div>

                                </div>

                                <div className="metric">

                                    <div className="metric-icon">
                                        ◇
                                    </div>

                                    <div className="metric-number">
                                        {produtos.length}
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
                                        {fornecedores.length}
                                    </div>

                                    <div className="metric-title">
                                        Fornecedores
                                    </div>

                                    <div className="metric-description">
                                        cadastrados
                                    </div>

                                </div>

                            </div>

                            {/* USER */}

                            <div className="card">

                                <div className="card-header">

                                    <div className="card-title">

                                        <span className="card-title-icon">
                                            ♙
                                        </span>

                                        Usuários

                                    </div>

                                    <button
                                        className="view-all"
                                        onClick={() =>
                                            handlePageChange(
                                                "usuarios"
                                            )
                                        }
                                    >
                                        Ver todos
                                    </button>

                                </div>

                                <div className="table-wrapper">

                                    <table>

                                        <thead>

                                            <tr>
                                                <th>
                                                    Nome
                                                </th>

                                                <th>
                                                    Número
                                                </th>

                                                <th>
                                                    Empresa
                                                </th>

                                                <th>
                                                    Status
                                                </th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {usuarios.length ===
                                            0 ? (

                                                <tr>
                                                    <td
                                                        colSpan={4}
                                                    >
                                                        Nenhum usuário
                                                        encontrado.
                                                    </td>
                                                </tr>

                                            ) : (

                                                usuarios.map(
                                                    (usuario) => (
                                                        <tr
                                                            key={
                                                                usuario.id
                                                            }
                                                        >

                                                            <td>
                                                                {
                                                                    usuario.nome
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    usuario.id
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    usuario.empresa_id
                                                                }
                                                            </td>

                                                            <td>

                                                                <span className="status active">
                                                                    Ativo
                                                                </span>

                                                            </td>

                                                        </tr>
                                                    )
                                                )

                                            )}

                                        </tbody>

                                    </table>

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
                                        onClick={() =>
                                            handlePageChange(
                                                "estoque"
                                            )
                                        }
                                    >
                                        Ver todos
                                    </button>

                                </div>

                                <div className="table-wrapper">

                                    <table>

                                        <thead>

                                            <tr>
                                                <th>
                                                    Produto
                                                </th>

                                                <th>
                                                    Categoria
                                                </th>

                                                <th>
                                                    Quantidade
                                                </th>

                                                <th>
                                                    Valor
                                                </th>

                                                <th>
                                                    Status
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {produtos.length === 0 ? (

                                                <tr>
                                                    <td colSpan={6}>
                                                        Nenhum produto encontrado.
                                                    </td>
                                                </tr>

                                            ) : (

                                                produtos.map((produto) => (

                                                    <tr key={produto.id}>

                                                        <td>
                                                            {produto.produto}
                                                        </td>

                                                        <td>
                                                            {produto.categoria}
                                                        </td>

                                                        <td>
                                                            {produto.quantidade}
                                                        </td>

                                                        <td>
                                                            R$ {Number(produto.valor).toFixed(2)}
                                                        </td>

                                                        <td>
                                                            <span
                                                                className={
                                                                    produto.status
                                                                        ? "status active"
                                                                        : "status inactive"
                                                                }
                                                            >
                                                                {produto.status
                                                                    ? "Ativo"
                                                                    : "Não Ativo"}
                                                            </span>
                                                        </td>

                                                    </tr>

                                                ))

                                            )}

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
                                        onClick={() =>
                                            handlePageChange(
                                                "movimentacoes"
                                            )
                                        }
                                    >
                                        Ver todos
                                    </button>

                                </div>

                                <div className="table-wrapper">

                                    <table>

                                        <thead>

                                            <tr>
                                                <th>
                                                    Tipo
                                                </th>

                                                <th>
                                                    Produto
                                                </th>

                                                <th>
                                                    Data
                                                </th>

                                                <th>
                                                    Quantidade
                                                </th>

                                                <th>
                                                    Usuário
                                                </th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {movimentacoes.length === 0 ? (

                                                <tr>
                                                    <td colSpan={5}>
                                                        Nenhuma movimentação encontrada.
                                                    </td>
                                                </tr>

                                            ) : (

                                                movimentacoes.map((movimentacao) => {

                                                    const produto = produtos.find(
                                                        (item) =>
                                                            Number(item.id) ===
                                                            Number(movimentacao.estoque_id)
                                                    );

                                                    const usuario = usuarios.find(
                                                        (item) =>
                                                            Number(item.id) ===
                                                            Number(movimentacao.usuario_id)
                                                    );

                                                    return (
                                                        <tr key={movimentacao.id}>

                                                            <td>

                                                                <span
                                                                    className={
                                                                        movimentacao.tipo === "entrada"
                                                                            ? "status active"
                                                                            : "status inactive"
                                                                    }
                                                                >
                                                                    {movimentacao.tipo === "entrada"
                                                                        ? "Entrada"
                                                                        : "Saída"}
                                                                </span>

                                                            </td>

                                                            <td>
                                                                {produto
                                                                    ? produto.produto
                                                                    : `Estoque #${movimentacao.estoque_id}`}
                                                            </td>

                                                            <td>
                                                                {movimentacao.data
                                                                    ? new Date(
                                                                        movimentacao.data
                                                                    ).toLocaleDateString("pt-BR")
                                                                    : "-"}
                                                            </td>

                                                            <td>
                                                                {movimentacao.quantidade}
                                                            </td>

                                                            <td>
                                                                {usuario
                                                                    ? usuario.nome
                                                                    : `Usuário #${movimentacao.usuario_id}`}
                                                            </td>

                                                        </tr>
                                                    );

                                                })

                                            )}

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
                                        onClick={() =>
                                            handlePageChange(
                                                "fornecedores"
                                            )
                                        }
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
                                                <th>Ações</th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {fornecedores.length === 0 ? (

                                                <tr>
                                                    <td colSpan={5}>
                                                        Nenhum fornecedor encontrado.
                                                    </td>
                                                </tr>

                                            ) : (

                                                fornecedores.map((fornecedor) => (

                                                    <tr key={fornecedor.id}>

                                                        <td>
                                                            {fornecedor.nome}
                                                        </td>

                                                        <td>
                                                            {fornecedor.cnpj}
                                                        </td>

                                                        <td>
                                                            {fornecedor.contato}
                                                        </td>

                                                        <td>
                                                            {fornecedor.email}
                                                        </td>

                                                        <td>

                                                            <span
                                                                className={
                                                                    fornecedor.status
                                                                        ? "status active"
                                                                        : "status inactive"
                                                                }
                                                            >
                                                                {fornecedor.status
                                                                    ? "Ativo"
                                                                    : "Não Ativo"}
                                                            </span>

                                                        </td>

                                                    </tr>

                                                ))

                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </section>
                    )}

                    {activePage === "usuarios" && (

                        <section
                            className="page active"
                            id="usuarios"
                        >

                            <div className="card">

                                <div className="card-header">

                                    <div className="card-title">
                                        ♙ &nbsp; Usuários
                                    </div>

                                    <button
                                        className="btn"
                                        onClick={() =>
                                            setShowNovoUsuario(
                                                true
                                            )
                                        }
                                    >
                                        + Novo usuário
                                    </button>

                                </div>

                                <div className="toolbar">

                                    <input
                                        type="text"
                                        className="search"
                                        placeholder="Pesquisar usuário..."
                                    />

                                </div>

                                <div className="table-wrapper">

                                    <table>

                                        <thead>

                                            <tr>
                                                <th>
                                                    Nome
                                                </th>

                                                <th>
                                                    Número
                                                </th>

                                                <th>
                                                    Empresa
                                                </th>

                                                <th>
                                                    Status
                                                </th>

                                                <th>
                                                    Ações
                                                </th>
                                                
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {usuarios.length ===
                                            0 ? (

                                                <tr>

                                                    <td
                                                        colSpan={5}
                                                    >
                                                        Nenhum usuário
                                                        encontrado.
                                                    </td>

                                                </tr>

                                            ) : (

                                                usuarios.map(
                                                    (usuario) => (

                                                        <tr
                                                            key={
                                                                usuario.id
                                                            }
                                                        >

                                                            <td>
                                                                {
                                                                    usuario.nome
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    usuario.id
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    usuario.empresa_id
                                                                }
                                                            </td>

                                                            <td>

                                                                <span className="status active">
                                                                    Ativo
                                                                </span>

                                                            </td>

                                                            <td>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleEditarUsuario(usuario)}
                                                                >
                                                                        Editar
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleExcluirUsuario(usuario.id)}
                                                                >
                                                                        Excluir
                                                                </button>
                                                            </td>

                                                        </tr>

                                                    )
                                                )

                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </section>
                    )}


                   {activePage === "estoque" && (

                                <section
                                    className="page active"
                                    id="estoque"
                                >

                                    <div className="card">

                                        <div className="card-header">

                                            <div className="card-title">
                                                ◇ &nbsp; Estoque
                                            </div>

                                            <button
                                                className="btn"
                                                onClick={() =>
                                                    setShowNovoProduto(true)
                                                }
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
                                                        <th>
                                                            Produto
                                                        </th>

                                                        <th>
                                                            Categoria
                                                        </th>

                                                        <th>
                                                            Quantidade
                                                        </th>

                                                        <th>
                                                            Valor
                                                        </th>

                                                        <th>
                                                            Status
                                                        </th>

                                                        <th>
                                                            Ações
                                                        </th>
                                                    </tr>

                                                </thead>

                                                <tbody>

                                                    {produtos.length === 0 ? (

                                                        <tr>
                                                            <td colSpan={5}>
                                                                Nenhum produto encontrado.
                                                            </td>
                                                        </tr>

                                                    ) : (

                                                        produtos.map((produto) => (

                                                            <tr key={produto.id}>

                                                                <td>
                                                                    {produto.produto}
                                                                </td>

                                                                <td>
                                                                    {produto.categoria}
                                                                </td>

                                                                <td>
                                                                    {produto.quantidade}
                                                                </td>

                                                                <td>
                                                                    R$ {Number(produto.valor).toFixed(2)}
                                                                </td>

                                                                <td>

                                                                    <span
                                                                        className={
                                                                            produto.status
                                                                                ? "status active"
                                                                                : "status inactive"
                                                                        }
                                                                    >
                                                                        {produto.status
                                                                            ? "Ativo"
                                                                            : "Não Ativo"}
                                                                    </span>

                                                                </td>

                                                                <td>

                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleEditarProduto(produto)}
                                                                        >
                                                                            Editar
                                                                        </button>

                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleExcluirProduto(produto.id)
                                                                            }
                                                                        >
                                                                            Excluir
                                                                        </button>

                                                                </td>

                                                            </tr>

                                                        ))

                                                    )}

                                                </tbody>

                                            </table>

                                        </div>

                                    </div>

                                </section>

                            )}

                    {activePage === "movimentacoes" && (

                        <section
                            className="page active"
                            id="movimentacoes"
                        >

                            <div className="card">

                                <div className="card-header">

                                    <div className="card-title">
                                        ⇄ &nbsp; Movimentações
                                    </div>

                                    <button

                                        type="button"
                                        className="btn-primary"
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
                                                <th>
                                                    Tipo
                                                </th>

                                                <th>
                                                    Produto
                                                </th>

                                                <th>
                                                    Data
                                                </th>

                                                <th>
                                                    Quantidade
                                                </th>

                                                <th>
                                                    Usuário
                                                </th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {movimentacoes.length === 0 ? (

                                                <tr>
                                                    <td colSpan={5}>
                                                        Nenhuma movimentação encontrada.
                                                    </td>
                                                </tr>

                                            ) : (

                                                movimentacoes.map((movimentacao) => {

                                                    const produto = produtos.find(
                                                        (item) =>
                                                            Number(item.id) ===
                                                            Number(movimentacao.estoque_id)
                                                    );

                                                    const usuario = usuarios.find(
                                                        (item) =>
                                                            Number(item.id) ===
                                                            Number(movimentacao.usuario_id)
                                                    );

                                                    return (
                                                        <tr key={movimentacao.id}>

                                                            <td>

                                                                <span
                                                                    className={
                                                                        movimentacao.tipo === "entrada"
                                                                            ? "status active"
                                                                            : "status inactive"
                                                                    }
                                                                >
                                                                    {movimentacao.tipo === "entrada"
                                                                        ? "Entrada"
                                                                        : "Saída"}
                                                                </span>

                                                            </td>

                                                            <td>
                                                                {produto
                                                                    ? produto.produto
                                                                    : `Estoque #${movimentacao.estoque_id}`}
                                                            </td>

                                                            <td>
                                                                {movimentacao.data
                                                                    ? new Date(
                                                                        movimentacao.data
                                                                    ).toLocaleDateString("pt-BR")
                                                                    : "-"}
                                                            </td>

                                                            <td>
                                                                {movimentacao.quantidade}
                                                            </td>

                                                            <td>
                                                                {usuario
                                                                    ? usuario.nome
                                                                    : `Usuário #${movimentacao.usuario_id}`}
                                                            </td>

                                                        </tr>
                                                    );

                                                })

                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </section>
                    )}

                    {activePage === "fornecedores" && (

                        <section
                            className="page active"
                            id="fornecedores"
                        >

                            <div className="card">

                                <div className="card-header">

                                    <div className="card-title">
                                        ▱ &nbsp; Fornecedores
                                    </div>

                                    <button
                                        className="btn"
                                        onClick={() =>
                                            setShowNovoFornecedor(
                                                true
                                            )
                                        }
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
                                                <th>
                                                    Nome
                                                </th>

                                                <th>
                                                    CNPJ
                                                </th>

                                                <th>
                                                    Contato
                                                </th>

                                                <th>
                                                    E-mail
                                                </th>

                                                <th>
                                                    Status
                                                </th>

                                                <th>
                                                    Ações
                                                </th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {fornecedores.length === 0 ? (

                                                <tr>
                                                    <td colSpan={5}>
                                                        Nenhum fornecedor encontrado.
                                                    </td>
                                                </tr>

                                            ) : (

                                                fornecedores.map((fornecedor) => (

                                                    <tr key={fornecedor.id}>

                                                        <td>
                                                            {fornecedor.nome}
                                                        </td>

                                                        <td>
                                                            {fornecedor.cnpj}
                                                        </td>

                                                        <td>
                                                            {fornecedor.contato}
                                                        </td>

                                                        <td>
                                                            {fornecedor.email}
                                                        </td>

                                                        <td>
                                                            <span
                                                                className={
                                                                    fornecedor.status
                                                                        ? "status active"
                                                                        : "status inactive"
                                                                }
                                                            >
                                                                {fornecedor.status
                                                                    ? "Ativo"
                                                                    : "Não Ativo"}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleEditarFornecedor(fornecedor)}
                                                            >
                                                                Editar
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => handleExcluirFornecedor(fornecedor)}
                                                            >
                                                                Excluir
                                                            </button>
                                                        </td>

                                                    </tr>

                                                ))

                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </section>
                    )}

                    <footer>
                        NexaStock © 2026 — Todos os direitos reservados.
                    </footer>

                </div>

            </main>

            {showNovoUsuario && (

                <div
                    className="modal-overlay"
                    onClick={() =>
                        setShowNovoUsuario(false)
                    }
                >

                    <div
                        className="modal-novo-usuario"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="modal-header">

                            <div>

                                <h2>
                                    Novo usuário
                                </h2>

                                <p>
                                    Cadastre um novo usuário
                                    para sua empresa
                                </p>

                            </div>

                            <button
                                type="button"
                                className="modal-close"
                                onClick={() =>
                                    setShowNovoUsuario(false)
                                }
                            >
                                ×
                            </button>

                        </div>

                        <form
                            onSubmit={
                                handleCadastrarUsuario
                            }
                        >

                            <div className="modal-body">

                                <div className="form-group">

                                    <label htmlFor="nome">
                                        Nome
                                    </label>

                                    <input
                                        id="nome"
                                        name="nome"
                                        type="text"
                                        placeholder="Digite o nome do usuário"
                                        value={
                                            novoUsuario.nome
                                        }
                                        onChange={
                                            handleNovoUsuarioChange
                                        }
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label htmlFor="senha">
                                        Senha
                                    </label>

                                    <input
                                        id="senha"
                                        name="senha"
                                        type="password"
                                        placeholder="Digite a senha"
                                        value={
                                            novoUsuario.senha
                                        }
                                        onChange={
                                            handleNovoUsuarioChange
                                        }
                                        required
                                    />

                                </div>

                            </div>

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn-cancelar"
                                    onClick={() =>
                                        setShowNovoUsuario(false)
                                    }
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="btn"
                                >
                                    Cadastrar usuário
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

            {showEditarProduto && (

                <div
                    className="modal-overlay"
                    onClick={() =>
                        setShowEditarProduto(false)
                    }
                >

                    <div
                        className="modal-novo-usuario"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="modal-header">

                            <div>

                                <h2>
                                    Editar produto
                                </h2>

                                <p>
                                    Altere os dados do produto
                                </p>

                            </div>

                            <button
                                type="button"
                                className="modal-close"
                                onClick={() =>
                                    setShowEditarProduto(false)
                                }
                            >
                                ×
                            </button>

                        </div>

                        <form
                            onSubmit={
                                handleSalvarEdicaoProduto
                            }
                        >

                            <div className="modal-body">

                                <div className="form-group">

                                    <label htmlFor="editar-produto">
                                        Produto
                                    </label>

                                    <input
                                        id="editar-produto"
                                        name="produto"
                                        type="text"
                                        value={
                                            produtoEditando.produto
                                        }
                                        onChange={
                                            handleEditarProdutoChange
                                        }
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label htmlFor="editar-categoria">
                                        Categoria
                                    </label>

                                    <input
                                        id="editar-categoria"
                                        name="categoria"
                                        type="text"
                                        value={
                                            produtoEditando.categoria
                                        }
                                        onChange={
                                            handleEditarProdutoChange
                                        }
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label htmlFor="editar-quantidade">
                                        Quantidade
                                    </label>

                                    <input
                                        id="editar-quantidade"
                                        name="quantidade"
                                        type="number"
                                        min="0"
                                        value={
                                            produtoEditando.quantidade
                                        }
                                        onChange={
                                            handleEditarProdutoChange
                                        }
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label htmlFor="editar-valor">
                                        Valor
                                    </label>

                                    <input
                                        id="editar-valor"
                                        name="valor"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={
                                            produtoEditando.valor
                                        }
                                        onChange={
                                            handleEditarProdutoChange
                                        }
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label htmlFor="editar-status">
                                        Status
                                    </label>

                                    <select
                                        id="editar-status"
                                        name="status"
                                        value={
                                            produtoEditando.status
                                        }
                                        onChange={
                                            handleEditarProdutoChange
                                        }
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
                                    onClick={() =>
                                        setShowEditarProduto(false)
                                    }
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="btn"
                                >
                                    Salvar alterações
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

            {showEditarUsuario && (

                    <div
                        className="modal-overlay"
                        onClick={() =>
                            setShowEditarUsuario(false)
                        }
                    >

                        <div
                            className="modal-novo-usuario"
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                        >

                            <div className="modal-header">

                                <div>

                                    <h2>
                                        Editar usuário
                                    </h2>

                                    <p>
                                        Altere os dados do usuário
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    className="modal-close"
                                    onClick={() =>
                                        setShowEditarUsuario(false)
                                    }
                                >
                                    ×
                                </button>

                            </div>

                           <form onSubmit={handleSalvarEdicaoUsuario}>

                                <div className="modal-body">

                                    <div className="form-group">

                                        <label htmlFor="editar-usuario-nome">
                                            Nome
                                        </label>

                                        <input
                                            id="editar-usuario-nome"
                                            name="nome"
                                            type="text"
                                            value={
                                                usuarioEditando.nome
                                            }
                                            onChange={
                                                handleEditarUsuarioChange
                                            }
                                            required
                                        />

                                    </div>

                                    <div className="form-group">

                                        <label htmlFor="editar-usuario-senha">
                                            Senha
                                        </label>

                                        <input
                                            id="editar-usuario-senha"
                                            name="senha"
                                            type="password"
                                            placeholder="Digite a nova senha"
                                            value={
                                                usuarioEditando.senha
                                            }
                                            onChange={
                                                handleEditarUsuarioChange
                                            }
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        type="button"
                                        className="btn-cancelar"
                                        onClick={() =>
                                            setShowEditarUsuario(false)
                                        }
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn"
                                    >
                                        Salvar alterações
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>
                )}
                

            {showNovoProduto && (

                <div
                    className="modal-overlay"
                    onClick={() =>
                        setShowNovoProduto(false)
                    }
                >

                    <div
                        className="modal-novo-usuario"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="modal-header">

                            <div>

                                <h2>
                                    Novo produto
                                </h2>

                                <p>
                                    Cadastre um novo produto
                                    no estoque
                                </p>

                            </div>

                            <button
                                type="button"
                                className="modal-close"
                                onClick={() =>
                                    setShowNovoProduto(false)
                                }
                            >
                                ×
                            </button>

                        </div>

                        <form
                            onSubmit={
                                handleCadastrarProduto
                            }
                        >

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
                                        value={
                                            novoProduto.produto
                                        }
                                        onChange={
                                            handleNovoProdutoChange
                                        }
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
                                        value={
                                            novoProduto.categoria
                                        }
                                        onChange={
                                            handleNovoProdutoChange
                                        }
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
                                        value={
                                            novoProduto.quantidade
                                        }
                                        onChange={
                                            handleNovoProdutoChange
                                        }
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
                                        value={
                                            novoProduto.valor
                                        }
                                        onChange={
                                            handleNovoProdutoChange
                                        }
                                        min="0"
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label htmlFor="status">
                                        Status
                                    </label>

                                    <select
                                        id="status"
                                        name="status"
                                        value={
                                            novoProduto.status
                                        }
                                        onChange={
                                            handleNovoProdutoChange
                                        }
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
                                    onClick={() =>
                                        setShowNovoProduto(false)
                                    }
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
                    onClick={() =>
                        setShowNovaMovimentacao(false)
                    }
                >

                    <div
                        className="modal-novo-usuario"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="modal-header">

                            <div>

                                <h2>
                                    Nova movimentação
                                </h2>

                                <p>
                                    Registre uma nova movimentação
                                    no estoque
                                </p>

                            </div>

                            <button
                                type="button"
                                className="modal-close"
                                onClick={() =>
                                    setShowNovaMovimentacao(false)
                                }
                            >
                                ×
                            </button>

                        </div>

                        <form
                            onSubmit={
                                handleRegistrarMovimentacao
                            }
                        >

                            <div className="modal-body">

                                <div className="form-group">

                                    <label htmlFor="tipo">
                                        Tipo
                                    </label>

                                    <select
                                        id="tipo"
                                        name="tipo"
                                        value={
                                            novaMovimentacao.tipo
                                        }
                                        onChange={
                                            handleNovaMovimentacaoChange
                                        }
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

                                <div className="form-group">

                                    <label htmlFor="produto-movimentacao">
                                        Produto
                                    </label>

                                    <select
                                            id="produto-movimentacao"
                                            name="produto"
                                            value={novaMovimentacao.produto}
                                            onChange={handleNovaMovimentacaoChange}
                                            required
                                        >
                                            <option value="">
                                                Selecione um produto
                                            </option>

                                            {produtos.map((produto) => (
                                                <option
                                                    key={produto.id}
                                                    value={produto.produto}
                                                >
                                                    {produto.produto}
                                                </option>
                                            ))}
                                        </select>

                                        {novaMovimentacao.produto && (
                                           
                                           <p>
                                                Quantidade atual:{" "}
                                                {
                                                    produtos.find(
                                                        (produto) =>
                                                            produto.produto ===
                                                            novaMovimentacao.produto
                                                    )?.quantidade ?? 0
                                                }
                                            </p>
                                        )}

                                </div>

                                <div className="form-group">

                                    <label htmlFor="data-movimentacao">
                                        Data
                                    </label>

                                    <input
                                        id="data-movimentacao"
                                        name="data"
                                        type="date"
                                        value={
                                            novaMovimentacao.data
                                        }
                                        onChange={
                                            handleNovaMovimentacaoChange
                                        }
                                        required
                                    />

                                </div>

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
                                        value={
                                            novaMovimentacao.quantidade
                                        }
                                        onChange={
                                            handleNovaMovimentacaoChange
                                        }
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label htmlFor="usuario-movimentacao">
                                        Usuário
                                    </label>

                                    <select
                                        id="usuario-movimentacao"
                                        name="usuario"
                                        value={novaMovimentacao.usuario}
                                        onChange={handleNovaMovimentacaoChange}
                                        required
                                    >
                                        <option value="">
                                            Selecione um usuário
                                        </option>

                                        {usuarios.map((usuario) => (
                                            <option
                                                key={usuario.id}
                                                value={usuario.nome}
                                            >
                                                {usuario.nome}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                            </div>

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn-cancelar"
                                    onClick={() =>
                                        setShowNovaMovimentacao(false)
                                    }
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

            ```tsx
            {showNovoFornecedor && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowNovoFornecedor(false)}
                >
                    <div
                        className="modal-novo-usuario"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="modal-header">
                            <div>
                                <h2>Novo fornecedor</h2>

                                <p>
                                    Cadastre um novo fornecedor
                                    para sua empresa
                                </p>
                            </div>

                            <button
                                type="button"
                                className="modal-close"
                                onClick={() =>
                                    setShowNovoFornecedor(false)
                                }
                            >
                                ×
                            </button>
                        </div>

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
                                        onChange={
                                            handleNovoFornecedorChange
                                        }
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
                                        onChange={
                                            handleNovoFornecedorChange
                                        }
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
                                        onChange={
                                            handleNovoFornecedorChange
                                        }
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
                                        onChange={
                                            handleNovoFornecedorChange
                                        }
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
                                        onChange={
                                            handleNovoFornecedorChange
                                        }
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
                                    onClick={() =>
                                        setShowNovoFornecedor(false)
                                    }
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

            {showExcluirUsuario && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowExcluirUsuario(false)}
                >
                    <div
                        className="modal-novo-usuario"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="modal-header">
                            <div>
                                <h2>Excluir usuário</h2>

                                <p>
                                    Tem certeza que deseja excluir este usuário?
                                </p>
                            </div>

                            <button
                                type="button"
                                className="modal-close"
                                onClick={() =>
                                    setShowExcluirUsuario(false)
                                }
                            >
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <p>
                                Usuário:{" "}
                                <strong>
                                    {usuarioExcluindo.nome}
                                </strong>
                            </p>

                            <p>
                                Essa ação não poderá ser desfeita.
                            </p>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn-cancelar"
                                onClick={() =>
                                    setShowExcluirUsuario(false)
                                }
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                className="btn"
                                onClick={confirmarExclusaoUsuario}
                            >
                                Excluir usuário
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showEditarFornecedor && (
                
                <div
                    className="modal-overlay"
                    onClick={() => setShowEditarFornecedor(false)}
                >
                    <div
                        className="modal-novo-usuario"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <h2>Editar fornecedor</h2>

                        <form onSubmit={handleSalvarEdicaoFornecedor}>

                            <input
                                type="text"
                                name="nome"
                                placeholder="Nome"
                                value={fornecedorEditando.nome}
                                onChange={handleEditarFornecedorChange}
                                required
                            />

                            <input
                                type="text"
                                name="cnpj"
                                placeholder="CNPJ"
                                value={fornecedorEditando.cnpj}
                                onChange={handleEditarFornecedorChange}
                                required
                            />

                            <input
                                type="text"
                                name="contato"
                                placeholder="Contato"
                                value={fornecedorEditando.contato}
                                onChange={handleEditarFornecedorChange}
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={fornecedorEditando.email}
                                onChange={handleEditarFornecedorChange}
                            />

                            <select
                                name="status"
                                value={fornecedorEditando.status}
                                onChange={handleEditarFornecedorChange}
                            >
                                <option value="sim">Ativo</option>
                                <option value="nao">Inativo</option>
                            </select>

                            <button
                                type="submit"
                                className="btn"
                            >
                                Salvar alterações
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowEditarFornecedor(false)}
                            >
                                Cancelar
                            </button>

                        </form>
                    </div>
                </div>
            )}

            {showExcluirFornecedor && (
                
                <div
                    className="modal-overlay"
                    onClick={() => setShowExcluirFornecedor(false)}
                >
                    <div
                        className="modal-novo-usuario"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <h2>Excluir fornecedor</h2>

                        <p>
                            Tem certeza que deseja excluir o fornecedor{" "}
                            <strong>
                                {fornecedorExcluindo.nome}
                            </strong>?
                        </p>

                        <button
                            type="button"
                            className="btn"
                            onClick={confirmarExclusaoFornecedor}
                        >
                            Sim, excluir
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowExcluirFornecedor(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

        </div>
    </div>
    );
}

export default PgAdmEstoque;
