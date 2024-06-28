import { createContext, useState } from "react";
import { User } from "../models/User";

export const AuthContext = createContext<User | null>(null);


