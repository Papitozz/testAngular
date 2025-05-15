export interface Profile {
    data: Profile[],
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

export interface Source {
    data: Source[],
    id: number,
    name: string,
    year: number,
    color: string,
    pantone_value: number
}