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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { FullName, Phone, Email, Password } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+[0-9]{1,3}[0-9]{10}$/;
        if (!FullName || !Phone || !Email || !Password) {
            return 'All fields are required.';
        }
        if (!emailRegex.test(Email)) {
            return 'Invalid email format.';
        }
        if (!phoneRegex.test(Phone)) {
            return 'Invalid phone number format.';
        }
        if (Password.length < 6) {
            return 'Password should be at least 6 characters long.';
        }
        return null;
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
        const errorMessage = validateForm();
        if (errorMessage) {
            setMessage(errorMessage);
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
                <div className="Header">
                    <h1>Sign Up</h1>
                </div>
                <div className="LoginFieldArea">
                    <div className="FieldRow">
                        <b>Full Name</b>
                        <input name="FullName" value={formData.FullName} onChange={handleChange} type="text" />
                    </div>
                    <div className="FieldRow">
                        <b>Phone Number</b>
                        <input name="Phone" value={formData.Phone} onChange={handleChange} type="text" />
                    </div>
                    <div className="FieldRow">
                        <b>Email</b>
                        <input name="Email" value={formData.Email} onChange={handleChange} type="text" />
                    </div>
                    <div className="FieldRow">
                        <b>Password</b>
                        <input name="Password" value={formData.Password} onChange={handleChange} type="password" />
                    </div>
                    <div className="ButtonArea">
                        <input type="button" value="Sign Up" onClick={createAccount} />
                        <br />
                        If you already have an account <a href="Login">Login</a>
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
