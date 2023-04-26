import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {

  async function deployDataVaultFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const DataVault = await ethers.getContractFactory("DataVault");
    const dataVault = await DataVault.deploy();
    return { dataVault, owner, otherAccount };
  }

  describe("Deployment", function () {

    it("Should set the right owner", async function () {
      // const { lock, owner } = await loadFixture(deployDataVaultFixture);

      // expect(await lock.owner()).to.equal(owner.address);
    });


  });

  describe("Adding Files", function () {
    describe("Validations", function () {
      it("Should add file in array", async function () {
        
      });

    });

    describe("Adding Credentials", function () {
      it("Should add credential in array", async function () {
       
      });
    });

  });
});
