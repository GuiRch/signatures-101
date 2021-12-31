var points = artifacts.require("ERC20TD.sol");
var evaluator = artifacts.require("Evaluator.sol");
var nft_td9 = artifacts.require("NFT_td9.sol");
var exerciceSolution = artifacts.require("ExerciceSolution.sol");

var bouncerProxy = artifacts.require("BouncerProxy.sol");


module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {

        await deployBouncer(deployer, network, accounts)

        await hardcodeContractAddress(deployer, network, accounts)
        await deploySolution(deployer, network, accounts);
    });
};

async function deployBouncer(deployer, network, accounts) {
    BouncerProxy = await bouncerProxy.new();
    console.log('BouncerProxy address : ' + BouncerProxy.address)
}

async function hardcodeContractAddress(deployer, network, accounts) {
	TDToken = await points.at("0x878D1Dbbc0a3f5b73009f09ceCBEEBba36184297")
	Evaluator = await evaluator.at("0x0605830a47081c4f3F8C4583C624A901945321dB")
}

async function deploySolution(deployer, network, accounts) {
	var myPoints = await TDToken.balanceOf(accounts[0])
    console.log("Points before : " + myPoints.toString())

    Nft_td9 = await nft_td9.new()
    console.log('Nft_td9 address : ' + Nft_td9.address)
    ExerciceSolution = await exerciceSolution.new(Nft_td9.address)
    console.log('ExerciceSolution address : ' + ExerciceSolution.address)
    
    await Evaluator.submitExercice(ExerciceSolution.address)
    await Evaluator.ex1_testERC721()
    console.log('Ex 1 Done')
    
    const stringToSignToGetPoint = '0x00000000596f75206e65656420746f207369676e207468697320737472696e67'
    const signature = await web3.eth.sign(stringToSignToGetPoint, accounts[0])
    console.log('Signature : ' + signature)
    await Evaluator.ex2_generateASignature(signature)
    console.log('Ex 2 Done')
    
    await Evaluator.ex3_extractAddressFromSignature()
    console.log('Ex 3 Done')

    const aBytes32 = '0x00000000596f75206e65656420746f207369676e207468697320737472696e67'
    const signatureEx4 = await web3.eth.sign(aBytes32, accounts[0])
    console.log('Signature : ' + signatureEx4)
    await Evaluator.ex4_manageWhiteListWithSignature(aBytes32, signatureEx4)
    console.log('Ex 4 Done')

    const dataToSign = web3.utils.soliditySha3(Evaluator.address, accounts[0], Nft_td9.address);
    // const preDataToSign = web3.eth.abi.encodeParameters(['address', 'address', 'address'], [Evaluator.address, accounts[0], Nft_td9.address]);
    // const dataToSign = web3.utils.keccak256(preDataToSign)
    const signatureEx5 = await web3.eth.sign(dataToSign, accounts[0])
    await Evaluator.ex5_mintATokenWithASpecificSignature(signatureEx5)
    console.log('Ex 5 Done')

    await BouncerProxy.updateWhitelist(Evaluator.address, true)
    await Evaluator.ex6_deployBouncerProxyAndWhitelistYourself(BouncerProxy.address)
    console.log('Ex 6 Done')

    var myPoints = await TDToken.balanceOf(accounts[0])
	console.log("Points after : " + myPoints.toString())
}
