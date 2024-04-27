const { ethers } = require('ethers');
const { Multicall } = require('ethereum-multicall');

const provider = ethers.getDefaultProvider('mainnet');

const multicall = new Multicall({ ethersProvider: provider });

const contractCallContext = [
    {
        reference: 'contractCall1',
        contractAddress: 'YourContractAddressHere', 
        abi: YourContractABI,
        calls: [{methodName: 'methodName1', params: ['param1']}, {methodName: 'methodName2', params: ['param1', 'param2']}],
    },
];

async function executeMulticall() {
    try {
        const { results } = await multicall.call(contractCallContext);
        console.log(results);
    } catch (error) {
        console.error(`Multicall error: ${error}`);
    }
}

executeMulticall();