
import {
	API_ENDPOINT
} from "../constants/API";

class API {
    async makeGetQuery(url) {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            }
        });

        if (!response.ok) {
            throw Error(`HTTP status ${response.status}`);
        }

        const responseData = await response.json();

        return responseData;
    }

    async makePostQuery(url, formData) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            },
            body: formData
        });

        if (!response.ok) {
            throw Error(`HTTP status ${response.status}`);
        }

        const responseData = await response.json();

        return responseData;
    }
    
    async fetchTasks(developerName, sortField='id', sortDirection='asc', page=1) {
        const url = `${API_ENDPOINT}/?developer=${developerName}&sort_field=${sortField}&sort_direction=${sortDirection}&page=${page}`;

        try {
            return await this.makeGetQuery(url);
        } catch (e) {
            throw new Error(`API ${this.fetchTasks.name} failed ${e.message}`); 
        }
    }

    async signup(developerName, username, password, isAdmin) { 
        const url = `${API_ENDPOINT}/signup?developer=${developerName}`;
        var formData = new FormData()
        formData.append("username", username)
        formData.append("password", password)
        formData.append("is_admin", isAdmin)
        
        try {
            return await this.makePostQuery(url, formData)
        } catch (e) {
            throw new Error(`API ${this.signup.name} failed ${e.message}`); 
        }
    }

    async login(developerName, username, password) { 
        const url = `${API_ENDPOINT}/login?developer=${developerName}`;
        var formData = new FormData()
        formData.append("username", username)
        formData.append("password", password)

        try {
            return await this.makePostQuery(url, formData)
        } catch (e) {
            throw new Error(`API ${this.login.name} failed ${e.message}`); 
        }
    }
    
    async create(developerName, token, username, email, text) {
        const url = `${API_ENDPOINT}/create?developer=${developerName}`;
        const data = new FormData()
        data.append("token", token)
        data.append("username", username)
        data.append("email", email)
        data.append("text", text)
        try {
            return await this.makePostQuery(url, data)
        } catch (e) {
            throw new Error(`API ${this.create.name} failed ${e.message}`); 
        }
    }
    
    async edit(developerName, token, id, status, username, email, text) {
        const url = `${API_ENDPOINT}/edit/${id}?developer=${developerName}`;
        const data = new FormData()
        data.append("token", token)
        data.append("status", status)
        data.append("username", username)
        data.append("email", email)
        data.append("text", text)
        try {
            return await this.makePostQuery(url, data)
        } catch (e) {
            throw new Error(`API ${this.create.name} failed ${e.message}`); 
        }
    }
}

export default new API();
