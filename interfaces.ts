export default interface Users {
    serviceLogin(phoneEmail: string, password: string): Promise<any>;
    serviceRegistration(phoneEmail: string, password: string): Promise<any>;
    serviceLogout(token: string, all: boolean): Promise<any>;
    serviceInfouser(token: string): Promise<any>;
}
