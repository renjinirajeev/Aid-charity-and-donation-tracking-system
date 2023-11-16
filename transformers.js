/**
 * Transforms ipfs from backend to a readable hash on IPFS gateways
 *
 * @param {string} ipfsString The IPFS string (ipfs://hash)
 * @return {string} The transformed string (ipfs/hash)
 */
 export const convertIpfs = (ipfsString) => ipfsString.split(":/").join("")


 /**
  * Transforms wallet addresses such that they only show
  * first 6 digits last 5 digits with ... in between
  *
  * @param {string} hash originalWalletHash 
  * @return {string} The transformed string (123456...12345)
  */
  export const formatWalletHash = (hash) => `${hash.slice(0,6)}...${hash.slice(-5)}`