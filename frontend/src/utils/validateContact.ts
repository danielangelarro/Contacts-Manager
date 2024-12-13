export interface ValidationErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    position?: string;
    status?: string;
}

export const validateContact = (form: any): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!form.firstName) {
        errors.firstName = "First name is required";
    }

    if (!form.lastName) {
        errors.lastName = "Last name is required";
    }

    if (!form.email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = "Email is invalid";
    }

    if (!form.phone) {
        errors.phone = "Phone number is required";
    } else if (!/^\+?[1-9]\d{1,14}$/.test(form.phone)) {
        errors.phone = "Invalid phone number format";
    }

    if (!form.company) {
        errors.company = "Company name is required";
    }

    if (!form.position) {
        errors.position = "Position is required";
    }

    if (!form.status) {
        errors.status = "Status is required";
    }

    return errors;
};
