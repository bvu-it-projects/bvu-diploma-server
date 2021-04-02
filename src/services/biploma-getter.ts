import * as dotenv from "dotenv";
dotenv.config();

import axios from "axios";


export function getBiplomaInfo(id: string) {
  return new Promise<any>((resolve, reject) => {

    axios({
      method: 'POST',
      url: process.env['API-ENDPOINT'],
      params: {
        rcvId: id,
      },
      headers: {
        'Authorization': process.env['API-KEY'],
      },
    })
      .then(res => {
        if (res.data.error) {
          return reject(res.data.error_description);
        }

        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      })
  })
}
