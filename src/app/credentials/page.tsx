'use client';

import { useState } from "react";
import NewUser from "./new/page";
import UserPage from "./users/page";

export default function Credentials() {
    const [ newUser, setNewUser ] = useState(true);
    const [ users, setUsers ] = useState(false);

    const handleNewUser = () => {
        setNewUser(true);
        setUsers(false);
    }

    const handleUsers = () => {
        setNewUser(false);
        setUsers(true);
    }

    return (
        <div className="w-full p-5 flex flex-col gap-5 justify-center items-center">
            <div className="flex">
                <button onClick={handleNewUser} className={`${newUser && "border-black"} border-b-2 p-2 px-8 font-semibold hover:border-black transition`}>Cadastrar novo usuário</button>
                <button onClick={handleUsers} className={`${users && "border-black"} border-b-2 p-2 px-8 font-semibold hover:border-black transition`}>Ver todos os usuários</button>
            </div>
            {newUser && <NewUser />}
            {users && <UserPage />}
        </div>
    );
}