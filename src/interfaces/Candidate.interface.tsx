// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    login: string;
    name: string| null;
    location: string | null;
    email: string;
    company: string | null;
    bio: string | null;
    avatarUrl: string;
}
