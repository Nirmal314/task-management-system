"use client"

import { UserAuth } from "./context/AuthContext";

export function getUid() {
    const { user } = UserAuth();
    return user ? user.uid : null

}

