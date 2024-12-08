import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface User {
    name: string;
    email: string;
    phone: string;
    description: string;
}

// Handler para requisição PUT
export async function PUT(req: Request) {
    try {
        // Extrai os dados do corpo da requisição
        const body: User = await req.json();

        // Cria o usuário no banco de dados
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                phone: body.phone,
                description: body.description,
                date: new Date(),
            },
        });

        // Retorna a resposta com o novo usuário criado
        return new Response(JSON.stringify(user), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);

        // Retorna uma resposta de erro
        return new Response(JSON.stringify({ error: "Erro ao criar usuário" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

// Handler para requisição GET
export async function GET() {
    try {
        // Busca todos os usuários no banco de dados
        const users = await prisma.user.findMany();

        // Retorna a lista de usuários
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error(error);

        // Retorna uma resposta de erro
        return new Response(JSON.stringify({ error: "Erro ao buscar usuários" }), { status: 500 });
    }
}
