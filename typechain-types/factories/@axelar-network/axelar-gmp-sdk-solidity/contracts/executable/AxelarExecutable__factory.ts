/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  AxelarExecutable,
  AxelarExecutableInterface,
} from "../../../../../@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "gateway_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "NotApprovedByGateway",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "commandId",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "sourceChain",
        type: "string",
      },
      {
        internalType: "string",
        name: "sourceAddress",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "payload",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "commandId",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "sourceChain",
        type: "string",
      },
      {
        internalType: "string",
        name: "sourceAddress",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "payload",
        type: "bytes",
      },
      {
        internalType: "string",
        name: "tokenSymbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "executeWithToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "gateway",
    outputs: [
      {
        internalType: "contract IAxelarGateway",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b50604051610a5f380380610a5f83398181016040528101906100329190610135565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610098576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff168152505050610162565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610102826100d7565b9050919050565b610112816100f7565b811461011d57600080fd5b50565b60008151905061012f81610109565b92915050565b60006020828403121561014b5761014a6100d2565b5b600061015984828501610120565b91505092915050565b6080516108d661018960003960008181609e0152818160de01526101fa01526108d66000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063116191b6146100465780631a98b2e0146100645780634916065814610080575b600080fd5b61004e61009c565b60405161005b919061037e565b60405180910390f35b61007e600480360381019061007991906104ca565b6100c0565b005b61009a600480360381019061009591906105da565b6101dc565b005b7f000000000000000000000000000000000000000000000000000000000000000081565b600085856040516100d29291906106e2565b604051809103902090507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16631876eed98c8c8c8c8c878b8b8b6040518a63ffffffff1660e01b815260040161014599989796959493929190610768565b6020604051808303816000875af1158015610164573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610188919061081c565b6101be576040517f500c44b400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6101cf8a8a8a8a8a8a8a8a8a6102ec565b5050505050505050505050565b600082826040516101ee9291906106e2565b604051809103902090507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16635f6970c38989898989876040518763ffffffff1660e01b815260040161025b96959493929190610849565b6020604051808303816000875af115801561027a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061029e919061081c565b6102d4576040517f500c44b400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6102e28787878787876102f7565b5050505050505050565b505050505050505050565b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061034461033f61033a846102ff565b61031f565b6102ff565b9050919050565b600061035682610329565b9050919050565b60006103688261034b565b9050919050565b6103788161035d565b82525050565b6000602082019050610393600083018461036f565b92915050565b600080fd5b600080fd5b6000819050919050565b6103b6816103a3565b81146103c157600080fd5b50565b6000813590506103d3816103ad565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f8401126103fe576103fd6103d9565b5b8235905067ffffffffffffffff81111561041b5761041a6103de565b5b602083019150836001820283011115610437576104366103e3565b5b9250929050565b60008083601f840112610454576104536103d9565b5b8235905067ffffffffffffffff811115610471576104706103de565b5b60208301915083600182028301111561048d5761048c6103e3565b5b9250929050565b6000819050919050565b6104a781610494565b81146104b257600080fd5b50565b6000813590506104c48161049e565b92915050565b60008060008060008060008060008060c08b8d0312156104ed576104ec610399565b5b60006104fb8d828e016103c4565b9a505060208b013567ffffffffffffffff81111561051c5761051b61039e565b5b6105288d828e016103e8565b995099505060408b013567ffffffffffffffff81111561054b5761054a61039e565b5b6105578d828e016103e8565b975097505060608b013567ffffffffffffffff81111561057a5761057961039e565b5b6105868d828e0161043e565b955095505060808b013567ffffffffffffffff8111156105a9576105a861039e565b5b6105b58d828e016103e8565b935093505060a06105c88d828e016104b5565b9150509295989b9194979a5092959850565b60008060008060008060006080888a0312156105f9576105f8610399565b5b60006106078a828b016103c4565b975050602088013567ffffffffffffffff8111156106285761062761039e565b5b6106348a828b016103e8565b9650965050604088013567ffffffffffffffff8111156106575761065661039e565b5b6106638a828b016103e8565b9450945050606088013567ffffffffffffffff8111156106865761068561039e565b5b6106928a828b0161043e565b925092505092959891949750929550565b600081905092915050565b82818337600083830152505050565b60006106c983856106a3565b93506106d68385846106ae565b82840190509392505050565b60006106ef8284866106bd565b91508190509392505050565b610704816103a3565b82525050565b600082825260208201905092915050565b6000601f19601f8301169050919050565b6000610738838561070a565b93506107458385846106ae565b61074e8361071b565b840190509392505050565b61076281610494565b82525050565b600060c08201905061077d600083018c6106fb565b8181036020830152610790818a8c61072c565b905081810360408301526107a581888a61072c565b90506107b460608301876106fb565b81810360808301526107c781858761072c565b90506107d660a0830184610759565b9a9950505050505050505050565b60008115159050919050565b6107f9816107e4565b811461080457600080fd5b50565b600081519050610816816107f0565b92915050565b60006020828403121561083257610831610399565b5b600061084084828501610807565b91505092915050565b600060808201905061085e60008301896106fb565b818103602083015261087181878961072c565b9050818103604083015261088681858761072c565b905061089560608301846106fb565b97965050505050505056fea2646970667358221220bead31d02b85cf3c8afaaf871516629972acdda63f356dcbcbc1db6f560cd49864736f6c63430008130033";

type AxelarExecutableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AxelarExecutableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AxelarExecutable__factory extends ContractFactory {
  constructor(...args: AxelarExecutableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    gateway_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AxelarExecutable> {
    return super.deploy(gateway_, overrides || {}) as Promise<AxelarExecutable>;
  }
  override getDeployTransaction(
    gateway_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(gateway_, overrides || {});
  }
  override attach(address: string): AxelarExecutable {
    return super.attach(address) as AxelarExecutable;
  }
  override connect(signer: Signer): AxelarExecutable__factory {
    return super.connect(signer) as AxelarExecutable__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AxelarExecutableInterface {
    return new utils.Interface(_abi) as AxelarExecutableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AxelarExecutable {
    return new Contract(address, _abi, signerOrProvider) as AxelarExecutable;
  }
}
