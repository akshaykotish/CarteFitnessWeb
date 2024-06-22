import React, { useState } from "react";
import LoadingStrip from "../LoadingStrip";

const Signup = () => {
    const [formData, setFormData] = useState({
        FullName: '',
        Phone: '',
        Email: '',
        Password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [inputErrors, setInputErrors] = useState({
        FullName: false,
        Phone: false,
        Email: false,
        Password: false
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setInputErrors({ ...inputErrors, [e.target.name]: false });
    };

    const validateForm = () => {
        const { FullName, Phone, Email, Password } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+[0-9]{1,3}[0-9]{10}$/;
        let errors = {
            FullName: !FullName,
            Phone: !Phone || !phoneRegex.test(Phone),
            Email: !Email || !emailRegex.test(Email),
            Password: !Password || Password.length < 6
        };
        setInputErrors(errors);
        return Object.values(errors).some(error => error);
    };

    const checkPhoneNumber = async () => {
        try {
            const response = await fetch('https://us-central1-carte-gym.cloudfunctions.net/app/LoginCheckPhone', {
                method: 'POST',
                body: JSON.stringify({ Phone: formData.Phone }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });

            const data = await response.json();
            return data; // Assuming that a non-null AccountID means the phone number is registered
        } catch (err) {
            setMessage(`Error: ${err.message}`);
            return null;
        }
    };

    const createAccount = async () => {
        const hasErrors = validateForm();
        if (hasErrors) {
            setMessage('Please fill all the fields.');
            return;
        }

        setIsLoading(true);
        setMessage('');

        const account = await checkPhoneNumber();

        if(account.Status == undefined){
            const accountID = account._fieldsProto.Phone.stringValue; 
            if (accountID) {
                setMessage('Phone number is already registered.');
                setIsLoading(false);
                return;
            }
        }

        try {
            const response = await fetch('https://us-central1-carte-gym.cloudfunctions.net/app/Signup', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                document.cookie = "AccountDocID=" + data.AccountID;
                window.location.href = "/Home";
            } else {
                setMessage('Signup failed. Please try again.');
            }
        } catch (err) {
            setMessage(`Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="LoginBackground">
            <div className="LoginForm">
                <div className="LoginFieldArea">
                    <div className="Header">
                        <h1>Sign Up</h1>
                    </div>
                    <div className="FieldRow">
                        <span>Full Name</span>
                        <div className="InputWithIcon">
                            <i className="fas fa-user"></i>
                            <input name="FullName" value={formData.FullName} onChange={handleChange} type="text" placeholder="Full Name" className={inputErrors.FullName ? 'error' : ''} />
                        </div>
                    </div>
                    <div className="FieldRow">
                        <span>Phone Number</span>
                        <div className="InputWithIcon">
                            <i className="fas fa-phone"></i>
                            <input name="Phone" value={formData.Phone} onChange={handleChange} type="text" placeholder="+919812312345" className={inputErrors.Phone ? 'error' : ''} />
                        </div>
                    </div>
                    <div className="FieldRow">
                        <span>Email</span>
                        <div className="InputWithIcon">
                            <i className="fas fa-envelope"></i>
                            <input name="Email" value={formData.Email} onChange={handleChange} type="text" placeholder="yourmail@gmail.com" className={inputErrors.Email ? 'error' : ''} />
                        </div>
                    </div>
                    <div className="FieldRow">
                        <span>Password</span>
                        <div className="InputWithIcon">
                            <i className="fas fa-lock"></i>
                            <input name="Password" value={formData.Password} onChange={handleChange} type="password" placeholder="Password@123" className={inputErrors.Password ? 'error' : ''} />
                        </div>
                    </div>
                    <div className="ButtonArea">
                        <input type="button" value="Sign Up" onClick={createAccount} />
                        <br />
                        Already have an account <a href="Login">Login</a>
                    </div>
                    {isLoading ? (
                        <div className="LoadingStripArea">
                            <LoadingStrip />
                        </div>
                    ) : (
                        <div className="MessageBox">
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signup;
