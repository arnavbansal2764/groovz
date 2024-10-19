const path = require("path");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const groovz = await ethers.deployContract("Groovz");
    const contract_address = await groovz.getAddress()
    console.log("Contract address:",contract_address)
    saveFrontendFiles(contract_address);

  }

   function saveFrontendFiles(contract_address) {
    const fs = require("fs");
    const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      path.join(contractsDir, "contract-address.json"),
      JSON.stringify({ Groovz: contract_address }, undefined, 2)
    );
  
    const groovzArtifact = artifacts.readArtifactSync("Groovz");
  
    fs.writeFileSync(
      path.join(contractsDir, "Groovz.json"),
      JSON.stringify(groovzArtifact, null, 2)
    );
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });