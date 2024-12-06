'use client';

import { useEffect, useState } from "react";

interface Data {
    id: number;
    email: string;
    phone: string;
    title: string;
    description: string;
    date: string;
    url: string;
}

export default function NewUser() {
    const [newUser, setNewData] = useState<Data[]>([]);
    const [loading, setLoading] = useState(false);

    const [inputData, setInputData] = useState({
        email: '',
        phone: '',
        title: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const fetchUsers = async () => {
        setLoading(true);

        try {
            const response = await fetch('/api/user', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();

            if (Array.isArray(data)) {
                setNewData(data);
            } else {
                console.error("A resposta não é um array:", data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateData = async () => {
        const newData = newUser

        newData.push({
            id: newData.length + 1,
            email: inputData.email,
            phone: inputData.phone,
            title: inputData.title,
            description: inputData.description,
            date: getDate(),
            url: ''
        });

        try {
            const response = await fetch('/api/user', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
            });

            if (!response.ok) throw new Error('Failed to update users');
            const data = await response.json();
            setNewData(data);
            alert('Dados criados com sucesso!');
        } catch (error) {
            console.error('Error updating users:', error);
        }
    };

    const getDate = () => {
        const date = new Date();

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="w-full p-5 flex flex-col gap-5 justify-center items-center text-white">
            <div id="form" className="w-[25rem] h-[24rem] flex flex-col justify-between items-center gap-5 bg-black rounded-xl p-8">
                <input
                    className="w-full p-2 rounded-lg border-none text-black"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={inputData.email}
                    onChange={handleChange}
                />
                <input
                    className="w-full p-2 rounded-lg border-none text-black"
                    type="text"
                    name="phone"
                    placeholder="Telefone"
                    value={inputData.phone}
                    onChange={handleChange}
                />
                <input
                    className="w-full p-2 rounded-lg border-none text-black"
                    type="text"
                    name="title"
                    placeholder="Nome"
                    value={inputData.title}
                    onChange={handleChange}
                />
                <input
                    className="w-full p-2 rounded-lg border-none text-black "
                    type="text"
                    name="description"
                    placeholder="Descrição"
                    value={inputData.description}
                    onChange={handleChange}
                />
                <button onClick={updateData} disabled={loading} className="w-fit border-2 p-2 px-5 rounded-lg font-semibold hover:bg-white hover:text-black transition">
                    {loading ? 'Carregando...' : 'Enviar Teste'}
                </button>
            </div>
        </div>
    );
}
