const Eos = require('eosjs');
const nconf = require('nconf');
const fs = require('fs');

nconf.argv()
    .required(["account", "privatekey"]);
const privatekey = nconf.get("privatekey").replace(/ /g, '');
const account = nconf.get("account").replace(/ /g, '');

eos = Eos({
    httpEndpoint: "http://mainnet.eoscanada.com",
    chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
    keyProvider: privatekey
});

async function SetContract(contractname) {
    try {
        const preInfo = await eos.getAccount(account);
        const preRAMUsage = preInfo.ram_usage;
        const preRAMTotal = preInfo.ram_quota;
        console.log("RAM usage/total befor set contract:" + preRAMUsage + "/" + preRAMTotal);

        const wasm = fs.readFileSync("contract/" + contractname + ".wasm");
        const abi = fs.readFileSync("contract/" + contractname + ".abi");
        const coderesult = await eos.setcode(account, 0, 0, wasm);
        const abiresult = await eos.setabi(account, JSON.parse(abi));

        const currentInfo = await eos.getAccount(account);
        const currentRameUsage = currentInfo.ram_usage;
        const currentRAMTotal = currentInfo.ram_quota;
        console.log("RAM usage after set contract:" + currentRameUsage + "/" + preRAMTotal);

    } catch (error) {
        console.log(error);
    }
}

SetContract("hello");