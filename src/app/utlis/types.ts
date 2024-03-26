export const productTypes = [
    {
        name: 'Elektronik',
        types: [
            { value: "Bilgisayar/Tablet", },
            { value: "Telefon & Telefon Aksesuarlar" },
            { value: "Beyaz Eşya" },
            { value: "Kamera" }
        ]
    },
    {
        name: 'Ev / Ofis',
        types: [
            { value: "Sofra & Mutfak", },
            { value: "Mobilya" },
        ]
    },
    {
        name: 'Spor',
        types: [
            { value: "Spor Giyim", },
            { value: "Fitness" },
        ]
    },
];

export interface INotification {
    message: string
    description: string
    duration?: number
  }