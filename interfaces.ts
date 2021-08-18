export interface Users {
    serviceLogin(phoneEmail: string, password: string): Promise<any>;
    serviceRegistration(phoneEmail: string, password: string): Promise<any>;
    serviceLogout(token: string, all: boolean): Promise<any>;
    serviceDeleteUser(token: string): Promise<any>;
    //serviceInfouser(token: string): Promise<any>;
}

export interface Posts {
    serviceNewPost(title: string, body: string, token: string): Promise<any>;
    //serviceRegistration(phoneEmail: string, password: string): Promise<any>;
    // serviceLogout(token: string, all: boolean): Promise<any>;
    // serviceDeleteUser(token: string): Promise<any>;
    // serviceInfouser(token: string): Promise<any>;
}

// export default { Users, Posts}
