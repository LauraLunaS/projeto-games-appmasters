import { useState } from 'react';
import { auth } from '../../services/firebaseConnection';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import style from  './style.module.css';

import gta from '../../assets/gta.png';
import logo from  '../../assets/logo.png';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const navigate = useNavigate();
  
  async function handleAuth(e) {
    e.preventDefault();

    if (email !== '' && password !== '') {
      try {
        if (isRegisterMode) {
          await createUserWithEmailAndPassword(auth, email, password);
          navigate('/home', { replace: true });
        } else {
          alert('Bem-vindo')
          navigate('/home', { replace: true });
        }
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          alert('O usuário já está cadastrado. Faça login.');
          setIsRegisterMode(!isRegisterMode);
          setEmail('');
          setPassword('');
        } else {
          console.log('ERRO AO FAZER A AUTENTICAÇÃO', error);
        }
      }
    } else {
      alert('Preencha todos os campos!');
    }
  }

  function toggleMode() {
    setIsRegisterMode(!isRegisterMode);
  }

  return (
    <div className={style.Container}>
      <img src={gta} className={style.gtaImage}></img>
      
      <form className={style.container} onSubmit={handleAuth} >
        <img src={logo} className={style.logo}></img>
        <h1 className={style.register}>{isRegisterMode ? 'Cadastro' : 'Login'}</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={style.input}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={style.input}
        />

        <button type="submit" className={style.btnIn}>
          {isRegisterMode ? 'Cadastrar' : 'Entrar'}
        </button>
      
      <Link onClick={toggleMode} className={style.buttonLink}>
        {isRegisterMode ? 'Já tem uma conta? Faça login' : 'Não tem uma conta? Cadastre-se'}
      </Link>
      </form>
    </div>
  );
}
