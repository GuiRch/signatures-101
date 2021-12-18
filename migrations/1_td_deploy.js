var points = artifacts.require("ERC20TD.sol");
var evaluator = artifacts.require("Evaluator.sol");
var nft_td9 = artifacts.require("NFT_td9.sol");
var exerciceSolution = artifacts.require("ExerciceSolution.sol");

module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        await hardcodeContractAddress(deployer, network, accounts)
        await deploySolution(deployer, network, accounts);
    });
};

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
    
    const stringToSignToGetPoint = '0x00000000596f75206e65656420746f207369676e207468697320737472696e67'
    const signature = await web3.eth.sign(stringToSignToGetPoint, accounts[0])
    console.log('Signature : ' + signature)
    await Evaluator.ex2_generateASignature(signature)
    
    await Evaluator.ex3_extractAddressFromSignature()

    var myPoints = await TDToken.balanceOf(accounts[0])
	console.log("Points after : " + myPoints.toString())
}