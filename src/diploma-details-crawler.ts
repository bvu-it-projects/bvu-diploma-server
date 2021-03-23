import axios from 'axios';
import { StudentInfo } from './types';
import https from 'https';
import cheerio from 'cheerio';
import { rejects } from 'node:assert';


export function crawlDiplomaDetails(key: string) {
    return new Promise((resolve, reject) => {

        axios({
            method: 'GET',
            url: 'https://sinhvien.bvu.edu.vn/VanBangInfo.aspx',
            params: {
                k: key,
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
        })
            .then((response) => {
                return resolve(scrapData(response.data));
            })
            .catch((err) => {
                console.log(err);
                return reject(new Error(err.message));
            });
    });
}


function scrapData(body: any): Promise<any> {
    return new Promise((resolve, rejects) => {

        const $ = cheerio.load(body, { decodeEntities: false });
        const theTable = $('#form1 table[style="width: 100%;margin:10px"]').html();
    

        //  the key is invalid
        if (!theTable)
            return rejects(new Error('Liên kết đã hết hạn, vui lòng tra cứu lại !'));
    

        console.log(theTable);


        let student = <StudentInfo>{};
        student.id = $('tr:first-child > td:nth-child(2)').text().trim();
        student.fullName = $('tr:nth-child(2) > td:nth-child(2)').text().trim();
        student.dateOfBirth = $('tr:nth-child(3) > td:nth-child(2)').text().trim();
        student.bornAddress = $('tr:nth-child(4) > td:nth-child(2)').text().trim();
        student.gender = $('tr:nth-child(5) > td:nth-child(2)').text().trim();

        student.department = $('tr:nth-child(6) > td:nth-child(2)').text().trim();
        student.educateRank = $('tr:nth-child(6) > td:nth-child(4)').text().trim();

        student.major = $('tr:nth-child(7) > td:nth-child(2)').text().trim();
        student.educateType = $('tr:nth-child(7) > td:nth-child(4)').text().trim();

        student.graduatedRank = $('tr:nth-child(8) > td:nth-child(2)').text().trim();
        
        student.learningYear = $('tr:nth-child(9) > td:nth-child(2)').text().trim();
        student.graduatedYear = $('tr:nth-child(9) > td:nth-child(4)').text().trim();
        
        student.issuedDate = $('tr:nth-child(10) > td:nth-child(2)').text().trim();
        student.diplomaNumber = $('tr:nth-child(10) > td:nth-child(4)').text().trim();

        student.decisionNumber = $('tr:nth-child(11) > td:nth-child(2)').text().trim();
        student.notedDate = $('tr:nth-child(11) > td:nth-child(4)').text().trim();

        console.log('the student:', student);
        return resolve(student);
    });
}
