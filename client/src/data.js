export const inputsA = [
    {
        id: 1,
        name: "name",
        type: "text",
        placeholder: "Enter your name",
        label: "Full name",
        errorMsg: "Enter your name",
        required: true
    },
    {
        id: 2,
        name: "contact",
        type: "text",
        placeholder: "phone number",
        label: "Contact",
        errorMsg: "Enter your Phone Number",
        required: true
    },
    {
        id: 3,
        name: "email",
        type: "text",
        placeholder: "email",
        label: "Email",
        errorMsg: "Enter your email",
        required: true
    }
];

export const inputsB = [
    {
        id: 1,
        name: "quantity",
        type: "text",
        placeholder: "Weight in Kg",
        label: "Weight",
        errorMsg: "Enter the weight of the residue",
        required: true
    },
    {
        id: 2,
        name: "address",
        type: "text",
        placeholder: "Address",
        label: "Address",
        errorMsg: "Enter the Address",
        required: true
    }
];

export const options = [
    {
        label: "Plastic",
        value: "Plastic"
    },
    {
        label: "Electronic",
        value: "Electronic"
    },
    {
        label: "Chemical",
        value: "Chemical"
    },
    {
        label: "Industrial",
        value: "Industrial"
    },
    {
        label: "Agricultural",
        value: "Agricultural"
    },
    {
        label: "Biomedical",
        value: "Biomedical"
    },
    {
        label: "Biodegradable",
        value: "Biodegradable"
    }
];

export const info = [
    {
        name: "jane",
        legajo: 1,
        type: "recyclable",
        quantity: 1,
        sector: "pgm",
        createdAt: new Date("2022-08-25T23:09:19.308+00:00")
    },
    {
        name: "harry",
        legajo: 2,
        type: "especial",
        quantity: 2,
        sector: "prod",
        createdAt: new Date("2022-09-1T23:09:19.308+00:00")
    },
    {
        name: "john",
        legajo: 3,
        type: "recoverable",
        quantity: 3,
        sector: "qc",
        createdAt: new Date("2022-08-15T23:09:19.308+00:00")
    },
    {
        name: "harsh",
        legajo: 4,
        type: "industrial",
        quantity: 4,
        sector: "admin",
        createdAt: new Date("2022-08-05T23:09:19.308+00:00")
    }
];