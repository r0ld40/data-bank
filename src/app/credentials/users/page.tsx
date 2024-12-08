'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

interface Data {
    id: number;
    email: string;
    phone: string;
    name: string;
    description: string;
    date: string;
    url: string;
}

export default function UserPage() {
    const [ data, setData ] = useState<Data[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);

    const handleFormatDate = (date: string) => {
        const formattedDate = new Date(date).toLocaleDateString('pt-BR');
        return formattedDate;
    }

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/user');
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(true);
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <p>Carregando...</p>

    if (error) return <p>Erro ao carregar os dados de usuários</p>

    if (data && data.length > 0) return (
        <div className="max-w-[2000px] p-5 flex flex-col gap-5 justify-center items-center">
            {data.map((user) => (
                <div key={user.id} className="w-full p-5 flex gap-16 justify-between items-center bg-black text-white font-semibold rounded-xl">
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                    <p>{user.description}</p>
                    <p>{handleFormatDate(user.date)}</p>
                    {user.url && <Link href={user.url} className="border-2 border-white p-2 rounded-xl font-semibold hover:bg-white hover:text-black transition">Acessar GitHub</Link>}
                </div>
            ))}
        </div>
    );

    return <p>Não há usuários cadastrados ou o Banco de Dados esta fora do ar.</p>;
}