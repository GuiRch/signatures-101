var points = artifacts.require("ERC20TD.sol");
var ERC20 = artifacts.require("DummyToken.sol"); 
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
    console.log("Points before : " + myPoints.toString())
	var myPoints = await TDToken.balanceOf(accounts[0])

    Nft_td9 = await nft_td9.new()
    ExerciceSolution = await exerciceSolution.new(Nft_td9.address)
    
    await Evaluator.ex1_testERC721()
	// const ticker = await Evaluator.readTicker(accounts[0])
    // console.log("Ticker : " + ticker)
	// const supply = await Evaluator.readSupply(accounts[0])
    // console.log("Supply : " + supply.toString())
    
    // ERC20Basics = await erc20Basics.new(ticker, ticker, supply.toString())
    // console.log("Points at that step : " + myPoints.toString())
    // console.log("ERC20 Basics contract address : " + ERC20Basics.address)
    
    // await Evaluator.submitErc20(ERC20Basics.address)
    // console.log("Points after submitErc20 : " + myPoints.toString())
    // await Evaluator.ex6b_testErc20TickerAndSupply()

    var myPoints = await TDToken.balanceOf(accounts[0])
	console.log("Points after : " + myPoints.toString())
}