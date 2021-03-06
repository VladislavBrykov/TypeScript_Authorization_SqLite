export default function typeId(phoneEmail: string): string {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return (re.test((phoneEmail)) ? 'email' : 'mobile')
}
