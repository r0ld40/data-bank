'use client';

import {  useState } from "react";

interface Data {
    email: string;
    phone: string;
    name: string;
    description: string;
}

export default function NewUser() {
    const [inputData, setInputData] = useState<Data>({
        email: '',
        phone: '',
        name: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const updateData = async () => {
        try {
            const response = await fetch('/api/user', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData),
            });

            if (!response.ok) throw new Error('Failed to update users');

            alert('Dados criados com sucesso!');
        } catch (error) {
            console.error('Error updating users:', error);
        }
    };

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
                    name="name"
                    placeholder="Nome"
                    value={inputData.name}
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
                <button onClick={updateData}  className="w-fit border-2 p-2 px-5 rounded-lg font-semibold hover:bg-white hover:text-black transition">
                    Enviar Teste
                </button>
            </div>
        </div>
    );
}
