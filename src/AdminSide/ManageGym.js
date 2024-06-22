import React, { useState, useEffect } from "react";
import "./ManageGym.css";
import TextLoader from "../textloaderwaiting";
import NavStripe from "../NavStripe";
import LoadingStrip from "../LoadingStrip";

const ManageGym = (props) => {
    const [isLoadGymCalled, setIsLoadGymCalled] = useState(false);
    const [gyms, setGyms] = useState(new Map());

    const getCookie = (cname) => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    const loadGym = async (GymDocID) => {
        try {
            const response = await fetch('https://us-central1-carte-gym.cloudfunctions.net/app/GetGym', {
                method: 'POST',
                body: JSON.stringify({ "GymDocID": GymDocID }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
            });
            const data = await response.json();
            setGyms(prevGyms => {
                const newGyms = new Map(prevGyms);
                newGyms.set(GymDocID, data);
                return newGyms;
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    const loadMyGyms = async () => {
        const AccountDocID = getCookie("AccountDocID");

        try {
            const response = await fetch('https://us-central1-carte-gym.cloudfunctions.net/app/MyGyms', {
                method: 'POST',
                body: JSON.stringify({ "AccountDocID": AccountDocID }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
            });
            const data = await response.json();
            await Promise.all(data.map(async (element) => {
                await loadGym(element._fieldsProto.GYMDocID.stringValue);
            }));
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        if (!isLoadGymCalled) {
            setIsLoadGymCalled(true);
            loadMyGyms();
        }
    }, [isLoadGymCalled]);

    const onClickGymBox = (data) => {
        document.cookie = "GymDocID=" + data._ref._path.segments[1];
        window.location.href = "/GymDashboard";
    }

    const displayGyms = () => {
        if (gyms.size === 0) {
            return <LoadingStrip />;
        } else {
            return (
                <>
                    {[...gyms.values()].map(data => (
                        <div className="Card GymPickDesign" key={data._fieldsProto.GymName.stringValue} onClick={() => onClickGymBox(data)}>
                            <div className="Text">
                                {data._fieldsProto.GymName.stringValue}
                                <br />
                                <span>
                                    {data._fieldsProto.Address1.stringValue} {data._fieldsProto.Address2.stringValue} {data._fieldsProto.City.stringValue}
                                </span>
                            </div>
                        </div>
                    ))}
                </>
            );
        }
    }

    return (
        <div className="ManageGymBackground">
            <div className="CardsBox">
                <div className="CardsBoxTitle">
                    <h3>Home&nbsp;</h3>
                    <p>&nbsp;|&nbsp;Your Gyms</p>
                </div>
                <div className="Cards">
                    <div className="Card AddNewAnythingDesign" style={{ width: '15vw', height: '15vw' }} onClick={props.CreateNewGym}>
                        <div className="Text">
                            <div className="PlusButton">
                                +
                            </div>
                            Add New Gym
                            <br />
                            <span>
                                You can create new gym from here.
                            </span>
                        </div>
                    </div>
                    {displayGyms()}
                    <div className="Card OpenSpace" style={{ width: '15vw', height: '15vw' }} onClick={props.CreateNewGym}>
                        <div className="Text">
                            <div className="PlusButton">
                                
                            </div>
                            <br />
                            <span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageGym;
