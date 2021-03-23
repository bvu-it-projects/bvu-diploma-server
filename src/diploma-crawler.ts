import axios from 'axios';
import { FormModel, DiplomaEntry, DiplomaResponse } from './types';
import https from 'https';
import cheerio from 'cheerio';


export function crawlFromData(model: FormModel) {
    return new Promise((resolve, reject) => {

        axios({
            method: 'POST',
            url: 'https://sinhvien.bvu.edu.vn/ajaxpro/TraCuuVanBang,PMT.Web.PhongDaoTao.ashx',
            headers: {
                'X-AjaxPro-Method': 'GetDanhSachSVTotNghiep',
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
            data: model,
        })
            .then((response) => {
                let array = (response.data as string).split(';/*')[0];
                array = JSON.parse(array);
                return resolve(scrapData(array[1]));
            })
            .catch((err) => {
                console.log(err);
                return reject(new Error(err.message));
            });
    });
}


function scrapData(table: any): Promise<DiplomaResponse> {
    return new Promise((resolve, reject) => {
        
        const data: DiplomaEntry[] = [];
        const $ = cheerio.load(table);

        const theTable = $('#TblDanhSachSVTotNghiep tr:nth-of-type(n+2)').toArray();
        theTable.forEach((tr, index) => {
            data.push({
                fullName: $(tr).find('td:nth-child(2)').text().trim(),
                dateOfBirth: $(tr).find('td:nth-child(3)').text().trim(),
                classification: $(tr).find('td:nth-child(4)').text().trim(),
                key: getDiplomaDetailKey($(tr).find('td:nth-child(5) a').attr('href')!) ?? '',
            });
        });


        // the total pages
        const totalPages = $('.pagging div[style="float:right"]').text().split('/')[1];


        return resolve({
            data,
            totalPages: parseInt(totalPages),
        });
    });
}


function getDiplomaDetailKey(href: string) {
    if (!href) {
        return undefined;
    }

    let key = href.split('javascript:OpenPupup(\'')[1];
    key = key.split('\');')[0];

    return key;
}

export function crawlByPageIndex(index: number, key: string) {

}
