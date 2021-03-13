export interface FormModel {
    currentPage: number;
    maSinhVien: string;
    soHieuVanBang: string;
    hoDem: string;
    Ten: string;
    ngaySinh: string;
}

export interface DiplomaEntry {
    fullName: string;
    dateOfBirth: string;
    classification: string;
    key: string;
}

export interface DiplomaResponse {
    totalPages: number;
    data: DiplomaEntry[];
}