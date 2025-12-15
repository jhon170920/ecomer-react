import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {User, Mail, Lock, Eye, EyeOff, LogIn, loader2, Shield, Type } from "lucide-react";
import axios from axios;

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({Type: '', text: ''});
    const navigate = useNavigate
}