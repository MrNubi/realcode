import { IUser } from '@typings/db';
import { MInnerGroup } from '@typings/memot';
import axios from 'axios';

const fetcherMemoGIData = <Data,>(url: string | null, tocken: string): any => {
  if (url) {
    const A = axios
      .get<MInnerGroup>(
        url,

        {
          headers: {
            Authorization: `Bearer ${tocken}`,
          },

          withCredentials: true,
        },
      )
      .then((r) => {
        console.log('getInner: 2차 성공', tocken);
        console.log('getInner 2: ', r.data);
        if (r.data.count > 0) {
          r.data.results.map((result, i) => {
            console.log(i, result);
            let innerData = JSON.stringify(result);
            sessionStorage.setItem(`inner${result.pk}`, innerData);
          });
        }

        return r.data;
      })
      .catch(() => console.log('getInner: 2차실패', tocken));

    return A;
  } else return;
};

export default fetcherMemoGIData;
