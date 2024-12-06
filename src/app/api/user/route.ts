import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Caminho para o arquivo data.json
const filePath = path.resolve('src', 'data', 'data.json');

// Tipo para os dados que esperamos salvar ou ler do JSON
interface Data {
  [key: string]: []; // Ajuste conforme o formato dos dados que você está usando
}

// Função para ler os dados do arquivo
const readFile = (): Data | null => {
    try {
        // Lê o conteúdo do arquivo JSON
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error: unknown) {
        // Se ocorrer um erro, lança um erro com uma mensagem adequada
        if (error instanceof Error) {
            throw new Error(`Erro ao ler o arquivo: ${error.message}`);
        }
        throw new Error('Erro desconhecido ao ler o arquivo');
    }
};

// Função para salvar os dados no arquivo
const writeFile = (newData: Data): void => {
    try {
        // Cria o diretório se não existir
        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }
        // Escreve ou cria o arquivo JSON com os dados recebidos
        fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
    } catch (error: unknown) {
        // Lança um erro com uma mensagem detalhada se houver falha
        if (error instanceof Error) {
            throw new Error(`Erro ao escrever no arquivo: ${error.message}`);
        }
        throw new Error('Erro desconhecido ao escrever no arquivo');
    }
};

export async function GET(): Promise<NextResponse> {
    try {
        // Tenta ler os dados do arquivo
        const data = readFile();
        // Retorna os dados em formato JSON com status 200
        return NextResponse.json(data, { status: 200 });
    } catch (error: unknown) {
        // Se houver erro, captura e retorna a mensagem de erro com status 500
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: 'Erro desconhecido' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
    try {
        // Lê os dados do corpo da requisição
        const newData: Data = await req.json();

        // Verifica se os dados são válidos
        if (!newData || Object.keys(newData).length === 0) {
            return NextResponse.json({ message: 'Dados inválidos' }, { status: 400 });
        }

        // Tenta salvar os dados no arquivo JSON
        writeFile(newData);

        // Retorna uma mensagem de sucesso
        return NextResponse.json({ message: 'Arquivo atualizado com sucesso' }, { status: 200 });
    } catch (error: unknown) {
        // Se houver erro, captura e retorna a mensagem de erro com status 500
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: 'Erro desconhecido' }, { status: 500 });
    }
}
