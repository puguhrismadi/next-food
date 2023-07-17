//layout
import Layout from "../layouts/default";

//import hook react
import { useState, useEffect } from 'react';

//import Head
import Head from 'next/head';

//import router
import Router from 'next/router';

//import axios
import axios from "axios";

//import js cookie
import Cookies from 'js-cookie';

function Login() {
    
    //define state
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    //define state validation
    const [validation, setValidation] = useState([]);

    //function "loginHanlder"
    const loginHandler = async (e) => {
        e.preventDefault();
        
        //initialize formData
        const formData = new FormData();
        //append data to formData
        //formData.append('jwt','fb73c4ab674837f4a184ce11575ee53ff637f81a2f2e355333204befc99a9eddca1d5c66447b98c4ef1087e2ccc70234ae97e206338c71cebc3ebfad3999f18ddb4596c941a612df87277c602e866136853b0156bc66bc50d014e34b00e44282942b202361c6c287d06791c97e5619ace95b03c92d17569cae5622809cbdaa8a');
        formData.append('identifier', identifier);
        formData.append('password', password);

        //send data to server
        await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/auth/local`, formData)
        .then((response) => {

            //set token on cookies get jwt/token nya from api 
            Cookies.set('token', response.data.jwt);
            //console.log(response.data)
            //redirect to dashboard 
            Router.push('/dashboard');
        })
        .catch((error) => {

            //assign error to state "validation"
            setValidation(error.response.data.error.message);
            console.log(validation);
        })
    };

    //hook useEffect
    useEffect(() => {

        //check token
        if(Cookies.get('token')) {

            //redirect page dashboard
            Router.push('/dashboard');
        }
    }, []);

    return(
        <Layout>
            <Head>
                <title>Login Account - Spasi.com</title>
            </Head>
            <div className="container" style={{ marginTop: '80px' }}>
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <h4 className="fw-bold">HALAMAN LOGIN</h4>
                                <hr/>
                                {
                                    validation != '' && (
                                        <div className="alert alert-danger">
                                            {validation}
                                        </div>
                                    )
                                }
                                <form onSubmit={loginHandler}>
                                    <div className="mb-3">
                                        <label className="form-label">ALAMAT EMAIL</label>
                                        <input type="email" className="form-control" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="Masukkan Alamat Email"/>
                                    </div>
                                    {
                                        validation.password && (
                                            <div className="alert alert-danger">
                                                {validation}
                                            </div>
                                        )
                                    }
                                    <div className="mb-3">
                                        <label className="form-label">PASSWORD</label>
                                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password"/>
                                    </div>
                                    {
                                        validation.password && (
                                            <div className="alert alert-danger">
                                                {validation[1].password}
                                            </div>
                                        )
                                    }
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary">LOGIN</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login
