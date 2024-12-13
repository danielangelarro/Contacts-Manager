export class Contact {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    position: string;
    status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        company: string,
        position: string,
        status: 'New' | 'Contacted' | 'Qualified' | 'Lost',
        id?: number,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.company = company;
        this.position = position;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    to_json = () => {
        return {
            // id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            company: this.company,
            position: this.position,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    };
}
