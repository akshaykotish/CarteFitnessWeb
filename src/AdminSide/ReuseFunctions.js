class ReuseFunctions {

    async AddRole(bodydata) {
        const response = await fetch('https://us-central1-carte-gym.cloudfunctions.net/app/AddRole', {
            method: 'POST',
            body: JSON.stringify(bodydata),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        return data;
    }

    async AddAdministrator(bodydata) {
        const response = await fetch('https://us-central1-carte-gym.cloudfunctions.net/app/AddAdministrator', {
            method: 'POST',
            body: JSON.stringify(bodydata),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        return data;
    }
}

export default ReuseFunctions;
