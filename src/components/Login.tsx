import { useState } from "react";
import Logo from "./Logo";

interface LoginFormState {
    username: string;
    password: string;
}

const initialFormState: LoginFormState = {
    username: "",
    password: "",
};

/**
 * TODO:
 *
 * Implement Authentication Logic:
 * a. In the handleLogin function, send an HTTP POST request to '/api/login' with the username and password.
 * b. On success, extract and store the authentication token in React Context
 */
const Login = () => {
    const [formData, setFormData] = useState<LoginFormState>(initialFormState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // TODO: Implement Authentication Logic
    };

    return (
        <section className="flex justify-center items-center min-h-dvh">
            <div className="min-w-[500px] flex flex-col justify-center items-center">
                <Logo />
                <h3 className="text-3xl font-bold text-center my-5">Sign in to your account</h3>
                <form onSubmit={handleLogin} className="space-y-3">
                    <input
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button
                        className="bg-teal-500 transition-all hover:bg-teal-600 w-full p-3 rounded-md text-white font-bold text-lg"
                        type="submit"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Login;
