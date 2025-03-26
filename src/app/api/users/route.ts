import { NextResponse } from "next/server";

type Usuario = {
  id: number;
  nome: string;
  email: string;
};

let usuarios: Usuario[] = [
  { id: 1, nome: "João", email: "joao@email.com" },
  { id: 2, nome: "Maria", email: "maria@email.com" },
  { id: 3, nome: "Carlos", email: "carlos@email.com" },
];

// Função para lidar com GET
export async function GET() {
  return NextResponse.json({ success: true, data: usuarios });
}

// Função para lidar com POST
export async function POST(request: Request) {
  try {
    // Extrai os dados do corpo da requisição
    const body = await request.json();

    // Validações simples (opcional)
    if (!body.nome || !body.email) {
      return NextResponse.json(
        { success: false, message: "Nome e email são obrigatórios." },
        { status: 400 }
      );
    }

    // Cria um novo usuário
    const novoUsuario: Usuario = {
      id: usuarios.length + 1,
      nome: body.nome,
      email: body.email,
    };

    // Adiciona à lista de usuários
    usuarios.push(novoUsuario);

    // Retorna o novo usuário
    return NextResponse.json({
      success: true,
      message: "Usuário adicionado com sucesso!",
      data: novoUsuario,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erro ao processar a requisição." },
      { status: 500 }
    );
  }
}
