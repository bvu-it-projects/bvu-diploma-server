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


export type Gender = 'Nam' | 'Nữ';
export interface StudentInfo {
    id: number;
    fullName: string;
    dateOfBirth: string;
    bornAddress: string;
    gender: Gender;
    department: string; //  ngành
    major: string;  //  chuyên ngành
    graduatedRank: string;
    graduatedYear: number;
    issuedDate: string;
    decisionNumber: string;
    educateRank: string;    //  bậc đào tạo (Đại học | Cao đẳng)
    educateType: string;    //  loại hình đào tạo
    diplomaNumber: string;  //  số hiệu văn bằng
}
