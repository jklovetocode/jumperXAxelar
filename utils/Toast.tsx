import { toast } from 'react-toastify'
import Link from 'next/link'
import { findExplorer, shortenAddress } from './FindHelper'

export function Toast(
  myFunction: any,
  chainID: number | undefined,
  showAxelar: boolean
) {
  toast.promise(myFunction, {
    success: {
      autoClose: 5000,
      style: {
        backgroundColor: '#ffffff',
        color: 'green',
        overflow: 'auto',
        fontSize: 14,
        fontWeight: 'bolder',
      },
      render({ data }: any) {
        return (
          <div className="flex flex-col gap-1">
            <div className="font-bold">Successful</div>
            <Link
              className="text-xs font-semibold underline  "
              href={`${findExplorer(chainID)}/tx/${data}`}
              target="_blank"
            >
              tx : {shortenAddress(data)}
            </Link>
            {showAxelar && (
              <Link
                className="text-xs font-semibold underline  "
                href={`https://testnet.axelarscan.io/gmp/${data}`}
                target="_blank"
              >
                status axelar : {shortenAddress(data)}
              </Link>
            )}
          </div>
        )
      },
    },
    error: {
      autoClose: 3000,
      style: {
        backgroundColor: '#ffffff',
        color: 'red',
        overflow: 'auto',
        fontSize: 14,
        fontWeight: 'bolder',
      },
      render({ data }: any) {
        return (
          <div>
            <div className="font-bold">Fail</div>
            <div> {data.message}</div>
          </div>
        )
      },
    },
  })
}
 
